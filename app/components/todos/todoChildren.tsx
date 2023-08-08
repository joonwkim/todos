import { Todo } from '@prisma/client'
import React from 'react'
import TodoTableItem from './todoTableItem'

type TodosProps = {
    todo: any | undefined
}
const getChildren = (children: any): Todo[] => {
    const todos = children as Array<Todo>
    return todos;
}
const TodosTable = (props: TodosProps) => {
    return (
        <>
            {getChildren(props.todo.children).map(child => (
                <TodoTableItem key={child.id} todo={child} />
            ))}
        </>

    )
}

export default TodosTable