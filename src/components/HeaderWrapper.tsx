'use client';

import { type ReactNode, useEffect, useState } from 'react';
import clsx from 'clsx';

function HeaderWrapper({ children }: { children: ReactNode }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={clsx(
        'sticky top-0 z-50 border-b border-gray-300 transition-all duration-300',
        scrolled
          ? 'bg-white/80 backdrop-blur-md shadow-md py-2'
          : 'bg-transparent py-4'
      )}
    >
      {children}
    </header>
  );
}

export default HeaderWrapper;
