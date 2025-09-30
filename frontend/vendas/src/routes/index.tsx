import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
    loader: ()=>{
        window.location.href = '/sales'
    }
})

