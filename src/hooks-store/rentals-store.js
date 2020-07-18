import axiosService from "services/AxiosService";
import { deleteResource, extractApiErrors } from "../actions";
import { toast } from "react-toastify";
import { reqFetchRentals, reqFetchUserRentals, reqFetchRentalById, reqUpdateRental, reqDeleteRental } from '../actions/requestBody';
const { bwmAxios } = axiosService;

export const rentalActions = {
  FETCH_RENTALS: async (state, location) => {
    let rentals = [];
    await bwmAxios.post("/graphql", reqFetchRentals(location))
      .then((res) => (rentals = res.data.data.getRentals));
    console.log("FETCH_RENTALS", rentals);
    return { items: { rentals } };
  },
  FETCH_RENTAL_BY_ID: async (state, rentalId) => {
    let rental = {};
    await bwmAxios
      .post("/graphql", reqFetchRentalById(rentalId))
      .then((res) => (rental = res.data.data.getRentalById));
    console.log("FETCH_RENTAL_BY_ID", rental);
    return { items: { rental, bookings: state.items.bookings }, errors: null };
  },
  FETCH_MY_RENTALS: async (state) => {
    let rentals = [];
    await bwmAxios
      .post("/graphql", reqFetchUserRentals())
      .then((res) => (rentals = res.data.data.getUserRentals));
    console.log("FETCH_MY_RENTALS", rentals);
    return { items: { rentals } };
  },
  UPDATE_RENTAL_SUCCESS: async (
    state,
    { id, rentalData, onSuccess, onError }
  ) => {
    let rental = {};
    await bwmAxios
      .post("/graphql", reqUpdateRental(id, rentalData))
      .then((res) => res.data.data.updateRental)
      .then((updatedRental) => {
        rental = updatedRental;
        onSuccess();
      })
      .catch((error) => {
        const errors = extractApiErrors(error.response || []);
        const message =
          errors.length > 0 ? errors[0].detail : "Ooops, something went wrong";
        toast.error(message, {
          autoClose: 3000,
        });
        onError();
      })
      .catch((error) => Promise.reject(extractApiErrors(error || [])));
    console.log("UPDATE_RENTAL_SUCCESS", rental);
    return { items: { rental } };
  },
  DELETE_RENTAL: async (state, rentalId) => {
    const requestBody = reqDeleteRental(rentalId);
    const rentals = await deleteResource(state.items.rentals, { requestBody });
    console.log("DELETE_RENTAL", { items: { rentals }, errors: rentals.errors });
    return { items: { rentals }, errors: rentals.errors };
  },
};
