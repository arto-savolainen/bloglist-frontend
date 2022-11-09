import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'

const blog = {
  id: '6351a675791242ac66083f7c',
  url: 'www.testurl.bla',
  title: 'Test blog',
  author: 'Test author',
  likes: 69420,
  user: '63519f9ffae44aea994fa151'
}

const foo = () => {
  //dummy function for required proptypes
}

test('Blog renders only title and author', async () => {
  render(<Blog key={blog.id} blog={blog} updateBlog={foo} deleteBlog={foo} />)

  let element = await screen.findByText('Test blog')
  element = await screen.findByText('Test author')
  element = screen.queryByText('www.testurl.bla')
  expect(element).toBeNull()
  element = screen.queryByText('69420')
  expect(element).toBeNull()
})