import Vue from 'vue';
import VueFire from 'vuefire';

import App from '@/App';

import { onAuthStateChanged } from '@/logic';
import { router } from '@/router';
import { auth } from '@/firebase';

Vue.config.productionTip = false;
Vue.use(VueFire);

let app;

onAuthStateChanged().then(() => {
  if (app) {
    return;
  }

  app = new Vue({
    el: '#app',
    router,
    components: {
      App
    },
    template: '<App />'
  });
});
