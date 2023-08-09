'use client'
import { Todo, } from '@prisma/client'
import styles from '../../page.module.css'
import { useEffect, useState, useTransition } from 'react';
import { updateTodoCompleteAction, updateTodoExpandAction, updateTodoSelectAction } from '../../actions/todoAction'
import Expander from '../controls/expander';
import ChildTableItem from './todoChildren';
import { useRouter } from "next/navigation";

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
    const [selectStatus, setSelectStatus] = useState(false);
    const router = useRouter()

    useEffect(() => {
        window.addEventListener("click", () => setSelectStatus(false))
        return () => window.removeEventListener("click", () => setSelectStatus(false))
    }, [])

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

    const onExpand = (e: any) => {
        e.preventDefault()
        e.stopPropagation();
        startTransition(() => updateTodoExpandAction(props.todo.id, !props.todo.isExpanded))
        router.push('/todos/?orderBy=asc&&propertyName=title');
    }
    const hasParent = (todo: any) => {
        return todo.parent !== null;
    }

    return (<>
        <tr className={getBgColor()} onClick={(e) => handleSelection(e)} >
            <td>
                {hasChildren(props.todo) ? (
                    <span onClick={onExpand}>
                        <Expander isExpand={props.todo.isExpanded} />
                    </span>
                ) : hasParent(props.todo) ?
                    <div className='ms-4'><input type="checkbox" className={styles.todoCheckbox} name="isCompleted" title='isCompleted'
                        onChange={(e) => startTransition(() =>
                            updateTodoCompleteAction(props.todo, e.target.checked))}
                        defaultChecked={props.todo.isCompleted} />
                    </div> : (
                        <input type="checkbox" className={styles.todoCheckbox} name="isCompleted" title='isCompleted'
                            onChange={(e) => startTransition(() =>
                                updateTodoCompleteAction(props.todo, e.target.checked))}
                            defaultChecked={props.todo.isCompleted} />
                    )}
            </td>

            {/* <td>
                {hasChildren(props.todo) ? (<span onClick={onExpand}><Expander isExpand={props.todo.isExpanded} /></span>) : hasParent(props.todo) ? <div></div> : (
                    <input type="checkbox" className={styles.todoCheckbox} name="isCompleted" title='isCompleted'
                        onChange={(e) => startTransition(() => 
                            updateTodoCompleteAction(props.todo, e.target.checked))}
                        defaultChecked={props.todo.isCompleted} />

                )}
            </td>
            <td>
                {hasParent(props.todo) ? <div> <input type="checkbox" className={styles.todoCheckbox} name="isCompleted" title='isCompleted'
                    onChange={(e) => startTransition(() => {
                        e.stopPropagation();
                        updateTodoCompleteAction(props.todo, e.target.checked)
                    })}
                    defaultChecked={props.todo.isCompleted} /></div> : <div></div>}

            </td> */}
            <td> <label htmlFor='{todo.id}' className={getTitleTextClass()}>{props.todo.title}</label></td>
            <td>{props.todo.createdAt?.toLocaleString()}</td>
            <td>{!hasChildren(props.todo) && props.todo.isCompleted ? (<>{props.todo.updatedAt.toLocaleString()}</>) : !props.todo.isCompleted ? (<div></div>) : (<>{props.todo.updatedAt.toLocaleString()}</>)}</td>
        </tr>
        {props.todo.isExpanded && hasChildren(props.todo) ? (<ChildTableItem todo={props.todo} />) : (<div></div>)}
    </>
    )
}

export default TodoTableItem