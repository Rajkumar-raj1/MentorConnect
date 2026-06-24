import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import Loader from "../components/Loader";

import ProfileHeader from "../components/Profile/ProfileHeader";
import ProfileForm from "../components/Profile/ProfileForm";
import ChangePassword from "../components/Profile/ChangePassword";
import MentorProfileSection from "../components/Profile/MentorProfileSection";

import {
  getUserProfile,
  updateUserProfile,
  updateAvatar,
  changePassword,
} from "../api/userApi";

import { getMyMentorProfile } from "../api/mentorApi";

import useAuth from "../hooks/useAuth";

const Profile = () => {
  const { fetchCurrentUser } = useAuth();

  const [user, setUser] = useState(null);
  const [mentorProfile, setMentorProfile] = useState(null);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  // -------------------------
  // Fetch Profile
  // -------------------------

  const fetchProfile = async () => {
    try {
      const response = await getUserProfile();

      setUser(response.data);

      if (response.data.role === "mentor") {
        try {
          const mentor = await getMyMentorProfile();

          setMentorProfile(mentor.data);
        } catch (error) {
          setMentorProfile(null);
        }
      }
    } catch (error) {
      toast.error(error.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  // -------------------------
  // Update Profile
  // -------------------------

  const handleProfileUpdate = async (data) => {
    try {
      setSaving(true);

      await updateUserProfile(data);

      toast.success("Profile updated successfully");

      fetchProfile();

      fetchCurrentUser();
    } catch (error) {
      toast.error(error.response?.data?.message);
    } finally {
      setSaving(false);
    }
  };

  // -------------------------
  // Avatar Upload
  // -------------------------

  const handleAvatarUpload = async (e) => {
    const file = e.target.files[0];

    if (!file) return;

    const formData = new FormData();

    formData.append("avatar", file);

    try {
      setUploading(true);

      await updateAvatar(formData);

      toast.success("Avatar updated");

      fetchProfile();

      fetchCurrentUser();
    } catch (error) {
      toast.error(error.response?.data?.message);
    } finally {
      setUploading(false);
    }
  };

  // -------------------------
  // Change Password
  // -------------------------

  const handlePasswordChange = async (data) => {
    try {
      setSaving(true);

      await changePassword(data);

      toast.success("Password updated successfully");
    } catch (error) {
      toast.error(error.response?.data?.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <Loader text="Loading Profile..." />;
  }

  return (
    <div className="space-y-8">
      <ProfileHeader
        user={user}
        uploading={uploading}
        onAvatarChange={handleAvatarUpload}
      />

      <ProfileForm
        user={user}
        loading={saving}
        onSubmit={handleProfileUpdate}
      />

      {user?.role === "mentor" && (
        <MentorProfileSection
          mentorProfile={mentorProfile}
        />
      )}

      <ChangePassword
        loading={saving}
        onSubmit={handlePasswordChange}
      />
    </div>
  );
};

export default Profile;