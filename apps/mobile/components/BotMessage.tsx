import React from 'react'
import { StyleSheet } from 'react-native'
import { Avatar, Day, utils, MessageProps, IMessage, DayProps } from 'react-native-gifted-chat'
import { MessageBubble } from './MessageBubble'
import { View } from '@fower/react-native'

const { isSameUser, isSameDay } = utils

export function BotMessage(props: MessageProps<IMessage>) {
  const isSelf = props.user._id === props.currentMessage?.user._id
  const position = isSelf ? 'right' : 'left'

  const getInnerComponentProps = () => {
    return {
      ...props,
      position,
      isSameUser,
      isSameDay,
    } as any
  }

  const renderDay = () => {
    if (props.currentMessage?.createdAt) {
      const dayProps: DayProps<IMessage> = getInnerComponentProps()
      if (props.renderDay) {
        return props.renderDay(dayProps)
      }
      return <Day {...dayProps} />
    }
    return null
  }

  const renderBubble = () => {
    const bubbleProps = getInnerComponentProps()
    return <MessageBubble {...bubbleProps} />
  }

  const renderAvatar = () => {
    let extraStyle
    if (
      isSameUser(props.currentMessage!, props.previousMessage) &&
      isSameDay(props.currentMessage!, props.previousMessage)
    ) {
      // Set the invisible avatar height to 0, but keep the width, padding, etc.
      extraStyle = { height: 0 }
    }

    const avatarProps = getInnerComponentProps()
    return (
      <Avatar
        {...avatarProps}
        imageStyle={{
          left: [styles.avatar, avatarProps.imageStyle, extraStyle],
        }}
      />
    )
  }

  const marginBottom = isSameUser(props.currentMessage!, props.nextMessage) ? 2 : 10

  return (
    <View px4>
      {renderDay()}
      <View row toCenterY toLeft={!isSelf} toRight={isSelf}>
        {/* {renderAvatar()} */}
        {renderBubble()}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  avatar: {
    height: 40,
    width: 40,
    borderRadius: 3,
  },
})
