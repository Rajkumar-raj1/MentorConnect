import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { bookSession } from "../../api/sessionApi";

const SessionForm = ({ loading = false }) => {
  const { mentorId } = useParams();
  const navigate = useNavigate();

  const [creating, setCreating] = useState(false);

  const [formData, setFormData] = useState({
    mentorId: mentorId || "",
    topic: "",
    description: "",
    date: "",
    startTime: "",
    endTime: "",
  });

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      mentorId: mentorId || "",
    }));
  }, [mentorId]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.mentorId ||
      !formData.topic ||
      !formData.date ||
      !formData.startTime ||
      !formData.endTime
    ) {
      toast.error("All required fields must be provided");
      return;
    }

    try {
      setCreating(true);
      await bookSession(formData);
      toast.success("Session request sent successfully");
      navigate("/sessions");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to book session");
    } finally {
      setCreating(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Book Session</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-xl shadow-md border p-4 sm:p-6 space-y-4"
      >
        <input type="hidden" name="mentorId" value={formData.mentorId} />

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Topic
          </label>
          <input
            type="text"
            name="topic"
            value={formData.topic}
            onChange={handleChange}
            required
            placeholder="Example: DSA roadmap, resume review"
            className="w-full border rounded-lg px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="4"
            placeholder="Write what guidance you need..."
            className="w-full border rounded-lg px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500 resize-none"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Date
            </label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
              className="w-full border rounded-lg px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Start Time
            </label>
            <input
              type="time"
              name="startTime"
              value={formData.startTime}
              onChange={handleChange}
              required
              className="w-full border rounded-lg px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              End Time
            </label>
            <input
              type="time"
              name="endTime"
              value={formData.endTime}
              onChange={handleChange}
              required
              className="w-full border rounded-lg px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
            />
          </div>
        </div>

        {!formData.mentorId && (
          <p className="text-sm text-red-500">
            Mentor ID missing. Please open this page from a mentor profile.
          </p>
        )}

        <button
          type="submit"
          disabled={loading || creating || !formData.mentorId}
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {loading || creating ? "Booking..." : "Book Session"}
        </button>
      </form>
    </div>
  );
};

export default SessionForm;