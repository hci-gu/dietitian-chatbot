import PocketBase, { RecordModel } from 'pocketbase'

const pb = new PocketBase(process.env.PB_URL)
pb.autoCancellation(false)

export const convertFileToUrl = (
  collectionId: string,
  recordId: string,
  filename: string
) => `${process.env.PB_URL}/api/files/${collectionId}/${recordId}/${filename}`

export interface Patient {
  id: string
  name: string
  description: string
  remittance: string
  addtional_info: string
  start_phrase: string
  prompt: string
  image: string
}

// const richTextToString = (richText: any): string => {
//   return 'text text text text \n text text'
//   return richText.map((block: any) => block.text).join(' ')
// }

const mapPatient = (patient: RecordModel): Patient => {
  return {
    id: patient.id,
    name: patient.name,
    description: patient.description,
    remittance: patient.remittance,
    addtional_info: patient.addtional_info,
    start_phrase: patient.start_phrase,
    prompt: patient.prompt,
    image: convertFileToUrl(patient.collectionId, patient.id, patient.image)
  }
}

export const getPatients = async (): Promise<Patient[]> => {
  const patients = await pb.collection('patients').getFullList()
  return patients.map(mapPatient)
}

export const getPatient = async (id: string): Promise<Patient> => {
  const patient = await pb.collection('patients').getOne(id)
  return mapPatient(patient)
}
