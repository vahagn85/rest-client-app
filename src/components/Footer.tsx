import Link from 'next/link';
import { CourseLogo } from './icons/CourseLogo';

export default function Footer() {
  return (
    <footer className="py-4 flex justify-between border-t border-gray-300">
      <Link
        href="https://github.com/vahagn85"
        className="underline underline-offset-2"
        target="_blank"
      >
        Github
      </Link>

      <span>{new Date().getFullYear()}</span>
      <Link
        href="https://rs.school/courses/reactjs"
        className="underline underline-offset-2 w-6"
        target="_blank"
        rel="noopener noreferrer"
      >
        <CourseLogo />
      </Link>
    </footer>
  );
}
