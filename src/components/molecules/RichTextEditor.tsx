'use client';

import dynamic from 'next/dynamic';
import 'react-quill-new/dist/quill.snow.css';

const ReactQuill = dynamic(() => import('react-quill-new'), {
  ssr: false,
  loading: () => <div className="h-[400px] w-full animate-pulse bg-input rounded-xl border border-border" />
});

interface RichTextEditorProps {
  value: string;
  onChange: (content: string) => void;
  placeholder?: string;
}

const modules = {
  toolbar: [
    [{ header: [1, 2, 3, false] }],
    ['bold', 'italic', 'underline', 'strike'],
    [{ list: 'ordered' }, { list: 'bullet' }],
    ['blockquote', 'code-block'],
    ['link'],
    ['clean'],
  ],
};

const formats = [
  'header',
  'bold', 'italic', 'underline', 'strike',
  'list', 'bullet',
  'blockquote', 'code-block',
  'link',
];

export default function RichTextEditor({ value, onChange, placeholder }: RichTextEditorProps) {
  return (
    <div className="rich-text-editor-wrapper">
      <style jsx global>{`
        .ql-container.ql-snow {
          border: none !important;
          font-family: inherit !important;
          font-size: 0.875rem !important;
        }
        .ql-toolbar.ql-snow {
          border: none !important;
          border-bottom: 1px solid var(--border) !important;
          background: rgba(255, 255, 255, 0.02) !important;
          border-radius: 12px 12px 0 0 !important;
          padding: 8px 12px !important;
        }
        .ql-editor {
          min-height: 350px !important;
          color: var(--foreground) !important;
          line-height: 1.6 !important;
          padding: 1.25rem !important;
        }
        .ql-editor.ql-blank::before {
          color: var(--muted-foreground) !important;
          font-style: normal !important;
          left: 1.25rem !important;
        }
        .ql-snow .ql-stroke {
          stroke: var(--muted-foreground) !important;
        }
        .ql-snow .ql-fill {
          fill: var(--muted-foreground) !important;
        }
        .ql-snow .ql-picker {
          color: var(--muted-foreground) !important;
        }
        .ql-snow.ql-toolbar button:hover .ql-stroke,
        .ql-snow.ql-toolbar button:hover .ql-fill,
        .ql-snow.ql-toolbar button.ql-active .ql-stroke,
        .ql-snow.ql-toolbar button.ql-active .ql-fill {
          stroke: var(--indigo-500) !important;
          fill: var(--indigo-500) !important;
        }
        .ql-snow.ql-toolbar .ql-picker-label:hover,
        .ql-snow.ql-toolbar .ql-picker-label.ql-active {
          color: var(--indigo-500) !important;
        }
        .ql-snow .ql-picker-options {
          background-color: var(--card) !important;
          border: 1px solid var(--border) !important;
          border-radius: 8px !important;
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1) !important;
        }
      `}</style>
      <div className="w-full bg-input border border-border rounded-xl overflow-hidden focus-within:ring-4 focus-within:ring-indigo-500/10 focus-within:border-indigo-500 transition-all">
        <ReactQuill
          theme="snow"
          value={value}
          onChange={onChange}
          modules={modules}
          formats={formats}
          placeholder={placeholder}
        />
      </div>
    </div>
  );
}
