import { Hono } from "hono"
import { z } from "zod"

type Note = {
    id : number,
    title: string,
    body: string
}

// generate some fake notes
const fakeNotes: Note[] = [
    { id: 1, title: "Note 1", body: "This is the body of note 1" },
    { id: 2, title: "Note 2", body: "This is the body of note 2" },
    { id: 3, title: "Note 3", body: "This is the body of note 3" },
    { id: 4, title: "Note 4", body: "This is the body of note 4" },
    { id: 5, title: "Note 5", body: "This is the body of note 5" }
];

// define a schema for the note
const noteSchema = z.object({
    title: z.string(),
    body: z.string()
});

export const notesRoutes = new Hono()
.get('/', (c) =>{
    return c.json({ notes: []})
})
.post('/', async (c) =>{
    const data = await c.req.json()
    const note = noteSchema.parse(data)
    console.log(note.title)
    console.log(note)
    return c.json(note)
});

// .delete
// .put