import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export function createRouter () {
  return new Router({
    mode: 'history',
    routes: [
      // { path: '/my/page', component: () => import('../pages/Workbench.vue'), meta: { keepAlive: true }},

	  {path: '/',              component: () => import('../pages/Nav.vue')},
	  {path: '/home',         component: () => import('../pages/Home.vue')},
	  {path: '/login',         component: () => import('../pages/Login.vue')},
	  {path: '/register',      component: () => import('../pages/Register.vue')},
	  {path: '/findPassword',            component: () => import('../pages/Password.vue')},

	  {path: '/password',            component: () => import('../pages/PasswordUpdate.vue')},
	  {path: '/apiConfig',            component: () => import('../pages/ApiConfig.vue')},

	  {path: '/recharge',      component: () => import('../pages/Recharge.vue')},
	  {path: '/payresult/:id',      component: () => import('../pages/Recharge-result.vue')},

	  {path: '/orders',         component: () => import('../pages/Order.vue')},
	  {path: '/order/new', 			component: () => import('../pages/NewVasOrder.vue')},
	  {path: '/order/detail/:id',  component: () => import('../pages/Order-detail.vue')},
	  {path: '/order/detail',  component: () => import('../pages/Order-detail.vue')},	  

	  {path: '/amount/history',  component: () => import('../pages/AmountHistory.vue')},

	  {path: '/rentalcar', 			component: () => import('../pages/RentalCar.vue')},
	  {path: '/rentalcar/orders', 			component: () => import('../pages/RentalCarOrders.vue')},
	  {path: '/rentalcar/orders/:id', 			component: () => import('../pages/RentalCarOrder.vue')},

	  {path: '/report/rentalcar', 			component: () => import('../pages/report/RentalCarReport.vue')},
	  {path: '/report/vas', 			component: () => import('../pages/report/VasReport.vue')},

      
    ]
  });
}
