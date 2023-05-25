import React, {
  FC,
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react'
import { mutate } from 'stook'
import { Chat } from './domains/chat.domain'

export const chatContext = createContext<Chat>({} as Chat)

interface ChatProviderProps {
  clearMessagesWhenInitialized?: boolean
}

export const ChatProvider: FC<PropsWithChildren<ChatProviderProps>> = ({
  children,
  clearMessagesWhenInitialized = false,
}) => {
  const { Provider } = chatContext
  const chatRef = useRef<Chat>()
  const [inited, forceUpdate] = useState(false)

  useEffect(() => {
    Chat.create(clearMessagesWhenInitialized).then((chat) => {
      chatRef.current = chat
      mutate('AI_TRANSLATOR_CHAT', chatRef.current)
      forceUpdate(true)
    })
  }, [clearMessagesWhenInitialized])

  if (!chatRef.current || !inited) return null

  return <Provider value={chatRef.current}>{children}</Provider>
}

export function useChatContext() {
  return useContext(chatContext)
}
