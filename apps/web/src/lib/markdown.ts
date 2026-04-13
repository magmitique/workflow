function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export function markdownToHtml(md: string): string {
  let html = md;

  // Code blocks (```lang ... ```)
  html = html.replace(/```(\w*)\n([\s\S]*?)```/g, (_match, _lang: string, code: string) => {
    return `<pre><code>${escapeHtml(code.trimEnd())}</code></pre>`;
  });

  // Inline code
  html = html.replace(/`([^`]+)`/g, '<code>$1</code>');

  // Images
  html = html.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" loading="lazy" />');

  // Links
  html = html.replace(
    /\[([^\]]+)\]\(([^)]+)\)/g,
    '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>'
  );

  // Headings
  html = html.replace(/^#### (.+)$/gm, '<h4>$1</h4>');
  html = html.replace(/^### (.+)$/gm, '<h3>$1</h3>');
  html = html.replace(/^## (.+)$/gm, '<h2>$1</h2>');
  html = html.replace(/^# (.+)$/gm, '<h1>$1</h1>');

  // Bold and italic
  html = html.replace(/\*\*\*(.+?)\*\*\*/g, '<strong><em>$1</em></strong>');
  html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  html = html.replace(/\*(.+?)\*/g, '<em>$1</em>');

  // Horizontal rule
  html = html.replace(/^---$/gm, '<hr />');

  // Unordered lists
  html = html.replace(/^(?:- (.+)\n?)+/gm, (match) => {
    const items = match
      .trim()
      .split('\n')
      .map((line) => `<li>${line.replace(/^- /, '')}</li>`)
      .join('');
    return `<ul>${items}</ul>`;
  });

  // Ordered lists
  html = html.replace(/^(?:\d+\. (.+)\n?)+/gm, (match) => {
    const items = match
      .trim()
      .split('\n')
      .map((line) => `<li>${line.replace(/^\d+\. /, '')}</li>`)
      .join('');
    return `<ol>${items}</ol>`;
  });

  // Blockquotes
  html = html.replace(/^> (.+)$/gm, '<blockquote><p>$1</p></blockquote>');

  // Paragraphs (lines not already wrapped in HTML tags)
  html = html
    .split('\n\n')
    .map((block) => {
      const trimmed = block.trim();
      if (!trimmed) return '';
      if (/^</.test(trimmed)) return trimmed;
      return `<p>${trimmed.replace(/\n/g, '<br />')}</p>`;
    })
    .join('\n');

  return html;
}
