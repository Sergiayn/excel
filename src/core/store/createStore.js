export function createStore(rootReducer, initialState = {}) {
  let state = rootReducer({...initialState}, {type: '__INIT__'})
  let listeners = []
  return {
    subscribe(fn) {
      listeners.push(fn)
      return {
        unsubscribe() {
          listeners = listeners.filter((listener) => listener !== fn)
        }
      }
    },
    dispatch(action) {
      state = rootReducer(state, action)
      if ('object' === typeof listeners && Object.keys(listeners).length) {
        listeners.forEach((listener) => listener(state))
      }
    },
    getState() {
      return JSON.parse(JSON.stringify(state))
    },
  }
}
