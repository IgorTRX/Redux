import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom/client'
import configureStore from './store/store'
import { titleChanged, taskDeleted, completeTask } from './store/task'

const store = configureStore()

const App = (params) => {
  const [state, setState] = useState(store.getState())

  useEffect(() => {
    store.subscribe(() => {
      setState(store.getState())
    })
  }, [])

  const changeTitle = (taskId) => {
    store.dispatch(titleChanged(taskId))
  }

  const deleteTask = (taskId) => {
    store.dispatch(taskDeleted(taskId))
  }

  return (
    <>
      <h1>App</h1>
      <ul>
        {state.map((elem) => (
          <li key={elem.id}>
            <p>{elem.title}</p>
            <p>{`Completed: ${elem.completed}`}</p>
            <button onClick={() => store.dispatch(completeTask(elem.id))}>
              Complete
            </button>
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
