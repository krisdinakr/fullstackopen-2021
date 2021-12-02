import React from 'react'
import AnecdotesForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'

const App = () => (
  <div>
    <h2>Anecdotes</h2>
    <AnecdoteList />
    <AnecdotesForm />
  </div>
)

export default App