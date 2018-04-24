<template>
  <div id="firebaseui"></div>
</template>

<style lang="scss">
.firebaseui-idp-list {
  list-style: none;
  display: flex;
}

.firebaseui-list-item {
  display: block;

  &:not(:last-child) {
    margin-right: 20px;
  }
}

.firebaseui-idp-button {
  display: flex;
  align-items: center;
  padding: 1px;
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

    .firebaseui-idp-icon-wrapper {
      background-color: darken(#4d6b73, 5);
    }
  }
}

.firebaseui-idp-icon-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: darken(#4d6b73, 10);
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
  transition: background 0.2s ease;
}

.firebaseui-idp-icon {
  display: block;
  width: 60%;
  height: 60%;
}

.firebaseui-idp-text-long {
  padding: {
    left: 10px;
    right: 10px;
  }
}

.firebaseui-idp-text-short {
  display: none;
}

.firebaseui-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.firebaseui-info-bar {
  margin-top: 20px;
}

.firebaseui-link {
  display: inline-block;
  padding: 5px 10px;
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

.firebaseui-card-header {
  margin-bottom: 20px;
}

form {
  .firebaseui-card-content {
    padding: 10px;
    border: 1px solid #4d6b73;
    border-radius: 5px;
    margin-bottom: 20px;
  }

  .firebaseui-textfield {
    &:not(:first-child) {
      margin-top: 10px;
    }
  }

  .firebaseui-label {
    display: inline-block;
    min-width: 80px;
    margin-right: 20px;
  }

  input {
    width: 300px;
    padding: 10px;
    font-size: 1rem;
    background: #4d6b73;
    border: 0;
    border-radius: 3px;
  }

  .firebaseui-error-wrapper {
    margin-left: 100px;
    color: red;

    &:not(:empty) {
      margin-top: 10px;
    }
  }

  .firebaseui-form-links {
    margin-bottom: 20px;

    .firebaseui-link {
      padding: 0;
      border: 0;
    }
  }

  .firebaseui-button {
    display: inline-block;
    padding: 5px 10px;
    margin-right: 10px;
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
}
</style>

<script>
import Firebase from 'firebase';
import FirebaseUI from 'firebaseui';

import { auth } from '@/firebase';
import { routes } from '@/router';

export default {
  created() {
    this.firebaseUI = FirebaseUI.auth.AuthUI.getInstance() || new FirebaseUI.auth.AuthUI(auth);
  },

  mounted() {
    this.firebaseUI.start(this.$el, {
      signInFlow: 'popup',
      signInOptions: [
        Firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        Firebase.auth.EmailAuthProvider.PROVIDER_ID
      ],
      callbacks: {
        signInSuccessWithAuthResult: this.redirectToIndexPage
      }
    });
  },

  methods: {
    redirectToIndexPage() {
      this.$router.replace({ name: routes.IndexPage });
    }
  }
};
</script>
