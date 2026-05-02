import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server' // Your existing server client

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')

  // The `next` parameter is useful if you want to redirect them to a specific
  // page after login (e.g. they clicked a link to a protected page while logged out)
  const next = searchParams.get('next') ?? '/student'

  if (code) {
    const supabase = await createClient()

    // Exchange the secure code for an actual logged-in session
    const { error } = await supabase.auth.exchangeCodeForSession(code)

    if (!error) {
      // Success! Send them to their dashboard
      return NextResponse.redirect(`${origin}${next}`)
    }
  }

  // If there's no code or an error occurred, send them to an error page or back to login
  // You can customize this fallback URL
  return NextResponse.redirect(`${origin}/?error=AuthFailed`)
}
