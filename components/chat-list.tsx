import { type Message } from 'ai'

import { Separator } from '@/components/ui/separator'
import { ChatMessage, ChatMessageLoading } from '@/components/chat-message'
import { Patient } from '@/lib/pocketbase'

export interface ChatList {
  messages: Message[]
  patient: Patient
  isLoading: boolean
}

function lastMessageIsFromUser(messages: Message[]) {
  if (messages.length === 0) {
    return false
  }

  const lastMessage = messages[messages.length - 1]
  return lastMessage.role === 'user'
}

export function ChatList({ messages, isLoading, patient }: ChatList) {
  if (!messages.length) {
    return null
  }

  return (
    <div className="relative mx-auto max-w-2xl px-4">
      {messages.map((message, index) => (
        <div key={index}>
          <ChatMessage patient={patient} message={message} />
          {index < messages.length - 1 && (
            <Separator className="my-4 md:my-8" />
          )}
        </div>
      ))}
      {isLoading && lastMessageIsFromUser(messages) && (
        <div>
          <Separator className="my-4 md:my-8" />
          <ChatMessageLoading patient={patient} />
        </div>
      )}
    </div>
  )
}
