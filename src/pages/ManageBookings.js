import React, { useEffect } from "react";
import BookingListing from "components/booking/BookingListing";
import { useBookingStore } from "../hooks-store/store";

const ManageBookings = (props) => {
  const [state, dispatch] = useBookingStore();
  const {items:{bookings},errors} = state;
  console.log('ManageBookings',state);

  useEffect(() => {
    dispatch("FETCH_USER_BOOKINGS");
  }, [dispatch]);

  const deleteBooking = (bookingId) => {
    const canDelete = askForPermission();
    if (!canDelete) {
      return;
    }
    dispatch("DELETE_BOOKING",bookingId);
  };
   
  const askForPermission = () => {
    return window.confirm("Are you sure you want to delete this booking?");
  };

  return (
    <BookingListing
      errors={errors}
      title="My Bookings"
      bookings={bookings}
      renderMenu={(bookingId) => (
        <button
          onClick={() => deleteBooking(bookingId)}
          className="btn btn-danger"
        >
          Delete
        </button>
      )}
    />
  );
};

export default  ManageBookings; 
 