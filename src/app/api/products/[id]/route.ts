import { NextResponse } from 'next/server'
import { getProductBySlug } from '@/services/api'

type Params = {
  params: Promise<{
    id: string
  }>
}

export async function GET(request: Request, { params }: Params) {
  const { id } = await params
  const response = await getProductBySlug(id)
  return NextResponse.json(response)
}
