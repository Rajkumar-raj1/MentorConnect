import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import GroupCard from "../components/Group/GroupCard";
import Loader from "../components/Loader";

import { getAllGroups, createGroup } from "../api/groupApi";

const Groups = () => {
  const navigate = useNavigate();

  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    topic: "",
    description: "",
    groupImage: null,
  });

  const fetchGroups = async () => {
    try {
      setLoading(true);
      const response = await getAllGroups();
      setGroups(response.data || []);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch groups");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGroups();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleCreateGroup = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.topic) {
      toast.error("Group name and topic are required");
      return;
    }

    const data = new FormData();

    Object.entries(formData).forEach(([key, value]) => {
      if (value) data.append(key, value);
    });

    try {
      setCreating(true);

      await createGroup(data);

      toast.success("Group created successfully");

      setFormData({
        name: "",
        topic: "",
        description: "",
        groupImage: null,
      });

      fetchGroups();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to create group");
    } finally {
      setCreating(false);
    }
  };

  const handleViewGroup = (group) => {
    navigate(`/groups/${group._id}`);
  };

  if (loading) {
    return <Loader text="Loading groups..." />;
  }

  return (
    <div className="space-y-8">
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-3xl p-6 sm:p-10 text-white">
        <h1 className="text-3xl sm:text-4xl font-bold">
          Discussion Groups
        </h1>

        <p className="mt-3 text-blue-100 max-w-2xl">
          Join topic-based groups for DSA, web development, placement
          preparation, resume review, and real-time peer learning.
        </p>
      </section>

      <section className="bg-white rounded-2xl shadow-md p-5 sm:p-7">
        <h2 className="text-2xl font-bold text-gray-900 mb-5">
          Create a Group
        </h2>

        <form onSubmit={handleCreateGroup} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Group Name"
              className="w-full border rounded-lg px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
            />

            <input
              type="text"
              name="topic"
              value={formData.topic}
              onChange={handleChange}
              placeholder="Topic e.g. DSA, Web Development"
              className="w-full border rounded-lg px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
            />
          </div>

          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="3"
            placeholder="Group description"
            className="w-full border rounded-lg px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500 resize-none"
          />

          <input
            type="file"
            name="groupImage"
            accept="image/*"
            onChange={handleChange}
            className="w-full text-sm border rounded-lg px-4 py-3"
          />

          <button
            type="submit"
            disabled={creating}
            className="w-full sm:w-auto bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition disabled:bg-gray-400"
          >
            {creating ? "Creating..." : "Create Group"}
          </button>
        </form>
      </section>

      {groups.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-md p-10 text-center">
          <h2 className="text-xl font-semibold text-gray-800">
            No groups available
          </h2>
          <p className="mt-2 text-gray-500">
            Create the first discussion group.
          </p>
        </div>
      ) : (
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {groups.map((group) => (
            <GroupCard
              key={group._id}
              group={group}
              onViewGroup={handleViewGroup}
            />
          ))}
        </section>
      )}
    </div>
  );
};

export default Groups;