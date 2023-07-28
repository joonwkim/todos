'use client'
import React, { startTransition, useState } from 'react'
import TodoTableItem from './todoTableItem'
import styles from '../page.module.css'
import { Todo } from '@prisma/client'
import { useRouter } from 'next/navigation'
import { setCheckedOnCompleteAction } from '../actions/todoAction'

type TodoProps = {
    todos: Todo[] | undefined,
}

const TodoTable = (props: TodoProps) => {

    const [checked, setChecked] = useState(false)
    const router = useRouter()

    const handleChecked = async () => {
        console.log('checked:', checked)
        setChecked(!checked)
        if (checked)
            router.push('/?checked=true')
        else
            router.push('/?checked=false')
    }
    return (<>
        <table className="table">
            <thead>
                <tr>
                    <th scope="col-1">
                        <input type="checkbox" className={styles.todoCheckbox} name="isCompleted" title='isCompleted' id='todoCheckBox'
                            onChange={handleChecked}
                            defaultChecked={checked} />
                    </th>
                    <th className='text-center' scope="col-2">항목</th>
                    <th className='text-center' scope="col-3">시작일시</th>
                    <th className='text-center' scope="col-4">완료일시</th>
                </tr>
            </thead>
            <tbody>
                {props.todos?.map(todo => (
                    <TodoTableItem key={todo.id} todo={todo} />
                ))}
            </tbody>
        </table>
    </>

    )
}

export default TodoTable