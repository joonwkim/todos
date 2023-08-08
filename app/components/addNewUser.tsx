'use client'
import React, { useRef } from 'react'
import { createUserAction } from '../actions/userAction'

const AddNewUser = (): React.JSX.Element => {
  const formRef = useRef<HTMLFormElement>(null)

  const handleAddUser = async (data: FormData) => {
    let input: UserType = {
      name: data.get('name') as string,
      email: data.get('email') as string,
      password: data.get('password') as string,
    }
    await createUserAction(input)
    formRef.current?.reset()
  }
  return (
    <form ref={formRef} action={handleAddUser} className='mt-3'>
      <div className='row'>
        <div className="form-group row mt-2">
          <label className='col-3'>Name:</label>
          <input type="text" className="form-control col-lg" placeholder="Enter name" title='name' name='name' />
        </div>
        <div className="form-group row mt-2">
          <label className='col-3'>Email address:</label>
          <input type="email" className="form-control col-lg" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" title='email' name='email' />
        </div>
        <div className="form-group row mt-2 mb-2">
          <label className='col-3'>Password:</label>
          <input type="password" className="form-control col-lg" id="exampleInputPassword1" placeholder="Password" title='password' name='password' />
        </div>
      </div>
    </form>
  )
}

export default AddNewUser