import { useRouter } from 'next/router';
import routes from '@/utils/routes';
import { useEffect } from 'react';

export default function Custom404() {
  const router = useRouter();

  useEffect(() => {
    router.push(routes.home());
  }, [router]);
}
