'use client'
import { User } from '@prisma/client'
import { useTransition } from 'react'
import styles from './page.module.css'

type UserItemProps = {
  user: User
}

const UserItem = ({ user }: UserItemProps) => {

  const [isPending, startTransition] = useTransition()
  return (
    <li className='list-group-item border-0 p-0'>
      {JSON.stringify(user)}
    </li>
  )
}

export default UserItem