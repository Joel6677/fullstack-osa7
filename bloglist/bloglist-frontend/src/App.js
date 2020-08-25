import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import NewBlog from './components/NewBlog'
import { useDispatch, useSelector } from 'react-redux'
import {setNotification} from './reducers/notificationReducer'
import storage from './utils/storage'
import { initializeBlogs, createBlog } from './reducers/blogReducer'
import { initializeUsers} from './reducers/userReducer'
import {login, logout, loggedUser} from './reducers/loginReducer'
import Blogs from './components/Blogs'
import {Switch, Route} from 'react-router-dom'
import User from './components/User'
import Users from './components/Users'
import NavBar from './components/NavBar'
const App = () => {
  const dispatch = useDispatch()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const user = useSelector(state => state.login)

  const blogFormRef = React.createRef()

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  useEffect(() => {
    dispatch(initializeUsers())
  }, [dispatch])

  useEffect(() => {
    const user = storage.loadUser()
    dispatch(loggedUser(user))
  }, [dispatch])


  const handleLogin = async (event) => {
    event.preventDefault()

    dispatch(login(username, password))

    setUsername('')
    setPassword('')
  }


  const addBlog = (newBlog) => {
    try {
      blogFormRef.current.toggleVisibility()
      dispatch(createBlog(newBlog))
      dispatch(setNotification(`a new blog ${newBlog.title} by ${newBlog.author}`, 5, 'success'))
    } catch(exception) {
      console.log(exception)
    }
  }

  const handleLogout = () => { 
    dispatch(logout())
  }

  if ( !user ) {
    return (
      <div className="container">
        <h2>login to application</h2>

        <Notification/>

        <form onSubmit={handleLogin}>
          <div>
            username
            <input
              id='username'
              value={username}
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
            <input
              id='password'
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button id='login'>login</button>
        </form>
      </div>
    )
  }


  return (
    <div className="container">
      <NavBar/>
      <h2>blogs</h2>
      <p>
        {user.name} logged in <button onClick={handleLogout}>logout</button>
      </p>
      <Switch>
        <Route path='/blogs/:id'>
          <Blog />
        </Route>
        <Route path='/users/:id'>
          <User />
        </Route>
        <Route path='/users'>
          <Users />
        </Route>
        <Route path='/'>
          <Notification/>
          <Togglable buttonLabel='create new blog' ref={blogFormRef}>
            <NewBlog createBlog={addBlog} />
          </Togglable>
          <Blogs/>
        </Route>
      </Switch>
    </div>
  )
}

export default App