'use client';

import SigInDialog from './signIn-dialog';
import { useState } from 'react';

const SigIn = () => {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <SigInDialog visible={visible} changeVisible={setVisible} />
    </>
  );
};

export default SigIn;
