'use client';

import ModeToggle from './mode-toggle';
import { Button } from './ui/button';
import { House, BookOpenText, LogIn } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Navbar = () => {
  // 默认选中状态
  const currentPath = usePathname();

  const items = [
    {
      index: 'home',
      icon: <House />,
      tip: 'home!',
      href: '/',
    },
    {
      index: 'articles',
      icon: <BookOpenText />,
      tip: 'article!',
      href: '/article',
    },
    {
      index: 'sigIn',
      icon: <LogIn />,
      tip: 'sigIn!',
      href: '',
    },
  ];

  return (
    <div className="w-full h-full border-b flex items-center justify-between px-5">
      <div>logo</div>
      <div className="flex">
        {items.map((item) => (
          <Tooltip key={item.index}>
            <TooltipTrigger asChild>
              <Link href={item.href}>
                <Button
                  variant="ghost"
                  className={`${
                    currentPath == item.href ? 'bg-[#181818]' : ''
                  }`}
                >
                  {item.icon}
                  {item.index}
                </Button>
              </Link>
            </TooltipTrigger>
            <TooltipContent>
              <p>{item.tip}</p>
            </TooltipContent>
          </Tooltip>
        ))}

        <ModeToggle />
      </div>
    </div>
  );
};

export default Navbar;
