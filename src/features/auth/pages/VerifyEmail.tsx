import { JSX } from "react/jsx-runtime";
import VerifyCard from "../components/VerifyCard";

const VerifyEmail = (): JSX.Element => {
  return (
    <div className="min-h-screen flex flex-col bg-[#02142a] text-white">
      <main className="flex-grow flex items-center justify-center px-4 pt-20 pb-12">
        <VerifyCard />
      </main>
    </div>
  );
};

export default VerifyEmail;