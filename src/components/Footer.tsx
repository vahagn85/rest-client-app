import Link from 'next/link';
import courseLogo from '@/svg/course-logo.svg';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

export default function Footer() {
  const t = useTranslations('IMAGES_ALT');

  return (
    <footer className="py-4 flex justify-between">
      <Link
        href="https://github.com/vahagn85/rest-client-app "
        className="underline underline-offset-2"
      >
        Github
      </Link>

      <span>{new Date().getFullYear()}</span>

      <Image
        src={courseLogo.src}
        width={20}
        height={20}
        alt={t('COURSE_LOGO')}
      />
    </footer>
  );
}
