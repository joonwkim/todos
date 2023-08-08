import { Todo } from '@prisma/client'
import Link from 'next/link'
import { redirect } from 'next/navigation'

export default async function Home() {
  redirect('/todos')
  return (
    <section className='py-20'>
     <Link href="/todos" >Todos</Link>
    </section>
  )
}