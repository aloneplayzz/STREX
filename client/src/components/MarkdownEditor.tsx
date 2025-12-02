import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Bold, Italic, List, Code, Link2, Heading2 } from 'lucide-react';

interface MarkdownEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function MarkdownEditor({ value, onChange, placeholder }: MarkdownEditorProps) {
  const insertMarkdown = (before: string, after: string = '') => {
    const textarea = document.querySelector('textarea[data-testid="textarea-markdown"]') as HTMLTextAreaElement;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selected = value.substring(start, end);
    const newValue = value.substring(0, start) + before + selected + after + value.substring(end);
    onChange(newValue);

    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + before.length, start + before.length + selected.length);
    }, 0);
  };

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap gap-1">
        <Button
          size="sm"
          variant="outline"
          onClick={() => insertMarkdown('**', '**')}
          title="Bold"
          data-testid="button-bold"
        >
          <Bold className="w-4 h-4" />
        </Button>
        <Button
          size="sm"
          variant="outline"
          onClick={() => insertMarkdown('*', '*')}
          title="Italic"
          data-testid="button-italic"
        >
          <Italic className="w-4 h-4" />
        </Button>
        <Button
          size="sm"
          variant="outline"
          onClick={() => insertMarkdown('# ', '')}
          title="Heading"
          data-testid="button-heading"
        >
          <Heading2 className="w-4 h-4" />
        </Button>
        <Button
          size="sm"
          variant="outline"
          onClick={() => insertMarkdown('- ', '')}
          title="List"
          data-testid="button-list"
        >
          <List className="w-4 h-4" />
        </Button>
        <Button
          size="sm"
          variant="outline"
          onClick={() => insertMarkdown('`', '`')}
          title="Code"
          data-testid="button-code"
        >
          <Code className="w-4 h-4" />
        </Button>
        <Button
          size="sm"
          variant="outline"
          onClick={() => insertMarkdown('[', '](url)')}
          title="Link"
          data-testid="button-link"
        >
          <Link2 className="w-4 h-4" />
        </Button>
      </div>
      <Textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="min-h-40 font-mono text-sm"
        data-testid="textarea-markdown"
      />
      <div className="text-xs text-muted-foreground">
        <p>**bold** | *italic* | # heading | - list | `code` | [link](url)</p>
      </div>
    </div>
  );
}
