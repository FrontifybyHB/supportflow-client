import Header from "../components/Header";
import Footer from "../components/Footer";
import AuthCard from "../components/AuthCard";
import { JSX } from "react/jsx-runtime";

const Login = (): JSX.Element => {
  return (
    <div className="min-h-screen flex flex-col bg-[#02142a] text-[#d4e3ff]">
      <Header />

      <main className="flex-grow flex items-center justify-center px-6 pt-16">
        <AuthCard />
      </main>

      <Footer />
    </div>
  );
};

export default Login;