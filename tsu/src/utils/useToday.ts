import { useState, useEffect, useContext } from "react";
import getTodaySeed from "./getTodaySeed";
import { AppContext } from "../App";
import { countries } from "../data/countries";
import { IN_PROCESS } from "../constants";

const useToday = () => {
  const [countrySvg, setCountrySvg] = useState<any>();
  const { setTodayCountry, numGuesses, game } = useContext(AppContext);
  const random = getTodaySeed();
  const index = Math.floor(random * countries.length);
  const todayCountry = countries[index];
  useEffect(() => {
    const dynamicImport = async () => {
      const shape = await import(
        `../data/countries-shape-svg/${todayCountry.value.toLowerCase()}/vector.svg`
      );
      const flag = await import(
        `../data/countries-flag-svg/${todayCountry.value.toLowerCase()}.svg`
      );
      const countrySvg = { shape: shape.default, flag: flag.default };
      setCountrySvg(countrySvg);
      setTodayCountry(todayCountry);
    };

    if (numGuesses === 0 && game === IN_PROCESS) {
      dynamicImport();
    }

    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [numGuesses, game]);

  return countrySvg;
};

export default useToday;
