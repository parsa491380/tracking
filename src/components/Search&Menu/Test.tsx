import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CircularProgress from "@mui/material/CircularProgress";

// interface Film {
//  title: string;
//  year: number;
// }

// function sleep(duration: number): Promise<void> {
//  return new Promise<void>((resolve) => {
//   setTimeout(() => {
//    resolve();
//   }, duration);
//  });
// }

export default function Test() {
 //  interface FilmOptionType {
 //   title: string;
 //   year: number;
 //  }
 const defaultProps = {
  options: topFilms,
  //   getOptionLabel: (option: FilmOptionType) => option.title,
 };

 return (
  <Autocomplete
   {...defaultProps}
   sx={{ width: 260, height: 50 }}
   id="clear-on-blur"
   clearOnBlur
   renderInput={(params) => (
    <TextField
     size="Small"
     //  {...params}
     label="clearOnBlur"
     variant="standard"
     //  sx={{ height: "50%", margin: 0, padding: 0 }}
    />
   )}
  />
 );
}

// Top films as rated by IMDb users. http://www.imdb.com/chart/top
const topFilms = [
 { title: "The Shawshank Redemption", year: 1994 },
 { title: "The Godfather", year: 1972 },
 { title: "The Godfather: Part II", year: 1974 },
];
