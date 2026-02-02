'use client';

import { Button } from '@/components/ui/button';
import { deleteArticle } from '@/service/article';
import { Delete } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

type DeleteBtnProps = {
  articleId: number;
  isLogin: boolean;
};

const DeleteBtn = ({ articleId, isLogin }: DeleteBtnProps) => {
  const router = useRouter();

  const handleDelete = async () => {
    try {
      await deleteArticle(Number(articleId));
      toast.success('删除成功!', { position: 'top-center' });
    } catch (error) {
      console.log('文章删除失败:', error);
      toast.error('删除失败!');
    } finally {
      router.push('/article');
    }
  };

  if (!isLogin) return null; // 未登录不显示删除文章按钮

  return (
    <Button
      variant="ghost"
      className="flex items-center cursor-pointer"
      onClick={handleDelete}
    >
      <Delete />
      delete
    </Button>
  );
};

export default DeleteBtn;
