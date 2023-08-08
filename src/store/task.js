import { createAction, createSlice } from '@reduxjs/toolkit'
import todosService from '../services/todos.service'

const initialState = []

const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    resived(state, action) {
      return action.payload
    },
    update(state, action) {
      const elementIndex = state.findIndex(
        (elem) => elem.id === action.payload.id
      )
      state[elementIndex] = { ...state[elementIndex], ...action.payload }
    },
    remove(state, action) {
      return state.filter((elem) => elem.id !== action.payload.id)
    },
  },
})

const { actions, reducer: taskReducer } = taskSlice
const { update, remove, resived } = actions

const taskRequested = createAction('task/requested')
const taskRequestFailed = createAction('task/requestFailed')

export const getTasks = () => async (dispatch) => {
  dispatch(taskRequested())
  try {
    const data = await todosService.fetch()
    dispatch(resived(data))
  } catch (error) {
    dispatch(taskRequestFailed(error.message))
  }
}

export const completeTask = (id) => (dispatch) => {
  dispatch(update({ id, completed: true }))
}

export function titleChanged(id) {
  return update({ id, title: `New title for ${id}` })
}
export function taskDeleted(id) {
  return remove({ id })
}

export default taskReducer
