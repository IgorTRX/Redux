import { taskUpdated, taskDeleted } from './actionTypes'

export function taskReducer(state, action) {
  switch (action.type) {
    case taskUpdated:
      const newArray = [...state]
      const elementIndex = newArray.findIndex(
        (elem) => elem.id === action.payload.id
      )
      newArray[elementIndex] = { ...newArray[elementIndex], ...action.payload }
      return newArray

    case taskDeleted: {
      return state.filter((elem) => elem.id !== action.payload.id)
    }

    default:
      return state
  }
}
