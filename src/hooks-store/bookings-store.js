import axiosService from "services/AxiosService";
import { deleteResource } from "../actions";
import { reqFetchUserBookings, reqFetchReceivedBookings, reqDeleteBooking } from '../actions/requestBody';
const { bwmAxios } = axiosService;

export const bookingActions = {
  FETCH_USER_BOOKINGS: async (state) => {
    let bookings = [];
    await bwmAxios.post("/graphql", reqFetchUserBookings())
      .then(res => bookings = res.data.data.getUserBookings);
    console.log("FETCH_USER_BOOKINGS", bookings);
    return { items: { bookings }, errors: bookings.errors };
  },
  FETCH_RECEIVED_BOOKINGS: async (state) => {
    let bookings = [];
    await bwmAxios.post("/graphql", reqFetchReceivedBookings())
      .then(res => bookings = res.data.data.getReceivedBookings);
    console.log("FETCH_RECEIVED_BOOKINGS", bookings);
    return { items: { bookings }, errors: bookings.errors };
  },
  DELETE_BOOKING: async (state, bookingId) => {
    const requestBody = reqDeleteBooking(bookingId);
    const bookings = await deleteResource(state.items.bookings, { requestBody });
    console.log("DELETE_BOOKING", { items: { bookings }, errors: bookings.errors });
    return { items: { bookings }, errors: bookings.errors };
  },
};

