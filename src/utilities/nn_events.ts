export default () => {
  return {
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
    remove(event: any, cb: any) {
      if (!this.events[event]) return console.log('event does not exist');
      this.events[event] = this.events[event].filter((i: any) => i.name !== cb.name);
    },
  };
};
// export default () => {
//   let events: { [key: string]: Function[] } = {};

//   const emit = (event: any, ...args: any) => {
//     return (events[event] || []).map((callback) => callback(...args));
//   };

//   const on = (event: any, cb: any) => {
//     const newEvents = { ...events };
//     newEvents[event] = [...(newEvents[event] || []), cb];
//     return newEvents;
//   };

//   const remove = (event: any, cb: any) => {
//     if (!events[event]) return events;
//     const newEvents = { ...events };
//     newEvents[event] = newEvents[event].filter((i) => i.name !== cb.name);
//     return newEvents;
//   };

//   return {
//     emit,
//     on,
//     remove,
//   };
// };
