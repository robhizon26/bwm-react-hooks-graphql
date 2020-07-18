import axiosService from "services/AxiosService";
import { reqVerifyRentalOwner, reqCreateRental } from './requestBody';
const { bwmAxios } = axiosService;

export const verifyRentalOwner = rentalId => {
  return bwmAxios
    .post("/graphql", reqVerifyRentalOwner(rentalId))
    .then((res) => res.data.data.verifyUser);
};

export const createRental = rental => {
  return bwmAxios.post("/graphql", reqCreateRental(rental));
};

export const updateRental = (
  dispatch,
  { id, rentalData, onSuccess, onError }
) => {
  dispatch("UPDATE_RENTAL_SUCCESS", { id, rentalData, onSuccess, onError });
};

 