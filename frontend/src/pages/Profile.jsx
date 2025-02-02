import React, { useEffect, useState } from "react";
import {
  User,
  Mail,
  Book,
  Building2,
  School,
  Star,
  Edit2,
  Camera,
  Award,
  MessageCircle,
} from "lucide-react";
import Navbar from "../components/Navbar";
import { useParams } from "react-router-dom";
import ProfileEditModal from "../components/ProfileEditModal";
import * as jwt from "jwt-decode";

const Card = ({ children, className = "" }) => (
  <div className={`bg-white rounded-xl shadow-md ${className}`}>{children}</div>
);

const CardContent = ({ children, className = "" }) => (
  <div className={`p-4 sm:p-6 ${className}`}>{children}</div>
);

const Profile = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isOwnProfile, setIsOwnProfile] = useState(false);

  useEffect(() => {
    // Check if this is the user's own profile
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwt.jwtDecode(token);
        // If no ID in URL (viewing /profile/me) OR if ID matches token's user ID
        setIsOwnProfile(!id || decoded.userId === id);
      } catch (error) {
        console.error("Error decoding token:", error);
        setIsOwnProfile(false);
      }
    }
  }, [id]);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      setError(null);
      const token = localStorage.getItem("token");

      const headers = {
        "Content-Type": "application/json",
      };

      if (!id) {
        headers["Authorization"] = `Bearer ${token}`;
      }

      const res = await fetch(
        `http://localhost:3000/profile/${id ? id : "me"}`,
        {
          headers,
        }
      );

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || `HTTP error! status: ${res.status}`);
      }
      const data = await res.json();
      setUser(data);
    } catch (error) {
      console.error("Error fetching profile:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, [id]);

  const handleProfileUpdate = (updatedUser) => {
    setUser(updatedUser);
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading profile...</p>
          </div>
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center">
          <div className="text-center">
            <p className="text-red-600">Error loading profile: {error}</p>
          </div>
        </div>
      </>
    );
  }

  if (!user) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center">
          <div className="text-center">
            <p className="text-gray-600">No user data found</p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Rest of your JSX remains the same, but now it's safe because we know user exists */}
          {/* Profile Header */}
          <div className="relative mb-20 sm:mb-24">
            {/* Cover Image */}
            <div className="h-32 sm:h-40 md:h-48 w-full rounded-xl bg-gradient-to-r from-blue-400 to-blue-600"></div>

            {/* Profile Picture */}
            <div className="absolute left-1/2 sm:left-8 -bottom-16 transform -translate-x-1/2 sm:translate-x-0">
              <div className="relative">
                <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-white p-1">
                  <div className="w-full h-full rounded-full flex items-center bg-blue-600 justify-center relative overflow-hidden">
                    <span className="text-white text-3xl font-semibold">
                      {user.name ? user.name.charAt(0).toUpperCase() : ""}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="absolute left-0 sm:left-auto right-0 -bottom-28 sm:-bottom-16 flex flex-col sm:flex-row gap-2 sm:gap-4 px-4 sm:px-0 sm:right-8 w-full sm:w-auto">
              {isOwnProfile && (
                <button
                  onClick={() => setIsEditModalOpen(true)}
                  className="w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-3 bg-blue-600 text-white rounded-lg flex items-center justify-center gap-2 hover:bg-blue-700 transition-colors shadow-lg text-sm sm:text-base"
                >
                  <Edit2 className="w-4 h-4" />
                  Edit Profile
                </button>
              )}
              {/* Add the Edit Modal */}
              {isOwnProfile && (
                <ProfileEditModal
                  user={user}
                  isOpen={isEditModalOpen}
                  onClose={() => setIsEditModalOpen(false)}
                  onUpdate={handleProfileUpdate}
                />
              )}
            </div>
          </div>

          {/* Profile Content */}
          <div className="mt-24 sm:mt-0 grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-8">
            {/* Left Column - Basic Info */}
            <Card>
              <CardContent className="space-y-4 sm:space-y-6">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 text-center sm:text-left">
                  {user.name}
                </h2>

                <div className="space-y-3 sm:space-y-4">
                  <div className="flex items-center gap-3 text-gray-600 text-sm sm:text-base">
                    <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 flex-shrink-0" />
                    <span className="truncate">{user.email}</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-600 text-sm sm:text-base">
                    <Book className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 flex-shrink-0" />
                    {user.role}
                  </div>
                  <div className="flex items-center gap-3 text-gray-600 text-sm sm:text-base">
                    <Building2 className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 flex-shrink-0" />
                    {user.college}
                  </div>
                  <div className="flex items-center gap-3 text-gray-600 text-sm sm:text-base">
                    <School className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 flex-shrink-0" />
                    {user.university}
                  </div>
                  <div className="flex items-center gap-3 text-gray-600">
                    <Star className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400 flex-shrink-0" />
                    <span className="font-semibold">{user.rating}</span>
                    <span className="text-xs sm:text-sm">(120 reviews)</span>
                  </div>
                </div>

                <div className="pt-4 sm:pt-6 border-t">
                  <h3 className="font-semibold text-gray-900 mb-3 text-sm sm:text-base">
                    Expertise
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {user.expertise?.map((skill, index) => (
                      <span
                        key={index}
                        className="px-2 sm:px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-xs sm:text-sm"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Right Column - Stats & Bio */}
            <div className="lg:col-span-2 space-y-4 sm:space-y-8">
              {/* Stats Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white">
                  <CardContent className="text-center py-3 sm:py-6">
                    <h3 className="text-2xl sm:text-3xl font-bold mb-1">
                      {user.stats?.mentored}
                    </h3>
                    <p className="text-blue-100 text-sm sm:text-base">
                      Students Mentored
                    </p>
                  </CardContent>
                </Card>
                <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white">
                  <CardContent className="text-center py-3 sm:py-6">
                    <h3 className="text-2xl sm:text-3xl font-bold mb-1">
                      {user.stats?.sessions}
                    </h3>
                    <p className="text-green-100 text-sm sm:text-base">
                      Sessions Completed
                    </p>
                  </CardContent>
                </Card>
                <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white">
                  <CardContent className="text-center py-3 sm:py-6">
                    <h3 className="text-2xl sm:text-3xl font-bold mb-1">
                      {user.stats?.hours}
                    </h3>
                    <p className="text-purple-100 text-sm sm:text-base">
                      Hours Spent
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* Bio Section */}
              <Card>
                <CardContent>
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 sm:mb-4">
                    About Me
                  </h3>
                  <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                    {user.bio}
                  </p>
                </CardContent>
              </Card>

              {/* Achievements Section */}
              <Card>
                <CardContent>
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 sm:mb-4 flex items-center gap-2">
                    <Award className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
                    Achievements
                  </h3>
                  <div className="space-y-3 sm:space-y-4">
                    {user.achievements?.map((achievement, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-3 p-2 sm:p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                      >
                        <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-blue-600"></div>
                        <span className="text-gray-700 text-sm sm:text-base">
                          {achievement}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
