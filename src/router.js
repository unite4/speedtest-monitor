import Vue from 'vue';
import Router from 'vue-router';

import LogsPage from '@/pages/LogsPage';
import AuthPage from '@/pages/AuthPage';

import { authStates, onAuthStateChanged, updateTimePeriod } from '@/logic';

Vue.use(Router);

const routes = {
  IndexPage: 'IndexPage',
  AuthPage: 'AuthPage',
  LogsPage: 'LogsPage'
};

const router = new Router({
  routes: [
    {
      name: routes.IndexPage,
      path: '*',
      redirect: { name: routes.LogsPage }
    },
    {
      name: routes.AuthPage,
      path: '/authentication',
      component: AuthPage,
      beforeEnter(to, from, next) {
        onAuthStateChanged().then((authState) => {
          if (authState === authStates.SignedInWithCredentials) {
            next({ name: routes.IndexPage });
          } else {
            next();
          }
        });
      }
    },
    {
      name: routes.LogsPage,
      path: '/logs',
      component: LogsPage,
      meta: { requiresAuth: true }
    }
  ],
  mode: 'history'
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    onAuthStateChanged().then((authState) => {
      switch (authState) {
        case authStates.SignedOut:
        case authStates.SignedInWithoutCredentials:
          next({ name: routes.AuthPage });
          break;

        default:
          next();
      }
    });
  } else {
    next();
  }
});

export { routes, router };
