import React, { useEffect } from "react";
import { TextField } from "@mui/material";
import { Setting } from "../../utils/Setting";
import { usePlacesWidget } from "react-google-autocomplete";

/**
 * Component for Google Auto Complete Input
 * @param {object} props
 * @param {function} props.onChange - Handle the change event of Input
 * @component
 */
function PlaceAutoComplete(props) {
  const {
    onChange = () => null,
    placeholder = "",
    disable = false,
    defaultValue = "",
    ...rest
  } = props;

  // this hooks set default location detail
  useEffect(() => {
    if (materialRef && defaultValue) {
      materialRef.current.value = defaultValue || "";
    }
  }, [defaultValue]);

  const { ref: materialRef } = usePlacesWidget({
    apiKey: Setting.GOOLE_MAPS_KEY,
    onPlaceSelected: (place) => {
      const obj = {
        location: place?.formatted_address || "",
        lat: place?.geometry?.location?.lat(),
        lng: place?.geometry?.location?.lng(),
      };
      onChange(obj);
      // console.log("PlaceAutoComplete ~ place", place);
    },
    options: {
      types: ["geocode"],
      // componentRestrictions: { country: 'au' },
    },
  });

  return (
    <TextField
      inputRef={materialRef}
      placeholder={placeholder}
      disabled={disable}
      {...rest}
    />
  );
}

export default PlaceAutoComplete;
