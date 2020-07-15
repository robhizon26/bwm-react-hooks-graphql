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

export const configureHookStore =()=>{
  initRentalStore({ ...commonActions, ...rentalActions }, initialState);
  initAuthStore({ ...commonActions, ...authActions }, initialState);
  initBookingStore({ ...commonActions, ...bookingActions }, initialState);
}
 
 
