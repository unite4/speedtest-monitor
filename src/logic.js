import { store, state } from '@/store';
import { db, auth } from '@/firebase';

export const logsStates = {
  Pending: 'PENDING',
  NotPending: 'NOT_PENDING'
};

export function updateLogsState(logsState) {
  store.updateLogsState(logsState);
}

export const authStates = {
  SignedOut: 'SIGNED_OUT',
  SignedInWithoutCredentials: 'SIGNED_IN_WITHOUT_CREDENTIALS',
  SignedInWithCredentials: 'SIGNED_IN_WITH_CREDENTIALS'
};

export function onAuthStateChanged() {
  return new Promise((resolve) => {
    auth.onAuthStateChanged((authResult) => {
      if (!authResult) {
        store.updateAuthState(authStates.SignedOut);
        return resolve(authStates.SignedOut);
      }

      db
        .ref(`users/${authResult.uid}/read`)
        .once('value')
        .then((snapshot) => {
          const userExists = !!snapshot.val();

          if (userExists) {
            store.updateAuthState(authStates.SignedInWithCredentials);
            return resolve(authStates.SignedInWithCredentials);
          } else {
            store.updateAuthState(authStates.SignedInWithoutCredentials);
            return resolve(authStates.SignedInWithoutCredentials);
          }
        });
    });
  });
}

export const timePeriods = {
  LastDay: 'LAST_DAY',
  LastWeek: 'LAST_WEEK',
  LastMonth: 'LAST_MONTH'
};

export function getTimePeriodByKey(timePeriodKey) {
  return timePeriods[Object.keys(timePeriods).find((key) => key === timePeriodKey)];
}

export function updateTimePeriod(timePeriod) {
  store.updateTimePeriod(timePeriod);
}
