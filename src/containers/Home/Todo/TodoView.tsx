import React, { useState} from 'react'
import useSWR from 'swr';
import { Button, Grid, TextField, Typography } from '@mui/material';

import apiTodo from '~/services/apiTodo';

const TodoView = () => {
  const { data, mutate } = useSWR({
    path: '/task',
  }, apiTodo.useTodoAllGet)

  const [tfNewTodo, setTfNewTodo] = useState('')
  const handleAddTodo = () => {
    apiTodo.useTodoAdd({
      data: { description: tfNewTodo },
    }).then(() => mutate())
  }
  return (
    <div>
      <Typography variant="h5">SWR todo client side fetch</Typography>
      <TextField
        onChange={(e) => setTfNewTodo(e.target.value)}
        value={tfNewTodo}
      />
      <Button onClick={handleAddTodo}>Add</Button>
      <Grid direction="column" container>
        {data?.data.map((todo) => (
          <div key={todo._id}>{todo.description}</div>
        ))}
      </Grid>
    </div>
  )
}

export default TodoView