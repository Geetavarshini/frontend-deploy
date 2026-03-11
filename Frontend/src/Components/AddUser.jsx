import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

function AddUser() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();

  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState("");

  const navigate = useNavigate();

  const onUserCreate = async (newUser) => {
    setLoading(true);
    setServerError("");

    try {
      const res = await fetch(
        "http://localhost:3000/user-api/users",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newUser),
        }
      );

      const data = await res.json();

      if (res.status === 201) {
        navigate("/user-list");
      } else if (res.status === 409 || data.message?.includes("exists")) {
        setError("email", {
          type: "manual",
          message: "This email is already registered",
        });
      } else {
        setServerError(data.message || "Something went wrong");
      }
    } catch (err) {
      setServerError("Connection failed. Backend may be down.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-12 px-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-lg border border-gray-100">
        <h1 className="text-4xl font-bold text-gray-800 text-center mb-8">
          Create Account
        </h1>

        {serverError && (
          <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700">
            {serverError}
          </div>
        )}

        <form onSubmit={handleSubmit(onUserCreate)} className="space-y-5">

          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-1">
              Full Name
            </label>

            <input
              type="text"
              {...register("name", { required: "Name is required" })}
              className="w-full p-3 border border-gray-300 rounded-lg"
              placeholder="Enter name"
            />

            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-1">
              Email
            </label>

            <input
              type="email"
              {...register("email", {
                required: "Email is required",
                
              })}
              className="w-full p-3 border border-gray-300 rounded-lg"
              placeholder="Enter email"
            />

            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-1">
              Date of Birth
            </label>

            <input
              type="date"
              {...register("dateOfBirth", {
                required: "Date of birth is required",
              })}
              className="w-full p-3 border border-gray-300 rounded-lg"
            />

            {errors.dateOfBirth && (
              <p className="text-red-500 text-sm">
                {errors.dateOfBirth.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-1">
              Mobile Number
            </label>

            <input
              type="number"
              {...register("mobileNumber", {
                required: "Mobile number is required",
                minLength: {
                  value: 10,
                  message: "Must be at least 10 digits",
                },
              })}
              className="w-full p-3 border border-gray-300 rounded-lg"
              placeholder="Enter mobile number"
            />

            {errors.mobileNumber && (
              <p className="text-red-500 text-sm">
                {errors.mobileNumber.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700"
          >
            {loading ? "Registering..." : "Register User"}
          </button>

        </form>
      </div>
    </div>
  );
}

export default AddUser;
