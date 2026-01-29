'use client';
import MyPublishEditor from '@/components/publish-edtor';
import { Button } from '@/components/ui/button';
import type { Value } from 'platejs';
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { useEffect, useState } from 'react';
import { Spinner } from '@/components/ui/spinner';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { SquarePen } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { createArticle, updateArticle } from '@/service/article';

const schema = z.object({
  title: z.string().min(6, '文章标题至少6位!'),
  slug: z.string(),
});

type FormValues = z.infer<typeof schema>;

// 编辑文章
type EditorType = {
  value?: Value;
  title?: string;
  slug?: string;
  articleId?: number;
  isLogin?: boolean;
  btnText: string;
};

const publishAndUpdatePage = ({
  value,
  title,
  slug,
  articleId,
  isLogin,
  btnText,
}: EditorType) => {
  const [visible, setVisible] = useState(false);
  const initialValue: Value = [
    {
      children: [{ text: 'Title' }],
      type: 'h3',
    },
  ];

  const [loading, setLoading] = useState<boolean>(false);
  const [editorValue, setEditorValue] = useState<Value>(initialValue);

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: '',
      slug: '',
    },
  });

  // 编辑文章
  useEffect(() => {
    if (value) {
      setEditorValue(value);
      form.setValue('title', title as string);
      form.setValue('slug', slug as string);
    } else {
      setEditorValue(initialValue);
      form.reset();
    }
  }, [visible]);

  const onSubmit = async (values: FormValues) => {
    setLoading(true);
    try {
      if (!value) {
        // 创建文章
        await createArticle({
          title: values.title,
          slug: values.slug,
          content: JSON.stringify(editorValue),
        });
        toast.success(`文章创建成功!`, { position: 'top-center' });
      } else {
        // 更新文章
        await updateArticle(articleId as number, {
          title: values.title,
          slug: values.slug,
          content: JSON.stringify(editorValue),
        });
        toast.error(`文章更新成功!`, { position: 'top-center' });
      }

      setVisible(false);
      onDrawerClose();
    } catch (error) {
      toast.error(`文章创建失败:${error}`, { position: 'top-center' });
    } finally {
      setLoading(false);
    }
  };

  const onDrawerClose = () => {
    // 新建文章才清空,编辑文章保留数据
    if (!value) {
      setEditorValue([]);
      form.reset();
    }
  };
  return (
    <>
      <Drawer onClose={onDrawerClose} open={visible} onOpenChange={setVisible}>
        <DrawerTrigger asChild>
          {isLogin ? (
            <Button
              variant="ghost"
              className="flex items-center cursor-pointer"
            >
              <SquarePen />
              {btnText}
            </Button>
          ) : (
            ''
          )}
        </DrawerTrigger>
        <DrawerContent>
          <div className="mx-auto  w-full h-full">
            <DrawerHeader>
              <DrawerTitle>create new article</DrawerTitle>
              <DrawerDescription>create your article.</DrawerDescription>
            </DrawerHeader>

            <div className="px-10">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-4"
                >
                  <div className="lg:flex gap-10 ">
                    <FormField
                      control={form.control}
                      name="title"
                      render={({ field }) => (
                        <FormItem className="flex items-center mb-4 lg:mb-0">
                          <FormLabel>title</FormLabel>
                          <div className="flex-1">
                            <FormControl>
                              <Input {...field} className="lg:w-96" />
                            </FormControl>
                            <FormMessage />
                          </div>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="slug"
                      render={({ field }) => (
                        <FormItem className="flex items-center">
                          <FormLabel>slug</FormLabel>
                          <div className="flex-1">
                            <FormControl>
                              <Textarea {...field} className="lg:w-96" />
                            </FormControl>
                            <FormMessage />
                          </div>
                        </FormItem>
                      )}
                    />

                    <div className="lg:flex-1 w-full mt-4 lg:mt-0 text-center lg:text-end">
                      <Button
                        type="submit"
                        disabled={loading}
                        variant="secondary"
                        className="w-[70%] lg:w-24"
                      >
                        {loading ? <Spinner /> : ''}
                        {loading ? 'publish~' : 'publish'}
                      </Button>
                    </div>
                  </div>
                </form>
              </Form>
            </div>
            <MyPublishEditor value={editorValue} onChange={setEditorValue} />
          </div>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default publishAndUpdatePage;
