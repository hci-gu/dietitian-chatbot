'use client'

import { notFound } from 'next/navigation'
import { Chat } from '@/components/chat'
import { patients } from '@/lib/patients'
import { useMemo } from 'react'
import { nanoid } from '@/lib/utils'

export interface PatientPageProps {
  params: {
    slug: string
  }
}

export default function PatientPage({ params }: PatientPageProps) {
  const patient = patients.find((p: any) => p.slug === params.slug)
  const id = useMemo(() => nanoid(), [])

  if (!patient) {
    notFound()
  }

  return <Chat patient={patient} id={id} />
}
