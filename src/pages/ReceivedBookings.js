
import React, { useEffect } from 'react';
import BookingListing from 'components/booking/BookingListing';
import { useBookingStore } from "../hooks-store/store";

const ReceivedBookings = (props) => {
  const [state, dispatch] = useBookingStore();
  const {items:{bookings},errors} = state;
  console.log('ReceivedBookings',state);

  useEffect(() => {
    dispatch("FETCH_RECEIVED_BOOKINGS");
  }, [dispatch]);

  return (
    <BookingListing
      errors={errors}
      title="Received Bookings"
      type="received"
      bookings={bookings} />
  )
}

export default  ReceivedBookings; 
 