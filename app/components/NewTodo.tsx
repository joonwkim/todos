'use client'
import { useState } from "react"
import { createChildTodoAction, createTodoAction, deleteSelectedAction, unselectAllTodoAction } from "../actions/todoAction"
import { toast } from 'react-toastify';

type TodoProps = {
  selectedItems: any
}

const NewTodo = (props: TodoProps) => {

  const [title, setTitle] = useState('')
  const [isValid, SetValid] = useState(false)

  const toastSuccess = (msg: string) => {
    toast.success(msg, {
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
  const toastError = (msg: string) => {
    toast.error(msg, {
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

  const checkEntryValid = () => {
    if (!title || typeof title !== 'string' || title === '') {
      SetValid(false)
      toastError('Please enter todo!')
      return;
    }

  }

  const handleAddTodo = async (e: any) => {
    checkEntryValid();
    if (!isValid) {
      try {
        await createTodoAction(title)
        toastSuccess('Your job is registered!');

      } catch (e: any) {
        if (JSON.stringify(e).includes('P2002')) {
          toastError('Your job is a duplicate!')
        }
        else {
          toastError(JSON.stringify(e))
        }
      }
    }
    else {
      toast.error('Check!, your entry is not saved')
    }
  }

  const handleAddChild = async (e: any) => {

    checkEntryValid();
    if (!isValid) {
      try {
        if (props.selectedItems?.length > 1) {
          toast.info('Please select one item only')
          return;
        }
        else {
          await createChildTodoAction(props.selectedItems[0], title)
          toastSuccess('Your job is registered!');
          setTitle('')
          SetValid(false)
        }
      } catch (e: any) {
        if (JSON.stringify(e).includes('P2002')) {
          toastError('Your job is a duplicate!')
        }
        else {
          toastError(JSON.stringify(e))
        }
      }
    }
    else {
      toast.error('Check!, your entry is not saved')
    }
  }

  const handleUnselectAll = async () => {
    // toast.info('Unselect All clicked')
    await unselectAllTodoAction()
  }

  const handleDeleteSelected = async () => {
    // toast.info('Unselect All clicked')
    await deleteSelectedAction()
  }

  return (
    <>
      <div className="fs-5">Create a new Todo</div>
      <div className="row">

        <input type="text" title='title' name="title" value={title} onChange={(e) => setTitle(e.target.value)} className='ms-3 border border-primary col-4' />
        <div className="d-flex col-6">
          <button onClick={handleAddTodo} type='button' className='btn btn-primary'>Add</button>
          <button type='button' className='btn btn-primary ms-1' onClick={handleAddChild}>Add Child</button>
          <button type='button' className='btn btn-primary ms-1' onClick={handleUnselectAll}>Unselect All</button>
          <button type='button' className='btn btn-danger ms-1' onClick={handleDeleteSelected}>Delete Selected</button>
        </div>
      </div>

    </>


  )
}

export default NewTodo