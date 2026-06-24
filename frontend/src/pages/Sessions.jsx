import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import Loader from "../components/Loader";
import SessionCard from "../components/Session/SessionCard";

import useAuth from "../hooks/useAuth";

import {
  getMySessions,
  acceptSession,
  rejectSession,
  cancelSession,
  completeSession,
} from "../api/sessionApi";

const Sessions = () => {
  const { user } = useAuth();

  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchSessions = async () => {
    try {
      setLoading(true);
      const response = await getMySessions();
      setSessions(response.data || []);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch sessions");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSessions();
  }, []);

  const handleAccept = async (session) => {
    const meetingLink = window.prompt("Enter meeting link:");
    await acceptSession(session._id, meetingLink || "");
    toast.success("Session accepted");
    fetchSessions();
  };

  const handleReject = async (session) => {
    const mentorNotes = window.prompt("Reason for rejection:");
    await rejectSession(session._id, mentorNotes || "");
    toast.success("Session rejected");
    fetchSessions();
  };

  const handleCancel = async (session) => {
    await cancelSession(session._id);
    toast.success("Session cancelled");
    fetchSessions();
  };

  const handleComplete = async (session) => {
    const mentorNotes = window.prompt("Add completion notes:");
    await completeSession(session._id, mentorNotes || "");
    toast.success("Session completed");
    fetchSessions();
  };

  if (loading) {
    return <Loader text="Loading sessions..." />;
  }

  return (
    <div className="space-y-8">
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-3xl p-6 sm:p-10 text-white">
        <h1 className="text-3xl sm:text-4xl font-bold">
          Mentorship Sessions
        </h1>

        <p className="mt-3 text-blue-100 max-w-2xl">
          Schedule mentorship sessions, manage requests, and keep track of your
          upcoming meetings.
        </p>

        {user?.role === "student" && (
          <Link
            to="/mentors"
            className="inline-block mt-6 bg-white text-blue-700 hover:bg-blue-50 px-5 py-3 rounded-lg font-medium transition"
          >
            Book Session
          </Link>
        )}
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-5">
          {user?.role === "mentor" ? "Session Requests" : "My Sessions"}
        </h2>

        {sessions.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-md p-10 text-center">
            <h3 className="text-xl font-semibold text-gray-800">
              No sessions found
            </h3>

            <p className="mt-2 text-gray-500">
              {user?.role === "student"
                ? "Book your first mentorship session."
                : "No students have requested sessions yet."}
            </p>
          </div>
        ) : (
          <div className="grid gap-5">
            {sessions.map((session) => (
              <SessionCard
                key={session._id}
                session={session}
                currentUser={user}
                onAccept={handleAccept}
                onReject={handleReject}
                onCancel={handleCancel}
                onComplete={handleComplete}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Sessions;