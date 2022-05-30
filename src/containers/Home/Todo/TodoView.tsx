import React, { useState} from 'react'
import useSWR from 'swr';
import { addTodo, getTodo } from 'src/services/apiTodo';
import { Button, Grid, TextField, Typography } from '@mui/material';

type Props = {}

const TodoView = (props: Props) => {
  const { data, error, mutate } = useSWR({
    path: '/task',
  }, getTodo)
  console.log('data', data)
  console.log('error', error)
  const [tfNewTodo, setTfNewTodo] = useState('')
  const handleAddTodo = () => {
    addTodo(tfNewTodo).then(() => mutate())
  }
  return (
    <div>
      <Typography variant="h5">SWR todo</Typography>
      <TextField
        onChange={(e) => setTfNewTodo(e.target.value)}
        value={tfNewTodo}
      />
      <Button onClick={handleAddTodo}>Add</Button>
      <Grid direction="column">
        {data?.data.map((todo) => (
          <div key={todo.id}>{todo.description}</div>
        ))}
      </Grid>
    </div>
  )
}

export default TodoView