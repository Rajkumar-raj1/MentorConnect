import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  FaUsers,
  FaUserCheck,
  FaTrash,
  FaCheck,
  FaTimes,
} from "react-icons/fa";

import Loader from "../components/Loader";
import {
  getAllUsers,
  getPendingMentors,
  approveMentor,
  rejectMentor,
  deleteUser,
} from "../api/adminApi";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [pendingMentors, setPendingMentors] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAdminData = async () => {
    try {
      setLoading(true);

      const [usersRes, mentorsRes] = await Promise.all([
        getAllUsers(),
        getPendingMentors(),
      ]);

      setUsers(usersRes.data || []);
      setPendingMentors(mentorsRes.data || []);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch admin data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdminData();
  }, []);

  const handleApprove = async (userId) => {
    try {
      await approveMentor(userId);
      toast.success("Mentor approved");
      fetchAdminData();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to approve mentor");
    }
  };

  const handleReject = async (userId) => {
    try {
      await rejectMentor(userId);
      toast.success("Mentor rejected");
      fetchAdminData();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to reject mentor");
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      await deleteUser(userId);
      toast.success("User deleted");
      fetchAdminData();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete user");
    }
  };

  if (loading) {
    return <Loader text="Loading admin dashboard..." />;
  }

  return (
    <div className="space-y-8">
      <section className="bg-gradient-to-r from-slate-900 to-blue-800 rounded-3xl p-6 sm:p-10 text-white">
        <h1 className="text-3xl sm:text-4xl font-bold">
          Admin Dashboard
        </h1>

        <p className="mt-3 text-slate-200">
          Manage users, approve mentors, and monitor platform activity.
        </p>
      </section>

      <section className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div className="bg-white rounded-2xl shadow-md p-6 flex items-center gap-4">
          <div className="w-14 h-14 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center text-2xl">
            <FaUsers />
          </div>

          <div>
            <p className="text-sm text-gray-500">Total Users</p>
            <h2 className="text-3xl font-bold text-gray-900">
              {users.length}
            </h2>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-md p-6 flex items-center gap-4">
          <div className="w-14 h-14 rounded-xl bg-yellow-100 text-yellow-600 flex items-center justify-center text-2xl">
            <FaUserCheck />
          </div>

          <div>
            <p className="text-sm text-gray-500">Pending Mentors</p>
            <h2 className="text-3xl font-bold text-gray-900">
              {pendingMentors.length}
            </h2>
          </div>
        </div>
      </section>

      <section className="bg-white rounded-2xl shadow-md p-5 sm:p-7">
        <h2 className="text-2xl font-bold text-gray-900 mb-5">
          Pending Mentor Approvals
        </h2>

        {pendingMentors.length === 0 ? (
          <p className="text-gray-500">No pending mentors.</p>
        ) : (
          <div className="space-y-4">
            {pendingMentors.map((mentor) => (
              <div
                key={mentor._id}
                className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border rounded-xl p-4"
              >
                <div>
                  <h3 className="font-semibold text-gray-800">
                    {mentor.fullName}
                  </h3>
                  <p className="text-sm text-gray-500">{mentor.email}</p>
                  <p className="text-sm text-gray-500 capitalize">
                    {mentor.college} • {mentor.branch}
                  </p>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => handleApprove(mentor._id)}
                    className="flex-1 sm:flex-none bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center justify-center gap-2"
                  >
                    <FaCheck />
                    Approve
                  </button>

                  <button
                    onClick={() => handleReject(mentor._id)}
                    className="flex-1 sm:flex-none bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 flex items-center justify-center gap-2"
                  >
                    <FaTimes />
                    Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <section className="bg-white rounded-2xl shadow-md p-5 sm:p-7">
        <h2 className="text-2xl font-bold text-gray-900 mb-5">
          All Users
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px] text-sm">
            <thead>
              <tr className="bg-gray-100 text-left text-gray-700">
                <th className="p-3">Name</th>
                <th className="p-3">Email</th>
                <th className="p-3">Role</th>
                <th className="p-3">Approved</th>
                <th className="p-3">Action</th>
              </tr>
            </thead>

            <tbody>
              {users.map((user) => (
                <tr key={user._id} className="border-b">
                  <td className="p-3 font-medium text-gray-800">
                    {user.fullName}
                  </td>
                  <td className="p-3 text-gray-600">{user.email}</td>
                  <td className="p-3 capitalize">{user.role}</td>
                  <td className="p-3">
                    {user.isApproved ? "Yes" : "No"}
                  </td>
                  <td className="p-3">
                    <button
                      onClick={() => handleDeleteUser(user._id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default AdminDashboard;