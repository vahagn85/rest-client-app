'use server';
import { RequestRest, RestForm } from '@/types/rest.type';
import { createClient } from '@/utils/supabase/server';

export async function saveData(data: RestForm, route: string) {
  const supabase = await createClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return { success: false, error: 'User not auth' };
  }

  const { method, url, body, headers = [] } = data;

  const headersObj = Object.fromEntries(
    headers.map(({ key, value }) => [key, value])
  );

  const requestBody = body ? JSON.stringify(body) : undefined;
  const requestSize = requestBody ? Buffer.byteLength(requestBody, 'utf8') : 0;
  const start = performance.now();
  try {
    const response = await fetch(url, {
      method,
      headers: headersObj,
      ...(method !== 'GET' && requestBody ? { body: requestBody } : {}),
    });

    const duration = Math.round(performance.now() - start);

    const responseText = await response.clone().text();
    const responseSize = Buffer.byteLength(responseText, 'utf8');

    const result: RequestRest = {
      user_id: user.id,
      request_method: method,
      endpoint_url: url,
      route,
      response_status: response.status,
      request_duration: duration,
      request_size: requestSize,
      response_size: responseSize,
      created_at: new Date().toISOString(),
      error_details: response.ok ? null : responseText,
    };

    const { error } = await supabase.from('requests_log').insert([result]);
    if (error) {
      return { success: false, error: error.message };
    }
    return {
      success: true,
      data: result,
      response: {
        status: response.status,
        body: responseText,
        isJson: (() => {
          try {
            JSON.parse(responseText);
            return true;
          } catch {
            return false;
          }
        })(),
      },
      error_details: response.ok ? null : responseText,
    };
  } catch (error) {
    const duration = Math.round(performance.now() - start);

    const result: RequestRest = {
      user_id: user.id,
      request_method: method,
      endpoint_url: url,
      route,
      response_status: 0,
      request_duration: duration,
      request_size: 0,
      response_size: 0,
      created_at: new Date().toISOString(),
      error_details: (error as Error)?.message || 'Unknown error',
    };

    await supabase.from('requests_log').insert([result]);

    return {
      success: false,
      data: result,
      response: {
        status: 0,
        body: (error as Error)?.message || 'Unknown error',
        isJson: false,
      },
      error: result.error_details,
    };
  }
}
