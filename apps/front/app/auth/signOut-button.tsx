'use client';

import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { LogOut } from 'lucide-react';
import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { signOutAction } from './auth';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export default function SignInButtonClient() {
  const router = useRouter();
  const [visible, setVisible] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSignOut = async () => {
    setLoading(true);
    try {
      await signOutAction();
      router.refresh();
      setVisible(false);
    } catch (error) {
      toast.error(`异常:${error}`, { position: 'top-center' });
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <Button variant="ghost" onClick={() => setVisible(true)}>
        <LogOut />
        signOut
      </Button>

      <Dialog open={visible} onOpenChange={setVisible}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Sign out</DialogTitle>
            <DialogDescription>
              Are you sure you want to log out?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="secondary"
              onClick={handleSignOut}
              disabled={loading}
            >
              {loading ? <Spinner /> : ''}
              confirm
            </Button>
            <Button variant="secondary" onClick={() => setVisible(false)}>
              cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
