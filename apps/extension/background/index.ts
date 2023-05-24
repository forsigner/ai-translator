import { sendToContentScript } from '@plasmohq/messaging'

chrome.action.onClicked.addListener(() => {
  console.log('chrome.action.onClicked')

  sendToContentScript({
    name: 'EXTNEION_ICON_CLICK',
  })
})

export {}
