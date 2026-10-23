import React, { useEffect } from "react";
import {
  Link,
  Form,
  useActionData,
  useNavigation,
  useNavigate,
} from "react-router-dom";
import { toast } from "react-toastify";
import apiClient from "../api/apiClient";
import { useAuth } from "../store/auth-context.jsx";

export default function Login() {
  const actionData = useActionData();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const navigate = useNavigate();
  const { loginSuccess } = useAuth();
  const from = sessionStorage.getItem("redirectPath") || "/home";

  useEffect(() => {
    if (actionData?.success) {
      loginSuccess(actionData.jwtToken, actionData.user);
      sessionStorage.removeItem("redirectPath");
      setTimeout(() => {
        navigate(from);
      }, 100);
    } else if (actionData?.errors) {
      toast.error(actionData.errors.message || "Login failed.");
    }
  }, [actionData]);

  // Style definitions for Orange & Black theme
  const labelStyle =
    "block text-sm font-medium text-orange-500 mb-2 tracking-wide uppercase";
  const textFieldStyle =
    "w-full px-4 py-2.5 text-base border rounded-md transition duration-200  dark:border-zinc-200 dark:bg-zinc-50  text-black placeholder-white dark:border-zinc-800 bg-zinc-900 text-white dark:text-black placeholder-zinc-500 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 focus:outline-none";

  return (
    <div className="min-h-screen flex items-center justify-center dark:bg-zinc-50 bg-black px-4">
      <div className="bg-zinc-950 dark:bg-white border border-zinc-900 dark:border-zinc-200  shadow-2xl rounded-xl max-w-md w-full px-8 py-8 workflow-card">
        {/* Title */}
        <h1 className="text-3xl font-bold  dark:text-black text-white text-center mb-8 tracking-tight">
          Sign <span className="text-orange-500">In</span>
        </h1>

        {/* Form */}
        <Form method="POST" className="space-y-6">
          {/* Username Field */}
          <div>
            <label htmlFor="username" className={labelStyle}>
              Username
            </label>
            <input
              id="username"
              type="text"
              name="username"
              autoComplete="username"
              placeholder="Your Username"
              required
              className={textFieldStyle}
            />
          </div>

          {/* Password Field */}
          <div>
            <label htmlFor="password" className={labelStyle}>
              Password
            </label>
            <input
              id="password"
              type="password"
              name="password"
              placeholder="Your Password"
              autoComplete="current-password"
              required
              minLength={4}
              maxLength={20}
              className={textFieldStyle}
            />
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full px-6 py-3 text-black font-semibold text-lg rounded-md transition duration-200 bg-orange-500 hover:bg-orange-600 active:bg-orange-700 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:ring-offset-black"
            >
              {isSubmitting ? "Authenticating..." : "Login"}
            </button>
          </div>
        </Form>

        {/* Register Link */}
        <p className="text-center text-zinc-600 mt-6 text-sm font-medium">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-orange-500 font-bold hover:text-black underline decoration-transparent hover:decoration-black transition duration-200"
          >
            Register Here
          </Link>
        </p>
      </div>
    </div>
  );
}

export async function loginAction({ request }) {
  const data = await request.formData();
  const loginData = {
    username: data.get("username"),
    password: data.get("password"),
  };

  try {
    const response = await apiClient.post("/auth/login", loginData);
    const { message, user, jwtToken } = response.data;
    return { success: true, message, user, jwtToken };
  } catch (error) {
    if (error.response?.status === 401) {
      return {
        success: false,
        errors: { message: "Invalid username or password" },
      };
    }
    throw new Response(
      error.response?.data?.message ||
        error.message ||
        "Failed to login. Please try again.",
      { status: error.response?.status || 500 },
    );
  }
}
