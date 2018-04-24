<template>
  <div class="app">
    <header class="app__header">
      <the-header v-if="state.authState === authStates.SignedInWithCredentials" />
    </header>
    <main class="app__content">
      <router-view />
    </main>
  </div>
</template>

<style lang="scss">
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  background: #002b36;
}

body {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #4d6b73;
}

a {
  color: inherit;
  text-decoration: none;
  transition: color 0.2s ease;

  &:hover {
    color: #759aa5;
  }
}

.app {
  display: grid;
  grid-template-rows: auto 1fr;
  min-height: 100vh;

  &__content {
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>

<script>
import TheHeader from '@/components/TheHeader';

import { state } from '@/store';
import { authStates } from '@/logic';

export default {
  components: {
    TheHeader
  },

  data() {
    return {
      state: state,
      authStates: authStates
    };
  }
};
</script>
