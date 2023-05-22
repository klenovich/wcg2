import { useState, useContext } from "react";
import { AppContext } from "../App";
import Select from "react-select";
import { countries } from "../data/countries";
import { CountryType } from "../interfaces";
import { IN_PROCESS } from "../constants";
import { getDistance, convertDistance, getCompassDirection } from "geolib";
import createShareableResult from "../utils/createShareableResult";

const Selections = () => {
  const {
    todayCountry,
    numGuesses,
    setNumGuesses,
    selectedCountries,
    setSelectedCountries,
    game,
    setCookie,
    random,
  } = useContext(AppContext);
  const [country, setCountry] = useState<CountryType>({
    value: "",
    label: "",
    latitude: 0,
    longitude: 0,
    distance: 0,
    direction: "",
  });

  const todayCountryPos = {
    latitude: todayCountry.latitude,
    longitude: todayCountry.longitude,
  };

  const handleSubmit = () => {
    if (
      country.value !== undefined &&
      country.value !== null &&
      country.value !== ""
    ) {
      const selectedCountryPos = {
        latitude: country?.latitude,
        longitude: country?.longitude,
      };
      const distance = convertDistance(
        getDistance(todayCountryPos, selectedCountryPos, 1000),
        "km"
      );
      const direction = getCompassDirection(
        selectedCountryPos,
        todayCountryPos
      );
      let newCountries = selectedCountries;
      country.direction = direction;
      country.distance = distance;
      newCountries[numGuesses] = country;
      setSelectedCountries(newCountries);

      setCookie(random.toString() as string, JSON.stringify(newCountries), {
        maxAge: 86400,
      });

      setCountry({} as CountryType);
      setNumGuesses(numGuesses + 1);
    } else {
      var element = document.getElementById("input-box");
      element?.classList.add("error");
      setTimeout(() => {
        element?.classList.remove("error");
      }, 300);
    }
  };

  const handleShare = () => {
    createShareableResult(selectedCountries, game, numGuesses);
    var element = document.getElementById("shareButtonTooltip");
    element?.classList.remove("invisible");
    element?.classList.remove("opacity-0");
    setTimeout(() => {
      element?.classList.add("invisible");
      element?.classList.add("opacity-0");
    }, 1500);
  };

  const theme = (theme: any) => ({
    ...theme,
    colors: {
      ...theme.colors,
      text: "white",
      primary50: "rgba(100, 116, 139, 0.1)",
      primary25: "rgba(100, 116, 139, 0.2)",
      primary: "rgba(100, 116, 139, 0.3)",
    },
  });

  const customStyles = {
    control: (base: any) => ({
      ...base,
      background: "transparent",
      border: "2px solid white",
      "&:focus, :hover": {
        border: "2px solid white",
      },
    }),
    singleValue: (base: any, _: any) => ({
      ...base,
      color: "white",
    }),
    input: (base: any) => ({
      ...base,
      color: "white",
    }),
    option: (base: any) => ({
      ...base,
      "&:hover": {
        fontWeight: "500",
      },
    }),
  };

  return (
    <div className="text-sm md:text-base">
      <div className="flex justify-evenly items-center max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg m-auto my-5 px-5">
        <Select
          id="input-box"
          isDisabled={game === IN_PROCESS ? false : true}
          options={countries}
          value={country}
          onInputChange={(_, action) => {
            if (action.action === "input-change") setCountry({} as CountryType);
          }}
          onChange={(country) => setCountry(country as CountryType)}
          onKeyDown={(e) => {
            if (
              e.key === "Enter" &&
              country.value !== undefined &&
              country.value !== ""
            ) {
              handleSubmit();
            }
            if (e.key === "Backspace") {
              setCountry({} as CountryType);
            }
          }}
          menuPlacement="top"
          className="w-full rounded shadow-md hover:shadow-gray-400 duration-200"
          theme={theme}
          styles={customStyles}
        />
      </div>
      {game === IN_PROCESS ? (
        <button
          onClick={handleSubmit}
          className="flex justify-center items-center w-40 m-auto p-2 my-5 font-light bg-white bg-opacity-90 hover:bg-opacity-100 rounded shadow hover:shadow-md transform duration-200 ease-in-out"
        >
          Submit
        </button>
      ) : (
        <>
          <div
            id="shareButtonTooltip"
            className="fixed top-5 left-1/2 -translate-x-1/2 z-10 opacity-0 invisible transform duration-200 ease-in-out"
          >
            <div className="flex justify-center items-center w-80 md:w-96 p-5 text-sm md:text-base bg-slate-200 text-white rounded-lg backdrop-blur-md bg-opacity-20 shadow-md">
              Copied results to clipboard
            </div>
          </div>
          <button
            onClick={handleShare}
            className="flex justify-center items-center w-40 m-auto p-2 my-5 font-light bg-white bg-opacity-90 hover:bg-opacity-100 rounded shadow hover:shadow-md transform duration-200 ease-in-out"
          >
            Share
          </button>
        </>
      )}
    </div>
  );
};

export default Selections;
