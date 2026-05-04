export function isSupportedUploadFile(fileName: string) {
  const lowerName = fileName.toLowerCase();
  return lowerName.endsWith(".txt") || lowerName.endsWith(".md");
}

export function titleFromFileName(fileName: string) {
  return fileName.replace(/\.(txt|md)$/i, "") || "Untitled Document";
}

export function escapeHtml(input: string) {
  return input
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

export function plainTextToHtml(text: string) {
  return `<p>${escapeHtml(text).replaceAll("\n", "<br />")}</p>`;
}