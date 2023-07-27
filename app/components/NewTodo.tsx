'use client'
import { useRef } from "react"
import { createTodoAction } from "../actions/todoAction"
import { useCallback, useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { toast } from 'react-toastify';
import { stat } from "fs";
const NewTodo = () => {

  const formRef = useRef<HTMLFormElement>(null)

  const handleCreateTodo = async (data: FormData) => {
    const title = data.get('title')
    if (!title || typeof title !== 'string') return
    try {
      await createTodoAction(title)
      toast.success('Your job is registered!', {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      })
      formRef.current?.reset()

    } catch (e: any) {
      if (JSON.stringify(e).includes('P2002')) {
        toast.error('Your job is a duplicate!', {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        })
      }
      else {
        alert('new todo:' + JSON.stringify(e))
      }
    }
  }

  return (
    <form ref={formRef} action={handleCreateTodo} className='mt-3'>
      <div className="fs-5">Create a new Todo</div>
      <div className="row ms-1">
        <input type="text" title='title' name="title" className='border border-primary col-4' />
        <button type='submit' className='btn btn-primary ms-3 col-1'>Add</button>
      </div>
    </form>
  )
}

export default NewTodo