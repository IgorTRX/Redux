import { legacy_createStore as createStore } from 'redux'
import { taskReducer } from './tasks/reducer'

const initialState = [
  { id: 1, title: 'Task 1', completed: false },
  { id: 2, title: 'Task 2', completed: false },
]

function configureStore() {
  return createStore(taskReducer, initialState)
}

export default configureStore
