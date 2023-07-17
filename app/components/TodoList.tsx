import React from 'react'
import TodoItem from './TodoItem'
import { Category, Todo } from '@prisma/client'
import { FaCommentsDollar } from 'react-icons/fa'

type TodoProps = {
    todos: Todo[] | undefined,
    categories?:Category[] | undefined
}

const TodoList = (props:TodoProps) => {
  const getTodoCategory = (todo:Todo) =>{
    const toodoCategory = props.categories?.find(cat=>cat.id === todo.categoryId) 
    return toodoCategory
  }
  return (
    <ul className='list-group'>
    {props.todos?.map(todo => (
      <TodoItem key={todo.id} todo={todo} category={getTodoCategory(todo)}/>
    ))}
  </ul>
  )
}

export default TodoList