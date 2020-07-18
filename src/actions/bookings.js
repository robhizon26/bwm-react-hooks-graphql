import axiosService from "services/AxiosService";
import { extractApiErrors } from "./index";
import { reqCreateBooking, reqGetBookings  } from './requestBody';
const { bwmAxios } = axiosService;

export const createBooking = booking => {
  return bwmAxios
    .post("/graphql", reqCreateBooking(booking))
    .then((res) => res.data.data.createBooking)
    .catch((error) =>
      Promise.reject(extractApiErrors(error.response || []))
    );
};

export const getBookings = rentalId => {
  return bwmAxios
    .post("/graphql", reqGetBookings(rentalId))
    .then((res) => res.data.data.getBookings);
};
