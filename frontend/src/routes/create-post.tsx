import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/create-post')({
  component: createPost,
})

function createPost() {
  return <div className="p-2">Create a new post</div>
}
