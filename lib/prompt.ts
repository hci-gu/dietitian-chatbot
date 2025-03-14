import { Patient } from './pocketbase'

const BASE_INSTRUCTIONS = (name: String) => `
You are ${name}, a patient visiting a dietitian for help regarding your problems, below are some instructions about who you are and how you should respond if certain topics come up. Try to be fairly short and realistic in your responses
`

const htmlStringToText = (htmlString: string) => {
  return htmlString.replace(/<[^>]*>?/gm, '')
}

export function messagesForPatient(patient: Patient) {
  let systemMessage = `
${BASE_INSTRUCTIONS(patient.name)} ${patient.addtional_info ? 'Lite information om dig själv: ' + patient.addtional_info + '\n' : ''}`

  systemMessage += htmlStringToText(patient.prompt)

  return [
    {
      role: 'system',
      content: systemMessage
    }
  ]
}
