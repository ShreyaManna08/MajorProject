import React from "react";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import {
  FiUser,
  FiMail,
  FiPhone,
  FiBook,
  FiCalendar,
  FiPercent,
  FiCheck,
  FiLoader,
  FiStar,
  FiBookmark,
} from "react-icons/fi";
import axios from "axios";
import { ChatState } from "../../../context/ChatProvider";
import { Navigate, useNavigate, useParams } from "react-router-dom";

const EnrollCourse = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const [hasGraduation, setHasGraduation] = useState(false);
  const [hasPostGraduation, setHasPostGraduation] = useState(false);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    tenth_year: "",
    tenth_marks: "",
    twelfth_year: "",
    twelfth_marks: "",
    ug_name: "",
    ug_start: "",
    ug_end: "",
    ug_marks: "",
    other_course: "",
    other_course_start: "",
    other_course_end: "",
    other_course_marks: "",
    course_code: "", // Added required field
    rank: "", // Added required field
  });
  const [errors, setErrors] = useState({});

  const { email, setEmail, courseCode, setCourseCode } = ChatState();

  useEffect(() => {
    // Get user data from localStorage safely
    try {
      const storedUser = localStorage.getItem("user");
      const userEmail = storedUser.email;
      setEmail(userEmail);
      setCourseCode(id);
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        setUserData(parsedUser);

        // If user already has graduation or post-graduation data, show those sections
        if (
          parsedUser.ug_name ||
          parsedUser.ug_start ||
          parsedUser.ug_end ||
          parsedUser.ug_marks
        ) {
          setHasGraduation(true);
        }
        if (
          parsedUser.other_course ||
          parsedUser.other_course_start ||
          parsedUser.other_course_end ||
          parsedUser.other_course_marks
        ) {
          setHasPostGraduation(true);
        }

        // Pre-fill form with existing academic data
        setFormData({
          tenth_year: parsedUser.tenth_year || "",
          tenth_marks: parsedUser.tenth_marks || "",
          twelfth_year: parsedUser.twelfth_year || "",
          twelfth_marks: parsedUser.twelfth_marks || "",
          ug_name: parsedUser.ug_name || "",
          ug_start: parsedUser.ug_start || "",
          ug_end: parsedUser.ug_end || "",
          ug_marks: parsedUser.ug_marks || "",
          other_course: parsedUser.other_course || "",
          other_course_start: parsedUser.other_course_start || "",
          other_course_end: parsedUser.other_course_end || "",
          other_course_marks: parsedUser.other_course_marks || "",
          course_code: parsedUser.course_code || "", // Pre-fill course code if exists
          rank: parsedUser.rank || "", // Pre-fill rank if exists
        });
      }
    } catch (error) {
      console.error("Error getting user data:", error);
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Clear error for this field when user types
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null,
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Required fields validation
    if (!formData.tenth_year) {
      newErrors.tenth_year = "10th passout year is required";
    }
    if (!formData.tenth_marks) {
      newErrors.tenth_marks = "10th percentage is required";
    }

    if (!formData.twelfth_year) {
      newErrors.twelfth_year = "12th passout year is required";
    }
    if (!formData.twelfth_marks) {
      newErrors.twelfth_marks = "12th percentage is required";
    }

    if (!formData.rank) {
      newErrors.rank = "Rank is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    // Prepare data for API
    const academicData = {
      email: userData.email, // Including email from userData
      course_code: formData.course_code,
      tenth_year: formData.tenth_year,
      tenth_marks: formData.tenth_marks,
      twelfth_year: formData.twelfth_year,
      twelfth_marks: formData.twelfth_marks,
      rank: formData.rank,
    };

    // Add graduation details if available
    if (hasGraduation) {
      academicData.ug_name = formData.ug_name;
      academicData.ug_start = formData.ug_start;
      academicData.ug_end = formData.ug_end;
      academicData.ug_marks = formData.ug_marks;
    } else {
      // Include empty strings for required fields
      academicData.ug_name = "";
      academicData.ug_start = "";
      academicData.ug_end = "";
      academicData.ug_marks = "";
    }

    // Add post-graduation details if available
    if (hasPostGraduation) {
      academicData.other_course = formData.other_course;
      academicData.other_course_start = formData.other_course_start;
      academicData.other_course_end = formData.other_course_end;
      academicData.other_course_marks = formData.other_course_marks;
    } else {
      // Include empty strings for required fields
      academicData.other_course = "";
      academicData.other_course_start = "";
      academicData.other_course_end = "";
      academicData.other_course_marks = "";
    }

    setLoading(true);

    try {
      // Get user token from localStorage
      const token = localStorage.getItem("token");

      if (!token) {
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: "Authentication failed. Please login again.",
          showConfirmButton: false,
          timer: 1500,
        });

        setLoading(false);
        return;
      }

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      };

      // Post data to API
      const response = await axios.post(
        "https://e-college-data.onrender.com/v1/students/student-academic",
        academicData,
        config
      );

      if (response.data) {
        console.log(response.data);
        // Update user data in localStorage with new academic info
        const updatedUserData = { ...userData, ...academicData };
        localStorage.setItem("user", JSON.stringify(updatedUserData));

        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Educational Profile updated successfully!",
          showConfirmButton: false,
          timer: 1500,
        });
        setTimeout(navigate("/payment"), 3000);
      }
    } catch (error) {
      console.error("Error updating educational profile:", error);
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Failed to update educational profile. Please try again",
        showConfirmButton: false,
        timer: 1500,
      });
    } finally {
      setLoading(false);
    }
  };

  // Animation variants
  const inputVariants = {
    focus: { scale: 1.02, transition: { duration: 0.2 } },
    blur: { scale: 1, transition: { duration: 0.2 } },
  };

  const buttonVariants = {
    hover: { scale: 1.05, transition: { duration: 0.2 } },
    tap: { scale: 0.95, transition: { duration: 0.1 } },
  };

  if (!userData) {
    return (
      <div className="min-h-screen bg-gray-50 p-6 flex justify-center items-center">
        <div className="bg-white rounded-lg shadow-lg p-8 text-center">
          <div className="animate-spin text-blue-600 mx-auto mb-4">
            <FiLoader size={32} />
          </div>
          <p className="text-gray-700 text-lg">Loading user data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6 flex justify-center">
      <div className="w-full max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-lg shadow-lg p-8"
        >
          <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
            Educational Profile & Course Enrollment
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Personal Information */}
            <div className="bg-gray-50 p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold text-gray-700 mb-4 border-b pb-2">
                Personal Information
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Name */}
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Name
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">
                      <FiUser />
                    </span>
                    <motion.input
                      variants={inputVariants}
                      whileFocus="focus"
                      whileBlur="blur"
                      type="text"
                      value={userData.name}
                      className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-100"
                      placeholder="Full Name"
                      disabled
                    />
                  </div>
                </div>

                {/* Gender */}
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Gender
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">
                      <FiUser />
                    </span>
                    <motion.input
                      variants={inputVariants}
                      whileFocus="focus"
                      whileBlur="blur"
                      type="text"
                      value={userData.gender}
                      className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-100"
                      disabled
                    />
                  </div>
                </div>

                {/* Email */}
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">
                      <FiMail />
                    </span>
                    <motion.input
                      variants={inputVariants}
                      whileFocus="focus"
                      whileBlur="blur"
                      type="email"
                      value={userData.email}
                      className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-100"
                      placeholder="Email Address"
                      disabled
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-1 gap-4 mt-4">
                {/* Phone */}
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">
                      <FiPhone />
                    </span>
                    <motion.input
                      variants={inputVariants}
                      whileFocus="focus"
                      whileBlur="blur"
                      value={userData.phoneNumber}
                      type="tel"
                      className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-100"
                      placeholder="Phone Number"
                      disabled
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Course Enrollment Details */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold text-gray-700 mb-4 border-b pb-2">
                Course Enrollment Details
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                {/* Course Code */}
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Course Code *
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">
                      <FiBookmark />
                    </span>
                    <motion.input
                      variants={inputVariants}
                      whileFocus="focus"
                      whileBlur="blur"
                      type="text"
                      disabled
                      name="course_code"
                      value={courseCode}
                      onChange={handleInputChange}
                      className={`pl-10 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        errors.course_code
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                      placeholder="e.g. CS101"
                    />
                  </div>
                  {errors.course_code && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.course_code}
                    </p>
                  )}
                </div>

                {/* Rank */}
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Entrance Rank *
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">
                      <FiStar />
                    </span>
                    <motion.input
                      variants={inputVariants}
                      whileFocus="focus"
                      whileBlur="blur"
                      type="number"
                      min="1"
                      name="rank"
                      value={formData.rank}
                      onChange={handleInputChange}
                      className={`pl-10 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        errors.rank ? "border-red-500" : "border-gray-300"
                      }`}
                      placeholder="Your rank in entrance exam"
                    />
                  </div>
                  {errors.rank && (
                    <p className="text-red-500 text-xs mt-1">{errors.rank}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Education Details */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold text-gray-700 mb-4 border-b pb-2">
                Educational Details
              </h2>

              {/* 10th Standard */}
              <div className="mb-6">
                <h3 className="text-lg font-medium text-gray-700 mb-3 flex items-center">
                  <FiBook className="mr-2" /> 10th Standard *
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="relative">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Passout Year *
                    </label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">
                        <FiCalendar />
                      </span>
                      <motion.input
                        variants={inputVariants}
                        whileFocus="focus"
                        whileBlur="blur"
                        type="number"
                        min="1980"
                        max="2025"
                        name="tenth_year"
                        value={formData.tenth_year}
                        onChange={handleInputChange}
                        className={`pl-10 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          errors.tenth_year
                            ? "border-red-500"
                            : "border-gray-300"
                        }`}
                        placeholder="YYYY"
                      />
                    </div>
                    {errors.tenth_year && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.tenth_year}
                      </p>
                    )}
                  </div>

                  <div className="relative">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Percentage *
                    </label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">
                        <FiPercent />
                      </span>
                      <motion.input
                        variants={inputVariants}
                        whileFocus="focus"
                        whileBlur="blur"
                        type="number"
                        step="0.01"
                        min="0"
                        max="100"
                        name="tenth_marks"
                        value={formData.tenth_marks}
                        onChange={handleInputChange}
                        className={`pl-10 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          errors.tenth_marks
                            ? "border-red-500"
                            : "border-gray-300"
                        }`}
                        placeholder="Percentage"
                      />
                    </div>
                    {errors.tenth_marks && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.tenth_marks}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* 12th Standard */}
              <div className="mb-6">
                <h3 className="text-lg font-medium text-gray-700 mb-3 flex items-center">
                  <FiBook className="mr-2" /> 12th Standard *
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="relative">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Passout Year *
                    </label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">
                        <FiCalendar />
                      </span>
                      <motion.input
                        variants={inputVariants}
                        whileFocus="focus"
                        whileBlur="blur"
                        type="number"
                        min="1980"
                        max="2025"
                        name="twelfth_year"
                        value={formData.twelfth_year}
                        onChange={handleInputChange}
                        className={`pl-10 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          errors.twelfth_year
                            ? "border-red-500"
                            : "border-gray-300"
                        }`}
                        placeholder="YYYY"
                      />
                    </div>
                    {errors.twelfth_year && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.twelfth_year}
                      </p>
                    )}
                  </div>

                  <div className="relative">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Percentage *
                    </label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">
                        <FiPercent />
                      </span>
                      <motion.input
                        variants={inputVariants}
                        whileFocus="focus"
                        whileBlur="blur"
                        type="number"
                        step="0.01"
                        min="0"
                        max="100"
                        name="twelfth_marks"
                        value={formData.twelfth_marks}
                        onChange={handleInputChange}
                        className={`pl-10 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          errors.twelfth_marks
                            ? "border-red-500"
                            : "border-gray-300"
                        }`}
                        placeholder="Percentage"
                      />
                    </div>
                    {errors.twelfth_marks && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.twelfth_marks}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Graduation Toggle */}
              <div className="mb-4">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="hasGraduation"
                    className="mr-2 h-4 w-4 text-blue-600"
                    checked={hasGraduation}
                    onChange={() => setHasGraduation(!hasGraduation)}
                  />
                  <label
                    htmlFor="hasGraduation"
                    className="text-lg font-medium text-gray-700"
                  >
                    I have graduation details
                  </label>
                </div>
              </div>

              {/* Graduation Details (Optional) */}
              {hasGraduation && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="mb-6"
                >
                  <h3 className="text-lg font-medium text-gray-700 mb-3 flex items-center">
                    <FiBook className="mr-2" /> Graduation Details
                  </h3>
                  <div className="grid grid-cols-1 gap-4 mb-4">
                    <div className="relative">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Degree/Course Name
                      </label>
                      <motion.input
                        variants={inputVariants}
                        whileFocus="focus"
                        whileBlur="blur"
                        type="text"
                        name="ug_name"
                        value={formData.ug_name}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="e.g. B.Sc. Computer Science"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="relative">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Start Year
                      </label>
                      <div className="relative">
                        <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">
                          <FiCalendar />
                        </span>
                        <motion.input
                          variants={inputVariants}
                          whileFocus="focus"
                          whileBlur="blur"
                          type="number"
                          min="1980"
                          max="2025"
                          name="ug_start"
                          value={formData.ug_start}
                          onChange={handleInputChange}
                          className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="YYYY"
                        />
                      </div>
                    </div>

                    <div className="relative">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        End Year
                      </label>
                      <div className="relative">
                        <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">
                          <FiCalendar />
                        </span>
                        <motion.input
                          variants={inputVariants}
                          whileFocus="focus"
                          whileBlur="blur"
                          type="number"
                          min="1980"
                          max="2030"
                          name="ug_end"
                          value={formData.ug_end}
                          onChange={handleInputChange}
                          className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="YYYY"
                        />
                      </div>
                    </div>

                    <div className="relative">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Percentage
                      </label>
                      <div className="relative">
                        <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">
                          <FiPercent />
                        </span>
                        <motion.input
                          variants={inputVariants}
                          whileFocus="focus"
                          whileBlur="blur"
                          type="number"
                          step="0.01"
                          min="0"
                          max="100"
                          name="ug_marks"
                          value={formData.ug_marks}
                          onChange={handleInputChange}
                          className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="Percentage"
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Post Graduation Toggle */}
              <div className="mb-4">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="hasPostGraduation"
                    className="mr-2 h-4 w-4 text-blue-600"
                    checked={hasPostGraduation}
                    onChange={() => setHasPostGraduation(!hasPostGraduation)}
                  />
                  <label
                    htmlFor="hasPostGraduation"
                    className="text-lg font-medium text-gray-700"
                  >
                    I have post-graduation/other course details
                  </label>
                </div>
              </div>

              {/* Post Graduation Details (Optional) */}
              {hasPostGraduation && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="mb-6"
                >
                  <h3 className="text-lg font-medium text-gray-700 mb-3 flex items-center">
                    <FiBook className="mr-2" /> Post-Graduation/Other Course
                    Details
                  </h3>
                  <div className="grid grid-cols-1 gap-4 mb-4">
                    <div className="relative">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Course Name
                      </label>
                      <motion.input
                        variants={inputVariants}
                        whileFocus="focus"
                        whileBlur="blur"
                        type="text"
                        name="other_course"
                        value={formData.other_course}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="e.g. M.Tech, MBA, Ph.D"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="relative">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Start Year
                      </label>
                      <div className="relative">
                        <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">
                          <FiCalendar />
                        </span>
                        <motion.input
                          variants={inputVariants}
                          whileFocus="focus"
                          whileBlur="blur"
                          type="number"
                          min="1980"
                          max="2025"
                          name="other_course_start"
                          value={formData.other_course_start}
                          onChange={handleInputChange}
                          className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="YYYY"
                        />
                      </div>
                    </div>

                    <div className="relative">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        End Year
                      </label>
                      <div className="relative">
                        <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">
                          <FiCalendar />
                        </span>
                        <motion.input
                          variants={inputVariants}
                          whileFocus="focus"
                          whileBlur="blur"
                          type="number"
                          min="1980"
                          max="2030"
                          name="other_course_end"
                          value={formData.other_course_end}
                          onChange={handleInputChange}
                          className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="YYYY"
                        />
                      </div>
                    </div>

                    <div className="relative">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Percentage
                      </label>
                      <div className="relative">
                        <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">
                          <FiPercent />
                        </span>
                        <motion.input
                          variants={inputVariants}
                          whileFocus="focus"
                          whileBlur="blur"
                          type="number"
                          step="0.01"
                          min="0"
                          max="100"
                          name="other_course_marks"
                          value={formData.other_course_marks}
                          onChange={handleInputChange}
                          className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="Percentage"
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Submit Button */}
            <motion.button
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-md flex items-center justify-center"
              disabled={loading}
            >
              {loading ? (
                <>
                  <FiLoader className="animate-spin mr-2" /> Enrolling in
                  Course...
                </>
              ) : (
                <>
                  <FiCheck className="mr-2" /> Submit and Enroll
                </>
              )}
            </motion.button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default EnrollCourse;
