'use client'
import { Category, Todo, User } from '@prisma/client'
import { ChangeEvent, startTransition, useTransition } from 'react'
import styles from '../page.module.css'
import { updateTodoAction } from '../actions/todoAction'

type TodoItemProps = {
  todo: Todo,
  category?: Category,
}

const TodoItem = (props: TodoItemProps) => {

  const [isPending, startTransition] = useTransition()

  return (
    <li className='list-group-item border-0 p-0'>
      <input type="checkbox" className={styles.todoCheckbox} name="isCompleted" title='isCompleted' id={props.todo.id} onChange={(e) => startTransition(() => updateTodoAction(props.todo.id, e.target.checked))} defaultChecked={props.todo.isCompleted} />
      {!props.todo.isCompleted ?
        (<>
          <label htmlFor='{todo.id}' className='ms-2'  >{props.category?.name}</label>
          <label htmlFor='{todo.id}' className='ms-2'  >{props.todo.title} - </label>
          <label htmlFor='{todo.id}' className='ms-2'  >{props.todo.desc}</label>
          <span className='ms-3'> {props.todo.updatedAt?.toUTCString()} </span>
        </>) : (<>
          <label htmlFor='{todo.id}' className='ms-2 text-decoration-line-through'>{props.todo.title}</label>
          <label htmlFor='{todo.id}' className='ms-2 text-decoration-line-through'  >{props.todo.desc}</label>
          <span className='ms-3 text-decoration-line-through'>{props.todo.updatedAt?.toUTCString()}          </span>
        </>)
      }
    </li>
  )
}

export default TodoItem