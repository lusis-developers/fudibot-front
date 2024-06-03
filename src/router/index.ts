import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

import { googleAuthGuard } from './utils/authGuard';

// import layout components
const AppLayout = () => import('@/layouts/AppLayout.vue');

// import web views
const Login = () => import('@/views/Login.vue');
const Register = () => import('@/views/Register.vue');
const Authorize = () => import('@/views/Authorize.vue');
const RestaurantInfo = () => import('@/views/app/RestaurantInfo/Index.vue');
const InvoiceHistory = () => import('@/views/app/InvoiceHistory.vue');
const OrderHistory = () => import('@/views/app/OrderHistory.vue');
const DeliverySetup = () => import('@/views/app/DeliverySetup.vue');
const Integrations = () => import('@/views/app/Integrations.vue');

const routes: Array<RouteRecordRaw> = [
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      title: 'Inicia Sesión 🚀'
    }
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
    meta: {
      title: 'Regístrate 🚀'
    }
  },
  {
    path: '/authorize',
    name: 'Authorize',
    component: Authorize,
    meta: {
      title: 'Authorize 🚀'
    }
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
          title: 'Información de pedidos'
        }
      },
      {
        path: 'invoice-history',
        name: 'InvoiceHistory',
        component: InvoiceHistory,
        meta: {
          title: 'Pedidos'
        }
      },
      {
        path: 'order-history',
        name: 'OrderHistory',
        component: OrderHistory,
        meta: {
          title: 'Ordenes'
        }
      },
      {
        path: 'delivery-setup',
        name: 'DeliverySetup',
        component: DeliverySetup,
        meta: {
          title: 'Configuración de pedidos'
        }
      },
      {
        path: 'integrations',
        name: 'Integrations',
        component: Integrations,
        meta: {
          title: 'Integraciones'
        }
      },
    ]
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to, from, next) => {
  document.title = to.meta.title as string;

  await googleAuthGuard(to, from, next)
});

export default router;