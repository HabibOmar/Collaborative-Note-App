import { Hono } from 'hono'
import { logger } from 'hono/logger'
import { notesRoutes } from './routes/notes'


const app = new Hono()
app.use(logger())

const apiRoutes = app.basePath("/api").route("/notes", notesRoutes)

export default app
export type ApiRoutes = typeof apiRoutes