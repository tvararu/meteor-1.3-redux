import { createStore } from 'redux'

const reducer = (state = 0, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1

    default:
      return state
  }
}

const store = window.store = createStore(reducer)

store.subscribe(() => {
  console.log(store.getState())
})

store.dispatch({ type: 'INCREMENT' })
store.dispatch({ type: 'INCREMENT' })
store.dispatch({ type: 'INCREMENT' })

Session.setDefault('counter', 0)

Template.hello.helpers({
  counter: function () {
    return Session.get('counter')
  }
})

Template.hello.events({
  'click button': function () {
    Session.set('counter', Session.get('counter') + 1)
  }
})
