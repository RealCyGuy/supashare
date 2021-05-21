export function formatSize(bytes) {
  if (bytes < 1000000) {
    return Math.round((bytes / 1000) * 100) / 100 + "kB";
  } else {
    return Math.round((bytes / 1000000) * 100) / 100 + "MB";
  }
}
