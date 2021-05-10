export function formatUrl(url: string) {
  if (!url.startsWith('http') || !url.startsWith('https')) {
    return `https://${url}`.toLocaleLowerCase();
  } else {
    return url.toLocaleLowerCase();
  }
}
