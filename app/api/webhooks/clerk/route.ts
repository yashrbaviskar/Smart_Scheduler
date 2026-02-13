import { NextRequest, NextResponse } from 'next/server';
import User from '@/lib/user.model';

export async function POST(req: NextRequest) {
  const event = await req.json();
  if (event.type === 'user.created') {
    const { id, first_name, last_name, email_addresses } = event.data;
    await User.create({
      clerkId: id,
      role: 'Student', // Default, update as needed
      name: `${first_name} ${last_name}`,
      email: email_addresses[0]?.email_address,
      preferences: { subjects: [], availability: {} },
    });
  }
  return NextResponse.json({ received: true });
}
