import React, { useEffect } from "react";
import RentalCard from "components/rental/RentalCard";
import { useRentalStore } from "../hooks-store/store";

const RentalHome = React.memo((props) => {
  const [state, dispatch] = useRentalStore();
  const {
    items: { rentals }  
  } = state;
  console.log('RentalHome',state);
  useEffect(() => {
    dispatch("FETCH_RENTALS");
  }, [dispatch]);
 
  if (!rentals){
    return null;
  }

  const renderRentals = (rentals) =>
    rentals.map((rental) => (
      <div key={rental._id} className="col-md-3">
        <RentalCard rental={rental} />
      </div>
    ));
  return (
    <div className="card-list">
      <h1 className="page-title">Your Home All Around the World</h1>
      <div className="row">{renderRentals(rentals)}</div>
    </div>
  );
});

export default RentalHome;
 