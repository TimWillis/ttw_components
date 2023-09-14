export default {
  events: {},
  emit(event: any, ...args: any) {
    for (let i of this.events[event] || []) {
      i(...args);
    }
  },
  on(event: any, cb: any) {
    (this.events[event] = this.events[event] || []).push(cb);
    return () => (this.events[event] = this.events[event].filter((i: any) => i !== cb));
  },
};
