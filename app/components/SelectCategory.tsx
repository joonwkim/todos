'use client'
import React, { Component } from 'react'
import { getCategories } from '../services/categoryServices'
import { Category } from '@prisma/client'
import { Form } from 'react-bootstrap'
type CategoryProps ={
    onChange:any
    categories?:Category[] | undefined
}

export   const  SelectCategory = (props:CategoryProps) =>{
   
    return (<>
        <div>
            <Form.Control as="select" onChange={props.onChange.bind(this)} >
                {props.categories?.map(category=>(
                    <option key={category.id} value={category.id}>{category.name}</option>
                ))}
            </Form.Control>
        </div>
    </>
    );
}

export default SelectCategory