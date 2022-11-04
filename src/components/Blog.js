import { useState } from 'react'

const Blog = ({ blog }) => {
  const [visible, setVisible] = useState(false)

  const showWhenVisible = { display: visible ? '' : 'none' }
  const buttonLabel = visible ? 'hide' : 'view'

  const blogListStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    paddingBottom: 1,
    border: 'solid',
    borderWidth: 1.5,
    marginBottom: 5
  }
  const blogNameStyle = {
    fontWeight: 550,
    display: 'inline',
    cursor: 'pointer'
  }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  return (
    <div style={blogListStyle}>
      <div style={blogNameStyle} onClick={toggleVisibility}>{blog.title}</div> by {blog.author} <button onClick={toggleVisibility}>{buttonLabel}</button>
      <div style={showWhenVisible}>
        {blog.url}
        <br/>
        {blog.likes}
        <br/>
        {blog.user ? blog.user.name : 'Unknown user'}
      </div>
    </div>
  )
}
export default Blog