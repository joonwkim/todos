'use client'
import { ChangeEvent, startTransition, useTransition } from 'react'
import styles from './page.module.css'
import { Category } from '@prisma/client'

type CategoryItemProps = {
    category: Category,
}

const TodoItem = (props: CategoryItemProps) => {

    const [isPending, startTransition] = useTransition()

    return (
        <li className='list-group-item border-0 p-0'>
            <label htmlFor='{todo.id}' className='ms-2'  >{props.category.name} </label>
        </li>
    )
}

export default TodoItem