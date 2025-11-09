import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')
  const sessionId = requestUrl.searchParams.get('session_id')

  if (code) {
    const supabase = await createClient()
    const { data, error } = await supabase.auth.exchangeCodeForSession(code)

    if (!error && data.user && sessionId) {
      // If there's a session_id from Stripe, link the subscription
      try {
        await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/link-subscription`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            userId: data.user.id,
            sessionId,
          }),
        });
      } catch (err) {
        console.error('Failed to link subscription in callback:', err);
      }
    }
  }

  // Redirect to dashboard after successful auth
  return NextResponse.redirect(new URL('/dashboard', request.url))
}