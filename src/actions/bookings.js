import axiosService from "services/AxiosService";
import { extractApiErrors } from "./index";
const { bwmAxios } = axiosService;

export const createBooking = (booking) => {
  const { startAt, endAt, guests, nights, price, rental } = booking;
  const requestBody = {
    query: `
      mutation ($startAt: String!, $endAt: String!, $guests: Int!, $nights: Int!, $price: Float!, $rentalId: String! ) {
        createBooking(createBookingInput: {startAt: $startAt, endAt: $endAt, guests: $guests, nights: $nights, price: $price, rentalId: $rentalId}) {
          startAt
          endAt
        }
      }
    `,
    variables: {
      startAt: startAt.toISOString(),
      endAt: endAt.toISOString(),
      guests,
      nights,
      price,
      rentalId: rental._id,
    },
  };
  return bwmAxios
    .post("/graphql", requestBody)
    .then((res) => res.data.data.createBooking)
    .catch((error) =>
      Promise.reject(extractApiErrors(error.response || []))
    );
};

export const getBookings = (rentalId) => {
  const requestBody = {
    query: `
      query ($rentalId: String!) {
        getBookings(rentalId: $rentalId) {
          startAt
          endAt
        }
      }
    `,
    variables: {
      rentalId,
    },
  };
  return bwmAxios
    .post("/graphql", requestBody)
    .then((res) => res.data.data.getBookings);
};
  