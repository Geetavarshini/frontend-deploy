import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function UserList() {
  const [users, setUsers] = useState([]);
  const [err, setErr] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    async function getUsers() {
      setIsLoading(true);

      try {
        const res = await fetch(
          "http://localhost:3000/user-api/users",
          {
            method: "GET",
          }
        );

        const resObj = await res.json();

        if (res.status === 200) {
          setUsers(resObj.payload || []);
        } else {
          setErr(resObj.message || "Failed to fetch users.");
        }
      } catch (error) {
        setErr("Connection error. Backend may not be running.");
      } finally {
        setIsLoading(false);
      }
    }

    getUsers();
  }, []);

  const gotoUser = (userObj) => {
    navigate("/user", { state: { user: userObj } });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-12">
      <div className="max-w-7xl mx-auto">

        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-10 text-center">
          Registered Users
        </h1>

        {err && (
          <div className="max-w-md mx-auto mb-10 p-4 bg-red-100 border-l-4 border-red-500 text-red-700">
            <p>{err}</p>
          </div>
        )}

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map((n) => (
              <div
                key={n}
                className="h-48 bg-gray-200 animate-pulse rounded-xl"
              ></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">

            {users.length > 0 ? (
              users.map((userObj) => (
                <div
                  key={userObj._id}
                  className="group bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl border cursor-pointer transition-all hover:-translate-y-2"
                  onClick={() => gotoUser(userObj)}
                >

                  <div className="flex items-center justify-center w-12 h-12 bg-blue-100 text-blue-600 rounded-full mb-4">
                    <span className="text-xl font-bold">
                      {userObj.name ? userObj.name[0].toUpperCase() : "U"}
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold text-gray-800 truncate">
                    {userObj.name}
                  </h3>

                  <p className="text-gray-500 text-sm italic">
                    {userObj.email}
                  </p>

                  <div className="pt-4 border-t mt-4 flex justify-between items-center">
                    <span className="text-xs font-semibold text-blue-500">
                      View Profile
                    </span>

                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>

                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-20">
                <p className="text-2xl text-gray-400">
                  No users found in the database.
                </p>
              </div>
            )}

          </div>
        )}
      </div>
    </div>
  );
}

export default UserList;

