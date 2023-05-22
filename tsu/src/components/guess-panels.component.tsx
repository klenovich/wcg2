import { useContext } from "react";
import GuessPanel from "./guess-panel.component";
import { AppContext } from "../App";

const GuessPanels = () => {
  const { selectedCountries } = useContext(AppContext);

  return (
    <div>
      {selectedCountries.map((selectedCountry, index) => {
        return (
          <div
            className="max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg m-auto px-5"
            key={index}
          >
            <GuessPanel
              selectedCountry={selectedCountry}
            />
          </div>
        );
      })}
    </div>
  );
};

export default GuessPanels;
