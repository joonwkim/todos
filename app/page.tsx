import { getCategories } from '@/sevices/categoryServices'
import NewTodo from './components/NewTodo'
import TodoList from './components/TodoList'
import { getTodos } from './sevices/todoService'

export default async function Home() {
  const { todos } = await getTodos()
  const {categories} = await getCategories()
  return (
    <section className='py-20'>
      <div className="mt-3">
        <h1>Todos</h1>
        <NewTodo/>
        <h2 className='text-xl font-semibold mt-10 border-b pb-2'>Todos:</h2>
        <TodoList todos={todos} categories={categories}/>
      </div>
    </section>
  )
}
