'use client';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { SignIn } from '@/service/auth';
import { toast } from 'sonner';
import { UserInfoType } from './type';
import { setLoginCookie } from './auth';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Spinner } from '@/components/ui/spinner';

const schema = z.object({
  email: z.string().email('请输入正确邮箱'),
  password: z.string().min(6, '密码至少 6 位'),
});

type FormValues = z.infer<typeof schema>;

interface Props {
  onSuccess?: (user: UserInfoType) => void;
}

export default function SignInForm({ onSuccess }: Props) {
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (values: FormValues) => {
    setLoading(true);
    try {
      const userInfo: UserInfoType = await SignIn({
        email: values.email,
        password: values.password,
      });

      await setLoginCookie(userInfo);
      router.refresh();
      onSuccess?.(userInfo); // ⭐ 登录成功通知外部
    } catch (error) {
      toast.error(`登录失败:${error}`, { position: 'top-center' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="w-full flex justify-center">
          <Button
            type="submit"
            disabled={loading}
            variant="secondary"
            className="w-[70%]"
          >
            {loading ? <Spinner /> : ''}
            {loading ? 'Confirm~' : 'Confirm'}
          </Button>
        </div>
      </form>
    </Form>
  );
}
