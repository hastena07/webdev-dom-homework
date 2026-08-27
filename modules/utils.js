export function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;');
}

export function delay(interval = 300) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(), interval);
  });
}
