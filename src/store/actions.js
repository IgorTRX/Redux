import * as actionTypes from './actionTypes'

export function taskComplete(id) {
  return {
    type: actionTypes.taskUpdate,
    payload: { id, completed: true },
  }
}
export function titleChange(id) {
  return {
    type: actionTypes.taskUpdate,
    payload: { id, title: `New title for ${id}` },
  }
}
