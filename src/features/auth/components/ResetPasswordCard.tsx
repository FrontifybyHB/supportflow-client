import { useState, ChangeEvent, FormEvent, JSX } from "react";

const ResetPasswordCard = (): JSX.Element => {
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    console.log("New Password:", password);
  };

  // 🔥 Basic strength logic
  const strength = [
    password.length >= 8,
    /[A-Z]/.test(password),
    /[0-9]/.test(password),
    /[!@#$%^&*]/.test(password),
  ];

  return (
    <div className="w-full max-w-md">
      
      <div className="bg-[#0e2037] border border-[#3b4a48] rounded-xl p-6 shadow-2xl relative overflow-hidden">
        
        {/* Top Accent */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-50" />

        {/* Title */}
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-bold mb-2">Reset password</h1>
          <p className="text-gray-400 text-sm">
            Choose a strong new password.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* New Password */}
          <div>
            <label className="text-xs uppercase text-gray-400">
              New Password
            </label>

            <div className="relative mt-2">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setPassword(e.target.value)
                }
                className="w-full bg-[#091c32] border border-[#3b4a48] rounded-lg py-3 px-4 pr-10 text-white focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/20 outline-none"
                placeholder="••••••••"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
              >
                {showPassword ? "🙈" : "👁"}
              </button>
            </div>
          </div>

          {/* Strength */}
          <div>
            <div className="flex justify-between text-xs mb-2">
              <span className="text-gray-400">Security Rating</span>
              <span className="text-cyan-400">
                {strength.filter(Boolean).length >= 3 ? "Strong" : "Weak"}
              </span>
            </div>

            <div className="grid grid-cols-4 gap-1 h-1">
              {strength.map((ok, i) => (
                <div
                  key={i}
                  className={`rounded-full ${
                    ok ? "bg-cyan-400" : "bg-[#25364d]"
                  }`}
                />
              ))}
            </div>

            <p className="text-xs text-gray-400 mt-2">
              Include 8+ chars, uppercase, number, symbol
            </p>
          </div>

          {/* Confirm Password */}
          <div>
            <label className="text-xs uppercase text-gray-400">
              Confirm Password
            </label>

            <input
              type="password"
              value={confirmPassword}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setConfirmPassword(e.target.value)
              }
              className="w-full mt-2 bg-[#091c32] border border-[#3b4a48] rounded-lg py-3 px-4 text-white focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/20 outline-none"
              placeholder="••••••••"
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-cyan-400 hover:bg-cyan-300 text-black font-semibold py-3 rounded-lg transition active:scale-[0.98]"
          >
            Update password →
          </button>
        </form>

        {/* Footer */}
        <div className="mt-6 text-center text-sm text-gray-400">
          <a href="#" className="text-cyan-400 hover:underline">
            ← Back to login
          </a>
        </div>
      </div>

      {/* Extra Cards */}
      <div className="mt-4 grid grid-cols-2 gap-3">
        <div className="p-3 bg-[#091c32] rounded-lg text-xs text-gray-400">
          🔐 End-to-End Encryption
        </div>
        <div className="p-3 bg-[#091c32] rounded-lg text-xs text-gray-400">
          🛡 Global Compliance
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordCard;