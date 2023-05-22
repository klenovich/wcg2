import { useContext, useEffect, useState } from "react";
import { AppContext } from "../App";
import { FINISHED_LOSE, FINISHED_WIN } from "../constants";

const Hyperlink = () => {
  const { game, todayCountry } = useContext(AppContext);
  const [links, setLinks] = useState<{ wiki: string; map: string }>({
    wiki: "",
    map: "",
  });

  useEffect(() => {
    if (todayCountry && Object.keys(todayCountry).length !== 0) {
      const slug = todayCountry.label.replace(/\s+/g, "_");
      const wiki = "https://en.wikipedia.org/wiki/" + slug;
      const map = "https://www.google.com/maps/place/" + slug;
      setLinks({
        wiki,
        map,
      });
    }
  }, [todayCountry]);

  useEffect(() => {
    if (game === FINISHED_LOSE || game === FINISHED_WIN) {
      var element = document.getElementById("Hyperlink");
      element?.classList.remove("invisible");
    }
  }, [game]);

  return (
    <span
      id="Hyperlink"
      className="flex justify-center items-center gap-x-4 text-white text-xs md:text-sm invisible"
    >
      <a href={links.wiki} rel="noopener noreferrer" target="_blank">
        <div>
          📚{" "}
          <span className="link-underline link-underline-black">
            On Wikipedia
          </span>
        </div>
      </a>
      <a href={links.map} rel="noopener noreferrer" target="_blank">
        <div>
          🌎{" "}
          <span className="link-underline link-underline-black">
            On GoogleMaps
          </span>
        </div>
      </a>
    </span>
  );
};
export default Hyperlink;
