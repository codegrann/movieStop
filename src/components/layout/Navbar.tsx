import { useState, useContext } from 'react';
import { Menu, X, User, Heart, LogIn, UserPlus, ChevronDown } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';

const Navbar = () => {
  const { user, logoutUser } = useAuth();
  const { genres, selectGenre } = useContext(AppContext);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [genreDropdownOpen, setGenreDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const authenticatedMenuItems = [
    { label: 'Account', icon: <User className="w-5 h-5 mr-2" />, onClick: () => navigate('/profile') },
    { label: 'Favorites', icon: <Heart className="w-5 h-5 mr-2" />, onClick: () => navigate('/favorites') },
  ];

  const unauthenticatedMenuItems = [
    { label: 'Login', icon: <LogIn className="w-5 h-5 mr-2" />, onClick: () => navigate('/login') },
    { label: 'Register', icon: <UserPlus className="w-5 h-5 mr-2" />, onClick: () => navigate('/register') },
  ];

  const menuItems = user ? authenticatedMenuItems : unauthenticatedMenuItems;

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-800 text-white flex items-center justify-between px-4 py-3">
        <div className="flex items-center space-x-4">
          <div className="text-xl font-bold cursor-pointer select-none" onClick={() => navigate('/')} >MovieStop</div>
          <div className="hidden md:flex space-x-6">
            {menuItems.map((item) => (
              <button
                key={item.label}
                onClick={item.onClick}
                className="flex items-center text-cyan-200 hover:text-cyan-500 transition"
              >
                {item.icon}
                {item.label}
              </button>
            ))}
            <div className="relative">
              <button
                onClick={() => setGenreDropdownOpen(!genreDropdownOpen)}
                className="flex items-center text-cyan-200 hover:text-cyan-500 transition"
              >
                Genres <ChevronDown className="w-5 h-5 ml-1" />
              </button>
              {genreDropdownOpen && (
                <div className="absolute mt-2 w-48 bg-gray-700 opacity-95 rounded-md shadow-lg h-64 overflow-auto custom-scrollbar">
                  {genres.map((genre) => (
                    <button
                      key={genre.id}
                      onClick={() => {
                        selectGenre(genre);
                        setGenreDropdownOpen(false);
                        navigate('/');
                      }}
                      className="block w-full text-left px-4 py-2 text-sm text-white hover:bg-gray-600"
                    >
                      {genre.name}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          {user && (
            <>
              <span className="hidden md:block">Hello, {user?.name || 'User'}</span>
              <button
                onClick={() => {
                  logoutUser();
                  navigate('/');
                }}
                className="max-sm:hidden bg-red-600 hover:bg-red-500 rounded px-3 py-1 text-sm"
              >
                Logout
              </button>
            </>
          )}

          {/* Hamburger for small screens */}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="md:hidden p-2 rounded hover:bg-gray-700"
            aria-label="Toggle menu"
          >
            {sidebarOpen ? <p className="w-6 h-6"></p> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Sidebar for small screens */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-gray-900 opacity-95 text-white shadow-lg transform transition-transform duration-300 ease-in-out z-50
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div className="p-4 border-b border-gray-700 flex justify-between items-center">
          <div className="text-lg font-bold">Menu</div>
          <button onClick={() => setSidebarOpen(false)} aria-label="Close menu">
            <X className="w-6 h-6" />
          </button>
        </div>
        <nav className="flex flex-col p-4 space-y-3">
          {menuItems.map((item) => (
            <button
              key={item.label}
              onClick={() => {
                item.onClick();
                setSidebarOpen(false);
              }}
              className="flex items-center px-3 py-2 rounded hover:bg-gray-700 transition"
            >
              {item.icon}
              {item.label}
            </button>
          ))}
          <div className="relative">
              <button
                onClick={() => setGenreDropdownOpen(!genreDropdownOpen)}
                className="flex items-center ml-3 text-cyan-200 hover:text-cyan-500 transition"
              >
                Genres <ChevronDown className="w-5 h-5 ml-1" />
              </button>
              {genreDropdownOpen && (
                <div className="absolute mt-2 w-48 bg-gray-700 rounded-md shadow-lg h-64 overflow-auto  custom-scrollbar">
                  {genres.map((genre) => (
                    <button
                      key={genre.id}
                      onClick={() => {
                        selectGenre(genre);
                        setGenreDropdownOpen(false);
                        navigate('/');
                      }}
                      className="block w-full text-left px-4 py-2 text-sm text-white hover:bg-gray-600"
                    >
                      {genre.name}
                    </button>
                  ))}
                </div>
              )}
            </div>

          {user && (
            <button
              onClick={() => {
                logoutUser();
                setSidebarOpen(false);
                navigate('/');
              }}
              className="mt-4 bg-red-600 hover:bg-red-500 rounded px-3 py-2"
            >
              Logout
            </button>
          )}
        </nav>
      </div>

      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black opacity-50 z-40"
          aria-hidden="true"
        />
      )}
    </>
  );
};

export default Navbar;
