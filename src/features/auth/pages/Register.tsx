import { JSX } from "react/jsx-runtime";
import RegisterCard from "../components/RegisterCard";

const Register = (): JSX.Element => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#02142a] px-4">
      <RegisterCard />
    </div>
  );
};

export default Register;