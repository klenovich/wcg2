import { useState, useContext } from "react";
import ReactCardFlip from "react-card-flip";
import useToday from "../utils/useToday";
import { AppContext } from "../App";
import { Chart } from 'chart.js';
import {TreemapController, TreemapElement} from 'chartjs-chart-treemap';
import ApexChart from "./treemap";



const CurrentCountry = () => {
  //const countrySvg = useToday();
  const { todayCountry} = useContext(AppContext);
  const [flipped, setFlipped] = useState<boolean>(false);
  const { enableFlag } = useContext(AppContext);

  const handleClick = (event: any) => {
    event.preventDefault();
    setFlipped((flipped) => !flipped);
  };
  return (
    <div className="w-full max-w-xs mx-auto p-5">
      { (
        <div className="flex justify-center items-center">
          {enableFlag ? (
            <ReactCardFlip isFlipped={flipped}>
              <div className="w-40 h-40 flex">
                {trmx}
              </div>
              <div className="w-40 h-40 flex">

              </div>
            </ReactCardFlip>
          ) : (
            <div className="w-40 h-40 flex">
              <p>{todayCountry.value}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CurrentCountry;

/*


<img
                  src={countrySvg.shape}
                  alt="Country Shape SVG"
                  onClick={handleClick}
                />

<p>{todayCountry.value}</p>

*/