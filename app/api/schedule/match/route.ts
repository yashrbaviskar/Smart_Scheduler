import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { areIntervalsOverlapping } from 'date-fns/areIntervalsOverlapping';
import { parseISO } from 'date-fns/parseISO';
 
const availabilitySchema = z.object({
  // Remove the brackets and just define the property
  monday: z.array(z.object({ start: z.string(), end: z.string() })),
});

export async function POST(req: NextRequest) {
  const body = await req.json();
  const parsed = z
    .object({
      studentAvailability: availabilitySchema,
      teacherAvailability: availabilitySchema,
    })
    .safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
  }
  const { studentAvailability, teacherAvailability } = parsed.data;
  const matches: Array<{ day: string; start: string; end: string }> = [];
 for (const day in studentAvailability) {
  // Use 'as keyof typeof' to tell TS this string is a valid key
  const teacherDaySlots = teacherAvailability[day as keyof typeof teacherAvailability];
  const studentDaySlots = studentAvailability[day as keyof typeof studentAvailability];

  if (teacherDaySlots && studentDaySlots) {
    for (const s of studentDaySlots) {
      for (const t of teacherDaySlots) {
        if (
          areIntervalsOverlapping(
            { start: parseISO(s.start), end: parseISO(s.end) },
            { start: parseISO(t.start), end: parseISO(t.end) }
          )
        ) {
          matches.push({ day, start: s.start, end: s.end });
        }
      }
    }
  }
}
  return NextResponse.json({ matches });
}
