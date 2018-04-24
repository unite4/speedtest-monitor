<template>
  <button
    class="button"
    type="button"
    @click="signOut()"
  >Sign out</button>
</template>

<style lang="scss" scoped>
.button {
  padding: 10px;
  color: #4d6b73;
  font-size: 1rem;
  background: transparent;
  border: 1px solid #4d6b73;
  border-radius: 5px;
  cursor: pointer;
  transition: color 0.2s ease, border 0.2s ease;

  &:hover {
    color: #759aa5;
    border-color: lighten(#4d6b73, 10);
  }
}
</style>

<script>
import { auth } from '@/firebase';
import { routes } from '@/router';

export default {
  methods: {
    signOut() {
      auth.signOut().then(this.redirectToAuthPage);
    },

    redirectToAuthPage() {
      this.$router.replace({ name: routes.AuthPage });
    }
  }
};
</script>
