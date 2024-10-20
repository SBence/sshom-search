export function toLocaleDate(dateString: string) {
  const date = new Date(dateString);
  return date.toLocaleString();
}
