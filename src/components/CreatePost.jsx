import React, { useState } from "react";
import { Form } from "react-router-dom";
import { useActionData, useNavigation, useSubmit } from "react-router-dom";
import { useEffect, useRef } from "react";
import { toast } from "react-toastify";
import { redirect } from "react-router-dom";
import apiClient from "../api/apiClient.js"; // your existing client
// import {useAuth} from "../store/auth-context.js";
import { useLoaderData } from "react-router-dom";

export default function CreatePost() {

  // const { user: currentUser } = useAuth();
  const actionData = useActionData();
  const formRef = useRef(null);
  const navigation = useNavigation();
  const submit = useSubmit();
  const isSubmitting = navigation.state === "submitting";
  const loaderData = useLoaderData(); 
  // const currentUser = loaderData?.user;
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user"); // Make sure this matches your exact key!
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {
    if (actionData?.success) {
      formRef.current?.reset();
      toast.success("Your Post has been submitted successfully!");
    }
  }, [actionData]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const userConfirmed = window.confirm(
      "Are you sure you want to submit the form?"
    );

    if (userConfirmed) {
      const formData = new FormData(formRef.current);
      submit(formData, { method: "post" });
    } else {
      toast.info("Form submission cancelled.");
    }
  };

  // Modern Styling Classes for Dark & Orange Theme
  const labelStyle = "block text-sm font-medium text-orange-400 mb-1.5 tracking-wide uppercase text-xs";
  const textFieldStyle = 
    "w-full px-4 py-3 text-base text-zinc-100 bg-zinc-800/50 border border-zinc-700 rounded-lg backdrop-blur-sm transition-all duration-200 placeholder-zinc-500 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20";

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50 flex items-center justify-center p-4 sm:p-6 md:p-8">
      <div className="w-full max-w-2xl bg-zinc-900/80 border border-zinc-800/80 rounded-2xl p-6 sm:p-10 shadow-2xl backdrop-blur-md">
        
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-orange-400 to-amber-500 bg-clip-text text-transparent">
            Create a New Post
          </h1>
          <p className="mt-2 text-sm text-zinc-400">
            Share your thoughts, upload media references, and publish to the world.
          </p>
        </div>

        {/* Form Container */}
        <Form
          method="POST"
          ref={formRef}
          onSubmit={handleSubmit}
          className="space-y-6"
        >
          {/* Row 1: Username & Category */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
    <label htmlFor="username" className={labelStyle}>
      Author Name
    </label>
    
    {/* 1. HIDDEN INPUT: This securely passes the ID to your action without showing it */}
   {/* Change name="userId" to name="username" and use currentUser.username */}
<input 
  type="hidden" 
  name="username"
  value={currentUser?.username || ""} 
/>

{/* You can keep the visible one just for display, but remove its 'name' attribute so it doesn't conflict */}
<input
  id="display-username"
  type="text"
  value={currentUser?.username || "Loading..."} 
  readOnly 
  className={`${textFieldStyle} bg-gray-100 text-gray-500 cursor-not-allowed opacity-75 focus:ring-0`}
/>
    
    {actionData?.errors?.username && (
      <p className="text-red-400 text-xs mt-1.5">
        {actionData.errors.username}
      </p>
    )}
  </div>

            <div>
              <label htmlFor="categoryType" className={labelStyle}>
                Category Type
              </label>
              <input
                id="categoryType"
                name="categoryType"
                type="text"
                placeholder="e.g., Tech, Lifestyle"
                className={textFieldStyle}
                required
                minLength={5}
                maxLength={20}
              />
              {actionData?.errors?.categoryType && (
                <p className="text-red-400 text-xs mt-1.5">
                  {actionData.errors.categoryType}
                </p>
              )}
            </div>
          </div>

          {/* Row 2: Storage Image URL & Title */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label htmlFor="imageurl" className="block font-medium text-orange-400 tracking-wide uppercase text-xs">
                  Storage Image URL
                </label>
                <span className="text-zinc-500 text-xs italic">Optional</span>
              </div>
              <input
                id="imageurl"
                name="imageurl"
                type="text"
                // minLength={5}
                maxLength={50}
                placeholder="https://storage.googleapis/..."
                className={textFieldStyle}
              />
              {actionData?.errors?.imageurl && (
                <p className="text-red-400 text-xs mt-1.5">
                  {actionData.errors.imageurl}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="title" className={labelStyle}>
                Post Title
              </label>
              <input
                id="title"
                name="title"
                type="text"
                placeholder="Title of your post"
                className={textFieldStyle}
                required
                minLength={5}
                maxLength={50}
              />
              {actionData?.errors?.title && (
                <p className="text-red-400 text-xs mt-1.5">
                  {actionData.errors.title}
                </p>
              )}
            </div>
          </div>

          {/* Message / Content Field */}
          <div>
            <label htmlFor="content" className={labelStyle}>
              Content / Message
            </label>
            <textarea
              id="content"
              name="content"
              rows="5"
              placeholder="Write your story here..."
              className={`${textFieldStyle} resize-none`}
              required
              minLength={5}
              maxLength={100000}
            ></textarea>
            {actionData?.errors?.content && (
              <p className="text-red-400 text-xs mt-1.5">
                {actionData.errors.content}
              </p>
            )}
          </div>

          {/* Submit Action */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full sm:w-auto px-8 py-3 rounded-lg font-semibold text-zinc-950 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-400 hover:to-amber-400 focus:outline-none focus:ring-2 focus:ring-orange-500/50 transform active:scale-[0.98] transition-all duration-200 disabled:opacity-50 disabled:pointer-events-none shadow-lg shadow-orange-500/10"
            >
              {isSubmitting ? "Publishing..." : "Publish Post"}
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
}
export async function contactAction({ request }) {
  const formData = await request.formData();
  
  // Grab username instead of userId!
  const username = formData.get("username"); 
  const categoryType = formData.get("categoryType");
  const title = formData.get("title");
  const content = formData.get("content");

  // SAFETY CHECK for username
  if (!username) {
    return { 
      success: false, 
      errors: { username: "Username is missing. Please log in again." } 
    };
  }

  // Structure the payload
  const payload = {
    title: title,
    content: content,
    category: categoryType,
    username: username // <-- Sending username to the backend
  };
try {
    const response = await apiClient.post("/posts", payload);
    return { success: true };
  } catch (error) {
    console.error("Backend post creation error:", error);
    
    // Because your Java handler returns a flat map, the errors are directly inside 'data'
    const backendErrors = error.response?.data;

    return { 
      success: false, 
      // Pass the backendErrors directly to the actionData
      errors: backendErrors || { content: "Internal Server Error." } 
    };
  }
}
// import React from "react";
// import { Form } from "react-router-dom";
// import apiClient from "../api/apiClient";
// import { useActionData, useNavigation, useSubmit } from "react-router-dom";
// import { useEffect, useRef } from "react";
// import { toast } from "react-toastify";
// import { redirect } from "react-router-dom";

// export default function CreatePost() {
//   const actionData = useActionData();
//   const formRef = useRef(null);
//   const navigation = useNavigation();
//   const submit = useSubmit();
//   const isSubmitting = navigation.state === "submitting";
//   useEffect(() => {
//     if (actionData?.success) {
//       formRef.current?.reset();
//       toast.success("Your Post has been submitted successfully!");
//     }
//   }, [actionData]);

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     const userConfirmed = window.confirm(
//       "Are you sure you want to submit the form?",
//     );

//     if (userConfirmed) {
//       const formData = new FormData(formRef.current); // Get form data
//       submit(formData, { method: "post" }); // Proceed with form submission
//     } else {
//       toast.info("Form submission cancelled.");
//     }
//   };

//   const labelStyle =
//     "block text-lg font-semibold text-light dark:text-primary mb-2";
//   const textFieldStyle =
//     "w-full px-4 py-2 text-base border  border-1 rounded-md border-orange-100 transition border-light dark:border-primary focus:ring focus:ring-lighter dark:focus:ring-dark focus:outline-none focus:ring focus:ring-orange-300 text-lighter dark:text-gray-800 bg-bg-gray-600 dark:white placeholder-gray-300 dark:placeholder-gray-400";
//   return (
//     <div className="max-w-[1152px] min-h-[852px] mx-auto px-6 py-8 font-primary bg-normalbg-darkbgbg dark:normalbg">
//       {/* Contact Info */}
//       <p className="max-w-[768px] mx-auto mt-8 text-lighter dark:text-gray-600 mb-8 text-center">
//         Create a Post 
//       </p>
//       {/* Contact Form */}
//       <Form
//         method="POST"
//         ref={formRef}
//         onSubmit={handleSubmit}
//         className="space-y-6 max-w-[768px] mx-auto"
//       >
//         {/* Name Field */}

//         {/* User and User Row */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
//           {/* UserName Field */}
//           <div>
//             <label htmlFor="name" className={labelStyle}>
//               Name
//             </label>
//             <input
//               id="username"
//               name="username"
//               type="text"
//               placeholder="Your Name"
//               className={textFieldStyle}
//               required
//               minLength={5}
//               maxLength={30}
//             />
//             {actionData?.errors?.name && (
//               <p className="text-red-500 text-sm mt-1">
//                 {actionData.errors.email}
//               </p>
//             )}
//           </div>

//           {/* CategoryTYpe Field */}
//           <div>
//             <label htmlFor="categorytype" className={labelStyle}>
//               CategoryType
//             </label>
//             <input
//               id="categoryType"
//               name="categoryType"
//               type="text"
//               placeholder="Category Type"
//               className={textFieldStyle}
//               required
//               minLength={5}
//               maxLength={20}
//             />
//             {actionData?.errors?.name && (
//               <p className="text-red-500 text-sm mt-1">
//                 {actionData.errors.email}
//               </p>
//             )}
//           </div>

//         </div>
//          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
//           {/* ImageUrl Field */}
//           <div>
//             <label htmlFor="imageurl" className={labelStyle}>
//               ImageUrl
//             </label>
//             <input
//               id="imageurl"
//               name="imageurl"
//               type="text"
//               placeholder="ImageUrl"
//               className={textFieldStyle}
//               // required
//               // minLength={5}
//               // maxLength={50}
//             />
//             {actionData?.errors?.name && (
//               <p className="text-red-500 text-sm mt-1">
//                 {actionData.errors.email}
//               </p>
//             )}
//           </div>

//           {/* CategoryTYpe Field */}
//           <div>
//             <label htmlFor="title" className={labelStyle}>
//               Title
//             </label>
//             <input
//               id="title"
//               name="title"
//               type="text"
//               placeholder=" Title "
//               className={textFieldStyle}
//               required
//               minLength={5}
//               maxLength={50}
//             />
//             {actionData?.errors?.name && (
//               <p className="text-red-500 text-sm mt-1">
//                 {actionData.errors.email}
//               </p>
//             )}
//           </div>

//         </div>

//         {/* Message Field */}
//         <div>
//           <label htmlFor="message" className={labelStyle}>
//             Message
//           </label>
//           <textarea
//             id="content"
//             name="content"
//             rows="4"
//             placeholder=" Content "
//             className={textFieldStyle}
//             required
//             minLength={5}
//             maxLength={10000}
//           ></textarea>
//           {actionData?.errors?.message && (
//             <p className="text-red-500 text-sm mt-1">
//               {actionData.errors.message}
//             </p>
//           )}
//         </div>

//         {/* Submit Button */}
//         <div className="text-center">
//           <button
//             type="submit"
//             disabled={isSubmitting}
//             className="px-6 py-2 text-white dark:text-black text-xl rounded-md transition duration-200 bg-primary dark:bg-light hover:hover:bg-lighter dark:bg-dark"
//           >
//             {isSubmitting ? "Submitting..." : "Submit"}
//           </button>
//         </div>
//       </Form>
//     </div>
//   );
// }