import { createClient } from '@/lib/supabase/middleware';
import { NextRequest } from 'next/server';

export async function proxy(request: NextRequest) {
  const { supabase, response } = createClient(request);

  await supabase.auth.getUser();

  return response;
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
