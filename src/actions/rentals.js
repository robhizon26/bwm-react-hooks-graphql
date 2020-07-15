import axiosService from "services/AxiosService";
const { bwmAxios } = axiosService;

export const verifyRentalOwner = (rentalId) => {
  const requestBody = {
    query: `
      query ($rentalId: String!) {
        verifyUser(rentalId: $rentalId) {
          status
        }
      }
    `,
    variables: {
      rentalId,
    },
  };
  return bwmAxios
    .post("/graphql", requestBody)
    .then((res) => res.data.data.verifyUser);
};

export const createRental = (rental) => {
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
  } = rental;
  console.log(!!shared)
  const requestBody = {
    query: `
      mutation ($title: String!, $city: String!, $street: String!, $category: String!, $numOfRooms: Int!, $description: String!, $dailyPrice: Float!, $shared: Boolean, $image: String!)  {
        createRental(createRentalInput:{title: $title, city: $city, street: $street, category: $category, numOfRooms: $numOfRooms, description: $description, dailyPrice: $dailyPrice, shared: $shared, image: $image}) {
          _id
        }
      }
    `,
    variables: {
      title,
      city,
      street,
      category,
      numOfRooms: +numOfRooms,
      description,
      dailyPrice: +dailyPrice,
      shared:!!shared,
      image,
    },
  };
  return bwmAxios.post("/graphql", requestBody);
};

export const updateRental = (
  dispatch,
  { id, rentalData, onSuccess, onError }
) => {
  dispatch("UPDATE_RENTAL_SUCCESS", { id, rentalData, onSuccess, onError });
};

 