import { UseChatHelpers } from 'ai/react'

import { Button } from '@/components/ui/button'
import { ExternalLink } from '@/components/external-link'
import { IconArrowRight } from '@/components/ui/icons'
import { Patient, patients } from '@/lib/patients'

// example messages for a dietitian to start a conversation with a patient
const exampleMessages = [
  'Hej, hur mår du?',
  'Hej, vad har du ätit idag?',
  'Hej, varför har du kommit hit idag?'
]

export function EmptyScreen({
  patient,
  setInput
}: Pick<UseChatHelpers, 'setInput'> & { patient: Patient }) {
  if (!patient) {
    return (
      <div className="mx-auto max-w-2xl px-4">
        <div className="rounded-lg border bg-background p-8">
          <h1 className="mb-2 text-lg font-semibold">
            Patienten kunde inte hittas
          </h1>
          <p className="leading-normal text-muted-foreground">
            Patienten du försöker nå kunde inte hittas. Kontrollera att du har
            rätt länk och försök igen.
          </p>
          <div className="mt-4 flex items-center space-x-2">
            <ExternalLink href="/">Gå till startsidan</ExternalLink>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-2xl px-4">
      <div className="rounded-lg border bg-background p-8">
        <h1 className="mb-2 text-lg font-semibold">
          Börja din chat med {patient.name}
        </h1>
        <p className="mb-2 leading-normal text-muted-foreground"></p>
        <p className="leading-normal text-muted-foreground">
          {patient.description}
        </p>
        <p className="leading-normal text-muted-foreground">
          <strong>Remitterad för:</strong> {patient.remittance}
        </p>
        <div className="mt-4 flex flex-col items-start space-y-2">
          {exampleMessages.map((message, index) => (
            <Button
              key={index}
              variant="link"
              className="h-auto p-0 text-base"
              onClick={() => setInput(message)}
            >
              <IconArrowRight className="mr-2 text-muted-foreground" />
              {message}
            </Button>
          ))}
        </div>
      </div>
    </div>
  )
}
