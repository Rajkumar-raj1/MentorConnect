import axiosInstance from "./axiosInstance";

// Book a Session
export const bookSession = async (sessionData) => {
  const response = await axiosInstance.post(
    "/sessions/book",
    sessionData
  );

  return response.data;
};

// Get My Sessions
export const getMySessions = async () => {
  const response = await axiosInstance.get(
    "/sessions/my-sessions"
  );

  return response.data;
};

// Accept Session
export const acceptSession = async (sessionId, meetingLink = "") => {
  const response = await axiosInstance.patch(
    `/sessions/${sessionId}/accept`,
    {
      meetingLink,
    }
  );

  return response.data;
};

// Reject Session
export const rejectSession = async (
  sessionId,
  mentorNotes = ""
) => {
  const response = await axiosInstance.patch(
    `/sessions/${sessionId}/reject`,
    {
      mentorNotes,
    }
  );

  return response.data;
};

// Cancel Session
export const cancelSession = async (sessionId) => {
  const response = await axiosInstance.patch(
    `/sessions/${sessionId}/cancel`
  );

  return response.data;
};

// Complete Session
export const completeSession = async (
  sessionId,
  mentorNotes = ""
) => {
  const response = await axiosInstance.patch(
    `/sessions/${sessionId}/complete`,
    {
      mentorNotes,
    }
  );

  return response.data;
};