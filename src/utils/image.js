// Convert Base64 to URL
export const base64ToUrl = (base64) => {
  const base64Arr = base64.split(',')
  const type = base64Arr[0].match(/:(.*?);/)[1]
  const str = atob(base64Arr[1])
  let n = str.length
  const u8arr = new Uint8Array(n)
  while (n--) {
    u8arr[n] = str.charCodeAt(n)
  }
  return `data:${type};base64,${btoa(u8arr)}`
}
