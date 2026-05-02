import { useState, ChangeEvent, FormEvent, JSX } from "react";

const ForgotPasswordCard = (): JSX.Element => {
  const [email, setEmail] = useState<string>("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Reset email:", email);
  };

  return (
    <section className="relative z-10 w-full max-w-md">
      
      {/* Card */}
      <div className="bg-[#0e2037] border border-[#3b4a48] rounded-xl overflow-hidden shadow-2xl">
        
        {/* Header Image */}
        <div className="h-32 w-full relative overflow-hidden">
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDp0ckm6TJsZwr4WsjMDQrVnLZuAyJlOa6wlP7-w9s-lvyKd1o13KxwRQeMj-Hyw-HDgIdlUFNxo9Bpv9q-k98rGDFFy2NdhcKLx-pNfr0iAMIT6zCCrcaO5ZF0eJUjICB-szYsLvc2yv_S0Nvyhk68sAuCeUDhARQKbYrmsSdI-ZBcVM1d6MwYw_DnmZ7P6kiRAS40lESz5xPsnxUFBtvtZ6gbp1TsiaNOf6mfXQjpY9zLgQzqID6ZazgZBb7YcFjVIzfWj9HNyz_Y"
            alt="bg"
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0e2037] to-transparent" />
        </div>

        {/* Content */}
        <div className="p-6 flex flex-col gap-6">
          
          {/* Title */}
          <div>
            <h1 className="text-2xl font-semibold mb-2">
              Forgot password?
            </h1>
            <p className="text-gray-400 text-sm">
              Enter your email and we'll send you a reset link.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            
            <div>
              <label className="text-xs uppercase text-gray-400">
                Email Address
              </label>

              <input
                type="email"
                value={email}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setEmail(e.target.value)
                }
                placeholder="name@company.com"
                className="w-full mt-2 bg-[#091c32] border border-[#3b4a48] rounded-lg py-3 px-4 text-white focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/30 outline-none"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-cyan-400 hover:bg-cyan-300 text-black font-semibold py-3 rounded-lg transition active:scale-[0.98]"
            >
              Send reset link →
            </button>
          </form>

          {/* Footer */}
          <div className="pt-4 border-t border-[#25364d] text-sm text-gray-400 text-center">
            Remembered your password?{" "}
            <a href="#" className="text-cyan-400 hover:underline">
              Back to login
            </a>
          </div>
        </div>
      </div>

      {/* Security Note */}
      <div className="mt-4 text-center text-xs text-gray-500">
        🔒 Secure Encryption Enabled
      </div>
    </section>
  );
};

export default ForgotPasswordCard;