export function getLinesPerTableLink(linkCount: number, maxLines: number) {
  if (linkCount <= 0) return maxLines;
  const linesPerLink = Math.floor(maxLines / linkCount);
  return linesPerLink ? linesPerLink : 1;
}
