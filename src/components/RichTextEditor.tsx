'use client';

import { useEffect, useRef } from 'react';
import { Bold, Italic, Underline, List, ListOrdered, Link as LinkIcon, Image as ImageIcon, Smile, Heading1, Heading2 } from 'lucide-react';

interface RichTextEditorProps {
  value: string;
  onChange: (html: string) => void;
}

const emojis = ['😀','😁','😂','😎','😍','🔥','🚀','🎉','✅','⭐'];

export default function RichTextEditor({ value, onChange }: RichTextEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (editorRef.current && editorRef.current.innerHTML !== value) {
      editorRef.current.innerHTML = value || '';
    }
  }, [value]);

  const exec = (command: string, valueArg?: string) => {
    document.execCommand(command, false, valueArg);
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  };

  const insertLink = () => {
    const url = prompt('Enter URL');
    if (url) exec('createLink', url);
  };

  const insertImage = () => {
    const url = prompt('Enter image URL');
    if (url) exec('insertImage', url);
  };

  const onUploadImage = async (file: File) => {
    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result as string;
      exec('insertImage', dataUrl);
      // Optionally apply a default width via wrapping span style
      if (editorRef.current) {
        // No-op; images inserted will render; user can resize in browser via drag if supported
      }
    };
    reader.readAsDataURL(file);
  };

  const insertEmoji = (emoji: string) => {
    exec('insertText', emoji);
  };

  const applyHeading = (level: 1 | 2) => {
    exec('formatBlock', `H${level}`);
  };

  return (
    <div className="border rounded-md">
      <div className="flex flex-wrap items-center gap-2 p-2 border-b bg-gray-50">
        <button className="p-1 hover:bg-gray-100 rounded" type="button" onClick={() => exec('bold')} title="Bold">
          <Bold className="w-4 h-4" />
        </button>
        <button className="p-1 hover:bg-gray-100 rounded" type="button" onClick={() => exec('italic')} title="Italic">
          <Italic className="w-4 h-4" />
        </button>
        <button className="p-1 hover:bg-gray-100 rounded" type="button" onClick={() => exec('underline')} title="Underline">
          <Underline className="w-4 h-4" />
        </button>
        <button className="p-1 hover:bg-gray-100 rounded" type="button" onClick={() => exec('insertUnorderedList')} title="Bulleted list">
          <List className="w-4 h-4" />
        </button>
        <button className="p-1 hover:bg-gray-100 rounded" type="button" onClick={() => exec('insertOrderedList')} title="Numbered list">
          <ListOrdered className="w-4 h-4" />
        </button>
        <button className="p-1 hover:bg-gray-100 rounded" type="button" onClick={insertLink} title="Insert link">
          <LinkIcon className="w-4 h-4" />
        </button>
        <button className="p-1 hover:bg-gray-100 rounded" type="button" onClick={insertImage} title="Insert image from URL">
          <ImageIcon className="w-4 h-4" />
        </button>
        <label className="p-1 hover:bg-gray-100 rounded cursor-pointer text-xs font-medium border px-2">
          Upload
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) onUploadImage(f);
              e.currentTarget.value = '';
            }}
          />
        </label>
        <button className="p-1 hover:bg-gray-100 rounded" type="button" onClick={() => applyHeading(1)} title="Heading 1">
          <Heading1 className="w-4 h-4" />
        </button>
        <button className="p-1 hover:bg-gray-100 rounded" type="button" onClick={() => applyHeading(2)} title="Heading 2">
          <Heading2 className="w-4 h-4" />
        </button>
        <div className="relative">
          <div className="flex items-center gap-1">
            <Smile className="w-4 h-4 text-gray-600" />
            {emojis.map((e) => (
              <button key={e} type="button" className="text-base leading-none" onClick={() => insertEmoji(e)} aria-label={`Insert ${e}`}>
                {e}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div
        ref={editorRef}
        className="min-h-48 max-h-[50vh] overflow-y-auto p-3 outline-none"
        contentEditable
        onInput={() => editorRef.current && onChange(editorRef.current.innerHTML)}
        suppressContentEditableWarning
      />
    </div>
  );
}


