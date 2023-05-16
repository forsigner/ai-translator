import mitt from 'mitt'

type Events = {
  UPDATE_MESSAGE_STREAMING: boolean
  UPDATE_MESSAGE_CONTENT: any
}

export class Message {
  emitter = mitt<Events>()

  content: any

  streaming: boolean

  updateStreaming(streaming: boolean) {
    this.streaming = streaming
    this.emitter.emit('UPDATE_MESSAGE_STREAMING', streaming)
  }

  updateContent(content: any) {
    this.content = content

    this.emitter.emit('UPDATE_MESSAGE_CONTENT', content)
  }
}
