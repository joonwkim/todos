'use client'
import { Category, Todo, User } from '@prisma/client'
import { useTransition } from 'react'
import styles from '../page.module.css'
import { updateTodoCompleteAction } from '../actions/todoAction'

type TodoItemProps = {
  todo: Todo,
  category?: Category,
}

const TodoItem = (props: TodoItemProps) => {

  const [isPending, startTransition] = useTransition()

  return (
    <li className='list-group-item border-0 p-0'>
      <input type="checkbox" className={styles.todoCheckbox} name="isCompleted" title='isCompleted' id={props.todo.id} onChange={(e) => startTransition(() => updateTodoCompleteAction(props.todo.id, e.target.checked))} defaultChecked={props.todo.isCompleted} />
      {!props.todo.isCompleted ?
        (<>
          <label htmlFor='{todo.id}' className='ms-2'  >{props.category?.name}</label>
          <label htmlFor='{todo.id}' className='ms-2'  >{props.todo.title} - </label>
          <label htmlFor='{todo.id}' className='ms-2'  >{props.todo.desc}</label>
          <span className='ms-3'> {props.todo.createdAt?.toLocaleString()} </span>
        </>) : (<>
          <label htmlFor='{todo.id}' className='ms-2 text-decoration-line-through'>{props.todo.title}</label>
          <label htmlFor='{todo.id}' className='ms-2 text-decoration-line-through'  >{props.todo.desc}</label>
          <span className='ms-3 text-decoration-line-through'>created at: {props.todo.createdAt?.toLocaleString()} </span>
          <span className='ms-3 text-decoration-line-through'>completed at: {props.todo.updatedAt?.toLocaleString()}          </span>
        </>)
      }
    </li>
  )
}

export default TodoItem