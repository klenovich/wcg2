import { useState, useContext } from "react";
import ReactCardFlip from "react-card-flip";
import useToday from "../utils/useToday";
import { AppContext } from "../App";

const CurrentCountry = () => {
  const countrySvg = useToday();
  const [flipped, setFlipped] = useState<boolean>(false);
  const { enableFlag } = useContext(AppContext);

  const handleClick = (event: any) => {
    event.preventDefault();
    setFlipped((flipped) => !flipped);
  };
  return (
    <div className="w-full max-w-xs mx-auto p-5">
      {countrySvg ? (
        <div className="flex justify-center items-center">
          {enableFlag ? (
            <ReactCardFlip isFlipped={flipped}>
              <div className="w-40 h-40 flex">
                <img
                  src={countrySvg.shape}
                  alt="Country Shape SVG"
                  onClick={handleClick}
                />
              </div>
              <div className="w-40 h-40 flex">
                <img
                  src={countrySvg.flag}
                  alt="Country Flag SVG"
                  onClick={handleClick}
                />
              </div>
            </ReactCardFlip>
          ) : (
            <div className="w-40 h-40 flex">
              <img
                src={countrySvg.shape}
                alt="Country Shape SVG"
                onClick={handleClick}
              />
            </div>
          )}
        </div>
      ) : (
        <div className="w-40 h-40 flex"></div>
      )}
    </div>
  );
};

export default CurrentCountry;
