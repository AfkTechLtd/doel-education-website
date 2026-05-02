import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  const next = searchParams.get('next') ?? '/student'

  if (code) {
    const supabase = await createClient()
    const { error } = await supabase.auth.exchangeCodeForSession(code)

    if (!error) {
      // Ensure the Prisma user record exists (safety net in case register API was skipped)
      const { data: { user: supabaseUser } } = await supabase.auth.getUser()

      if (supabaseUser) {
        const existing = await prisma.user.findUnique({
          where: { supabaseId: supabaseUser.id },
        })

        if (!existing) {
          const name =
            supabaseUser.user_metadata?.name ||
            supabaseUser.email?.split('@')[0] ||
            'Student'
          const phone = supabaseUser.user_metadata?.phone ?? null

          await prisma.user.create({
            data: {
              supabaseId: supabaseUser.id,
              email: supabaseUser.email!,
              name,
              phone,
              role: 'STUDENT',
              studentProfile: {
                create: { phone },
              },
            },
          })
        }
      }

      return NextResponse.redirect(`${origin}${next}`)
    }
  }

  return NextResponse.redirect(`${origin}/?error=AuthFailed`)
}
