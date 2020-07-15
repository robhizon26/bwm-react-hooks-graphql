import { initRentalStore, initAuthStore, initBookingStore } from "./store";
import { rentalActions } from "./rentals-store";
import { commonActions } from "./common-store";
import { authActions } from "./auth-store";
import { bookingActions } from "./bookings-store";

const initialState = {
  items: {},
  errors: [],
  auth: { isAuth: false, username: "" },
};

export const configureRentalStore = () =>
  initRentalStore({ ...commonActions, ...rentalActions }, initialState);
export const configureAuthStore = () =>
  initAuthStore({ ...commonActions, ...authActions }, initialState);
export const configureBookingStore = () =>
  initBookingStore({ ...commonActions, ...bookingActions }, initialState);
