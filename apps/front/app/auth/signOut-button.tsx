'use client';

import { Button } from '@/components/ui/button';
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

export default function SignInButtonClient() {
  const router = useRouter();
  const [visible, setVisible] = useState(false);

  const handleSignOut = async () => {
    await signOutAction();
    setVisible(false);
    router.push('/');
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
            <Button onClick={handleSignOut}>confirm</Button>
            <Button onClick={() => setVisible(false)}>cancel</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
