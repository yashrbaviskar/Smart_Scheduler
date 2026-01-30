import { openai } from "@ai-sdk/openai"
import { streamText } from "ai"
import { currentUser } from "@clerk/nextjs/server"

// Allow streaming responses up to 30 seconds
export const maxDuration = 30

export async function POST(req: Request) {
  try {
    const user = await currentUser()

    if (!user) {
      return new Response("Unauthorized", { status: 401 })
    }

    const { messages } = await req.json()

    const result = streamText({
      model: openai("gpt-4o"),
      system: `You are LinkCode AI Assistant, a helpful AI for the LinkCode class scheduling platform. 

Your role is to help students and teachers with:
- Finding suitable matches based on subjects and availability
- Scheduling classes and managing time slots
- Answering questions about the platform
- Providing learning and teaching tips
- Helping resolve scheduling conflicts

User context:
- Name: ${user.firstName} ${user.lastName}
- Email: ${user.emailAddresses[0]?.emailAddress}

Be friendly, professional, and focus on educational scheduling and matching. Keep responses concise and actionable.`,
      messages,
    })

    return result.toDataStreamResponse()
  } catch (error) {
    console.error("Chat API error:", error)
    return new Response("Internal Server Error", { status: 500 })
  }
}
