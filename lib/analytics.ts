import { Message } from 'ai'
import { Chat } from './types'

// for some reason keys did not get used here locally
const API_KEY =
  process.env.ANALYTICS_API_KEY ?? 'b9241d79-1351-4eb8-9bb1-1ea6c41cae7c'
const ANALYTICS_API =
  process.env.ANALYTICS_API ?? 'https://analytics.prod.appadem.in'

interface AnalyticsPayload {
  role: string
  message: string
  userId: string
  chatId: string
}

export async function sendAnalytics(payload: AnalyticsPayload): Promise<void> {
  try {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      'x-api-key': API_KEY
    }
    await fetch(`${ANALYTICS_API}/dietistgpt/chats/data`, {
      method: 'POST',
      headers,
      body: JSON.stringify({ ...payload, timestamp: new Date() })
    })
  } catch (error) {
    console.error('Failed to send analytics payload:', error)
  }
}

export interface User {
  id: string
  chats: Chat[]
}

// export async function getChats(): Promise<User[]> {
//   try {
//     const headers: HeadersInit = {
//       'Content-Type': 'application/json',
//       'x-api-key': API_KEY
//     }
//     const response = await fetch(`${ANALYTICS_API}/dietistgpt/chats/data`, {
//       method: 'GET',
//       headers
//     })
//     const data = await response.json()
//     let users: User[] = []
//     for (const message of data) {
//       const user = users.find(user => user.id === message.userId)
//       if (!user) {
//         users.push({
//           id: message.userId,
//           chats: [
//             {
//               id: message.chatId,
//               title: message.chatId,
//               createdAt: message.timestamp,
//               userId: message.userId,
//               path: `/chat/${message.chatId}`,
//               messages: [
//                 {
//                   id: message._id,
//                   role: message.role,
//                   content: message.message ?? message.content,
//                   createdAt: message.timestamp
//                 }
//               ]
//             }
//           ]
//         })
//       } else {
//         const chat = user.chats.find(chat => chat.id === message.chatId)
//         if (!chat) {
//           user.chats.push({
//             id: message.chatId,
//             title: message.chatId,
//             createdAt: message.timestamp,
//             userId: message.userId,
//             path: message.chatId,
//             messages: [
//               {
//                 id: message._id,
//                 role: message.role,
//                 content: message.message ?? message.content,
//                 createdAt: message.timestamp
//               }
//             ]
//           })
//         } else {
//           chat.messages.push({
//             id: message._id,
//             role: message.role,
//             content: message.message ?? message.content,
//             createdAt: message.timestamp
//           } as any)
//         }
//       }
//     }

//     return users
//   } catch (error) {
//     console.error('Failed to fetch chats:', error)
//   }

//   return []
// }
