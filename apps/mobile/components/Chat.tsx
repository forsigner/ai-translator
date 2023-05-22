import { useChatContext, useMessages } from '@ai-translator/chat'
import React, { useState, useCallback, useEffect } from 'react'
import { GiftedChat, IChatMessage, MessageProps } from 'react-native-gifted-chat'
import { BotMessage } from './BotMessage'

export function Chat() {
  const chat = useChatContext()
  const { chatMessages } = useMessages()

  const onSend = useCallback(async (messages: IChatMessage[] = []) => {
    await chat.sendMessage(messages[0].text)
    chat.updateText('')
  }, [])

  const renderMessage = (props: MessageProps<IChatMessage>) => {
    return <BotMessage {...props} />
  }

  return (
    <GiftedChat
      renderMessage={renderMessage}
      messages={chatMessages}
      onInputTextChanged={(text) => {
        if (text) chat.updateText(text)
      }}
      onSend={(messages) => {
        onSend(messages)
      }}
      user={{
        _id: 1,
      }}
    />
  )
}
