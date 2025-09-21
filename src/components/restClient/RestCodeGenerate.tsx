'use client';

import { useState, useEffect } from 'react';
import { LANGUAGES, generateCodeSnippet } from '@/utils/codeGeneration';
import { replaceVariables } from '@/utils/variables';
import { HeaderField } from '@/types/rest.type';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useTranslations } from 'next-intl';

interface RestCodeGenerateProps {
  method: string;
  url: string;
  headers: HeaderField[];
  body?: string;
}

function RestCodeGenerate({
  method,
  url,
  headers,
  body,
}: RestCodeGenerateProps) {
  const [language, setLanguage] = useState(LANGUAGES[0].key);
  const [client, setClient] = useState(LANGUAGES[0].client || undefined);
  const [code, setCode] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const t = useTranslations('REST_PAGE');
  const tLang = useTranslations('LOCALE_SWITCHER');

  useEffect(() => {
    async function loadSnippet() {
      if (!method || !url) {
        setCode(null);
        setError(t('CODE_SNIPPET_ERROR'));
        return;
      }
      const replacedUrl = replaceVariables(url);
      if (!/^https?:\/\//i.test(replacedUrl)) {
        setCode(null);
        setError(t('CODE_SNIPPET_ERROR_URL'));
        return;
      }

      try {
        setError(null);
        const snippet = await generateCodeSnippet(
          method,
          replacedUrl,
          headers,
          body,
          language,
          client
        );

        setCode(snippet);
      } catch {
        setError(t('CODE_SNIPPET_ERROR_CODE'));
        setCode(null);
      }
    }

    loadSnippet();
  }, [method, url, headers, body, language, client, t]);

  return (
    <div className="max-w-4xl mx-auto p-4 border border-gray-200 rounded shadow-xl mt-4">
      <div className="flex items-center justify-between gap-2 mb-3">
        <Select
          value={`${language}-${client}`}
          onValueChange={(value) => {
            const langObj = LANGUAGES.find((l) => l.value === value);
            if (langObj) {
              setLanguage(langObj.key);
              setClient(langObj.client);
            }
          }}
        >
          <SelectTrigger className="w-[220px]">
            <SelectValue placeholder={tLang('SELECTOR_TITLE')} />
          </SelectTrigger>
          <SelectContent>
            {LANGUAGES.map((lang) => (
              <SelectItem key={lang.value} value={lang.value}>
                {lang.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <h3 className="text-lg font-semibold">{t('GENERATE_CODE')}</h3>
      </div>

      {error && (
        <div className="bg-red-800 p-3 rounded-md text-white font-semibold">
          {error}
        </div>
      )}

      {code && (
        <pre className="bg-gray-800 text-green-400 p-3 rounded-md overflow-x-auto">
          <code>{code}</code>
        </pre>
      )}
    </div>
  );
}

export default RestCodeGenerate;
