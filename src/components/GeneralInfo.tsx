import { type ReactNode } from 'react';
import { DEVELOPERS } from '@/constants/developers';
import Link from 'next/link';
import { GitBranchPlus } from 'lucide-react';
import { useTranslations } from 'next-intl';

function GeneralSection({
  title,
  children,
}: {
  title: string;
  children?: ReactNode;
}) {
  return (
    <section>
      <h2 className="text-4xl text-center font-bold mb-4">{title}</h2>
      {children}
    </section>
  );
}

function GeneralInfo() {
  const t = useTranslations('GEN_INFO');

  return (
    <div className="p-6 space-y-8">
      <GeneralSection title={t('PROJECT')}>
        <p className="text-lg text-gray-700">{t('PROJECT_DESC_1')}</p>
        <p className="text-lg text-gray-700">{t('PROJECT_DESC_2')}</p>
      </GeneralSection>

      <GeneralSection title={t('DEVELOPERS')}>
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {DEVELOPERS.map((dev) => (
            <li
              key={dev.id}
              className="flex flex-col items-center space-y-2 p-4 border rounded-lg shadow-sm"
            >
              <span className="font-medium text-lg">{dev.name}</span>

              <Link href={dev.url} target="_blank" rel="noopener noreferrer">
                <GitBranchPlus className="w-6 h-6 text-gray-800 hover:text-black" />
              </Link>
            </li>
          ))}
        </ul>
      </GeneralSection>

      <GeneralSection title={t('COURSE')}>
        <p className="text-gray-700">{t('COURSE_DESC')}</p>
      </GeneralSection>
    </div>
  );
}

export default GeneralInfo;
