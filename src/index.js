import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom/client'
import { createStore } from './store/createStore'
import { taskReducer } from './store/taskReducer'
import * as actions from './store/actionTypes'

const initialState = [
  { id: 1, title: 'Task 1', completed: false },
  { id: 2, title: 'Task 2', completed: false },
]

const store = createStore(taskReducer, initialState)

const App = (params) => {
  const [state, setState] = useState(store.getState())

  useEffect(() => {
    store.subscribe(() => {
      setState(store.getState())
    })
  }, [])

  const completeTask = (taskId) => {
    store.dispatch({
      type: actions.taskUpdate,
      payload: { id: taskId, completed: true },
    })
  }

  const changeTitle = (taskId) => {
    store.dispatch({
      type: actions.taskUpdate,
      payload: { id: taskId, title: `New title for ${taskId}` },
    })
  }

  return (
    <>
      <h1>App</h1>
      <ul>
        {state.map((elem) => (
          <li key={elem.id}>
            <p>{elem.title}</p>
            <p>{`Completed: ${elem.completed}`}</p>
            <button onClick={() => completeTask(elem.id)}>Complete</button>
            <button onClick={() => changeTitle(elem.id)}>Change Title</button>

            <hr />
          </li>
        ))}
      </ul>
    </>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
