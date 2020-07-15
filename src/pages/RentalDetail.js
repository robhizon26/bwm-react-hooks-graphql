import React, { useEffect } from "react";
import { withRouter } from "react-router-dom";
import RentalInfo from "components/rental/RentalInfo";
import TomMap from "components/map/TomMap";
import BookingReserve from "components/booking/BookingReserve";
import { useRentalStore, useAuthStore } from "../hooks-store/store";

const RentalDetail = (props) => {
  const [rentalState, dispatch] = useRentalStore();
  const authState = useAuthStore()[0];
  const { items: { rental } } = rentalState;
  const { auth: { isAuth }} = authState;
  console.log("RentalDetail", rentalState);
  const { id } = props.match.params;

  useEffect(() => {
    dispatch("FETCH_RENTAL_BY_ID", id);
    return () => {
      dispatch("UNMOUNT");
    };
  }, [dispatch, id]);

  if (!rental) {
    return <h3>Loading...</h3>;
  }

  const { street, city } = rental;
  const location = street && city && city + ", " + street;

  return (
    <section id="rentalDetails">
      <div className="upper-section">
        <div className="row">
          <div className="col-md-6">
            <img
              className="rental-img"
              src={rental.image.url}
              alt={rental.title}
            />
          </div>
          <div className="col-md-6">
            <TomMap location={location} />
          </div>
        </div>
      </div>
      <div className="details-section">
        <div className="row">
          <div className="col-md-8">
            <RentalInfo rental={rental} />
          </div>
          <div className="col-md-4">
            <BookingReserve rental={rental} isAuth={isAuth} />
          </div>
        </div>
      </div>
    </section>
  );
};

const RentalDetailWithRouter = withRouter(RentalDetail);
export default RentalDetailWithRouter;
 