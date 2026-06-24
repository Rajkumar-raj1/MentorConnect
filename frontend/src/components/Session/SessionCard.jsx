import { FaCalendarAlt, FaClock, FaLink, FaUserGraduate } from "react-icons/fa";
import { formatDate } from "../../utils/formatDate";
import SessionStatusBadge from "./SessionStatusBadge";

const SessionCard = ({
  session,
  currentUser,
  onAccept,
  onReject,
  onCancel,
  onComplete,
}) => {
  const isMentor = currentUser?._id === session?.mentor?._id;
  const isStudent = currentUser?._id === session?.student?._id;

  return (
    <div className="bg-white rounded-xl shadow-md border p-4 sm:p-5">
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">
            {session?.topic}
          </h3>

          <p className="text-sm text-gray-500 mt-1">
            {session?.description || "No description added"}
          </p>
        </div>

        <SessionStatusBadge status={session?.status} />
      </div>

      <div className="mt-4 space-y-2 text-sm text-gray-600">
        <p className="flex items-center gap-2">
          <FaUserGraduate className="text-blue-600" />
          {isMentor
            ? `Student: ${session?.student?.fullName}`
            : `Mentor: ${session?.mentor?.fullName}`}
        </p>

        <p className="flex items-center gap-2">
          <FaCalendarAlt className="text-blue-600" />
          {formatDate(session?.date)}
        </p>

        <p className="flex items-center gap-2">
          <FaClock className="text-blue-600" />
          {session?.startTime} - {session?.endTime}
        </p>

        {session?.meetingLink && (
          <a
            href={session.meetingLink}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 text-blue-600 font-medium"
          >
            <FaLink />
            Join Meeting
          </a>
        )}
      </div>

      <div className="mt-5 flex flex-col sm:flex-row gap-3">
        {isMentor && session?.status === "pending" && (
          <>
            <button
              onClick={() => onAccept(session)}
              className="w-full sm:w-auto px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700"
            >
              Accept
            </button>

            <button
              onClick={() => onReject(session)}
              className="w-full sm:w-auto px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600"
            >
              Reject
            </button>
          </>
        )}

        {(isStudent || isMentor) &&
          ["pending", "accepted"].includes(session?.status) && (
            <button
              onClick={() => onCancel(session)}
              className="w-full sm:w-auto px-4 py-2 rounded-lg border border-red-500 text-red-500 hover:bg-red-50"
            >
              Cancel
            </button>
          )}

        {isMentor && session?.status === "accepted" && (
          <button
            onClick={() => onComplete(session)}
            className="w-full sm:w-auto px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
          >
            Mark Completed
          </button>
        )}
      </div>
    </div>
  );
};

export default SessionCard;