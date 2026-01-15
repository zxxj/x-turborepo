'use client';

import { normalizeNodeId, Value } from 'platejs';
import { Plate, usePlateEditor } from 'platejs/react';

import { EditorKit } from '@/components/editor-kit';
import { SettingsDialog } from '@/components/settings-dialog';
import { Editor, EditorContainer } from '@/components/editor/editor';

interface EditorType {
  value: Value;
}

export default function MyPublishEditor({ value }: EditorType) {
  const editor = usePlateEditor({
    plugins: EditorKit,
    value,
  });

  return (
    <Plate editor={editor}>
      <EditorContainer>
        <Editor variant="demo" readOnly />
      </EditorContainer>
      <SettingsDialog />
    </Plate>
  );
}
