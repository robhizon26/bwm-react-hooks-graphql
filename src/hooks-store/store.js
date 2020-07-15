import { useState, useEffect, useCallback } from "react";

let globalRentalState = {};
let rentalListeners = [];
let rentalActions = {};

export const useRentalStore = (shouldListen = true) => {
  const setState = useState(globalRentalState)[1];

  const dispatch = useCallback(async (actionIdentifier, payload) => {
    const newState = await rentalActions[actionIdentifier](globalRentalState, payload);
    globalRentalState = { ...globalRentalState, ...newState };
    for (const listener of rentalListeners) {
      listener(globalRentalState);
    }
  }, []);
  useEffect(() => {
    if (shouldListen) {
      rentalListeners.push(setState);
    }

    return () => {
      if (shouldListen) {
        rentalListeners = rentalListeners.filter((li) => li !== setState);
      }
    };
  }, [setState, shouldListen]);

  return [globalRentalState, dispatch];
};

export const initRentalStore = (userActions, initialState) => {
  if (initialState) {
    globalRentalState = { ...globalRentalState, ...initialState };
  }
  rentalActions = { ...rentalActions, ...userActions };
};


let globalAuthState = {};
let authListeners = [];
let authActions = {};

export const useAuthStore = (shouldListen = true) => {
  const setState = useState(globalAuthState)[1];

  const dispatch = useCallback(async (actionIdentifier, payload) => {
    const newState = await authActions[actionIdentifier](globalAuthState, payload);
    globalAuthState = { ...globalAuthState, ...newState };
    for (const listener of authListeners) {
      listener(globalAuthState);
    }
  }, []);
  useEffect(() => {
    if (shouldListen) {
      authListeners.push(setState);
    }

    return () => {
      if (shouldListen) {
        authListeners = authListeners.filter((li) => li !== setState);
      }
    };
  }, [setState, shouldListen]);

  return [globalAuthState, dispatch];
};

export const initAuthStore = (userActions, initialState) => {
  if (initialState) {
    globalAuthState = { ...globalAuthState, ...initialState };
  }
  authActions = { ...authActions, ...userActions };
};



let globalBookingState = {};
let bookingListeners = [];
let bookingActions = {};

export const useBookingStore = (shouldListen = true) => {
  const setState = useState(globalBookingState)[1];

  const dispatch = useCallback(async (actionIdentifier, payload) => {
    const newState = await bookingActions[actionIdentifier](globalBookingState, payload);
    globalBookingState = { ...globalBookingState, ...newState };
    for (const listener of bookingListeners) {
      listener(globalBookingState);
    }
  }, []);
  useEffect(() => {
    if (shouldListen) {
      bookingListeners.push(setState);
    }

    return () => {
      if (shouldListen) {
        bookingListeners = bookingListeners.filter((li) => li !== setState);
      }
    };
  }, [setState, shouldListen]);

  return [globalBookingState, dispatch];
};

export const initBookingStore = (userActions, initialState) => {
  if (initialState) {
    globalBookingState = { ...globalBookingState, ...initialState };
  }
  bookingActions = { ...bookingActions, ...userActions };
};
