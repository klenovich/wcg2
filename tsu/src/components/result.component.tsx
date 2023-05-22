import { useState, useEffect, useContext, useRef } from "react";
import { IN_PROCESS, FINISHED_WIN, FINISHED_LOSE } from "../constants";
import { AppContext } from "../App";
import Modal from "./modal.component";
import { useClickOutside } from "../utils/useClickOutside";

const Result = () => {
  const [open, setOpen] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement>(null);
  useClickOutside(ref, () => setOpen(false));
  const { todayCountry, numGuesses, selectedCountries, setGame, game } =
    useContext(AppContext);

  useEffect(() => {
    if (
      numGuesses === 6 &&
      selectedCountries[numGuesses - 1]?.value !== todayCountry.value
    ) {
      setGame(FINISHED_LOSE);
      setOpen(true);
    } else if (
      selectedCountries[numGuesses - 1]?.value !== undefined &&
      selectedCountries[numGuesses - 1]?.value === todayCountry.value
    ) {
      setGame(FINISHED_WIN);
      setOpen(true);
    }
  }, [numGuesses, game, setGame, selectedCountries, todayCountry]);

  const message = () => {
    return game === FINISHED_WIN ? (
      numGuesses === 1 ? (
        <div className="p-5 text-sm md:text-base">
          You got it on the{" "}
          <span className="text-base md:text-xl italic">first</span> try!
        </div>
      ) : numGuesses === 6 ? (
        <div className="p-5 text-sm md:text-base">Oof, that was close.</div>
      ) : (
        <div className="p-5 text-sm md:text-base">
          You got it in{" "}
          <span className="text-base md:text-xl italic">{numGuesses} </span>
          guesses.
        </div>
      )
    ) : (
      <div className="p-5 text-sm md:text-base text-center">
        You didn't get it, the country is
        <div className="text-base md:text-xl italic">{todayCountry.label}.</div>
      </div>
    );
  };

  return (
    <div ref={ref}>
      {game === IN_PROCESS ? null : (
        <Modal setOpen={setOpen} open={open} id="modal-result">
          <div className="w-full text-center">{message()}</div>
        </Modal>
      )}
    </div>
  );
};

export default Result;
