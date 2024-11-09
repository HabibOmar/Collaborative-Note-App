import { Hono } from 'hono'
import { logger } from 'hono/logger'
import { notesRoutes } from './routes/notes'


const app = new Hono()
app.use(logger())


app.get('/test', (c) => 
    c.json({ message: 'Test from bun' })
)

app.route("/api/notes", notesRoutes)

export default app