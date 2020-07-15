import React, { useEffect } from "react";
import RentalCard from "components/rental/RentalCard";
import ApiErrors from "components/forms/ApiErrors";
import { Link } from "react-router-dom";
import { useRentalStore } from "../hooks-store/store";

const ManageRentals = (props) => {
const [state, dispatch] = useRentalStore();
const { items:{rentals},  errors } = state;
console.log('ManageRentals',state)
  useEffect(() => {
    dispatch("INITIALIZE_DATA");
    dispatch("FETCH_MY_RENTALS");
    return () => {
      dispatch("UNMOUNT");
    };
  }, [dispatch]);

  const ldeleteRental = (rentalId) => {
    const canDelete = askForPermission();
    if (!canDelete) {
      return;
    }
    dispatch("DELETE_RENTAL",rentalId);
  };

  const askForPermission = () => {
    return window.confirm("Are you sure you want to delete this rental?");
  };

  const renderRentals = (rentals) => {
    return rentals.map((rental) => (
      <div key={rental._id} className="col-md-3">
        <RentalCard
          rental={rental}
          renderMenu={() => (
            <>
              <button
                onClick={() => ldeleteRental(rental._id)}
                className="btn btn-danger"
              >
                Delete
              </button>
              <Link
                to={{ pathname: `/rentals/${rental._id}/edit` }}
                className="btn btn-bwm-main ml-2"
              >
                Update
              </Link>
            </>
          )}
        />
      </div>
    ));
  };
 
  return (
    <div className="card-list">
      <h1 className="page-title">My Rentals</h1>
      <ApiErrors errors={errors} />
      {rentals&&<div className="row">{renderRentals(rentals)}</div>}
      {rentals && rentals.length === 0 && (
        <p className="alert alert-warning">
          You dont have any rentals currently created :(
        </p>
      )}
    </div>
  );
};

export default  ManageRentals ;
  