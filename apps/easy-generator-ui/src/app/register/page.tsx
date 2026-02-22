"use client";

// todo: prevent navigating to this page if the user already logged-in
// todo: improve form style
// todo: improve validations
// todo: set apiBaseUrl in a config file
// todo: send error logs to the cloud

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<null | "success" | "error">(null);

  async function registerUser(formData: FormData) {
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    // basic validation
    // todo: improve client-side validations
    if (!name || !email || !password) {
      setStatus("error");
      return;
    }

    setLoading(true);
    setStatus(null);

    try {
      const res = await fetch("http://localhost:5000/api/v1.0/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      if (!res.ok) {
        console.error("Failed to register");
        setStatus("error");
        return;
      }

      const data = await res.json();
      // todo: use http-only cookies
      localStorage.setItem("auth_token", data.auth_token);
      setStatus("success");
      router.push("/");
    } catch (err) {
      console.error(err);
      setStatus("error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-500">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.currentTarget);
          registerUser(formData);
        }}
        className="w-full max-w-md space-y-4 rounded-lg border p-6 shadow bg-black text-white"
      >
        <h1 className="text-2xl font-bold text-center">Create Account</h1>

        <input
          type="text"
          name="name"
          placeholder="Name"
          className="w-full rounded border p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full rounded border p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full rounded border p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded p-2 text-white disabled:opacity-50 bg-stone-700"
        >
          {loading ? "Registering..." : "Register"}
        </button>

        {status === "success" && (
          <p className="text-green-600 text-center">
            User created successfully!
          </p>
        )}
        {status === "error" && (
          <p className="text-red-600 text-center">
            Registration failed. Check your inputs.
          </p>
        )}
      </form>
    </div>
  );
}
