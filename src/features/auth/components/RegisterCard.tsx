import { useState, ChangeEvent, FormEvent } from "react";
import { JSX } from "react/jsx-runtime";
import CheckItem from "./CheckItem";
import { useNavigate } from "react-router-dom";



interface FormData {
    name: string;
    email: string;
    password: string;
}

const RegisterCard = (): JSX.Element => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    console.log("Register Data:", formData);
  };

  // 🔥 Password checks (dynamic UI)
  const checks = {
    length: formData.password.length >= 8,
    special: /[!@#$%^&*]/.test(formData.password),
    uppercase: /[A-Z]/.test(formData.password),
    number: /[0-9]/.test(formData.password),
  };

  return (
    <div className="w-full max-w-[420px] bg-[#0e2037] border border-[#25364d] p-8 rounded-xl shadow-2xl flex flex-col gap-6">
      
      {/* Top Section */}
      <div className="flex flex-col items-center gap-2 text-center">
        <div className="w-12 h-12 bg-cyan-400/10 rounded-lg flex items-center justify-center text-cyan-400 text-2xl">
          ⚡
        </div>

        <h1 className="text-2xl font-semibold text-white">
          Create an account
        </h1>

        <p className="text-gray-400 text-sm">
          Join the next generation of AI customer support
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        
        {/* Name */}
        <div className="flex flex-col gap-1">
          <label className="text-xs uppercase text-gray-400">
            Full Name
          </label>
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="John Doe"
            className="bg-[#091c32] border border-[#3b4a48] rounded px-3 py-2 text-white focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/30 outline-none"
            required
          />
        </div>

        {/* Email */}
        <div className="flex flex-col gap-1">
          <label className="text-xs uppercase text-gray-400">
            Work Email
          </label>
          <input
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="john@company.com"
            className="bg-[#091c32] border border-[#3b4a48] rounded px-3 py-2 text-white focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/30 outline-none"
            required
          />
        </div>

        {/* Password */}
        <div className="flex flex-col gap-2">
          <label className="text-xs uppercase text-gray-400">
            Password
          </label>

          <input
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="••••••••"
            className="bg-[#091c32] border border-[#3b4a48] rounded px-3 py-2 text-white focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/30 outline-none"
            required
          />

          {/* 🔥 Strength Bar */}
          <div className="flex gap-1 h-1 mt-2">
            {[checks.length, checks.special, checks.uppercase, checks.number].map((ok, i) => (
              <div
                key={i}
                className={`flex-1 rounded-full ${
                  ok ? "bg-cyan-400" : "bg-[#25364d]"
                }`}
              />
            ))}
          </div>

          {/* 🔥 Rules */}
          <div className="grid grid-cols-2 gap-y-1 text-xs mt-2">
            <CheckItem label="8+ characters" ok={checks.length} />
            <CheckItem label="Special char" ok={checks.special} />
            <CheckItem label="Uppercase" ok={checks.uppercase} />
            <CheckItem label="One number" ok={checks.number} />
          </div>
        </div>

        {/* Button */}
        <button
          type="submit"
          className="mt-2 w-full bg-cyan-400 text-black font-semibold py-2 rounded-lg hover:bg-cyan-300 active:scale-[0.98] transition flex items-center justify-center gap-2"
        >
          Create account →
        </button>
      </form>

      {/* Footer */}
      <div className="pt-4 border-t border-[#25364d] text-center text-sm text-gray-400 cursor-pointer">
        Already have an account?{" "}
       <button onClick={() => navigate("/login")}>
        Sign in
      </button>
      </div>
    </div>
  );
};

export default RegisterCard;