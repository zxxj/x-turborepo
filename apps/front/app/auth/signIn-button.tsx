'use client';

import { Button } from '@/components/ui/button';
import { LogIn } from 'lucide-react';
import { useState } from 'react';
import SigInDialog from './signIn-dialog';

export default function SignInButtonClient() {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <Button variant="ghost" onClick={() => setVisible(true)}>
        <LogIn />
        Sign In
      </Button>

      <SigInDialog visible={visible} changeVisible={setVisible} />
    </>
  );
}
