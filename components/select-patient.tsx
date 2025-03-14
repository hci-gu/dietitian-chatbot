import { IconArrowRight } from '@/components/ui/icons'
import { getPatients, Patient } from '@/lib/pocketbase'
import Link from 'next/link'

const PatientCard = ({ patient }: { patient: Patient }) => {
  return (
    <Link
      href={`/patient/${patient.id}`}
      className="block bg-white border border-gray-200 rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow"
    >
      <div className="flex items-center">
        <img
          className="w-16 h-16 rounded-full border border-gray-200 dark:border-gray-800"
          src={patient.image}
        />
        <div className="ml-4 flex flex-col flex-1">
          <span className="text-lg font-medium text-gray-900">
            {patient.name}
          </span>
          <span className="text-sm text-gray-600">{patient.description}</span>
        </div>
        <IconArrowRight className="w-5 h-5 text-gray-500" />
      </div>
      {patient.remittance && (
        <p
          className="mt-2 text-sm text-gray-700"
          dangerouslySetInnerHTML={{
            __html: patient.remittance
          }}
        ></p>
      )}
    </Link>
  )
}

export async function SelectPatient() {
  const patients = await getPatients()

  return (
    <div className="mx-auto max-w-screen-2xl">
      <div className="p-8">
        <h1 className="mb-2 text-lg font-semibold">
          Välkommen till DietistGPT
        </h1>
        <p className="mb-2 leading-normal text-muted-foreground"></p>
        <p className="leading-normal text-muted-foreground">
          Börja en konversation genom att välja en av följande patienter att
          prata med
        </p>
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
          {patients.map((patient, index) => (
            <PatientCard key={index} patient={patient} />
          ))}
        </div>
      </div>
    </div>
  )
}
