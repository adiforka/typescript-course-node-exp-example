import { RequestHandler } from 'express'
import { Todo } from '../models/todo.model'
import { v4 as uuid } from 'uuid'

// play pretend this is db-sourced
const TODOS: Todo[] = []

export const createTodo: RequestHandler = (req, res, _next) => {
    const text = (req.body as { text: string }).text
    const newTodo = new Todo(uuid(), text)
    TODOS.push(newTodo)

    res.status(201).json({
        message: 'Created the todo',
        createdTodoId: newTodo.id,
    })
}

export const getTodos: RequestHandler = (_req, res, _next) => {
    const todosDTO = [...TODOS]
    todosDTO.sort((a, b) => (a.text < b.text ? -1 : a.text === b.text ? 1 : 0))

    res.json({ todos: todosDTO })
}

export const getTodoById: RequestHandler = (req, res, _next) => {
    const reqId = req.params.id
    const foundTodo = TODOS.find(todo => todo.id === reqId)

    if (!foundTodo) throw new Error(`No todo under id ${reqId}`)

    const { id, text } = foundTodo

    res.status(200).json({ id, text })
}

// use params typed to make sure you get the right id
export const updateTodo: RequestHandler<{ id: string }> = (req, res, _next) => {
    const id = req.params.id
    const updatedText = (req.body as { text: string }).text
    const todoIndex = TODOS.findIndex(todo => todo.id === id)

    if (todoIndex < 0) {
        throw new Error('could not find todo')
    }
    TODOS[todoIndex] = new Todo(id, updatedText)

    res.json({ message: 'todo updated', updatedTodo: TODOS[todoIndex] })
}

export const deleteTodo: RequestHandler<{ id: string }> = (req, res, _next) => {
    const id = req.params.id
    const todoIndex = TODOS.findIndex(todo => todo.id == id)

    if (todoIndex < 0) {
        throw new Error('to do with given id not found')
    }

    const deleted = TODOS.splice(todoIndex, 1)[0]

    res.status(200).json({ message: `deleted todo id ${deleted.id}` })
}
