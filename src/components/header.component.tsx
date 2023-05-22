import Instruction from "./instruction.component";
import Report from "./report.component";
import Settings from "./settings.component";

const Header = () => {
  return (
    <div className="flex justify-between items-center text-2xl pt-10 pb-5 mx-10 text-white border-b-2 border-white">
      <div className="flex justify-start gap-x-4 w-16">
        <Instruction />
        <Report />
      </div>
      <div>WORLDLE</div>
      <div className="w-16 flex justify-end">
        <Settings />
      </div>
    </div>
  );
};

export default Header;
