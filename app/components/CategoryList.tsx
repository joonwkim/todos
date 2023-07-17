import { Category } from '@prisma/client'
import React from 'react'
import CategoryItem from './CategoryItem'

type CategoryProps = {
    categories: Category[] | undefined
}

const TodoList = (props:CategoryProps) => {
  return (
    <ul className='list-group'>
    {props.categories?.map(category => (
      <CategoryItem key={category.id} category={category}/>
    ))}
  </ul>
  )
}

export default TodoList