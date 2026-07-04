export const addEllipses = (text: string) => {
  const maxLength = 49
  const ellipsesTxt =
    text.length > maxLength ? text.slice(0, maxLength) + '...' : text + '...'
  return ellipsesTxt + '\n'
}
