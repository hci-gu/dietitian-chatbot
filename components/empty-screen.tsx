import { UseChatHelpers } from 'ai/react'

import { Button } from '@/components/ui/button'
import { ExternalLink } from '@/components/external-link'
import { IconArrowRight } from '@/components/ui/icons'
import { Patient } from '@/lib/pocketbase'

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
      <div className="rounded-lg border bg-background p-4">
        <div className="flex flex-col items-center">
          <h1 className="mb-2 text-lg font-semibold">
            Börja din chat med {patient.name}
          </h1>
          <img
            className="w-32 h-32 rounded-full border border-gray-200 dark:border-gray-800"
            src={patient.image}
          />
          <p className="mt-2 leading-normal text-muted-foreground"></p>
          <p className="leading-normal text-muted-foreground">
            {patient.description}
          </p>
        </div>
        <p className="leading-normal text-muted-foreground">
          <strong>Remitterad för:</strong>{' '}
          <span dangerouslySetInnerHTML={{ __html: patient.remittance }}></span>
        </p>
        <div className="mt-4 flex flex-col items-start space-y-2">
          <span className="mb-2 text-sm text-gray-500">
            Exempel på första fråga ( Se till att byta ut XX till ditt namn om
            du väljer att börja med detta exempel ):
          </span>
          <Button
            variant="link"
            className="h-auto p-0 text-base"
            onClick={() => setInput(patient.start_phrase)}
          >
            <IconArrowRight className="mr-2 text-muted-foreground" />
            {patient.start_phrase}
          </Button>
        </div>
      </div>
    </div>
  )
}
