import { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';

import useAuthStore from '@/store/auth';

export async function googleAuthGuard(
  to: RouteLocationNormalized,
  _from: RouteLocationNormalized,
  next: NavigationGuardNext
): Promise<void> {
  const authStore = useAuthStore();

  const isAuthenticated = authStore.user !== null;

  if (isAuthenticated && (to.name === 'Login' || to.name === 'Register')) {
    next({ path: '/app/restaurant-info' });
  } else if (!isAuthenticated && to.path.startsWith('/app')) {
    next({ path: '/login' });
  } else {
    next();
  }
}