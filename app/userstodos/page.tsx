import React from 'react'
import { getUsers } from '../../sevices/userService'
import { getCategories } from '@/app/sevices/categoryServices'
import AddUserAndList from '@/app/components/addUserAndList'

const OneToMany = async () => {
  const { users } = await getUsers() 
  const {categories} = await getCategories()
  
  return (
    <section className='py-20'>
      <div className="mt-3">
        <h1></h1>
       <AddUserAndList users={users}  isBtnAdded={true} categories={categories} />
      </div>
    </section>
  )
}

export default OneToMany