import { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';

import useAuthStore from '@/store/auth';

export async function googleAuthGuard(
  to: RouteLocationNormalized,
  _from: RouteLocationNormalized,
  next: NavigationGuardNext
): Promise<void> {

  console.log('entramos en guard')
  const authStore = useAuthStore();

  await authStore.checkAuth();

  console.log('user', authStore?.user)

  const isAuthenticated = authStore.user !== null;

  console.log('isAuthenticated', isAuthenticated)

  if (isAuthenticated && (to.name === 'Login' || to.name === 'Register')) {
    console.log('condition', isAuthenticated && (to.name === 'Login' || to.name === 'Register'))
    next({ path: '/app/restaurant-info' });
    return;
  } else if (!isAuthenticated && to.path.startsWith('/app')) {
    next({ path: '/login' });
    return;
  } else {
    next();
    return;
  }
}