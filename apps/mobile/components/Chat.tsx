import { useBotContext, useMessages } from '@ai-translator/bot'
import React, { useState, useCallback, useEffect } from 'react'
import { GiftedChat, IChatMessage, MessageProps } from 'react-native-gifted-chat'
import { BotMessage } from './BotMessage'

export function Chat() {
  const bot = useBotContext()
  const { chatMessages } = useMessages()

  const onSend = useCallback(async (messages: IChatMessage[] = []) => {
    await bot.sendMessage(messages[0].text)
    bot.updateText('')
  }, [])

  const renderMessage = (props: MessageProps<IChatMessage>) => {
    return <BotMessage {...props} />
  }

  return (
    <GiftedChat
      renderMessage={renderMessage}
      messages={chatMessages}
      onInputTextChanged={(text) => {
        if (text) bot.updateText(text)
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
