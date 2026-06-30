import type { ContentBlock } from './getBlogPosts';

export function calcReadingTime(blocks: ContentBlock[]): number {
  const words = blocks.reduce((count, block) => {
    if (block.type === 'p' || block.type === 'h2') {
      return count + block.text.split(/\s+/).filter(Boolean).length;
    }
    if (block.type === 'ul') {
      return count + block.items.join(' ').split(/\s+/).filter(Boolean).length;
    }
    return count;
  }, 0);
  return Math.max(1, Math.round(words / 200));
}
