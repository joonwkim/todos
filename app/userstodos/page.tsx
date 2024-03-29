import React from 'react'
import { getUsers } from '../sevices/userService'
import { getCategories } from '@/app/sevices/categoryServices'
import AddUserAndList from '@/app/components/addUserAndList'
import { getTodos } from '../sevices/todoService'

const UsersTodos = async () => {
  const {users}  = await getUsers() 
  const {todos}  = await getTodos()
  const {categories} = await getCategories()
  
  return (
    <section className='py-20'>
      <div className="mt-3">
        <h1></h1>
       <AddUserAndList users={users}  isBtnAdded={true} categories={categories} todos={todos} />
      </div>
    </section>
  )
}

export default UsersTodos