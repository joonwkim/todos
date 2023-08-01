'use client'
import { Todo, } from '@prisma/client'
import styles from '../page.module.css'
import { useState, useTransition } from 'react';
import { updateTodoCompleteAction, updateTodoSelectAction } from '../actions/todoAction'
import Expander from './controls/expander';
import ChildTableItem from './todosTable';
type Temp = {
    id: string,
    title: string,
    isSelected: boolean,
}
type TodoItemProps = {
    todo: any;
}

const TodoTableItem = (props: TodoItemProps) => {

    const [isPending, startTransition] = useTransition()
    const [isExpanded, setIsExpanded] = useState(false)

    const getBgColor = () => {
        if (props.todo.isCompleted && props.todo.isSelected !== true) {
            return 'table-light'
        } else if (props.todo.isSelected) {
            return 'table-warning'
        }
        return 'table-info'
    }

    const getTitleTextClass = () => {
        if (props.todo.isCompleted) {
            return 'text-decoration-line-through'
        }
        return ''
    }

    const handleSelection = (e: any) => {
        startTransition(() => updateTodoSelectAction(props.todo.id, !props.todo.isSelected))
    }

    const getChildren = (children: any): Todo[] => {
        const todos = children as Array<Todo>
        return todos;
    }
    const hasChildren = (todo: any) => {
        return getChildren(todo.children) && getChildren(todo.children).length > 0
    }

    const onExpand = () => {
        setIsExpanded(!isExpanded)
    }
    const hasParent = (todo: any) => {
        // getUpdatedAt(todo)
        return todo.parent !== null;
    }

 
    // const getUpdatedAt = (todo:any) =>{
    //     const children = getChildren(todo) as Array<Todo>
    //     console.log('children:' ,JSON.stringify(children,null,2))
    //     console.log('children array:' ,children)
    //     // if(children){
    //     //     let result = children.map(({updatedAt})=> updatedAt)
    //     //     console.log('result:' ,JSON.stringify(result,null,2))
    //     // }
       
    // }

    // const getMaxOfChild = (todo:any) =>{
    //     const children = getChildren(todo);
    //     const ld = new Date(Math.max(children?.map(e=> new Date(e.updatedAt))))
    // }

    // const getLatestUpdatedDateOfChidren = (todo:any) =>{
    //     console.log('getLatestUpdatedDateOfChidren : ', todo)
    //     return ''
    // }

    return (<>

        <tr className={getBgColor()} onClick={(e) => handleSelection(e)} >
            <td>
                {hasChildren(props.todo) ? (<span onClick={onExpand}><Expander isExpand={isExpanded} /></span>) : hasParent(props.todo) ? <div></div> : (
                    <input type="checkbox" className={styles.todoCheckbox} name="isCompleted" title='isCompleted' 
                        onChange={(e) => startTransition(() => updateTodoCompleteAction(props.todo, e.target.checked))}
                        defaultChecked={props.todo.isCompleted} />

                )}
            </td>
            <td>
                {hasParent(props.todo) ? <div> <input type="checkbox" className={styles.todoCheckbox} name="isCompleted" title='isCompleted' 
                    onChange={(e) => startTransition(() => updateTodoCompleteAction(props.todo, e.target.checked))}
                    defaultChecked={props.todo.isCompleted} /></div> : <div></div>}

            </td>
            <td> <label htmlFor='{todo.id}' className={getTitleTextClass()}>{props.todo.title}</label></td>
            <td>{props.todo.createdAt?.toLocaleString()}</td>
            <td>{!hasChildren(props.todo) && props.todo.isCompleted ? (<>{props.todo.updatedAt.toLocaleString()}</>): !props.todo.isCompleted ? (<div></div>) : (<>{props.todo.updatedAt.toLocaleString()}</>)}</td>
            {/* <td>{props.todo.updatedAt.toLocaleString()}</td> */}
        </tr>
        {isExpanded && hasChildren(props.todo) ? (<ChildTableItem todo={props.todo} />) : (<div></div>)}
    </>
    )
}

export default TodoTableItem