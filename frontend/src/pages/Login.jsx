import { useState } from "react";

function Login() {

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  const res = await fetch(`/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(form),
  });

  const data = await res.json();

  if (data.token) {
    localStorage.setItem("token", data.token);
    alert("Login successful");
    window.location.href = "/dashboard";
  } else {
    alert("Login failed");
  }
};


  return (

    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-purple-200 px-4">

      {/* LOGIN CARD */}
      <div className="bg-white/90 backdrop-blur-xl shadow-xl rounded-2xl p-8 w-full max-w-md">

        {/* LOGO */}
        <div className="flex justify-center mb-4">
          <img
            src="/short_logo.png"
            alt="Logo"
            className="h-14"
          />
        </div>

        {/* TITLE */}
        <h3 className="text-2xl font-bold text-center text-blue-600">
           Login
        </h3>

        <p className="text-center text-gray-500 text-sm mb-6">
          Enter your credentials to access your account
        </p>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-4">

          {/* EMAIL */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Email
            </label>

            <input
              name="email"
              placeholder="you@example.com"
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 outline-none"
            />
          </div>

          {/* PASSWORD */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Password
            </label>

            <input
              name="password"
              type="password"
              placeholder="Your password"
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 outline-none"
            />
          </div>

          {/* BUTTON */}
          <button
            type="submit"
            className="w-full mt-4 bg-gradient-to-r from-blue-500 to-cyan-500 hover:opacity-90 text-white py-3 rounded-lg font-semibold shadow-lg transition"
          >
            Log In
          </button>

        </form>

      </div>

    </div>

  );
}

export default Login;