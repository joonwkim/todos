import prisma from '@/lib/prisma'
import { Category } from '@prisma/client'

export async function getCategories() {
    try {
        const categories = await prisma.category.findMany({
            include: {
                todos: true,
            }
        })
        return  {categories} 
    } catch (error) {
        return ({ error })
    }
}
export async function createCategory(name:string){
    try{
        const category = await prisma.category.create({data:{name}})
        return {category}
    }
    catch(error){
        return({error})
    }
}
export async function createCategoryByUser(input: Category){
    try{
        const category = await prisma.category.create({data: input, include:{todos:true}})
        return {category}
    }
    catch(error){
        return({error})
    }
}