import React, { useEffect, useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { Check } from "lucide-react";
import Swal from "sweetalert2";

const TeacherDocumentVerification = () => {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [verifiedTeachers, setVerifiedTeachers] = useState(new Set());

  const addVerifiedTeacher = (id) => {
    setVerifiedTeachers((prev) => {
      const newSet = new Set(prev);
      newSet.add(id);
      localStorage.setItem("verifiedTeachers", JSON.stringify([...newSet]));
      return newSet;
    });
  };

  useEffect(() => {
    const stored = localStorage.getItem("verifiedTeachers");
    if (stored) {
      setVerifiedTeachers(new Set(JSON.parse(stored)));
    }
  }, []);

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const response = await axios.post(
          "https://e-college-data.onrender.com/v1/teachers/teachers-apply-all"
        );
        setTeachers(response.data.data || []);
      } catch (error) {
        console.error("Error fetching teachers:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTeachers();
  }, []);

  const toggleDetails = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const handleVerify = async (email, teacherId, onCancel) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#7c3aed", // purple-600
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, verify!",
      cancelButtonText: "Cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.post(
            "https://e-college-data.onrender.com/v1/teachers/teachers-verify",
            { email }
          );
          addVerifiedTeacher(teacherId);
          Swal.fire({
            title: "Verified!",
            text: "Teacher has been verified.",
            icon: "success",
          });
        } catch (err) {
          toast.error("Failed to verify teacher.");
        }
      } else if (result.dismiss === Swal.DismissReason.cancel && onCancel) {
        onCancel();
      }
    });
  };

  const handleReject = async (email, teacherId, onCancel) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#7c3aed", // purple-600
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, reject!",
      cancelButtonText: "Cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.post(
            "https://e-college-data.onrender.com/v1/teachers/teachers-reject",
            { email }
          );
          addVerifiedTeacher(teacherId);
          Swal.fire({
            title: "Rejected!",
            text: "Teacher has been rejected.",
            icon: "success",
          });
        } catch (err) {
          toast.error("Failed to reject teacher.");
        }
      } else if (result.dismiss === Swal.DismissReason.cancel && onCancel) {
        onCancel();
      }
    });
  };

  if (loading)
    return (
      <div className="text-center mt-10 text-lg font-semibold text-white">Loading...</div>
    );

  return (
    <div className="p-6 bg-[#0F0F1B] text-white min-h-screen">
      <Toaster />
      <h2 className="text-2xl font-bold mb-4 text-purple-400">Teachers List</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-[#1C1C2C] border border-purple-700 rounded shadow">
          <thead>
            <tr className="bg-[#2A2A40] text-sm font-semibold text-purple-300">
              <th className="py-2 px-4 border-b border-purple-600">Name</th>
              <th className="py-2 px-4 border-b border-purple-600">Email</th>
              <th className="py-2 px-4 border-b border-purple-600">Phone</th>
              <th className="py-2 px-4 border-b border-purple-600">Address</th>
              <th className="py-2 px-4 border-b border-purple-600">Action</th>
            </tr>
          </thead>
          <tbody>
            {teachers.map((teacher, index) => (
              <React.Fragment key={index}>
                <tr className="hover:bg-[#252539] text-white">
                  <td className="px-4 py-2 border-b border-purple-600">
                    <div className="flex items-center h-full">
                      <span>{teacher.name}</span>
                      {verifiedTeachers.has(teacher._id) && (
                        <Check
                          className="ml-2 text-green-400"
                          size={20}
                          strokeWidth={3}
                        />
                      )}
                    </div>
                  </td>
                  <td className="py-2 px-4 border-b border-purple-600">{teacher.email || "N/A"}</td>
                  <td className="py-2 px-4 border-b border-purple-600">{teacher.phoneNumber || "N/A"}</td>
                  <td className="py-2 px-2 border-b border-purple-600">{teacher.address || "N/A"}</td>
                  <td className="py-2 px-4 border-b border-purple-600 align-top">
                    <div className="flex flex-col items-center gap-2 min-w-[100px]">
                      <button
                        onClick={() => toggleDetails(index)}
                        className="w-20 bg-purple-700 text-white text-sm px-3 py-1.5 rounded hover:bg-purple-800"
                      >
                        {expandedIndex === index ? "Hide" : "Details"}
                      </button>
                      <button
                        onClick={() => handleVerify(teacher.email, teacher._id)}
                        className={`w-20 text-sm px-3 py-1.5 rounded shadow text-white ${
                          verifiedTeachers.has(teacher._id)
                            ? "bg-green-700 cursor-not-allowed"
                            : "bg-green-600 hover:bg-green-700"
                        }`}
                        disabled={verifiedTeachers.has(teacher._id)}
                      >
                        {verifiedTeachers.has(teacher._id)
                          ? "Verified"
                          : "Verify"}
                      </button>

                      <button
                        onClick={() => handleReject(teacher.email, teacher._id)}
                        className="w-20 text-sm px-3 py-1.5 rounded bg-red-600 hover:bg-red-700 text-white shadow"
                      >
                        Reject
                      </button>
                    </div>
                  </td>
                </tr>
                {expandedIndex === index && (
                  <tr className="bg-[#1F1F33] text-white">
                    <td colSpan="5" className="py-3 px-4 border-b border-purple-600">
                      <div className="text-sm space-y-1">
                        {/* Detail fields */}
                        <div><strong>10th year:</strong> {teacher.tenth_year || "N/A"}</div>
                        <div><strong>10th marks:</strong> {teacher.tenth_marks || "N/A"}</div>
                        <div><strong>12th year:</strong> {teacher.twelfth_year || "N/A"}</div>
                        <div><strong>12th marks:</strong> {teacher.twelfth_marks || "N/A"}</div>
                        <div><strong>Other course:</strong> {teacher.other_course || "N/A"}</div>
                        <div><strong>Other course marks:</strong> {teacher.other_course_marks || "N/A"}</div>
                        <div><strong>Other course start:</strong> {teacher.other_course_start || "N/A"}</div>
                        <div><strong>Other course end:</strong> {teacher.other_course_end || "N/A"}</div>
                        <div><strong>UG course:</strong> {teacher.ug_name || "N/A"}</div>
                        <div><strong>UG marks:</strong> {teacher.ug_marks || "N/A"}</div>
                        <div><strong>UG course start:</strong> {teacher.ug_start || "N/A"}</div>
                        <div><strong>UG course end:</strong> {teacher.ug_end || "N/A"}</div>
                        <div><strong>CV:</strong> <a href={teacher.cv_file} target="_blank" rel="noopener noreferrer" className="text-purple-400 underline">View</a></div>
                        <div className="mt-2">
                          <button
                            onClick={async () => {
                              Swal.fire({
                                title: "Are you sure?",
                                text: "You won't be able to revert this!",
                                icon: "warning",
                                showCancelButton: true,
                                confirmButtonColor: "#7c3aed",
                                cancelButtonColor: "#d33",
                                confirmButtonText: "Yes, create teacher",
                                cancelButtonText: "Cancel",
                              }).then(async (result) => {
                                if (result.isConfirmed) {
                                  try {
                                    const res = await axios.post(
                                      "https://e-college-data.onrender.com/v1/teachers/teachers-create",
                                      {
                                        name: teacher.name,
                                        phoneNumber: teacher.phoneNumber,
                                        email: teacher.email,
                                      }
                                    );
                                    if (res.data) {
                                      await axios.post(
                                        "https://e-college-data.onrender.com/v1/chat/chat-register-teacher",
                                        {
                                          name: teacher.name,
                                          email: teacher.email,
                                        }
                                      );
                                    }
                                    toast.success("Teacher created successfully!");
                                    Swal.fire({
                                      title: "Created!",
                                      text: "Teacher has been Created.",
                                      icon: "success",
                                    });
                                  } catch (error) {
                                    toast.error(error.response.data.message);
                                  }
                                } else if (result.dismiss === Swal.DismissReason.cancel && onCancel) {
                                  onCancel();
                                }
                              });
                            }}
                            className="bg-purple-600 hover:bg-purple-700 text-white text-sm px-2 py-2 rounded"
                          >
                            Create Teacher
                          </button>
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TeacherDocumentVerification;
