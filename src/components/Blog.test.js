import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

const blog = {
  id: '6351a675791242ac66083f7c',
  url: 'www.testurl.bla',
  title: 'Test blog',
  author: 'Test author',
  likes: 69420,
  user: 'Testaaja'
}

let container

const foo = () => {
  //dummy function for required proptypes
}

beforeEach(() => {
  container = render(<Blog key={blog.id} blog={blog} updateBlog={foo} deleteBlog={foo} />).container
})

test('Blog renders only title and author', async () => {
  const div = container.querySelector('.togglableContent')
  expect(div).toHaveStyle('display: none')

  let element = await screen.findByText('Test blog')
  element = await screen.findByText('Test author')
})

test('clicking the view button renders url and likes', async () => {
  const user = userEvent.setup()
  const button = screen.getByText('view')
  await user.click(button)

  const div = container.querySelector('.togglableContent')
  expect(div).not.toHaveStyle('display: none')

  let element = await screen.findByText('Test blog')
  element = await screen.findByText('Test author')
  element = await screen.findByText('www.testurl.bla')
  element = await screen.findByText('69420')

})