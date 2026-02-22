"use client";

// todo: improve validations
// todo: set apiBaseUrl in a config file
// todo: send error logs to the cloud

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { IUserInfo } from "#types/user-info";
import { FaUser } from "react-icons/fa6";

export default function RegisterPage() {
  // prevent navigating to this page if the user already logged-in
  useEffect(() => {
    const store = localStorage.getItem("user");

    if (store) {
      try {
        let user: IUserInfo = JSON.parse(store);
        if (user.access_token) {
          router.push("/");
        }
      } catch {}
    }
  }, []);
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
      localStorage.setItem("user", JSON.stringify(data));
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
        className="w-full max-w-md space-y-4 rounded-lg border px-6 py-12 shadow bg-black text-white"
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
          className="disabled:opacity-50 rounded p-2 flex h-12 w-full items-center justify-center gap-2 rounded-full bg-foreground  text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc] "
        >
          <FaUser className="text-blue-500" />
          {loading ? "Registering..." : "Register"}
        </button>

        <p className="text-gray-500 hover:text-white text-center">
          or <a href="/login">Login</a>
        </p>

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
