import axiosService from "services/AxiosService";
import { deleteResource } from "../actions";
const { bwmAxios } = axiosService;

export const bookingActions = {
  FETCH_USER_BOOKINGS: async (state) => {
    let bookings = [];
    const requestBody = {
      query: `
        query {
          getUserBookings{
            createdAt
            startAt
            endAt
            nights
            guests
            price
            rental{
              title
              city
              _id
            }
            _id
          }
        }
      `,
    };
    await bwmAxios.post("/graphql", requestBody)
        .then(res => bookings = res.data.data.getUserBookings);
    console.log("FETCH_USER_BOOKINGS", bookings);
    return { items: { bookings }, errors: bookings.errors  };
  },
  FETCH_RECEIVED_BOOKINGS:async (state) => {
    let bookings = [];
    const requestBody = {
      query: `
        query {
          getReceivedBookings{
            createdAt
            startAt
            endAt
            nights
            guests
            price
            rental{
              title
              city
              _id
            }
            user{
              username
            }
            _id
          }
        }
      `,
    };
    await bwmAxios.post("/graphql", requestBody)
        .then(res => bookings = res.data.data.getReceivedBookings);
    console.log("FETCH_RECEIVED_BOOKINGS", bookings);
    return { items: { bookings }, errors: bookings.errors  };
  },
  DELETE_BOOKING:async (state,bookingId) => {
    const requestBody = {
      query: `
      mutation ($bookingId: String!) {
          deleteBooking(bookingId: $bookingId) {
            id
          }
        }
      `,
      variables: {
        bookingId,
      },
    };
    const bookings = await deleteResource(state.items.bookings, {requestBody} );
    console.log("DELETE_BOOKING", { items: { bookings }, errors: bookings.errors });
    return { items: { bookings }, errors: bookings.errors };
  },
};

   