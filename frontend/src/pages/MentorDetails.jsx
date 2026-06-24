import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {
  FaBriefcase,
  FaCalendarCheck,
  FaCode,
  FaComments,
  FaGithub,
  FaLinkedin,
  FaStar,
  FaUserTie,
} from "react-icons/fa";

import Loader from "../components/Loader";
import { DEFAULT_AVATAR } from "../utils/constants";
import { getMentorById } from "../api/mentorApi";
import { createOrGetConversation } from "../api/chatApi";
import useAuth from "../hooks/useAuth";

const MentorDetails = () => {
  const { mentorId } = useParams();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();

  const [mentor, setMentor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [chatLoading, setChatLoading] = useState(false);

  const fetchMentor = async () => {
    try {
      setLoading(true);
      const response = await getMentorById(mentorId);
      setMentor(response.data);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch mentor");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMentor();
  }, [mentorId]);

  const handleStartChat = async () => {
    if (!isAuthenticated) {
      toast.error("Please login to start chat");
      navigate("/login");
      return;
    }

    if (user?._id === mentor?.user?._id) {
      toast.error("You cannot chat with yourself");
      return;
    }

    try {
      setChatLoading(true);
      await createOrGetConversation(mentor.user._id);
      toast.success("Conversation created");
      navigate("/chat");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to start chat");
    } finally {
      setChatLoading(false);
    }
  };

  if (loading) {
    return <Loader text="Loading mentor profile..." />;
  }

  if (!mentor) {
    return (
      <div className="bg-white rounded-2xl shadow-md p-10 text-center">
        <h2 className="text-xl font-semibold text-gray-800">
          Mentor not found
        </h2>
        <Link to="/mentors" className="text-blue-600 mt-3 inline-block">
          Back to mentors
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <section className="bg-white rounded-3xl shadow-md p-6 sm:p-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex flex-col items-center lg:w-72">
            <img
              src={
                mentor?.user?.avatar ||
                `${DEFAULT_AVATAR}&name=${mentor?.user?.fullName || "Mentor"}`
              }
              alt={mentor?.user?.fullName}
              className="w-36 h-36 rounded-full object-cover border-4 border-blue-100"
            />

            <h1 className="mt-5 text-2xl font-bold text-gray-900 text-center">
              {mentor?.user?.fullName}
            </h1>

            <p className="mt-1 text-blue-600 font-medium text-center">
              {mentor?.position || "Mentor"}
            </p>

            <div className="mt-4 flex items-center gap-2 text-yellow-500">
              <FaStar />
              <span className="font-semibold">
                {mentor?.rating || 0} / 5
              </span>
              <span className="text-gray-400 text-sm">
                ({mentor?.totalReviews || 0} reviews)
              </span>
            </div>
          </div>

          <div className="flex-1">
            <p className="text-gray-600 leading-7">
              {mentor?.bio || "No bio added yet."}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
              <div className="bg-blue-50 rounded-xl p-4 flex gap-3">
                <FaBriefcase className="text-blue-600 text-xl mt-1" />
                <div>
                  <p className="text-sm text-gray-500">Company</p>
                  <p className="font-semibold text-gray-800">
                    {mentor?.company || "Not specified"}
                  </p>
                </div>
              </div>

              <div className="bg-green-50 rounded-xl p-4 flex gap-3">
                <FaUserTie className="text-green-600 text-xl mt-1" />
                <div>
                  <p className="text-sm text-gray-500">Experience</p>
                  <p className="font-semibold text-gray-800">
                    {mentor?.experience || 0} years
                  </p>
                </div>
              </div>

              <div className="bg-purple-50 rounded-xl p-4 flex gap-3">
                <FaCalendarCheck className="text-purple-600 text-xl mt-1" />
                <div>
                  <p className="text-sm text-gray-500">Sessions</p>
                  <p className="font-semibold text-gray-800">
                    {mentor?.totalSessions || 0}
                  </p>
                </div>
              </div>

              <div className="bg-yellow-50 rounded-xl p-4 flex gap-3">
                <FaCode className="text-yellow-600 text-xl mt-1" />
                <div>
                  <p className="text-sm text-gray-500">Branch</p>
                  <p className="font-semibold text-gray-800">
                    {mentor?.user?.branch || "Not specified"}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <Link
                to={`/sessions/book/${mentor.user._id}`}
                className="flex-1 text-center bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition"
              >
                Book Session
              </Link>

              <button
                onClick={handleStartChat}
                disabled={chatLoading}
                className="flex-1 bg-slate-900 text-white py-3 rounded-lg font-medium hover:bg-slate-800 transition disabled:bg-gray-400 flex items-center justify-center gap-2"
              >
                <FaComments />
                {chatLoading ? "Starting..." : "Start Chat"}
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Skills
          </h2>

          <div className="flex flex-wrap gap-2">
            {mentor?.skills?.length > 0 ? (
              mentor.skills.map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm font-medium"
                >
                  {skill}
                </span>
              ))
            ) : (
              <p className="text-gray-500 text-sm">No skills added.</p>
            )}
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Expertise
          </h2>

          <div className="flex flex-wrap gap-2">
            {mentor?.expertise?.length > 0 ? (
              mentor.expertise.map((item) => (
                <span
                  key={item}
                  className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm font-medium"
                >
                  {item}
                </span>
              ))
            ) : (
              <p className="text-gray-500 text-sm">No expertise added.</p>
            )}
          </div>
        </div>
      </section>

      <section className="bg-white rounded-2xl shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          Availability
        </h2>

        {mentor?.availableSlots?.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {mentor.availableSlots.map((slot, index) => (
              <div key={index} className="border rounded-xl p-4">
                <p className="font-semibold text-gray-800">
                  {slot.day}
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  {slot.startTime} - {slot.endTime}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-sm">
            No availability added yet.
          </p>
        )}
      </section>

      <section className="bg-white rounded-2xl shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          Links
        </h2>

        <div className="flex flex-col sm:flex-row gap-3">
          {mentor?.linkedin && (
            <a
              href={mentor.linkedin}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center gap-2 border px-4 py-3 rounded-lg text-blue-600 hover:bg-blue-50"
            >
              <FaLinkedin />
              LinkedIn
            </a>
          )}

          {mentor?.github && (
            <a
              href={mentor.github}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center gap-2 border px-4 py-3 rounded-lg text-gray-800 hover:bg-gray-50"
            >
              <FaGithub />
              GitHub
            </a>
          )}
        </div>
      </section>
    </div>
  );
};

export default MentorDetails;