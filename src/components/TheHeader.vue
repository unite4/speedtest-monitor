<template>
  <header class="header">
    <sign-out />
  </header>
</template>

<style lang="scss" scoped>
.header {
  padding-top: 20px;
  text-align: center;

  a {
    display: inline-block;
    padding: 20px;
  }
}
</style>

<script>
import SignOut from '@/components/SignOut'

export default {
  components: {
    SignOut
  }
}
</script>
