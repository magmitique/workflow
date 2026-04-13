import { markdownToHtml } from '@/lib/markdown';

interface ArticleContentProps {
  content: string;
}

/** Strip the first `# heading` from markdown to avoid duplicating the page H1. */
function stripFirstH1(markdown: string): string {
  return markdown.replace(/^#\s+.+\r?\n+/, '');
}

export function ArticleContent({ content }: ArticleContentProps) {
  const html = markdownToHtml(stripFirstH1(content));

  return <div className="prose prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: html }} />;
}
