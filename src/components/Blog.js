import { useState } from 'react'
import PropTypes from 'prop-types'

//not sure how to divide responsibilities between App and other components
//maybe handleLikeClick and handleDeleteClick should be moved to App to keep this as more of a view component?
//this works so keeping it for now
const Blog = ({ blog, updateBlog, deleteBlog }) => {
  const [visible, setVisible] = useState(false)
  // eslint-disable-next-line no-unused-vars
  const [likes, setLikes] = useState(null)

  const showWhenVisible = { display: visible ? '' : 'none' }
  const buttonLabel = visible ? 'hide' : 'view'

  //css could, more properly, be imported from a file. not going to bother here
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
  const deleteBlogButtonStyle = {
    display: 'inline-block',
    padding: '0.35em 1.2em',
    border: '0.1em solid #FFFFFF',
    margin: '0.3em 0.3em 0.3em 0',
    borderRadius: '10px',
    boxSizing: 'border-box',
    textDecoration: 'none',
    fontFamily: 'Roboto,sans-serif',
    fontWeight: 300,
    color: '#FFFFFF',
    textAlign: 'center',
    backgroundColor: '#e05353'
  }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const handleLikeClick = async () => {
    blog.likes += 1
    await updateBlog(blog)
    setLikes(blog.likes)
  }

  const handleDeleteClick = async () => {
    if (window.confirm(`Delete blog ${blog.title} by ${blog.author}`)) {
      await deleteBlog(blog.id)
    }
  }

  return (
    <div style={blogListStyle}>
      <div style={blogNameStyle} onClick={toggleVisibility}>{blog.title}</div> by {blog.author} <button onClick={toggleVisibility}>{buttonLabel}</button>
      <div style={showWhenVisible}>
        {blog.url}
        <br />
        {blog.likes} <button onClick={handleLikeClick}>like</button>
        <br />
        {blog.user ? blog.user.name : 'Unknown user'}
        <br />
        <button style={deleteBlogButtonStyle} onClick={handleDeleteClick}>delete blog</button>
      </div>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  updateBlog: PropTypes.func.isRequired,
  deleteBlog: PropTypes.func.isRequired
}

export default Blog