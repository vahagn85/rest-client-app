import CodeMirror from '@uiw/react-codemirror';
import { json } from '@codemirror/lang-json';
import { getStatusColor } from '@/utils/colors';
import { useTranslations } from 'next-intl';

interface RestResponseProps {
  status: number | null;
  body: string;
  isJson?: boolean;
}

function RestResponse({ status, body, isJson }: RestResponseProps) {
  const t = useTranslations('REST_PAGE');

  let value = body;
  if (isJson && !status) {
    try {
      value = JSON.stringify(JSON.parse(body), null, 2);
    } catch {
      value = body;
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-4 border border-gray-200 rounded shadow-xl mt-4">
      <div className="flex items-center justify-between gap-2 mb-3">
        <h3 className="text-lg font-semibold">{t('RESPONSE')}</h3>
        {status && (
          <div className="flex items-center justify-between gap-2">
            <span className="font-semibold">{t('STATUS')}</span>
            <span
              className={`px-3 py-1 rounded-md border font-semibold ${getStatusColor(status)}`}
            >
              {status}
            </span>
          </div>
        )}
      </div>

      <CodeMirror
        value={value}
        height="300px"
        theme="dark"
        extensions={isJson ? [json()] : []}
        editable={false}
      />
    </div>
  );
}

export default RestResponse;
