import classes from "./CheckOut.module.css";
import React, { useRef, useState } from "react";

const checkValidity = (value) => value.trim() !== "";

const CheckOut = (props) => {
  const nameRef = useRef();
  const streetRef = useRef();
  const postalCodeRef = useRef();
  const cityRef = useRef();

  const [formValidity, setFormValidity] = useState({
    name: true,
    street: true,
    postal: true,
    city: true,
  });

  const confirmHandler = (event) => {
    event.preventDefault();

    let getName = nameRef.current.value;
    let getStreet = streetRef.current.value;
    let getPostalCode = postalCodeRef.current.value;
    let getCity = cityRef.current.value;

    const getNameIsValid = checkValidity(getName);
    const getStreetIsValid = checkValidity(getStreet);
    const getPostalCodeIsValid = checkValidity(getPostalCode);
    const getCityIsValid = checkValidity(getCity);

    setFormValidity({
      name: getNameIsValid,
      street: getStreetIsValid,
      postal: getPostalCodeIsValid,
      city: getCityIsValid,
    });

    const isFormValid =
      getNameIsValid &&
      getStreetIsValid &&
      getPostalCodeIsValid &&
      getCityIsValid;

    if (!isFormValid) return;

    props.onConfirm({
      name: getName,
      street: getStreet,
      postal: getPostalCode,
      city: getCity,
    });

    nameRef.current.value = "";
    streetRef.current.value = "";
    postalCodeRef.current.value = "";
    cityRef.current.value = "";
  };

  const nameClasses = !formValidity.name
    ? `${classes.invalid}`
    : `${classes.control}`;
  const streetClasses = !formValidity.street
    ? `${classes.invalid}`
    : `${classes.control}`;
  const postalCodeClasses = !formValidity.postal
    ? `${classes.invalid}`
    : `${classes.control}`;
  const cityClasses = !formValidity.city
    ? `${classes.invalid}`
    : `${classes.control}`;

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={nameClasses}>
        <label htmlFor="name">Your Name</label>
        <input type="text" id="name" ref={nameRef} />
        {!formValidity.name && <p>please enter a valid name</p>}
      </div>
      <div className={streetClasses}>
        <label htmlFor="street">Street</label>
        <input type="text" id="street" ref={streetRef} />
        {!formValidity.street && <p>please enter a valid street</p>}
      </div>
      <div className={postalCodeClasses}>
        <label htmlFor="postal">Postal Code</label>
        <input type="text" id="postal" ref={postalCodeRef} />
        {!formValidity.postal && <p>please enter a valid posatl code</p>}
      </div>
      <div className={cityClasses}>
        <label htmlFor="city">City</label>
        <input type="text" id="city" ref={cityRef} />
        {!formValidity.city && <p>please enter a valid city</p>}
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default CheckOut;
