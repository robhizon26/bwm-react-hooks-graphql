
import axiosService from 'services/AxiosService';
const { bwmAxios } = axiosService;

export const uploadImage = image => {
  const formData = new FormData();
  formData.append('image', image);

  return bwmAxios.post('/image-upload', formData)
    .then(res => res.data)
}

export const extractApiErrors = (resError) => {
  let errors = [{title: 'Error!', detail: 'Ooops, something went wrong!'}];
  if (resError && resError.data && resError.data.errors) {
    errors =  [{title: 'Error!', detail: resError.data.errors[0].message}];   
  }
  return errors;
}

export const deleteResource = async (items, { requestBody }) => {
  let newItems = [  ...items ];
  await bwmAxios.post("/graphql", requestBody)
    .then((res) =>{
      console.log('deleteResource',res)
      if (res.data.data.deleteBooking) return res.data.data.deleteBooking;
      else if (res.data.data.deleteRental) return res.data.data.deleteRental;
        else throw res;
    })
    .then(({ id }) => {
      const index = newItems.findIndex((i) => i._id === id);
      newItems = newItems.filter((item, itemIndex) => index !== itemIndex);
    })
    .catch((error) => {
      console.log('deleteResource error', error)
      newItems.errors = extractApiErrors(error || []);
    });
  return newItems;
};

export * from './auth';
export * from './rentals';
export * from './bookings';
