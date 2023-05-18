import React from 'react'
import { View } from '@fower/react-native'
import { Text, StyleSheet, TouchableOpacity, Platform } from 'react-native'
import {
  MessageText,
  MessageImage,
  Time,
  utils,
  MessageProps,
  IMessage,
} from 'react-native-gifted-chat'
import { Streaming } from './Streaming'

const { isSameUser, isSameDay } = utils

export const MessageBubble = (props: MessageProps<IMessage>) => {
  const currentMessage = props.currentMessage!
  const onLongPress = () => {
    // TODO:
  }

  const renderMessageText = () => {
    if ((currentMessage as any).streaming) {
      return <Streaming />
    }

    const { containerStyle, ...messageTextProps } = props

    return (
      <MessageText
        {...messageTextProps}
        textStyle={{
          left: [
            styles.standardFont,
            styles.slackMessageText,
            {
              lineHeight: 24,
            },
          ],
          right: [
            {
              lineHeight: 24,
            },
          ],
        }}
      />
    )
  }

  const renderMessageImage = () => {
    if (currentMessage.image) {
      const { containerStyle, ...messageImageProps } = props
      return <MessageImage {...messageImageProps} imageStyle={[styles.slackImage]} />
    }
    return null
  }

  const renderTicks = () => {
    const currentMessage = props.currentMessage!

    if (currentMessage.user._id !== props.user._id) {
      return null
    }

    if (currentMessage.sent || currentMessage.received) {
      return (
        <View style={[styles.headerItem, styles.tickView]}>
          {currentMessage.sent && <Text style={[styles.standardFont, styles.tick]}>✓</Text>}
          {currentMessage.received && <Text style={[styles.standardFont, styles.tick]}>✓</Text>}
        </View>
      )
    }
    return null
  }

  const renderUsername = () => {
    const username = props.currentMessage!.user.name
    if (username) {
      const { containerStyle, ...usernameProps } = props
      return (
        <Text style={[styles.standardFont, styles.headerItem, styles.username]}>{username}</Text>
      )
    }
    return null
  }

  const renderTime = () => {
    if (props.currentMessage!.createdAt) {
      const { containerStyle, ...timeProps } = props
      return <Time {...timeProps} containerStyle={{ left: [styles.timeContainer] }} />
    }
    return null
  }

  const isSameThread =
    isSameUser(currentMessage, props.previousMessage) &&
    isSameDay(currentMessage, props.previousMessage)

  const messageHeader = isSameThread ? null : (
    <View style={styles.headerView}>
      {/* {renderUsername()} */}
      {renderTime()}
      {renderTicks()}
    </View>
  )

  const isLeft = props.position === 'left'

  return (
    <View roundedXL px2 py1 mb2 bgGray100={isLeft} bgBrand500={!isLeft}>
      <TouchableOpacity onLongPress={onLongPress}>
        <View>
          <View>
            {renderMessageImage()}
            {renderMessageText()}
            {messageHeader}
          </View>
        </View>
      </TouchableOpacity>
    </View>
  )
}

// Note: Everything is forced to be "left" positioned with this component.
// The "right" position is only used in the default Bubble.

const styles = StyleSheet.create({
  standardFont: {
    fontSize: 15,
  },
  slackMessageText: {
    marginLeft: 0,
    marginRight: 0,
  },
  username: {
    fontWeight: 'bold',
  },
  time: {
    textAlign: 'left',
    fontSize: 12,
  },
  timeContainer: {
    marginLeft: 0,
    marginRight: 0,
    marginBottom: 0,
  },
  headerItem: {
    marginRight: 10,
  },
  headerView: {
    // Try to align it better with the avatar on Android.
    marginTop: Platform.OS === 'android' ? -2 : 0,
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  tick: {
    backgroundColor: 'transparent',
    color: 'white',
  },
  tickView: {
    flexDirection: 'row',
  },
  slackImage: {
    borderRadius: 3,
    marginLeft: 0,
    marginRight: 0,
  },
})
