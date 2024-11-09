import { Hono } from "hono"
import { zValidator } from '@hono/zod-validator'
import { date, z } from "zod"

const noteSchema = z.object({
    id: z.number().int().positive().min(1),
    title: z.string(),
    body: z.string()
})

type Note = z.infer<typeof noteSchema>

// define a schema for the note
const createNoteSchema = noteSchema.omit({ id: true })


// generate some fake notes
const fakeNotes: Note[] = [
    { id: 1, title: "Note 1", body: "This is the body of note 1" },
    { id: 2, title: "Note 2", body: "This is the body of note 2" },
    { id: 3, title: "Note 3", body: "This is the body of note 3" },
    { id: 4, title: "Note 4", body: "This is the body of note 4" },
    { id: 5, title: "Note 5", body: "This is the body of note 5" }
];

export const notesRoutes = new Hono()
.get('/', (c) =>{
    return c.json({ notes: fakeNotes})
})
.post('/', zValidator("json", createNoteSchema), async (c) =>{
    const note = await c.req.json()
    fakeNotes.push({...note, id: fakeNotes.length + 1})
    c.status(201)
    return c.json(note)
})
.get('/:id{[0-9]+}', (c) =>{
    const id = Number.parseInt(c.req.param('id'))
    const note = fakeNotes.find(note => note.id === id)
    if(note){
        return c.json(note)
    }
    return c.notFound()
})
.delete('/:id{[0-9]+}', (c) =>{
    const id = Number.parseInt(c.req.param('id'))
    const noteIndex = fakeNotes.findIndex(note => note.id === id)
    if(noteIndex >= 0){
        fakeNotes.splice(noteIndex, 1)
        return c.json({ message: "Note deleted successfully"})
    }
    return c.notFound()
    
})
// .put