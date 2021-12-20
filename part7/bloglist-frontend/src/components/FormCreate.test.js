import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { FormCreate } from '.'

describe('<FormCreate />', () => {
  test('form submit works and received right detail when create new blog', () => {
    const submitHandler = jest.fn()
    const component = render(
      <FormCreate handlerCreate={submitHandler} />
    )
    const title = component.container.querySelector('#title')
    const author = component.container.querySelector('#author')
    const url = component.container.querySelector('#url')
    const form = component.container.querySelector('form')

    fireEvent.change(title, {
      target: { value: 'How to testing in React App?' }
    })
    fireEvent.change(author, {
      target: { value: 'Tino Kim' }
    })
    fireEvent.change(url, {
      target: { value: 'tino-kim.co.uk' }
    })
    fireEvent.submit(form)

    expect(submitHandler.mock.calls).toHaveLength(1)
    expect(submitHandler.mock.calls[0][0].title).toBe('How to testing in React App?')
    expect(submitHandler.mock.calls[0][0].author).toBe('Tino Kim')
    expect(submitHandler.mock.calls[0][0].url).toBe('tino-kim.co.uk')
  })
})