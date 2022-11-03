import { useState } from 'react'

//todo: move all logic and states to App component, or move logic from App to components
const NewBlogForm = ({ createNotification, blogService, updateBlogList }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleNewBlog = async (event) => {
    event.preventDefault()

    const newBlog = {
      url: url,
      title: title,
      author: author
    }

    try {
      const createdBlog = await blogService.create(newBlog)
      createNotification(`A new blog ${createdBlog.title} by ${createdBlog.author} added`)
      await updateBlogList()
    }
    catch (exception) {
      //console.log('exception:', exception)
      //note: if jwt token expiration is set, expired token exception is caught here
      //would need a more comprehensive session management system to handle that properly
      //for now, tokens don't expire
      createNotification(`Error: ${exception.response.data.error}`, 'error')
    }
  }

  return (
    <form onSubmit={handleNewBlog}>
      <div>
        title
        <input
          type="text"
          value={title}
          name="Title"
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>
      <div>
        author
        <input
          type="text"
          value={author}
          name="Author"
          onChange={({ target }) => setAuthor(target.value)}
        />
      </div>
      <div>
        url
        <input
          type="text"
          value={url}
          name="Url"
          onChange={({ target }) => setUrl(target.value)}
        />
      </div>
      <button type="submit">create</button>
    </form>
  )
}

export default NewBlogForm