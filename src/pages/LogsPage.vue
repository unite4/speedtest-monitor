<template>
  <div class="logs">
    <div
      class="logs__container"
      v-if="logsData.length > 0"
    >
      <div class="logs__period">
        <period-selector />
      </div>

      <div class="logs__chart">
        <logs-chart :logsData="logsData" />
      </div>
    </div>

    <div v-if="state.logsState === logsStates.Pending">
      <message :icon="messageIcons.Loading">
        Loading...
      </message>
    </div>

    <div v-if="state.logsState === logsStates.NotPending && logsData.length === 0">
      <message :icon="messageIcons.Empty">
        No log entries to display
      </message>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.logs {
  display: flex;
  flex-direction: column;
  align-items: center;

  &__container {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  &__period {
    margin-bottom: 20px;
  }

  &__chart {
    width: 100vw;
  }
}
</style>

<script>
import LogsChart from '@/components/LogsChart';
import PeriodSelector from '@/components/PeriodSelector';
import Message from '@/components/Message';
import { messageIcons } from '@/components/Message';

import { state } from '@/store';
import { logsStates, updateLogsState, timePeriods } from '@/logic';
import { db } from '@/firebase';

export default {
  components: {
    LogsChart,
    PeriodSelector,
    Message
  },

  data() {
    return {
      logsData: null,
      state: state,
      logsStates: logsStates,
      messageIcons: messageIcons
    };
  },

  watch: {
    $route: 'fetchLogsData',
    'state.timePeriod': 'fetchLogsData'
  },

  created() {
    this.fetchLogsData();
  },

  methods: {
    fetchLogsData() {
      let selectedPeriod;

      switch (state.timePeriod) {
        case timePeriods.LastMonth:
          selectedPeriod = new Date(Date.now() - 86400000 * 30);
          break;

        case timePeriods.LastWeek:
          selectedPeriod = new Date(Date.now() - 86400000 * 7);
          break;

        default:
          selectedPeriod = new Date(Date.now() - 86400000);
      }

      const fromDate = new Date(selectedPeriod.getFullYear(), selectedPeriod.getMonth(), selectedPeriod.getDate(), selectedPeriod.getHours());
      const locationRef = db
        .ref('logs')
        .orderByChild('date')
        .startAt(fromDate.toISOString());

      updateLogsState(logsStates.Pending);
      this.$bindAsArray('logsData', locationRef, this.cancelCallback, this.readyCallback);
    },

    // TODO: Handle it properly
    cancelCallback(error) {
      // throw new Error('Fetching logs has been canceled', error)
    },

    readyCallback() {
      updateLogsState(logsStates.NotPending);
    }
  }
};
</script>
