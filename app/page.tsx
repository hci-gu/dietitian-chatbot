'use client'

import { nanoid } from '@/lib/utils'
import { Chat } from '@/components/chat'
import { userHasAcceptedLogging } from './actions'
import { AcceptLogging } from '@/components/accept-logging'
import { SelectPatient } from '@/components/select-patient'

export default function IndexPage() {
  const id = nanoid()

  if (!userHasAcceptedLogging()) {
    return <AcceptLogging />
  }

  return (
    <div className="flex justify-center items-center h-full">
      <SelectPatient />
    </div>
  )
}
