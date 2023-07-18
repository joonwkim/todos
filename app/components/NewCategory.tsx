'use client'
import { useRef } from "react"
import { createCategoryAction } from "../actions/categoryAction"

const NewCategory = () => {
    const formRef = useRef<HTMLFormElement>(null)

    const handleCreateCategory = async (data: FormData) => {
        const name = data.get('name')
        if (!name || typeof name !== 'string') return
        await createCategoryAction(name)
        formRef.current?.reset()
    }

    return (
        <form ref={formRef} action={handleCreateCategory} className='mt-3'>
            <div className="fs-5">Create a new Category</div>
            <input type="text" title='name' name="name" className='border border-primary' />
            <button type='submit' className='btn btn-primary ms-3'  >
                Add Category
            </button>
        </form>
    )
}

export default NewCategory