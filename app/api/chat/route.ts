import { OpenAIStream, StreamingTextResponse } from 'ai'
import { OpenAIClient, AzureKeyCredential } from '@azure/openai'
import { sendAnalytics } from '@/lib/analytics'
import { messagesForPatient } from '@/lib/patients'

const { AZURE_OPENAI_API_KEY, AZURE_ENDPOINT } = process.env

export const runtime = 'edge'

const openai = new OpenAIClient(
  AZURE_ENDPOINT ?? 'https://saikn-oai-001.openai.azure.com',
  new AzureKeyCredential(AZURE_OPENAI_API_KEY ?? '')
)
const DEPLOYMENT_NAME = 'GPT-4o-001'

export async function POST(req: Request) {
  const { messages, patient } = await req.json()
  const instructionMessages = messagesForPatient(patient.slug)
  const userId = req.headers.get('x-user-id') ?? ''
  const chatId = req.headers.get('x-chat-id') ?? ''
  const lastMessage = messages.length ? messages[messages.length - 1] : null
  // sendAnalytics({ ...lastMessage, userId, chatId })

  const response = await openai.streamChatCompletions(DEPLOYMENT_NAME, [
    ...instructionMessages,
    ...messages
  ])

  // Convert the response into a friendly text-stream
  const stream = OpenAIStream(response, {
    onFinal(completion) {
      sendAnalytics({
        role: 'assistant',
        message: completion,
        userId,
        chatId
      })
    }
  })
  //   Respond with the stream
  return new StreamingTextResponse(stream)
}
