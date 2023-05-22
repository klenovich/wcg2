import { useState, useRef, useEffect, useContext } from "react";
import { AppContext } from "../App";
import { useClickOutside } from "../utils/useClickOutside";
import Modal from "./modal.component";
import { VscGraphLine } from "react-icons/vsc";
import { useCookies } from "react-cookie";
import { FINISHED_WIN, FINISHED_LOSE, IN_PROCESS } from "../constants";

const Report = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [statistics, setStatistics] = useState<{
    currentStreak: number;
    maxStreak: number;
    totalPlayed: number;
    totalWin: number;
    winPerc: number;
    guessDistribution: number[];
    history: number[];
  }>({
    currentStreak: 0,
    maxStreak: 0,
    totalPlayed: 0,
    totalWin: 0,
    winPerc: 0,
    guessDistribution: [],
    history: [],
  });
  const ref = useRef<HTMLDivElement>(null);
  useClickOutside(ref, () => setOpen(false));
  const { game, random, numGuesses } = useContext(AppContext);

  const handleMarkClick = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    setOpen(() => !open);
  };
  const [cookies, setCookie] = useCookies();

  useEffect(() => {
    const cockieFound = cookies && cookies.statistics;
    var currentStreak = cockieFound ? cookies.statistics.currentStreak : 0;
    var maxStreak = cockieFound ? cookies.statistics.maxStreak : 0;
    var totalPlayed = cockieFound ? cookies.statistics.totalPlayed : 0;
    var totalWin = cockieFound ? cookies.statistics.totalWin : 0;
    var winPerc = cockieFound ? totalWin / totalPlayed : 0;
    var guessDistribution = cockieFound
      ? cookies.statistics.guessDistribution
      : [0, 0, 0, 0, 0, 0];
    var history = cockieFound ? cookies.statistics.history : [];
    setStatistics({
      currentStreak,
      maxStreak,
      totalPlayed,
      totalWin,
      winPerc,
      guessDistribution,
      history,
    });

    if (game !== IN_PROCESS && !history.includes(random)) {
      totalPlayed += 1;
      if (game === FINISHED_LOSE) {
        currentStreak = 0;
      } else if (game === FINISHED_WIN) {
        currentStreak += 1;
        totalWin += 1;
        guessDistribution[numGuesses - 1] += 1;
        if (currentStreak > maxStreak) {
          maxStreak = currentStreak;
        }
      }
      winPerc = totalWin / totalPlayed;
      history.push(random);
      const newStatistics = {
        currentStreak,
        maxStreak,
        totalPlayed,
        totalWin,
        winPerc,
        guessDistribution,
        history,
      };
      setCookie("statistics", JSON.stringify(newStatistics), {
        maxAge: 315360000,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [game, cookies]);

  return (
    <div ref={ref}>
      <div className="flex content-center items-center hover:bg-opacity-50 duration-200 text-slate-300 hover:text-white font-light">
        <button onClick={handleMarkClick}>
          <VscGraphLine />
        </button>
      </div>
      <Modal setOpen={setOpen} open={open} id="modal-report">
        <p className="w-full border-b text-center text-lg md:text-2xl">
          Statistics
        </p>
        <br />
        <div className="w-full grid grid-cols-4">
          <div className="flex flex-col text-center">
            <span className="font-medium">{statistics.currentStreak}</span>
            Current Streak
          </div>
          <div className="flex flex-col text-center">
            <span className="font-medium">{statistics.maxStreak}</span>
            Max Streak
          </div>
          <div className="flex flex-col text-center">
            <span className="font-medium">
              {Math.floor(statistics.winPerc * 100)}%
            </span>
            Win Percent
          </div>
          <div className="flex flex-col text-center">
            <span className="font-medium">{statistics.totalPlayed}</span>
            Total Played
          </div>
        </div>
        <br />
        <div className="">
          <div className="flex justify-center">Distribution</div>
          <div className="flex justify-between">
            {statistics.guessDistribution?.map((e: number, i: number) => {
              return (
                <div className="flex flex-col" key={i}>
                  <div className="font-medium">{e}</div>
                  <div>
                    {i + 1}
                    <sup>
                      {i === 0 ? "st" : i === 1 ? "nd" : i === 2 ? "rd" : "th"}
                    </sup>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Report;
