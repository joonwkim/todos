import { Todo } from '@prisma/client'
import { getCategories } from '../app/sevices/categoryServices'
import NewTodo from './components/NewTodo'
import TodoList from './components/TodoList'
import { getTodos, getTodosByComplete } from './sevices/todoService'
import TodoTable from './components/todoTable'
export default async function Home({ searchParams }: {
  searchParams: {
    checked: string
  }
}) {
  const value = searchParams.checked

  console.log('value', value);

  const { todos } = await getTodosByComplete(searchParams.checked)

  console.log('searchParams', JSON.stringify(searchParams));
  // console.log('todos:', JSON.stringify( todos));
  return (
    <section className='py-20'>
      <div className="mt-3">
        <h1>Todos</h1>
        <NewTodo />
        <h2 className='text-xl font-semibold mt-10 border-b pb-2'>Todos<span className='fs-6 ms-5'>-  check in the box when complete</span></h2>
        <TodoTable todos={todos} />
        {/* <TodoList todos={todos} categories={categories} /> */}
      </div>
    </section>
  )
}
