import { useEffect } from "react";
import { VscClose } from "react-icons/vsc";

const Modal = ({
  setOpen,
  open,
  children,
  id,
}: {
  setOpen: (open: boolean) => void;
  open: boolean;
  children?: React.ReactNode;
  id: string;
}) => {
  const handleClickClose = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    setOpen(false);
  };

  useEffect(() => {
    var element = document.getElementById(id);
    if (open) {
      element?.classList.remove("invisible");
      element?.classList.remove("opacity-0");
    } else {
      element?.classList.add("invisible");
      element?.classList.add("opacity-0");
    }
  }, [open, id]);

  return (
    <div
      id={id}
      className="fixed w-80 md:w-96 z-10 left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 bg-slate-200 text-white text-base rounded-lg backdrop-blur-md bg-opacity-20 shadow-md invisible opacity-0 transform duration-200 ease-in-out "
    >
      <div className="flex flex-col m-5 sm:m-10 text-white text-sm md:text-base">
        <button
          className="flex content-center items-center self-end text-lg md:text-2xl hover:bg-opacity-50 duration-200 hover:text-slate-700 font-light"
          onClick={handleClickClose}
        >
          <VscClose />
        </button>
        <div className="flex flex-col">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
