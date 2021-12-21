import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { initializedUsers } from '../reducers/usersReducer'

export const Users = () => {
  const dispatch = useDispatch()
  const users = useSelector(({ users }) => users)
  console.log(users)

  useEffect(() => {
    dispatch(initializedUsers())
  }, [])

  return (
    <div className="users">
      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>blogs created</th>
          </tr>
        </thead>
        <tbody>
          {users && users.map(user => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
