import { Todo } from '@prisma/client'
import { Chilanka } from 'next/font/google'
import React from 'react'

type ChildrenProps ={
    children:Array<Todo>
}

const TodoChildren = (props:ChildrenProps) => {

    console.log('children: ', props.children)
  return (
    <>
    {props.children.map(c=>{
        <div>{c.title}</div>
    })}
    </>
  )
}

export default TodoChildren