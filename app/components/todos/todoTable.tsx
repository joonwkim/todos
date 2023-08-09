'use client'
import React, { startTransition, useEffect, useState } from 'react'
import TodoTableItem from './todoTableItem'
import styles from '../../page.module.css'
import { Todo } from '@prisma/client'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'
import { isDataView } from 'node:util/types'
import AddNewTodo from './addNewTodo'
import { Prosto_One } from 'next/font/google'
import { GetResult } from '@prisma/client/runtime/library'

type TodoProps = {
    todos: Array<Todo>,
    selectedItems: any
}

interface IOrderByStatus {
    status: string
}
const TodoTable = (props: TodoProps) => {

    const [checked, setChecked] = useState(false)

    const [orderByTitle, setOrderByTitle] = useState<IOrderByStatus>({ status: 'none' })
    const [orderByCreate, setOrderByCreated] = useState<IOrderByStatus>({ status: 'none' })

    const router = useRouter()

    const handleChecked = async () => {
        setChecked(!checked)
        if (checked)
            router.push('/todos/?checked=true')
        else
            router.push('/todos/?checked=false')
    }

    const handleOrderByTitle = () => {
        if (orderByTitle.status === 'none') {
            setOrderByTitle({ status: 'asc' });
        }
        else if (orderByTitle.status === 'asc') {
            setOrderByTitle({ status: 'desc' });
            router.push('/todos/?orderBy=desc&&propertyName=title');
        }
        else if (orderByTitle.status === 'desc') {
            setOrderByTitle({ status: 'asc' });
            router.push('/todos/?orderBy=asc&&propertyName=title');
        }
    }
    
    const handleOrderByCreatedAt = () => {
        if (orderByCreate.status === 'none') {
            setOrderByCreated({ status: 'asc' });
        }
        else if (orderByCreate.status === 'asc') {
            setOrderByCreated({ status: 'desc' });
            router.push('/todos/?orderBy=desc&&propertyName=createdAt');
        }
        else if (orderByCreate.status === 'desc') {
            setOrderByCreated({ status: 'asc' });
            router.push('/todos/?orderBy=asc&&propertyName=createdAt');
        }
    }

    return (<>
        <h1>Todos</h1>
        <AddNewTodo todos={props.todos} selectedItems={props.selectedItems} />
        <p className='text-xl font-semibold border-b pb-2'><span className='fs-6'>-  check in the box when complete</span></p>
        <table className="table table-fixed table-sm">
            <thead>
                <tr>
                    <th className='col-1 ' >
                        <input type="checkbox" className={styles.todoCheckbox} name="isCompleted" title='isCompleted' id='todoCheckBox'
                            onChange={handleChecked}
                            defaultChecked={checked} />
                    </th>                  
                    <th className='col-5'>
                        <div onClick={handleOrderByTitle} className='d-flex' >
                            항목
                            <div className='ms-2'>
                                {orderByTitle.status === 'none' ? (<div></div>) : orderByTitle.status === 'asc' ? (<div>
                                    <span >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-up" viewBox="0 0 16 16">
                                            <path fill-rule="evenodd" d="M8 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L7.5 2.707V14.5a.5.5 0 0 0 .5.5z" />
                                        </svg>
                                    </span>
                                </div>) : (<div><span><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-down" viewBox="0 0 16 16">
                                    <path fill-rule="evenodd" d="M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1z" />
                                </svg></span></div>)}
                            </div>
                        </div>
                    </th>
                    <th className="col-3">
                        <div onClick={handleOrderByCreatedAt} className='d-flex' >
                            시작
                            <div className='ms-2'>
                                {orderByCreate.status === 'none' ? (<div></div>) : orderByCreate.status === 'asc' ? (<div>
                                    <span >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-up" viewBox="0 0 16 16">
                                            <path fill-rule="evenodd" d="M8 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L7.5 2.707V14.5a.5.5 0 0 0 .5.5z" />
                                        </svg>
                                    </span>
                                </div>) : (<div><span><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-down" viewBox="0 0 16 16">
                                    <path fill-rule="evenodd" d="M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1z" />
                                </svg></span></div>)}
                            </div>
                        </div>
                    </th>
                    <th className="col-3">완료</th>
                </tr>
            </thead>
            <tbody>
                {props.todos?.map(todo => (
                    <TodoTableItem key={todo.id} todo={todo} />
                ))}
            </tbody>
        </table>
    </>)
}

export default TodoTable