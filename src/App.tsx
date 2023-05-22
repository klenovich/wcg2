import { useState, useEffect, createContext } from "react";
import { CountryType } from "./interfaces";
import Header from "./components/header.component";
import getTodaySeed from "./utils/getTodaySeed";
import CurrentCountry from "./components/current-country.component";
import GuessPanels from "./components/guess-panels.component";
import Selections from "./components/selections.component";
import Hyperlink from "./components/hyperlink.component";
import Result from "./components/result.component";
import { IN_PROCESS } from "./constants";
import Footer from "./components/footer.component";
import { useCookies } from "react-cookie";
import { inject } from "@vercel/analytics";

// Make sure to call this only once in your app
inject();

interface contextType {
  todayCountry: CountryType;
  setTodayCountry: (currentCountry: CountryType) => void;
  numGuesses: number;
  setNumGuesses: (numGuesses: number) => void;
  selectedCountries: CountryType[];
  setSelectedCountries: (selectedCountries: CountryType[]) => void;
  game: string;
  setGame: (game: string) => void;
  enableFlag: boolean;
  setEnableFlag: (enableFlag: boolean) => void;
  unit: boolean;
  setUnit: (unit: boolean) => void;
  setCookie: (name: string, values: string, options?: any) => void;
  random: number;
}

export const AppContext = createContext<contextType>({} as contextType);

function App() {
  const random = getTodaySeed();

  // * useState
  const [todayCountry, setTodayCountry] = useState<CountryType>(
    {} as CountryType
  );
  const [numGuesses, setNumGuesses] = useState<number>(0);
  const [selectedCountries, setSelectedCountries] = useState<CountryType[]>([
    {},
    {},
    {},
    {},
    {},
    {},
  ] as CountryType[]);
  const [game, setGame] = useState<string>(IN_PROCESS);
  const [enableFlag, setEnableFlag] = useState<boolean>(false);
  const [unit, setUnit] = useState<boolean>(true);
  const [cookies, setCookie] = useCookies([random.toString()]);

  // * useEffect
  useEffect(() => {
    var enableFlagSession = cookies["enableFlagSession"];
    var enableFlagToggle = true;
    if (
      enableFlagSession === undefined ||
      enableFlagSession === null ||
      enableFlagSession === "false"
    ) {
      enableFlagToggle = false;
    }
    setEnableFlag(enableFlagToggle);

    var unitSession = cookies["unitSession"];
    var unitToggle = true;
    if (
      unitSession === undefined ||
      enableFlagSession === null ||
      unitSession === "false"
    ) {
      unitToggle = false;
    }
    setUnit(unitToggle);

    const userTodayRecord =
      cookies && Object.keys(cookies).length !== 0
        ? cookies[random.toString() as string]
        : null;
    if (userTodayRecord !== undefined && userTodayRecord !== null) {
      setSelectedCountries(userTodayRecord);
      var count = userTodayRecord.filter((e: CountryType) => {
        return e.value !== undefined;
      }).length;
      setNumGuesses(count);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const value = {
    todayCountry,
    setTodayCountry,
    numGuesses,
    setNumGuesses,
    selectedCountries,
    setSelectedCountries,
    game,
    setGame,
    enableFlag,
    setEnableFlag,
    unit,
    setUnit,
    setCookie,
    random,
  };

  return (
    <div className="h-screen flex flex-col justify-between font-light">
      <AppContext.Provider value={value}>
        <Header />
        <div className="space-y-0">
          <CurrentCountry />
          <GuessPanels />
          <Selections />
          <Hyperlink />
          <Result />
        </div>
        <Footer />
      </AppContext.Provider>
    </div>
  );
}

export default App;
