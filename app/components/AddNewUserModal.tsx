'use client'
import React, { useEffect, useRef, useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
import { createUserAction } from '../actions/userAction'

type BtModalProps = {
    title?: string | undefined,
    body?: string | undefined
    show: boolean | undefined,
    closeModal?: React.MouseEventHandler<HTMLButtonElement> | undefined,
    saveBtnClick?: React.MouseEventHandler<HTMLButtonElement> | undefined,
    hide?: any,
    children?: React.ReactNode,
}

const AddNewUserModal = (props: BtModalProps) => {
    const formRef = useRef<HTMLFormElement>(null)

    const handleCreateUser = async (data: FormData) => {
        let input: UserType = {
            name: data.get('name') as string,
            email: data.get('email') as string,
            password: data.get('password') as string,
        }
        await createUserAction(input)
        formRef.current?.reset()
    }
    return (
        <Modal show={props.show} onHide={props.hide} backdrop='static' >
            <Modal.Header closeButton>
                <Modal.Title>Add User</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form id='addNewUserModal' ref={formRef} action={handleCreateUser}>
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
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={props.closeModal}>
                    Close
                </Button>
                <Button type="submit" variant="primary" form='addNewUserModal' onClick={props.closeModal}>
                    Save
                </Button>

            </Modal.Footer>
        </Modal>
    )
}

export default AddNewUserModal