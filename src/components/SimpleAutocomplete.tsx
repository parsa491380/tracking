import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

export default function SimpleAutocomplete() {
  return (
    <Autocomplete
      disablePortal
      id="combo-box-demo"
      options={locations}
      style={{
        border: "1px solid white",
      }}
      sx={{
        width: "295px",
        height: "30px",
        display: "block",
        // position: "absolute",
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label=".....................................................................................................آدرس را تایپ کنید"
        />
      )}
    />
  );
}

// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
const locations = [
  { label: "Mashhad", year: 1994 },
  { label: "Kerman", year: 1972 },
];
