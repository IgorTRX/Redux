import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom/client'
import { initiateStore } from './store/store'
import * as actions from './store/actions'

const store = initiateStore()

const App = (params) => {
  const [state, setState] = useState(store.getState())

  useEffect(() => {
    store.subscribe(() => {
      setState(store.getState())
    })
  }, [])

  const completeTask = (taskId) => {
    store.dispatch(actions.taskComplete(taskId))
  }

  const changeTitle = (taskId) => {
    store.dispatch(actions.titleChange(taskId))
  }

  const deleteTask = (taskId) => {
    store.dispatch(actions.taskDelete(taskId))
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
            <button onClick={() => deleteTask(elem.id)}>Delete Task</button>
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
