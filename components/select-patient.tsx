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
        <div className="mt-4 flex flex-col items-start space-y-4">
          {patients.map((patient, index) => (
            <Link
              href={`/patient/${patient.slug}`}
              key={index}
              className="h-auto p-0 flex items-center text-base w-full hover:bg-gray-100"
            >
              <IconArrowRight className="text-muted-foreground w-4 h-4" />
              <div className="ml-2 flex flex-col w-11/12">
                <span>
                  <strong>{patient.name}</strong>
                  <span className="ml-2 text-sm text-muted-foreground">
                    ({patient.description})
                  </span>
                </span>
                <span className="text-sm">{patient.remittance}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
