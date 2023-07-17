'use server'

import { revalidatePath } from "next/cache"
import { createUser,   } from "../../sevices/userService"

export async function createUserAction(input:UserType) {
    await createUser(input)
    revalidatePath('/oneToOne')
}
