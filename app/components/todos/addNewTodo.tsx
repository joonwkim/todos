'use client'
import { startTransition, useState } from "react"
import { createChildTodoAction, createTodoAction, deleteSelectedAction, unselectAllTodoAction, updateTodoExpandAction } from "../../actions/todoAction"
import { toast } from 'react-toastify';
import { Todo } from "@prisma/client";

type TodoProps = {
  todos: Array<Todo>,
  selectedItems: any,

}

const AddNewTodo = (props: TodoProps) => {

  const [title, setTitle] = useState('')
  const [isValid, SetValid] = useState(false)
  const [isExpanded, setExpand] = useState(false)

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
        setTitle('')
        SetValid(false)

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
        else if (props.selectedItems?.length == 0) {
          toast.info('Please select one item!')
          return
        }
        else {
          await createChildTodoAction(props.selectedItems[0], title)
          toastSuccess('Your job is registered!');
          setTitle('')
          SetValid(false)
        }
      } catch (e: any) {
        if (JSON.stringify(e).includes('P2002')) {
          setTitle(' ')
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
    await unselectAllTodoAction()
  }
  const hasChildren = (todo: any) => {
    return todo.children !== null && todo.children.length > 0
  }

  const handleDeleteSelected = async () => {
    console.log('selected items: ', JSON.stringify(props.selectedItems, null, 2))
    if (props.selectedItems.length === 0) {
      toast.info('삭제하고자 하는 항목을 선택하세요')
    }
    else {
      const result = confirm('선택된 항목을 삭제합니다.')
      if (result) {
        startTransition(() => { deleteSelectedAction()})
        setExpand(false);
        handleExpandAll()
      }
    }
  }

  const handleExpandAll = () => {
    props.todos.forEach(async (todo) => {
      if (hasChildren(todo)) {
        setExpand(!isExpanded)
        await updateTodoExpandAction(todo.id, !isExpanded)
      }
    })
  }

  return (
    <>
      <div className="fs-5">Create a new Todo</div>
      <div className="row">
        <input type="text" title='title' name="title" value={title} onChange={(e) => setTitle(e.target.value)} className='ms-3 border border-primary col-4' />
        <div className="d-flex col-6">
          <button onClick={handleAddTodo} type='button' className='btn btn-primary'>Add</button>
          <button type='button' className='btn btn-primary ms-1' onClick={handleAddChild}>Add Child</button>
          <button type='button' className='btn btn-info ms-1' onClick={handleExpandAll}>{isExpanded ? (<span>Collaps</span>) : (<span>Expand</span>)}</button>
          <button type='button' className='btn btn-info ms-1' onClick={handleUnselectAll}>Unselect</button>
          {/* <button type='button' className='btn btn-danger ms-1' onClick={handleDeleteSelected}>Delete</button> */}
        </div>
      </div>

    </>
  )
}

export default AddNewTodo