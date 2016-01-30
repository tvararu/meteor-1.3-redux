import { createStore } from 'redux'
const Posts = window.Posts = new Meteor.Collection('posts')

const reducer = (state = [], action) => {
  switch (action.type) {
    case 'POSTS_ADD':
      return [
        ...state,
        action.payload.post
      ]

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
  posts: function () {
    return store.getState()
  }
})

Template.root.events({
  'click .create-post': function (e, t) {
    const title = t.find('.title-field').value
    const body = t.find('.body-field').value
    store.dispatch({ type: 'POSTS_ADD', payload: {
      post: {title, body},
      last: true
    }})
  }
})

Posts.find().observe({
  addedAt (doc, atIndex, before) {
    console.log('addedAt', doc, atIndex, before)
    store.dispatch({ type: 'POSTS_ADD', payload: {
      post: doc,
      atIndex: atIndex,
      last: !!before
    }})
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
