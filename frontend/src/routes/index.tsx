import { createFileRoute } from '@tanstack/react-router'

import { Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card"
import { useQuery } from "@tanstack/react-query"

import { api } from "@/lib/api"

export const Route = createFileRoute('/')({
  component: Index,
})

async function getAllNotes() {
  const res = await api.notes.$get()
  if (!res.ok) {
    throw new Error("Network response was not ok")
  }
  const data = await res.json()
  return data.notes
}

function Index() {
  const { isPending, error, data } = useQuery({
    queryKey: ["get-all-notes"], 
    queryFn: getAllNotes
  })

  if (isPending) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>An error has occurred: {error.message}</div>
  }

  return (
    <Card className="w-[350px] m-auto">
      <CardHeader>
        <CardTitle>Create project</CardTitle>
        <CardDescription>Deploy your new project in one-click.</CardDescription>
      </CardHeader>
      <CardContent> TO BE FILLED IN</CardContent>
    </Card>
  )
}
