export function navToOptions() {
  const { openOptionsPage, getURL } = chrome?.runtime

  if (openOptionsPage) {
    openOptionsPage()
  } else {
    window.open(getURL('options.html'))
  }
}
