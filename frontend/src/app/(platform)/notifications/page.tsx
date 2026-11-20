'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAccount } from '@/components/account/auth-provider';
import { portalHome } from '@/lib/api/account';
export default function NotificationsRedirect() {
  const { profile, phase } = useAccount(); const router = useRouter();
  useEffect(() => {
    if (profile) router.replace(`/${portalHome(profile).split('/')[1]}/notifications`);
    else if (phase !== 'loading') router.replace('/');
  }, [profile, phase, router]);
  return <p role="status">Opening notifications…</p>;
}
