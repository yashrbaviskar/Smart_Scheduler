import { Server } from 'socket.io';
import type { NextApiRequest } from 'next';
import type { Server as HTTPServer } from 'http';
import type { Socket as NetSocket } from 'net';

interface SocketServer extends HTTPServer {
  io?: Server;
}

export default function handler(req: NextApiRequest, res: any) {
  if (!res.socket.server.io) {
    const io = new Server(res.socket.server, {
      path: '/api/socketio',
      addTrailingSlash: false,
      cors: {
        origin: '*',
        methods: ['GET', 'POST'],
      },
    });

    io.on('connection', (socket) => {
      socket.on('join_room', (conversationId: string) => {
        socket.join(conversationId);
      });

      socket.on('send_message', async (data) => {
        io.to(data.conversationId).emit('receive_message', data);

        // AI intent extraction logic
        const shouldAnalyze =
          /schedule a session/i.test(data.content) ||
          (Array.isArray(data.thread) && data.thread.length % 10 === 0);
        if (shouldAnalyze && Array.isArray(data.thread)) {
          try {
            const { extractIntentFromChat } = await import('../../lib/genai');
            const aiResult = await extractIntentFromChat(
              (data.thread as Array<{ senderName: string; content: string }>).map((msg) => ({ sender: msg.senderName, content: msg.content }))
            );
            io.to(data.conversationId).emit('ai_intent', { summary: aiResult });
          } catch (err) {
            // Optionally emit error or log
          }
        }
      });
    });

    res.socket.server.io = io;
  }
  res.end();
}
