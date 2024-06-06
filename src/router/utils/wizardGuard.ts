import {
  NavigationGuardNext,
  RouteLocationNormalized
} from 'vue-router';

export function wizardGuard(
  to: RouteLocationNormalized,
  _from: RouteLocationNormalized,
  next: NavigationGuardNext
): void {
  const wizardCompleted = localStorage.getItem('wizardCompleted');

  if (!wizardCompleted && to.name !== 'Wizard') {
    next({ name: 'Wizard' });
  } else {
    next();
  }
}