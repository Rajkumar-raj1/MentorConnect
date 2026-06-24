import { FaComments } from "react-icons/fa";

const EmptyChat = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full bg-gray-50 px-6 text-center">
      <div className="w-24 h-24 rounded-full bg-blue-100 flex items-center justify-center mb-6">
        <FaComments className="text-5xl text-blue-600" />
      </div>

      <h2 className="text-2xl font-bold text-gray-800 mb-2">
        Welcome to MentorConnect Chat
      </h2>

      <p className="max-w-md text-gray-500 leading-relaxed">
        Select a conversation from the left to start chatting with
        mentors, students, or admins in real time.
      </p>
    </div>
  );
};

export default EmptyChat;