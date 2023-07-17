'use client'
import { Category, Todo, User } from '@prisma/client'
import { useEffect, useState, useTransition } from 'react'
import AddPostItemModal from './AddTodoItemModal'
import TodoList from './TodoList'

type UserItemProps = {
    user: User,
    isBtnAdded: boolean,
    categories?:Category[] | undefined
    todos?: Todo[] | undefined
}

const UserTableItem = (props: UserItemProps) => {

    const [isPending, startTransition] = useTransition()

    const [show, setShow] = useState(false)
    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)


    const onClick = () => {
        handleShow()
    }
   
   

    if (props.isBtnAdded) {
        return (
            <>
                <AddPostItemModal show={show} closeModal={handleClose} hide={handleClose} user={props.user} categories={props.categories}/>
                <tr className='border'>
                    <td>{props.user.name}</td>
                    <td>{props.user.email}</td>
                    <td>{props.user.password}</td>
                    <td><button className='btn btn-primary' data-toggle="modal" data-target="#exampleModal" onClick={onClick}>Add Todo</button></td>
                </tr>
                <tr className='border'>
                    <td colSpan={3}>
                        <div className='ms-5'>
                            <TodoList todos={props.todos} categories={props.categories} />
                        </div>
                    </td>
                </tr>
            </>
        )
    }
    else {
        return (
            <>
                <tr>
                    <td>{props.user.name}</td>
                    <td>{props.user.email}</td>
                    <td>{props.user.password}</td>
                </tr>
            </>



        )
    }

}

export default UserTableItem