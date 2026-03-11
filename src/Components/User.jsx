import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function User() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const [user, setUser] = useState(state?.user || null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function getUser() {
      if (!state?.user?._id) return;

      setLoading(true);

      try {
        const res = await fetch(
          `https://usermanagementapp-v8oc.onrender.com/user-api/users/${state.user._id}`,
          {
            method: "GET"
          }
        );

        const data = await res.json();

        if (res.status === 200) {
          setUser(data.payload);
        }
      } catch (error) {
        console.log("Error fetching user:", error);
      } finally {
        setLoading(false);
      }
    }

    if (!user && state?.user?._id) {
      getUser();
    }
  }, []);

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <p className="text-xl text-gray-600">User data not available</p>

        <button
          onClick={() => navigate("/users-list")}
          className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg"
        >
          Back to Users List
        </button>
      </div>
    );
  }

  const { name, email, dateOfBirth, mobileNumber } = user;

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-xl mx-auto">

        <button
          onClick={() => navigate(-1)}
          className="mb-6 text-blue-600 hover:underline"
        >
          ← Go Back
        </button>

        <div className="bg-white shadow-2xl rounded-3xl overflow-hidden border">

          <div className="h-32 bg-linear-to-r from-blue-500 to-indigo-600"></div>

          <div className="px-8 pb-10">

            <div className="relative -mt-16 mb-6 flex justify-center">
              <div className="w-32 h-32 bg-gray-200 rounded-full flex items-center justify-center text-4xl font-bold">
                {name[0].toUpperCase()}
              </div>
            </div>

            <div className="text-center mb-8">
              <h2 className="text-4xl font-bold">{name}</h2>
              <p className="text-blue-600">{email}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              <div className="bg-gray-50 p-4 rounded-xl">
                <p className="text-xs text-gray-400">Date of Birth</p>
                <p className="text-lg">{dateOfBirth || "N/A"}</p>
              </div>

              <div className="bg-gray-50 p-4 rounded-xl">
                <p className="text-xs text-gray-400">Mobile Number</p>
                <p className="text-lg">{mobileNumber || "N/A"}</p>
              </div>

            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default User;
