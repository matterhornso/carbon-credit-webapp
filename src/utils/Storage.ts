export const setLocalItem = (key: any, value: any) => {
  localStorage.setItem(key, JSON.stringify(value))
  return true
}

export const getLocalItem = (key: any) => {
  const item = localStorage.getItem(key)
  if (item) {
    return JSON.parse(item)
  }
}

export const removeItem = (key: any) => {
  return new Promise((resolve, reject) => {
    if (!key || typeof key !== 'string') {
      reject('provide proper key type')
    }
    resolve(localStorage.removeItem(key))
  })
}

export const removeAllItem = () => {
  localStorage.clear()
}

export const setLocalItemForAi = (key: any, value: any) => {
  localStorage.setItem(key, JSON.stringify(value))
  const event = new CustomEvent('showAIChanged', { detail: value })
  window.dispatchEvent(event) // Dispatch the custom event
  return true
}
