export function formatKebabCase(propString: string) {
  return propString
    .replace(/-/g, " ")
    .replace(/^\w/, (char) => char.toUpperCase());
}
