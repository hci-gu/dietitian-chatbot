import { notFound } from 'next/navigation'
import { Chat } from '@/components/chat'
import { nanoid } from '@/lib/utils'
import { getPatient } from '@/lib/pocketbase'

export interface PatientPageProps {
  params: {
    id: string
  }
}

export default async function PatientPage({ params }: PatientPageProps) {
  const patient = await getPatient(params.id)
  const id = nanoid()

  if (!patient) {
    notFound()
  }

  return <Chat patient={patient} id={id} />
}
