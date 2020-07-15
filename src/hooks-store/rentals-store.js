import axiosService from "services/AxiosService";
import { deleteResource, extractApiErrors } from "../actions";
import { toast } from "react-toastify";
const { bwmAxios } = axiosService;

export const rentalActions = {
  FETCH_RENTALS: async (state, location) => {
    let rentals = [];
    const requestBody = {
      query: `
        query ($city: String!) {
          getRentals(city: $city) {
            category
            city
            dailyPrice
            image
            {
              url
            }
            shared
            title
            _id
          }
        }
      `,
      variables: {
        city: location || "",
      },
    };
    await bwmAxios.post("/graphql", requestBody)
      .then((res) => (rentals = res.data.data.getRentals));
    console.log("FETCH_RENTALS", rentals);
    return { items: { rentals } };
  },
  FETCH_RENTAL_BY_ID: async (state, rentalId) => {
    let rental = {};
    const requestBody = {
      query: `
      query ($rentalId: String!) {
        getRentalById(rentalId: $rentalId) {
            category
            city
            dailyPrice
            description
            image
            {
              url
            }
            numOfRooms
            shared
            street
            title
            _id
          }
        }
      `,
      variables: {
        rentalId,
      },
    };
    await bwmAxios
      .post("/graphql", requestBody)
      .then((res) => (rental = res.data.data.getRentalById));
    console.log("FETCH_RENTAL_BY_ID", rental);
    return { items: { rental, bookings: state.items.bookings }, errors: null };
  },
  FETCH_MY_RENTALS: async (state, rentalId) => {
    let rentals = [];
    const requestBody = {
      query: `
        query  {
          getUserRentals {
            category
            city
            dailyPrice
            image
            {
              url
            }
            shared
            title
            _id
          }
        }
      `,
    };
    await bwmAxios
      .post("/graphql", requestBody)
      .then((res) => (rentals = res.data.data.getUserRentals));
    console.log("FETCH_MY_RENTALS", rentals);
    return { items: { rentals } };
  },
  UPDATE_RENTAL_SUCCESS: async (
    state,
    { id, rentalData, onSuccess, onError }
  ) => {
    let rental = {};
    const {
      title,
      city,
      street,
      category,
      numOfRooms,
      description,
      dailyPrice,
      shared,
      image,
    } = rentalData;
    const requestBody = {
      query: `
      mutation ($rentalId: String! $title: String, $city: String, $street: String, $category: String, $numOfRooms: Int, $description: String, $dailyPrice: Float, $shared: Boolean, $image: String)  {
        updateRental(updateRentalInput:{rentalId:$rentalId, title: $title, city: $city, street: $street, category: $category, numOfRooms: $numOfRooms, description: $description, dailyPrice: $dailyPrice, shared: $shared, image: $image}) {
            category
            city
            dailyPrice
            description
            image
            {
              url
            }
            numOfRooms
            shared
            street
            title
            _id
          }
        }
      `,
      variables: {
        rentalId: id,
        title,
        city,
        street,
        category,
        numOfRooms: +numOfRooms,
        description,
        dailyPrice: +dailyPrice,
        shared: !!shared,
        image: image && image._id,
      },
    };
    await bwmAxios
      .post("/graphql", requestBody)
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
    const requestBody = {
      query: `
      mutation ($rentalId: String!) {
        deleteRental(rentalId: $rentalId) {
            id
          }
        }
      `,
      variables: {
        rentalId,
      },
    };
    const rentals = await deleteResource(state.items.rentals, { requestBody });
    console.log("DELETE_RENTAL", {
      items: { rentals },
      errors: rentals.errors,
    });
    return { items: { rentals }, errors: rentals.errors };
  },
};
