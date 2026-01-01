'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { Moon, Sun } from 'lucide-react';
import { flushSync } from 'react-dom';
import { cn } from '@/lib/utils';

interface AnimatedThemeTogglerProps
  extends React.ComponentPropsWithoutRef<'button'> {
  duration?: number;
}

export const AnimatedThemeToggler = ({
  className,
  duration = 400,
  ...props
}: AnimatedThemeTogglerProps) => {
  const [isDark, setIsDark] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  /** 初始化 & 监听 html.dark 变化 */
  useEffect(() => {
    const updateTheme = () => {
      setIsDark(document.documentElement.classList.contains('dark'));
    };

    updateTheme();

    const observer = new MutationObserver(updateTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    return () => observer.disconnect();
  }, []);

  /** 实际切换逻辑（抽出来复用） */
  const applyTheme = (nextDark: boolean) => {
    setIsDark(nextDark);
    document.documentElement.classList.toggle('dark', nextDark);
    localStorage.setItem('theme', nextDark ? 'dark' : 'light');
  };

  const toggleTheme = useCallback(async () => {
    if (!buttonRef.current) return;

    const nextDark = !isDark;

    /** 🔴 移动端 / 不支持 View Transition */
    if (typeof document.startViewTransition !== 'function') {
      applyTheme(nextDark);
      return;
    }

    /** 🟢 桌面端 View Transition */
    const transition = document.startViewTransition(() => {
      flushSync(() => {
        applyTheme(nextDark);
      });
    });

    await transition.ready;

    const { top, left, width, height } =
      buttonRef.current.getBoundingClientRect();

    const x = left + width / 2;
    const y = top + height / 2;
    const maxRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y),
    );

    document.documentElement.animate(
      {
        clipPath: [
          `circle(0px at ${x}px ${y}px)`,
          `circle(${maxRadius}px at ${x}px ${y}px)`,
        ],
      },
      {
        duration,
        easing: 'ease-in-out',
        pseudoElement: '::view-transition-new(root)',
      },
    );
  }, [isDark, duration]);

  return (
    <button
      ref={buttonRef}
      onClick={toggleTheme}
      className={cn(
        'inline-flex items-center justify-center rounded-md transition-colors',
        className,
      )}
      {...props}
    >
      {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
      <span className="sr-only">Toggle theme</span>
    </button>
  );
};
