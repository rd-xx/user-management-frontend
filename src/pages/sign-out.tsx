import { useAppDispatch } from '@/utils/stores';
import { clear } from '@/slices/session.slice';
import { useRouter } from 'next/router';
import routes from '@/utils/routes';
import { useEffect } from 'react';

export default function SignOut() {
  const router = useRouter(),
    dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(clear());
    void router.push(routes.home());
  }, [dispatch, router]);
}
