import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import Chat from '@/lib/chat.model';
import { extractIntentFromChat } from '@/lib/genai';

const bodySchema = z.object({
  conversationId: z.string(),
  n: z.number().min(1).max(50).default(10),
});

export async function POST(req: NextRequest) {
  const body = await req.json();
  const parsed = bodySchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
  }
  const { conversationId, n } = parsed.data;
  const chat = await Chat.findById(conversationId);
  if (!chat) return NextResponse.json({ error: 'Chat not found' }, { status: 404 });
  const lastN = chat.messages.slice(-n);
  const aiResult = await extractIntentFromChat(
    lastN.map((m: any) => ({ sender: m.senderId.toString(), content: m.content }))
  );
  return NextResponse.json({ suggestion: aiResult });
}
