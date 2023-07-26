'use client'
import { useRef } from "react"
import { createTodoAction } from "../actions/todoAction"

const NewTodo = () => {
    const formRef = useRef<HTMLFormElement>(null)
    const handleCreateTodo = async (data: FormData) => {
        const title = data.get('title')
        if (!title || typeof title !== 'string') return

        await createTodoAction(title)

        formRef.current?.reset()
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