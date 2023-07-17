import React from 'react'
import TodoItem from './TodoItem'
import { Todo } from '@prisma/client'

type TodoProps = {
    todos: Todo[] | undefined
}

const TodoList = (props:TodoProps) => {
  // console.log('todolist todos: ', props.todos)
  return (
    <ul className='list-group'>
    {props.todos?.map(todo => (
      <TodoItem key={todo.id} todo={todo}/>
    ))}
  </ul>
  )
}

export default TodoList