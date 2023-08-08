import { Todo } from '@prisma/client'
import Link from 'next/link'

export default async function Home() {


  return (
    <section className='py-20'>
     <Link href="/todos" >Todos</Link>
    </section>
  )
}