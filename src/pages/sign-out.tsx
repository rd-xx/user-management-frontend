import { useAppDispatch } from '../utils/stores';
import { clear } from '../slices/session.slice';
import { useRouter } from 'next/router';
import routes from '../utils/routes';
import { useEffect } from 'react';

export default function SignOut() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(clear());
    router.push(routes.home());
  }, [dispatch, router]);
}
