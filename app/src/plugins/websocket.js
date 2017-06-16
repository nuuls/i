/* global WebSocket */
import EventEmitter from 'events'
export default class websocket extends EventEmitter {
  install (vue, options) {
    var ws = new WebSocket(options.url)
    ws.onmessage = (msg) => {
      console.log(msg)
      this.emit('event', JSON.parse(msg.data))
    }
    vue.prototype.$websocket = this
  }
}
