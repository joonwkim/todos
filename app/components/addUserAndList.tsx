'use client'
import { Category, Todo, User } from '@prisma/client'
import React, { useState } from 'react'
import UserTableItem from './userTableItem'
import AddNewUserModal from './AddNewUserModal'

type UsersProps = {
  users: User[] | undefined,
  isBtnAdded: boolean,
  categories?:Category[] | undefined,
  todos?:Todo[] | undefined
}

const AddUserAndList = (props: UsersProps) => {
  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const onAddUsrBtnClicked = () => {
    handleShow()
  }

  const getUserTodos = (user:User) =>{
   var userTodos =  props.todos?.filter(todo =>todo.userId === user.id) as Array<Todo>
   return userTodos;
  }

  return (
    <>
      <div className='d-flex justfy-content-left mt-3'>
        <h3>Add New User:</h3>
        <button type="button" className="btn btn-primary ms-3" onClick={onAddUsrBtnClicked}>Add</button>
      </div>
      <AddNewUserModal show={show} closeModal={handleClose} hide={handleClose} />

      <h2 className='text-xl font-semibold mt-10 border-b pb-2'>Users:</h2>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Password</th>
          </tr>
        </thead>
        <tbody>
          {props.users?.map(user => (
            <UserTableItem key={user.id} user={user} isBtnAdded={props.isBtnAdded} categories={props.categories} todos={getUserTodos(user)} />
          ))}
        </tbody>
      </table>

    </>
  )
}

export default AddUserAndList