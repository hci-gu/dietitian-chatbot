import { type Message } from 'ai'
import { Patient } from './patients'

export interface Chat extends Record<string, any> {
  id: string
  title: string
  patient: Patient
  createdAt: Date
  userId: string
  path: string
  messages: Message[]
  sharePath?: string
}

export type ServerActionResult<Result> = Promise<
  | Result
  | {
      error: string
    }
>
