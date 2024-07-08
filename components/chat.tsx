'use client'

import { useChat, experimental_useAssistant, type Message } from 'ai/react'

import { cn } from '@/lib/utils'
import { ChatList } from '@/components/chat-list'
import { ChatPanel } from '@/components/chat-panel'
import { EmptyScreen } from '@/components/empty-screen'
import { ChatScrollAnchor } from '@/components/chat-scroll-anchor'
import { useEffect } from 'react'
import { toast } from 'react-hot-toast'
import { usePathname } from 'next/navigation'
import { getUserId, state } from '@/app/actions'
import { Patient } from '@/lib/patients'

export interface ChatProps extends React.ComponentProps<'div'> {
  initialMessages?: Message[]
  patient: Patient
  id?: string
}

const roleToColorMap: Record<Message['role'], string> = {
  system: 'red',
  user: 'black',
  function: 'blue',
  assistant: 'green',
  data: 'orange',
  tool: 'purple'
}

export function Chat({ id, initialMessages, patient, className }: ChatProps) {
  const path = usePathname()
  const saveChat = state((s: any) => s.saveChat)
  const { messages, append, reload, stop, isLoading, input, setInput } =
    useChat({
      initialMessages,
      id,
      body: {
        id,
        patient
      },
      headers: {
        'x-user-id': getUserId(),
        'x-chat-id': id ?? ''
      },
      onResponse(response) {
        if (response.status === 401) {
          toast.error(response.statusText)
        }
      },
      onFinish() {
        if (!path.includes('chat/')) {
          window.history.pushState({}, '', `/${id}`)
        }
      }
    })
  useEffect(() => {
    if (!messages.length) return
    const title = `Chat med ${patient.name}`
    const createdAt = Date.now()
    const path = `/${id}`
    const payload = {
      id,
      title,
      createdAt,
      path,
      messages,
      patient
    }
    saveChat(payload)
  }, [messages])
  return (
    <>
      <div className={cn('pb-[200px] pt-4 md:pt-10', className)}>
        {messages.length ? (
          <>
            <ChatList messages={messages} isLoading={isLoading} />
            <ChatScrollAnchor trackVisibility={isLoading} />
            {/* <div className="fixed top-20 right-5 invisible lg:visible">
              <div
                className="text-xs text-gray-500 bg-card p-4 rounded-lg shadow"
                style={{ width: 225 }}
              >
                <h1 className="mb-2 text-lg font-semibold">{patient.name}</h1>
                <p className="leading-normal text-muted-foreground">
                  {patient.description}
                </p>
                <p className="leading-normal text-muted-foreground">
                  <strong>Remitterad för:</strong> {patient.remittance}
                </p>
              </div>
            </div> */}
          </>
        ) : (
          <EmptyScreen patient={patient} setInput={setInput} />
        )}
      </div>
      <ChatPanel
        id={id}
        isLoading={isLoading}
        stop={stop}
        append={append}
        reload={reload}
        messages={messages}
        input={input}
        setInput={setInput}
      />
    </>
  )
}
