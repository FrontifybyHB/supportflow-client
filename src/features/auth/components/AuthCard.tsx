import { useState, ChangeEvent, FormEvent } from "react";
import { JSX } from "react/jsx-runtime";
import { useNavigate } from "react-router-dom";




interface FormData {
  email: string;
  password: string;
}


const AuthCard = (): JSX.Element => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    console.log("Login Data:", formData);
  };
  
  

  return (
    <div className="w-full max-w-[420px] bg-[#0e2037] rounded-2xl p-10 border border-[#25364d] shadow-2xl">
      
      {/* Branding */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center p-3 rounded-xl bg-cyan-400/10 mb-4 border border-cyan-400/20">
          ⚡
        </div>
        <h1 className="text-2xl font-semibold mb-2">Welcome back</h1>
        <p className="text-gray-400 text-sm">
          Enter your credentials to access your command center
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* Email */}
        <div className="space-y-2">
          <label className="text-xs uppercase tracking-widest text-gray-400">
            Email Address
          </label>
          <input
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="operator@supportflow.ai"
            className="w-full bg-[#091c32] border border-[#25364d] rounded-lg py-3 px-4 text-white focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/20 outline-none"
            required
          />
        </div>

        {/* Password */}
        <div className="space-y-2">
          <div className="flex justify-between text-xs">
            <label className="uppercase tracking-widest text-gray-400">
              Password
            </label>
            <a href="#" className="text-cyan-400 hover:underline">
              Forgot password?
            </a>
          </div>

          <div className="relative">
            <input
              name="password"
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              className="w-full bg-[#091c32] border border-[#25364d] rounded-lg py-3 px-4 pr-10 text-white focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/20 outline-none"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
            >
              {showPassword ? "🙈" : "👁"}
            </button>
          </div>
        </div>

        {/* Button */}
        <button
          type="submit"
          className="w-full bg-cyan-400 hover:bg-cyan-300 active:scale-[0.98] text-black font-bold py-3 rounded-lg transition"
        >
          Sign in →
        </button>
      </form>

      {/* Divider */}
      <div className="relative my-8">
        <div className="border-t border-[#25364d]" />
        <p className="text-center text-xs text-gray-500 mt-2">
          Secure Access
        </p>
      </div>

      {/* Footer */}
      <p className="text-center text-sm text-gray-400 ">
        Don't have an account?{" "}
       <button onClick={() => navigate("/register")}>
        Create one
      </button>
      </p>
    </div>
  );
};

export default AuthCard;