'use client';

import { Button } from '@/components/ui/button';
import { House, BookOpenText } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function NavLinks() {
  const currentPath = usePathname();

  const items = [
    { index: 'home', icon: <House />, tip: 'home!', href: '/' },
    {
      index: 'articles',
      icon: <BookOpenText />,
      tip: 'article!',
      href: '/article',
    },
  ];

  return (
    <>
      {items.map((item) => (
        <Tooltip key={item.index}>
          <TooltipTrigger asChild>
            <Link href={item.href}>
              <Button
                variant="ghost"
                className={`${
                  currentPath === item.href
                    ? 'bg-[#f5f5f5] dark:bg-[#181818]'
                    : ''
                }`}
              >
                {item.icon}
                {item.index}
              </Button>
            </Link>
          </TooltipTrigger>
          <TooltipContent>{item.tip}</TooltipContent>
        </Tooltip>
      ))}
    </>
  );
}
