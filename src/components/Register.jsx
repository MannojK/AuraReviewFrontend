import React, { useRef, useEffect } from "react";
import {
  Form,
  Link,
  useActionData,
  useNavigation,
  useNavigate,
  useSubmit,
} from "react-router-dom";
import apiClient from "../api/apiClient";
import { toast } from "react-toastify";

export default function Register() {
  const actionData = useActionData();
  const navigation = useNavigation();
  const navigate = useNavigate();
  const formRef = useRef(null);
  const submit = useSubmit();

  const isSubmitting = navigation.state === "submitting";

  useEffect(() => {
    if (actionData?.success) {
      navigate("/login");
      toast.success("Registration completed successfully. Try login..");
    }
  }, [actionData]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(formRef.current);
    if (!validatePasswords(formData)) {
      return;
    }
    submit(formData, { method: "post" });
  };

  /**
   * Validate Passwords Match
   */
  const validatePasswords = (formData) => {
    const password = formData.get("password");
    const confirmPwd = formData.get("confirmPwd");

    if (password !== confirmPwd) {
      toast.error("Passwords do not match!");
      return false;
    }
    return true;
  };

  // Dual Theme (Light Mode Default & Explicit dark: support)
  const labelStyle =
    "block text-sm font-medium text-orange-500 mb-2 tracking-wide uppercase";
  
  const textFieldStyle =
    "w-full px-4 py-2.5 text-base border rounded-md transition duration-200  dark:border-zinc-200 dark:bg-zinc-50  text-black placeholder-white dark:border-zinc-800 bg-zinc-900 text-white dark:text-black placeholder-zinc-500 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 focus:outline-none";
  
return (
  <div className="min-h-screen py-8 flex items-center justify-center dark:bg-zinc-50 bg-black px-4">
    <div className="bg-zinc-950 dark:bg-white border border-zinc-900 dark:border-zinc-200 shadow-2xl rounded-xl max-w-md w-full px-8 py-8 workflow-card">
        
        {/* Title container context */}
        <div className="text-center mb-8">
         {/* <h1 className="text-3xl font-bold  dark:text-black text-white text-center mb-8 tracking-tight">
          Register 
        </h1> */}
          <h1 className="text-3xl font-black dark:text-black text-white tracking-tight mt-2">
            Create <span className="text-orange-500">Account</span>
          </h1>
        </div>

        <Form
          method="POST"
          ref={formRef}
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          {/* Name Field */}
          <div>
            <label htmlFor="name" className={labelStyle}>
              Name
            </label>
            <input
              id="name"
              type="text"
              name="name"
              placeholder="Your Name"
              required
              minLength={5}
              maxLength={30}
              className={textFieldStyle}
            />
            {actionData?.errors?.name && (
              <p className="text-red-500 text-sm mt-1 font-medium">
                {actionData.errors.name}
              </p>
            )}
          </div>

          {/* Email & Mobile Split Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label htmlFor="email" className={labelStyle}>
                Email
              </label>
              <input
                id="email"
                type="email"
                name="email"
                placeholder="Your Email"
                autoComplete="email"
                required
                className={textFieldStyle}
              />
              {actionData?.errors?.email && (
                <p className="text-red-500 text-sm mt-1 font-medium">
                  {actionData.errors.email}
                </p>
              )}
            </div>
            
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
              required
              autoComplete="new-password"
              minLength={8}
              maxLength={20}
              className={textFieldStyle}
            />
            {actionData?.errors?.password && (
              <p className="text-red-500 text-sm mt-1 font-medium">
                {actionData.errors.password}
              </p>
            )}
          </div>

          {/* Confirm Password Field */}
          <div>
            <label htmlFor="confirmPwd" className={labelStyle}>
              Confirm Password
            </label>
            <input
              id="confirmPwd"
              type="password"
              name="confirmPwd"
              placeholder="Confirm Your Password"
              required
              autoComplete="confirm-password"
              minLength={8}
              maxLength={20}
              className={textFieldStyle}
            />
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full px-6 py-3 font-semibold text-lg rounded-md transition duration-200 focus:outline-none focus:ring-2 dark:focus:ring-orange-500 focus:ring-offset-2
                dark:text-white dark:bg-black dark:hover:bg-orange-600 dark:active:bg-orange-700
                text-black bg-orange-500 hover:bg-orange-600 active:bg-orange-700 focus:ring-offset-black disabled:opacity-50"
            >
              {isSubmitting ? "Registering..." : "Register"}
            </button>
          </div>
        </Form>

        {/* Login Link */}
        <p className="text-center text-zinc-600 dark:text-zinc-400 mt-6 text-sm font-medium">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-orange-500 font-bold underline decoration-transparent hover:decoration-current hover:text-black dark:hover:text-white transition duration-200"
          >
            Login Here
          </Link>
        </p>
      </div>
    </div>
  );
}

export async function registerAction({ request }) {
  const data = await request.formData();
  const registerData = {
    name: data.get("name"),
    email: data.get("email"),
    // mobileNumber: data.get("mobileNumber"),
    password: data.get("password"),
  };
  try {
    const response = await apiClient.post("/auth/register", registerData);
    return { success: true };
  } catch (error) {
    if (error.response?.status === 400) {
      return { success: false, errors: error.response?.data };
    }
    throw new Response(
      error.response?.data?.errorMessage ||
        error.message ||
        "Failed to submit your message. Please try again.",
      { status: error.status || 500 }
    );
  }
}