import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { Blog } from './index'

describe('<Blog />', () => {
  test('at first just render blog\'s title and author', () => {
    const blog = {
      id: 1,
      title: 'This blog is created with react testing',
      author: 'Darren Chris',
      url: 'marklee.com',
      likes: 5,
      user: {
        username: 'Mark Lee'
      }
    }
    const mockHandler = jest.fn()
    const component = render(
      <Blog blog={blog} handlerLike={mockHandler} handlerRemove={mockHandler} />
    )

    expect(component.container).toHaveTextContent('This blog is created with react testing Darren Chris')
    expect(component.container).not.toHaveTextContent('marklee.com')
    expect(component.container).not.toHaveTextContent('5')
  })


  test('url and like are display when show button clicked', () => {
    const blog = {
      id: 1,
      title: 'This blog is created with react testing',
      author: 'Darren Chris',
      url: 'marklee.com',
      likes: 5,
      user: {
        username: 'Mark Lee'
      }
    }
    const mockHandler = jest.fn()
    const component = render(
      <Blog blog={blog} handlerLike={mockHandler} handlerRemove={mockHandler} />
    )
    const button = component.getByText(/show/i)

    fireEvent.click(button)
    expect(component.container).toHaveTextContent('marklee.com')
    expect(component.container).toHaveTextContent('5')
  })

  test('event handler received as props is called twice when like button is clicked twice', () => {
    const blog = {
      id: 1,
      title: 'This blog is created with react testing',
      author: 'Darren Chris',
      url: 'marklee.com',
      likes: 5,
      user: {
        username: 'Mark Lee'
      }
    }
    const mockHandler = jest.fn()

    const component = render(
      <Blog blog={blog} handlerLike={mockHandler} handlerRemove={mockHandler} />
    )
    const showBtn = component.getByText(/show/i)
    fireEvent.click(showBtn)

    const likeBtn = component.getByText(/(^like$)/i)
    fireEvent.click(likeBtn)
    fireEvent.click(likeBtn)

    expect(mockHandler.mock.calls).toHaveLength(2)
  })
})