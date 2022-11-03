import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import LogoutButton from './components/LogoutButton'
import NewBlogForm from './components/NewBlogForm'
import blogService from './services/blogs'
import loginService from './services/login'

let notificationTimeoutId = null

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [notificationStyle, setNotificationStyle] = useState('notification')

  const createNotification = (message, style = 'notification', timeout = 6000) => {
    //clear possible old timeout so it doesn't set this new notification to null prematurely
    if (notificationTimeoutId != null) {
      clearTimeout(notificationTimeoutId)
    }

    setNotificationMessage(message)
    setNotificationStyle(style)

    notificationTimeoutId = setTimeout(() => {
      setNotificationMessage(null)
    }, timeout)
  }

  const updateBlogList = async () => {
    const blogList = await blogService.getAll()
    setBlogs(blogList)
  }

  useEffect(() => {
    updateBlogList()
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')

    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })

      blogService.setToken(user.token)
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      setUser(user)
      setUsername('')
      setPassword('')
      setNotificationMessage(null)
    }
    catch (exception) {
      createNotification('wrong username or password', 'error')
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedUser')
    blogService.setToken(null)
    setUser(null)
  }

  if (user !== null) {
    return (
      <div>
        <h2>blogs</h2>
        <Notification message={notificationMessage} style={notificationStyle} />
        <p>{user.name} logged in <LogoutButton handleLogout={handleLogout} /></p>

        <h2>create new</h2>
        <NewBlogForm createNotification={createNotification} blogService={blogService} updateBlogList={updateBlogList} />

        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
      </div>
    )
  }

  return (
    <div>
      <h1>Log in to application</h1>
      <Notification message={notificationMessage} style={notificationStyle} />
      <LoginForm username={username} password={password} setUsername={setUsername} setPassword={setPassword} handleLogin={handleLogin} />

    </div>
  )
}

export default App
