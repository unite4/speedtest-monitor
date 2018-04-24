<template>
  <nav class="period">
    <button
      type="button"
      class="period__item"
      v-for="(timePeriod, key) in timePeriods"
      :key="key"
      :class="{ 'period__item--active': state.timePeriod === timePeriod }"
      @click="onChangePeriod(timePeriod)"
    >{{ key }}</button>
  </nav>
</template>

<style lang="scss" scoped>
.period {
  &__item {
    padding: 5px 10px;
    color: #4d6b73;
    font-size: 12px;
    background: transparent;
    border: 1px solid #4d6b73;
    border-radius: 5px;
    outline: none;
    cursor: pointer;
    transition: color 0.2s ease, background 0.2s ease, border 0.2s ease;

    &:not(:last-child) {
      margin-right: 10px;
    }

    &:not(&--active):hover {
      color: #759aa5;
      border-color: lighten(#4d6b73, 10);
    }

    &--active {
      color: #002b36;
      background-color: #4d6b73;
      border-color: #4d6b73;
    }
  }
}
</style>

<script>
import { timePeriods, updateTimePeriod } from '@/logic';
import { state } from '@/store';

export default {
  data() {
    return {
      state: state,
      timePeriods: timePeriods
    };
  },

  created() {
    updateTimePeriod(timePeriods.LastDay);
  },

  methods: {
    onChangePeriod(timePeriod) {
      updateTimePeriod(timePeriod);
    }
  }
};
</script>
