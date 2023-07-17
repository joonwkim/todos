import CategoryList from '@/app/components/CategoryList'
import NewCategory from '@/app/components/NewCategory'
import { getCategories } from '@/app/sevices/categoryServices'
import React from 'react'

const CategoryPage =async () => {
  const {categories} = await getCategories()
  return (
    <section className='py-20'>
      <div className="mt-3">
        <h1>Categories</h1>
        <NewCategory/>
        <CategoryList categories={categories} />
      </div>
    </section>
  )
}

export default CategoryPage