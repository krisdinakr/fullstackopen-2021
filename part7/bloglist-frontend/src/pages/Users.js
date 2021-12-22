import React from 'react'
import { useSelector } from 'react-redux'
import { Link, Navigate } from 'react-router-dom'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'

export const Users = () => {
  const user = useSelector(({ user }) => user)
  const users = useSelector(({ users }) => users)
  console.log(users)

  if (!user) return <Navigate to="/login" replace={true} />

  return (
    <Container maxWidth="md" sx={{ py: 2 }}>
      <Typography variant='h4' component='h2' align='center' gutterBottom >
        Users
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>User</TableCell>
              <TableCell>Blogs Created</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id} >
                <TableCell component="th" scope="row">
                  <Link
                    to={`/users/${user.id}`}
                    style={{ textDecoration: 'none', color: 'inherit' }}
                  >
                    {user.name}
                  </Link>
                </TableCell>
                <TableCell>
                  {user.blogs.length}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  )
}
