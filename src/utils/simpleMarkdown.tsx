import { Fragment, ReactNode } from 'react';

/**
 * Renders a small, safe subset of inline Markdown as React elements (never as
 * HTML, so admin-written text can't inject markup):
 * **bold**, *italic* or _italic_, `code` and [text](https://link).
 * Only http(s) and mailto links become links; anything else stays text.
 * Line breaks are left to the container (white-space: pre-line).
 */
const INLINE_PATTERN =
  /\*\*(.+?)\*\*|`([^`]+)`|\[([^\]]+)\]\(([^)\s]+)\)|\*([^*\s][^*]*?)\*|(?<![\p{L}\p{N}])_([^_\s][^_]*?)_(?![\p{L}\p{N}])/gu;

const SAFE_URL = /^(https?:\/\/|mailto:)/i;

export const renderSimpleMarkdown = (text: string): ReactNode[] => {
  const nodes: ReactNode[] = [];
  let lastIndex = 0;

  for (const match of text.matchAll(INLINE_PATTERN)) {
    const [whole, bold, code, linkText, linkUrl, starItalic, underscoreItalic] =
      match;
    const index = match.index ?? 0;
    if (index > lastIndex) nodes.push(text.slice(lastIndex, index));

    const key = index;
    if (bold !== undefined) {
      nodes.push(<strong key={key}>{renderSimpleMarkdown(bold)}</strong>);
    } else if (code !== undefined) {
      nodes.push(<code key={key}>{code}</code>);
    } else if (linkText !== undefined) {
      nodes.push(
        SAFE_URL.test(linkUrl) ? (
          <a key={key} href={linkUrl} target="_blank" rel="noopener noreferrer">
            {renderSimpleMarkdown(linkText)}
          </a>
        ) : (
          <Fragment key={key}>{whole}</Fragment>
        ),
      );
    } else {
      nodes.push(
        <em key={key}>
          {renderSimpleMarkdown(starItalic ?? underscoreItalic)}
        </em>,
      );
    }
    lastIndex = index + whole.length;
  }

  if (lastIndex < text.length) nodes.push(text.slice(lastIndex));
  return nodes;
};
