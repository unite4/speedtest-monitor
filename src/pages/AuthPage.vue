<template>
  <div class="auth">
    <sign-in v-if="state.authState === authStates.SignedOut" />

    <div
      class="auth__message"
      v-if="state.authState === authStates.SignedInWithoutCredentials"
    >
      <div class="auth__text">
        <message :icon="messageIcons.NoCredentials">
          You have no credentials to see the application
        </message>
      </div>
      <sign-out />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.auth {
  &__message {
    text-align: center;
  }

  &__text {
    margin-bottom: 20px;
  }
}
</style>

<script>
import SignIn from '@/components/SignIn';
import SignOut from '@/components/SignOut';
import Message from '@/components/Message';
import { messageIcons } from '@/components/Message';

import { state } from '@/store';
import { authStates } from '@/logic';

export default {
  components: {
    SignIn,
    SignOut,
    Message
  },

  data() {
    return {
      state: state,
      authStates: authStates,
      messageIcons: messageIcons
    };
  }
};
</script>
