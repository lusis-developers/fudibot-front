import { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';

import useAuthStore from '@/store/auth';

export async function googleAuthGuard(
  to: RouteLocationNormalized,
  _from: RouteLocationNormalized,
  next: NavigationGuardNext
): Promise<void> {

  const authStore = useAuthStore();

  const isAuthenticated = await authStore.checkAuth();

  if (isAuthenticated && (to.name === 'Login' || to.name === 'Register' || to.name === 'Authorize')) {
    next({ path: '/app/restaurant-info' });
    return;
  } else if (!isAuthenticated && (to.path.startsWith('/app') || to.name === 'Home')) {
    next({ path: '/login' });
    return;
  } else {
    next();
    return;
  }
}