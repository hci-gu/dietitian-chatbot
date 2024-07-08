import { IconArrowRight } from '@/components/ui/icons'
import { patients } from '@/lib/patients'
import Link from 'next/link'

export function SelectPatient() {
  return (
    <div className="mx-auto max-w-2xl px-4">
      <div className="rounded-lg border bg-background p-8">
        <h1 className="mb-2 text-lg font-semibold">
          Välkommen till DietistGPT
        </h1>
        <p className="mb-2 leading-normal text-muted-foreground"></p>
        <p className="leading-normal text-muted-foreground">
          Börja en konversation genom att välja en av följande patienter att
          prata med
        </p>
        <div className="mt-4 flex flex-col items-start space-y-2">
          {patients.map((patient, index) => (
            <Link
              href={`/patient/${patient.slug}`}
              key={index}
              className="h-auto p-0 text-base flex"
            >
              <IconArrowRight className="mr-2 text-muted-foreground" />
              <div>{patient.name}</div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
