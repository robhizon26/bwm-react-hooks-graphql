import React, { useEffect, useCallback } from "react";
import RentalCard from "components/rental/RentalCard";
import { withRouter } from "react-router-dom";
import { capitalize } from "helpers/functions";
import { useRentalStore } from "../hooks-store/store";

const RentalHomeSearch = (props) => {
  const location = props.match.params.location;
  const [state, dispatch] = useRentalStore();
  const { items:{rentals} } = state;
  console.log('RentalHomeSearch',state);
  const getRentals = useCallback(
    (location) => {
      dispatch("FETCH_RENTALS", location);
    },
    [dispatch]
  );

  useEffect(() => {
    getRentals(location);
  }, [getRentals, location,dispatch]);

  const renderRentals = (rentals) =>
    rentals.map((rental) => (
      <div key={rental._id} className="col-md-3">
        <RentalCard rental={rental} />
      </div>
    ));

    if (!rentals){
      return <h3>Loading...</h3>
    }
    
  const noRentalsFound = rentals.length === 0 ;
  return (
    <div className="card-list">
      <h1 className="page-title">Your Home in "{capitalize(location)}"</h1>
      <div className="row">{renderRentals(rentals)}</div>
      {noRentalsFound && (
        <p className="alert alert-warning">No rentals found :(</p>
      )}
    </div>
  );
};

export default withRouter(RentalHomeSearch);
  