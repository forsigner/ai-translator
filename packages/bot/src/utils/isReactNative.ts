export function isReactNative() {
  if (typeof navigator === 'object' && navigator.product === 'ReactNative') {
    return true
  } else {
    return false
  }
}
