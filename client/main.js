import { createStore } from 'redux'
const Posts = window.Posts = new Meteor.Collection('posts')

Posts.find().observe({
  addedAt (doc, atIndex, before) {
    console.log('addedAt', doc, atIndex, before)
  },
  changedAt (newDoc, oldDoc, atIndex) {
    console.log('changedAt', newDoc, oldDoc, atIndex)
  },
  removedAt (oldDoc, atIndex) {
    console.log('removedAt', oldDoc, atIndex)
  },
  movedTo (doc, fromIndex, toIndex, before) {
    console.log('movedTo', doc, fromIndex, toIndex, before)
  }
})

const reducer = (state = 0, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1

    default:
      return state
  }
}

const store = window.store = createStore(reducer)

let template = null
const render = () => {
  if (template) {
    Blaze.remove(template)
  }
  template = Blaze.render(Template.root, document.body)
}

store.subscribe(() => {
  render()
})

Meteor.startup(() => {
  render()
})

Template.root.helpers({
  counter: function () {
    return store.getState()
  }
})

Template.root.events({
  'click button': function () {
    store.dispatch({ type: 'INCREMENT' })
  }
})
