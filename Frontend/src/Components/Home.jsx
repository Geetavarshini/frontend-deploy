import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-6 py-20 text-center">
        <h1 className="text-5xl font-extrabold text-gray-900 mb-6 tracking-tight">
          User Management
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-10">
          The most efficient way to manage your community. Register new members and keep your database organized in one place.
        </p>
        
        <div className="flex justify-center gap-4">
          <button 
            onClick={() => navigate("/add-user")}
            className="bg-blue-600 text-white px-8 py-3 rounded-full font-bold hover:bg-blue-700 transition-all shadow-lg"
          >
            Add New User
          </button>
          <button 
            onClick={() => navigate("/user-list")}
            className="border-2 border-gray-200 text-gray-700 px-8 py-3 rounded-full font-bold hover:bg-gray-50 transition-all"
          >
            View Directory
          </button>
        </div>
      </div>

      
    </div>
  );
}
export default Home