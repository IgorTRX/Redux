import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom/client'
import * as actions from './store/actionTypes'
import { initiateStore } from './store/store'

const store = initiateStore()

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
