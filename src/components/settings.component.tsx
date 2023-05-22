import { useState, useRef, useContext } from "react";
import { useClickOutside } from "../utils/useClickOutside";
import { AppContext } from "../App";
import Modal from "./modal.component";
import { VscGear } from "react-icons/vsc";

const Settings = () => {
  const [open, setOpen] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement>(null);
  useClickOutside(ref, () => setOpen(false));
  const { enableFlag, setEnableFlag, unit, setUnit, setCookie } =
    useContext(AppContext);

  const handleMarkClick = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    setOpen(() => !open);
  };

  const handleToggle = (event: React.ChangeEvent<HTMLInputElement>) => {
    switch (event.currentTarget.value) {
      case "flag":
        setEnableFlag(!enableFlag);
        setCookie("enableFlagSession", (!enableFlag).toString());
        break;
      case "unit":
        setUnit(!unit);
        setCookie("unitSession", (!unit).toString());
        break;
      default:
        break;
    }
  };

  return (
    <div ref={ref}>
      <div className="flex content-center items-center hover:bg-opacity-50 duration-200 text-slate-300 hover:text-white font-light">
        <button onClick={handleMarkClick}>
          <VscGear />
        </button>
      </div>

      <Modal setOpen={setOpen} open={open} id="modal-settings">
        <p className="w-full border-b text-center text-lg md:text-2xl">
          Settings
        </p>
        <br />
        <div className="w-full flex items-center justify-between text-sm md:text-base">
          <div className="">Unit</div>
          <div className="flex gap-x-4">
            <span>mi</span>
            <label className="inline-flex relative items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                onChange={handleToggle}
                checked={unit}
                value="unit"
              />
              <div className="w-11 h-6 peer-focus:outline-none rounded-full peer bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600"></div>
            </label>
            <span>km</span>
          </div>
        </div>
        <br />
        <div className="w-full flex items-center justify-between text-sm md:text-base">
          <div className="">Flip to see flags</div>
          <div className="flex gap-x-4">
            <label className="inline-flex relative items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                onChange={handleToggle}
                checked={enableFlag}
                value="flag"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            </label>
            <span className="invisible">km</span>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Settings;
