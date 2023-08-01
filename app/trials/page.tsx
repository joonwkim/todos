'use client'
import Image from 'next/image'
import Link from 'next/link'
import vercel from '@/public/vercel.png'
import type { PropsWithChildren } from 'react'



const TrialPage = () => (
    <ul className="list-group mt-3">
         <li className="list-group-item">
            <Link href="/trials/table">Table</Link>
        </li>
        <li className="list-group-item">
            <Link href="/trials/toast">Toast</Link>
        </li>
    </ul>

)

export default TrialPage
