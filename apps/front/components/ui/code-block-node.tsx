'use client';

import * as React from 'react';

import { formatCodeBlock, isLangSupported } from '@platejs/code-block';
import { BracesIcon, Check, CheckIcon, CopyIcon } from 'lucide-react';
import { type TCodeBlockElement, type TCodeSyntaxLeaf, NodeApi } from 'platejs';
import {
  type PlateElementProps,
  type PlateLeafProps,
  PlateElement,
  PlateLeaf,
  useEditorRef,
  useElement,
  useReadOnly,
} from 'platejs/react';

import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';

/* ------------------------------------------------------------------ */
/* utils                                                              */
/* ------------------------------------------------------------------ */

/** ✅ SSR / HTTPS / fallback 全兼容的复制函数 */
async function safeCopy(text: string) {
  // SSR 直接跳过
  if (typeof window === 'undefined') return;

  // ✅ 现代浏览器 / 移动端 / HTTPS
  if (navigator.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(text);
      return;
    } catch (e) {
      // 有些 WebView 会 reject，但不抛异常
      console.warn('Clipboard API failed, fallback disabled', e);
    }
  }

  // ❌ 不再使用 textarea fallback（会造成双重复制）
  // 这里选择「直接失败」是更安全的行为
  alert('当前环境不支持复制，请手动选择文本');
}

/* ------------------------------------------------------------------ */
/* CodeBlock Element                                                   */
/* ------------------------------------------------------------------ */

export function CodeBlockElement(props: PlateElementProps<TCodeBlockElement>) {
  const { editor, element } = props;
  const readOnly = useReadOnly();

  return (
    <PlateElement
      className="py-1 **:[.hljs-addition]:bg-[#f0fff4] **:[.hljs-addition]:text-[#22863a]
        **:[.hljs-attr,.hljs-attribute,.hljs-literal,.hljs-meta,.hljs-number,.hljs-operator]:text-[#005cc5]
        **:[.hljs-comment]:text-[#6a737d]
        **:[.hljs-keyword]:text-[#d73a49]
        **:[.hljs-string]:text-[#032f62]"
      {...props}
    >
      <div className="relative rounded-md bg-muted/50">
        <pre className="overflow-x-auto p-8 pr-4 font-mono text-sm leading-[normal]">
          <code>{props.children}</code>
        </pre>

        {/* 右上角工具栏 */}
        {!readOnly && (
          <div
            className="absolute top-1 right-1 z-10 flex gap-0.5"
            contentEditable={false}
          >
            {isLangSupported(element.lang) && (
              <Button
                size="icon"
                variant="ghost"
                className="size-6"
                onClick={() => formatCodeBlock(editor, { element })}
                title="Format code"
              >
                <BracesIcon className="!size-3.5 text-muted-foreground" />
              </Button>
            )}

            <CodeBlockCombobox />

            <CopyButton
              size="icon"
              variant="ghost"
              className="size-6 text-muted-foreground"
              value={() => NodeApi.string(element)}
            />
          </div>
        )}
      </div>
    </PlateElement>
  );
}

/* ------------------------------------------------------------------ */
/* Language Select                                                     */
/* ------------------------------------------------------------------ */

function CodeBlockCombobox() {
  const [open, setOpen] = React.useState(false);
  const editor = useEditorRef();
  const element = useElement<TCodeBlockElement>();
  const readOnly = useReadOnly();

  const value = element.lang || 'plaintext';
  const [searchValue, setSearchValue] = React.useState('');

  const items = React.useMemo(
    () =>
      languages.filter(
        (l) =>
          !searchValue ||
          l.label.toLowerCase().includes(searchValue.toLowerCase()),
      ),
    [searchValue],
  );

  if (readOnly) return null;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button size="sm" variant="ghost" className="h-6 px-2 text-xs">
          {languages.find((l) => l.value === value)?.label ?? 'Plain Text'}
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-[200px] p-0">
        <Command shouldFilter={false}>
          <CommandInput
            value={searchValue}
            onValueChange={setSearchValue}
            placeholder="Search language..."
          />
          <CommandEmpty>No language found.</CommandEmpty>

          <CommandList className="max-h-[300px]">
            <CommandGroup>
              {items.map((language) => (
                <CommandItem
                  key={language.value}
                  value={language.value}
                  onSelect={(v) => {
                    editor.tf.setNodes<TCodeBlockElement>(
                      { lang: v },
                      { at: element },
                    );
                    setOpen(false);
                    setSearchValue('');
                  }}
                >
                  <Check
                    className={cn(
                      value === language.value ? 'opacity-100' : 'opacity-0',
                    )}
                  />
                  {language.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

/* ------------------------------------------------------------------ */
/* Copy Button                                                         */
/* ------------------------------------------------------------------ */

function CopyButton({
  value,
  ...props
}: {
  value: (() => string) | string;
} & Omit<React.ComponentProps<typeof Button>, 'value'>) {
  const [copied, setCopied] = React.useState(false);

  React.useEffect(() => {
    if (!copied) return;
    const t = setTimeout(() => setCopied(false), 1500);
    return () => clearTimeout(t);
  }, [copied]);

  return (
    <Button
      {...props}
      onClick={async () => {
        const text = typeof value === 'function' ? value() : value;
        await safeCopy(text);
        setCopied(true);
      }}
    >
      <span className="sr-only">Copy</span>
      {copied ? (
        <CheckIcon className="!size-3" />
      ) : (
        <CopyIcon className="!size-3" />
      )}
    </Button>
  );
}

/* ------------------------------------------------------------------ */
/* Leaf                                                                */
/* ------------------------------------------------------------------ */

export function CodeLineElement(props: PlateElementProps) {
  return <PlateElement {...props} />;
}

export function CodeSyntaxLeaf(props: PlateLeafProps<TCodeSyntaxLeaf>) {
  return <PlateLeaf className={props.leaf.className as string} {...props} />;
}

/* ------------------------------------------------------------------ */
/* Languages                                                           */
/* ------------------------------------------------------------------ */

const languages = [
  { label: 'Plain Text', value: 'plaintext' },
  { label: 'JavaScript', value: 'javascript' },
  { label: 'TypeScript', value: 'typescript' },
  { label: 'JSON', value: 'json' },
  { label: 'HTML', value: 'html' },
  { label: 'CSS', value: 'css' },
  { label: 'Bash', value: 'bash' },
  { label: 'Python', value: 'python' },
  { label: 'Go', value: 'go' },
  { label: 'Rust', value: 'rust' },
];
