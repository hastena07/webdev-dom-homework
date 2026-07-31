
export function escapeHtml(str) {
  if (!str) return "";
  return String(str)
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}
