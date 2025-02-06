import { useAuth } from "@/providers/AuthProvider";
import { Link } from "react-router-dom";

const Header = () => {
  const { user } = useAuth();

  return (
    <div className="relative h-20 border-b border-gray-300 flex justify-end items-center px-10">
      <Link to="/">
        <h1 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-2xl font-bold flex items-center gap-2">
          <img src="/paperland.png" alt="logo" className="w-10 h-10" />
          Paperland
        </h1>
      </Link>
      {/* <div className="flex items-center gap-2">
        {user ? (
          <>
            <Link to="/post/add">
              <button>Add</button>
            </Link>
            <button>MyPage</button>
          </>
        ) : (
          <button>Login</button>
        )}
      </div> */}
    </div>
  );
};

export default Header;
