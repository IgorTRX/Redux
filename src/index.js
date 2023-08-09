import React, { useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import configureStore from './store/store'
import {
  titleChanged,
  taskDeleted,
  completeTask,
  loadTasks,
  getTasks,
  getTasksLoadingStatus,
} from './store/task'
import { Provider, useDispatch, useSelector } from 'react-redux'
import { getErrors } from './store/errors'

const store = configureStore()

const App = (params) => {
  const state = useSelector(getTasks())
  const isLoading = useSelector(getTasksLoadingStatus())
  const error = useSelector(getErrors())

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(loadTasks())
  }, []) // eslint-disable-line

  const changeTitle = (taskId) => {
    dispatch(titleChanged(taskId))
  }

  const deleteTask = (taskId) => {
    dispatch(taskDeleted(taskId))
  }

  if (isLoading) {
    return <p>Loading...</p>
  }

  if (error) {
    return <p>{error}</p>
  }

  return (
    <>
      <h1>App</h1>
      <ul>
        {state.map((elem) => (
          <li key={elem.id}>
            <p>{elem.title}</p>
            <p>{`Completed: ${elem.completed}`}</p>
            <button onClick={() => dispatch(completeTask(elem.id))}>
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
  // <React.StrictMode>
  <Provider store={store}>
    <App />
  </Provider>
  // </React.StrictMode>
)
