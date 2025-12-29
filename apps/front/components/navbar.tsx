import ModeToggle from './mode-toggle';
import { Button } from './ui/button';
import { House, BookOpenText, LogIn } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';

const Navbar = () => {
  return (
    <div className="w-full h-full border-b flex items-center justify-between px-5">
      <div>logo</div>
      <div className="flex">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost">
              <House /> home
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>首页介绍哈哈哈哈</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost">
              <BookOpenText />
              articles
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>一些文章哈哈哈</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost">
              <LogIn />
              sigIn
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>快去登录哈哈</p>
          </TooltipContent>
        </Tooltip>

        <ModeToggle />
      </div>
    </div>
  );
};

export default Navbar;
