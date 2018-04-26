export function slice(str, beginIndex, endIndex, prefix) {
  if (!str) return str
  if (prefix) {
    return str.split(prefix).slice(beginIndex, endIndex).join(prefix)
  } else {
    return str.slice(beginIndex, endIndex)
  }
}
