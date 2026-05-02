import { useEffect, useRef, useState } from "react";
import { JSX } from "react/jsx-runtime";

const OTP_LENGTH = 6;

const VerifyCard = (): JSX.Element => {
  const [otp, setOtp] = useState<string[]>(Array(OTP_LENGTH).fill(""));
  const [timer, setTimer] = useState<number>(59);

  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  // ⏱ Timer logic
  useEffect(() => {
    if (timer === 0) return;

    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

  // 🔥 Handle input change
  const handleChange = (value: string, index: number) => {
    if (!/^[0-9]?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Move to next input
    if (value && index < OTP_LENGTH - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  // 🔥 Handle backspace
  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const code = otp.join("");
    console.log("OTP:", code);
  };

  const handleResend = () => {
    setTimer(59);
    console.log("Resend OTP");
  };

  return (
    <div className="w-full max-w-[420px]">
      
      {/* Glow */}
      <div className="relative group mb-8">
        <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400 to-cyan-300 rounded-xl blur opacity-20 group-hover:opacity-40 transition" />

        <div className="relative bg-[#0e2037] border border-[#3b4a48] p-8 rounded-xl shadow-2xl">

          {/* Icon */}
          <div className="flex justify-center mb-6">
            <div className="w-12 h-12 rounded-lg bg-[#192b42] flex items-center justify-center text-cyan-400 text-2xl">
              ✉️
            </div>
          </div>

          {/* Title */}
          <div className="text-center mb-6">
            <h1 className="text-2xl font-semibold mb-2">
              Verify your email
            </h1>
            <p className="text-gray-400 text-sm">
              We've sent a 6-digit code to your email.
            </p>
          </div>

          {/* OTP Inputs */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex justify-between gap-2">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => {
                     inputsRef.current[index] = el;
                               }}
                  value={digit}
                  onChange={(e) => handleChange(e.target.value, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  maxLength={1}
                  className="w-12 h-14 text-center text-xl bg-[#091c32] border border-[#3b4a48] rounded-lg focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 outline-none"
                />
              ))}
            </div>

            {/* Button */}
            <button
              type="submit"
              className="w-full h-12 bg-cyan-400 hover:bg-cyan-300 text-black font-semibold rounded-lg transition active:scale-[0.98]"
            >
              Verify account →
            </button>
          </form>

          {/* Timer */}
          <div className="mt-6 text-center">
            <div className="inline-flex items-center gap-2 px-3 py-2 bg-[#192b42] rounded-full text-sm text-gray-400">
              ⏱ Resend OTP in 0:{timer.toString().padStart(2, "0")}
            </div>

            <div className="mt-3">
              <button
                onClick={handleResend}
                disabled={timer !== 0}
                className={`text-sm ${
                  timer === 0
                    ? "text-cyan-400 hover:underline"
                    : "text-gray-500 cursor-not-allowed"
                }`}
              >
                Resend code
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Back link */}
      <div className="text-center text-sm text-gray-400">
        <button className="hover:text-white transition">
          ← Wrong email? Back to registration
        </button>
      </div>
    </div>
  );
};

export default VerifyCard;