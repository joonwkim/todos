'use client'
import React, { DetailedHTMLProps, SelectHTMLAttributes, useEffect, useRef, useState } from 'react'
import { Button, Modal, Form } from 'react-bootstrap'
import { Category, User } from '@prisma/client'
import { Joan } from 'next/font/google'
import { createTodoByUserAction } from '@/app/actions/todoAction'
import SelectCategory from './SelectCategory'

type TodoModalProps = {
    user: User | undefined
    show: boolean | undefined,
    closeModal?: React.MouseEventHandler<HTMLButtonElement> | undefined,
    saveBtnClick?: React.MouseEventHandler<HTMLButtonElement> | undefined,
    hide?: any,
    categories?: Category[] | undefined

}

const AddTodoItemModal = (props: TodoModalProps) => {
    const formRef = useRef<HTMLFormElement>(null)

    const [cId, setCId] = useState(null)

    const handleCreateTodoByUser = async (data: FormData) => {

        let input: TodoInputType = {
            title: data.get('title') as string,
            desc: data.get('desc') as string,
            userId: props.user !== undefined ? props.user.id : undefined,
            categoryId: cId !== null ? cId : undefined,
        }
        await createTodoByUserAction(input)
    }
    const onChange = (e: any) => {
        setCId(e.target.value)
    }
    return (
        <Modal show={props.show} onHide={props.hide} backdrop='static' >
            <Modal.Header closeButton>
                <Modal.Title>Add Todo</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form id='addTodoModal' ref={formRef} action={handleCreateTodoByUser}>
                    <div className='row'>
                        <div className="form-group row mt-2">
                            <label className='col-2'>Category:</label>
                            <div className='col-lg ms-2'>
                                <SelectCategory categories={props.categories} onChange={onChange} />
                            </div>
                        </div>
                        <div className="form-group row mt-2">
                            <label className='col-2'>Title:</label>
                            <input type="text" title='title' name="title" className='border border-primary col-lg' />
                        </div>
                        <div className="form-group row mt-2">
                            <label className='col-2'>Desc:</label>
                            <textarea className='col border border-primary' title='desc' name='desc' placeholder='Write detailed description here'></textarea>
                        </div>

                    </div>
                </form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={props.closeModal}>
                    Close
                </Button>
                <Button type="submit" variant="primary" form='addTodoModal' onClick={props.closeModal}>
                    Save
                </Button>

            </Modal.Footer>
        </Modal>
    )
}

export default AddTodoItemModal