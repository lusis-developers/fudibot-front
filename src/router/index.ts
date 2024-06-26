import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

import { googleAuthGuard } from './utils/authGuard';

// import layout components
const AppLayout = () => import('@/layouts/AppLayout.vue');

// import web views
const Login = () => import('@/views/Login.vue');
const Register = () => import('@/views/Register.vue');
const Authorize = () => import('@/views/Authorize.vue');
const Wizard = () => import('@/views/Wizard/Index.vue');
const Meals = () => import('@/views/app/MealsView/Index.vue');
const Drinks = () => import('@/views/app/DrinksView/Index.vue');
const Integrations = () => import('@/views/app/Integrations.vue');
const OrderHistory = () => import('@/views/app/OrderHistory/Index.vue');
const DeliverySetup = () => import('@/views/app/DeliverySetup.vue');
const InvoiceHistory = () => import('@/views/app/InvoiceHistory.vue');
const RestaurantInfo = () => import('@/views/app/RestaurantInfo/Index.vue');

const routes: Array<RouteRecordRaw> = [
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      title: 'Inicia Sesión 🚀',
    },
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
    meta: {
      title: 'Regístrate 🚀',
    },
  },
  {
    path: '/authorize',
    name: 'Authorize',
    component: Authorize,
    meta: {
      title: 'Authorize 🚀',
    },
  },
  {
    path: '/wizard',
    name: 'Wizard',
    component: Wizard,
    meta: {
      title: 'Primeros Pasos',
    },
  },
  {
    path: '/app',
    name: 'App',
    component: AppLayout,
    children: [
      {
        path: 'restaurant-info',
        name: 'Restaurant Info',
        component: RestaurantInfo,
        meta: {
          title: 'Información del local',
        },
      },
      {
        path: 'invoice-history',
        name: 'InvoiceHistory',
        component: InvoiceHistory,
        meta: {
          title: 'Facturas',
        },
      },
      {
        path: 'order-history',
        name: 'OrderHistory',
        component: OrderHistory,
        meta: {
          title: 'Ordenes',
        },
      },
      {
        path: 'delivery-setup',
        name: 'DeliverySetup',
        component: DeliverySetup,
        meta: {
          title: 'Configuración de pedidos',
        },
      },
      {
        path: 'meals',
        name: 'Meals',
        component: Meals,
        meta: {
          title: 'Platillos 🍛',
        },
      },
      {
        path: 'drinks',
        name: 'Drinks',
        component: Drinks,
        meta: {
          title: 'Bebidas 🥤',
        },
      },
      {
        path: 'integrations',
        name: 'Integrations',
        component: Integrations,
        meta: {
          title: 'Integraciones',
        },
      }
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to, from, next) => {
  document.title = to.meta.title as string;

  await googleAuthGuard(to, from, next);
});

export default router;
