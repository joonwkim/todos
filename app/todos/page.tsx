import { Todo } from '@prisma/client'
import TodoTable from '../components/todos/todoTable'
import { getRootTodosOrderBy, getTodoSelected } from '../sevices/todoService'

export default async function Home({ searchParams }: {
  searchParams: {
    checked: string,
    orderBy: string,
    propertyName: string,
  }
}) {
  const todos = await getRootTodosOrderBy(searchParams.checked, searchParams.orderBy, searchParams.propertyName) as Array<Todo>
  const selectedTodos = await getTodoSelected() as Array<Todo>

  return (
    <section className='py-20'>
      <div className="mt-3">
        <TodoTable todos={todos} selectedItems={selectedTodos} />
      </div>
    </section>
  )
}
