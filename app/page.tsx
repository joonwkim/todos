import { Todo } from '@prisma/client'
import { getRootTodosOrderBy, } from './sevices/todoService'
import TodoTable from './components/todoTable'
import AddNewTodo from './components/addNewTodo'

export default async function Home({ searchParams }: {
  searchParams: {
    checked: string,
    orderBy: string,
    propertyName: string,
  }
}) {
  console.log('searchParams', JSON.stringify(searchParams));
  const todos = await getRootTodosOrderBy(searchParams.checked, searchParams.orderBy, searchParams.propertyName) as Array<Todo>
  // console.log('todos:', JSON.stringify( todos, null, 2));
  const getItemSelected = () => {
    const selectedItems = todos?.filter((item) => item.isSelected === true)
    return selectedItems;
  }

  return (
    <section className='py-20'>
      <div className="mt-3">
        <h1>Todos</h1>
        <AddNewTodo selectedItems={getItemSelected()} />
        <h2 className='text-xl font-semibold mt-10 border-b pb-2'>Todos<span className='fs-6 ms-5'>-  check in the box when complete</span></h2>
        <TodoTable todos={todos} />
      </div>
    </section>
  )
}
