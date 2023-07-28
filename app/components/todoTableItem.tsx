'use client'
import { Todo, } from '@prisma/client'
import styles from '../page.module.css'
import { useTransition } from 'react';
import { updateTodoCompleteAction, updateTodoSelectAction } from '../actions/todoAction'

type TodoItemProps = {
    todo: Todo;
}

const TodoTableItem = (props: TodoItemProps) => {

    const [isPending, startTransition] = useTransition()

    const getBgColor = () => {
        if (props.todo.isCompleted) {
            return 'table-light'
        } else if (props.todo.isSelected) {
            return 'table-warning'
        }
        return 'table-info'
    }
    const handleSelection = (e:any) => {
        startTransition(() => updateTodoSelectAction(props.todo.id, !props.todo.isSelected))
    }
    return (
        <tr className={getBgColor()} onClick={(e)=> handleSelection(e)} >
            <td> <input type="checkbox" className={styles.todoCheckbox} name="isCompleted" title='isCompleted' id={props.todo.id}
                onChange={(e) => startTransition(() => updateTodoCompleteAction(props.todo.id, e.target.checked))}
                defaultChecked={props.todo.isCompleted} /></td>
            <td>{props.todo.title}</td>
            <td>{props.todo.createdAt?.toLocaleString()}</td>
            <td>{props.todo.updatedAt.toLocaleString()}</td>
        </tr>
    )
}

export default TodoTableItem