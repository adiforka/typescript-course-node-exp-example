import express, { ErrorRequestHandler } from 'express'
import todoRoutes from './routes/todos.routes'
import { json } from 'body-parser'

const app = express()

// parses the bodies of incoming requests
// and populates the "body" keys on the request objects
// with the parsed data
app.use(json())

// routes for this path go to todoRoutes
app.use('/todos', todoRoutes)

// error handling here
const requestHandler: ErrorRequestHandler = (err, _req, res, _next) => {
    res.status(500).json({ message: err.message })
}

app.use(requestHandler)

app.listen(3000, () => console.log('listening on port 3000'))
