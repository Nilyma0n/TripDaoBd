import { Link } from "react-router-dom";
import Container from "../../components/ui/Container";

const ForgotPassword = () => {
  return (
    <section className="min-h-screen bg-slate-50 flex items-center py-20">
      <Container>
        <div className="max-w-md mx-auto bg-white rounded-3xl shadow-xl p-10">

          <div className="text-center">

            <h1 className="text-4xl font-bold text-blue-700">
              Forgot Password
            </h1>

            <p className="mt-3 text-gray-500">
              Enter your email to receive a password reset link.
            </p>

          </div>

          <form className="mt-10 space-y-6">

            <div>
              <label className="block mb-2 font-semibold">
                Email Address
              </label>

              <input
                type="email"
                placeholder="Enter your email"
                className="w-full border rounded-xl p-4 focus:ring-2 focus:ring-blue-700 outline-none"
              />
            </div>

            <button
              className="w-full bg-blue-700 hover:bg-blue-800 text-white py-4 rounded-xl font-semibold"
            >
              Send Reset Link
            </button>

          </form>

          <div className="mt-8 text-center">

            <Link
              to="/login"
              className="text-blue-700 font-semibold hover:underline"
            >
              ← Back to Login
            </Link>

          </div>

        </div>
      </Container>
    </section>
  );
};

export default ForgotPassword;