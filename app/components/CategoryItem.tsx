'use client'
import { Category } from '@prisma/client'

type CategoryItemProps = {
    category: Category,
}

const CategoryItem = (props: CategoryItemProps) => {

    return (
        <li className='list-group-item border-0 p-0'>
            <label htmlFor='{todo.id}' className='ms-2'  >{props.category.name} </label>
        </li>
    )
}

export default CategoryItem