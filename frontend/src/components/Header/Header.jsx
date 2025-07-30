import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = () => {
  const user = useSelector((state) => state.auth.user);
  const [isSideBar, setSideBar] = useState(false);
  const [isMobileSize, setMobileSize] = useState(false);
  const [moreOption, setMoreOption] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setMobileSize(window.innerWidth < 480);
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleBtnControll = () => {
    setSideBar(!isSideBar);
  };
  
  const hanlideSettingmob = () => {
    setMoreOption(!moreOption);
  };

  return (
    <>
      {/* Main Navigation */}
      <nav className="bg-primary-very-light shadow-lg border-b-2 border-primary-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            {/* Logo and main nav items */}
            <div className="flex items-center">
              <Link to="/" className="text-2xl font-bold text-primary-dark hover:text-primary-dark-hover transition-colors">
                Notice.com
              </Link>
              <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                <NavLink 
                  to="/" 
                  className={({isActive}) => 
                    `inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors ${
                      isActive 
                        ? 'border-primary-dark text-primary-dark' 
                        : 'border-transparent text-primary-medium hover:border-primary-light hover:text-primary-dark'
                    }`
                  }
                >
                  Home
                </NavLink>
                <NavLink 
                  to="/about" 
                  className={({isActive}) => 
                    `inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors ${
                      isActive 
                        ? 'border-primary-dark text-primary-dark' 
                        : 'border-transparent text-primary-medium hover:border-primary-light hover:text-primary-dark'
                    }`
                  }
                >
                  About
                </NavLink>
                <NavLink 
                  to="/group" 
                  className={({isActive}) => 
                    `inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors ${
                      isActive 
                        ? 'border-primary-dark text-primary-dark' 
                        : 'border-transparent text-primary-medium hover:border-primary-light hover:text-primary-dark'
                    }`
                  }
                >
                  Groups
                </NavLink>
                <NavLink 
                  to="/device" 
                  className={({isActive}) => 
                    `inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors ${
                      isActive 
                        ? 'border-primary-dark text-primary-dark' 
                        : 'border-transparent text-primary-medium hover:border-primary-light hover:text-primary-dark'
                    }`
                  }
                >
                  Devices
                </NavLink>
                <NavLink 
                  to="/chat" 
                  className={({isActive}) => 
                    `inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors ${
                      isActive 
                        ? 'border-primary-dark text-primary-dark' 
                        : 'border-transparent text-primary-medium hover:border-primary-light hover:text-primary-dark'
                    }`
                  }
                >
                  Send Notice
                </NavLink>
                <NavLink 
                  to="/imageNotice" 
                  className={({isActive}) => 
                    `inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors ${
                      isActive 
                        ? 'border-primary-dark text-primary-dark' 
                        : 'border-transparent text-primary-medium hover:border-primary-light hover:text-primary-dark'
                    }`
                  }
                >
                  Image/Video Notice
                </NavLink>
              </div>
            </div>

            {/* Right side items */}
            <div className="hidden sm:ml-6 sm:flex sm:items-center">
              {user ? (
                <>
                  
                  <div className="ml-3 relative">
                    <button 
                      onClick={hanlideSettingmob}
                      className="flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-medium transition-all hover:scale-105"
                    >
                      <img 
                        className="h-8 w-8 rounded-full ml-4 border-2 border-primary-light" 
                        src={user.avatar || "logo.jpg"} 
                        alt="User avatar" 
                      />
                    </button>
                    {moreOption && (
                      <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-primary-very-light ring-1 ring-primary-light ring-opacity-5 focus:outline-none border border-primary-light">
                        <NavLink 
                          to="/dashboard" 
                          onClick={hanlideSettingmob}
                          className={({isActive}) => 
                            `block px-4 py-2 text-sm transition-colors ${
                              isActive ? 'bg-primary-light text-primary-dark' : 'text-primary-medium hover:bg-primary-light hover:text-primary-dark'
                            }`
                          }
                        >
                          Dashboard
                        </NavLink>
                        <NavLink 
                          to="/friends" 
                          onClick={hanlideSettingmob}
                          className={({isActive}) => 
                            `block px-4 py-2 text-sm transition-colors ${
                              isActive ? 'bg-primary-light text-primary-dark' : 'text-primary-medium hover:bg-primary-light hover:text-primary-dark'
                            }`
                          }
                        >
                          Friends
                        </NavLink>
                        <NavLink 
                          to="/mypost" 
                          onClick={hanlideSettingmob}
                          className={({isActive}) => 
                            `block px-4 py-2 text-sm transition-colors ${
                              isActive ? 'bg-primary-light text-primary-dark' : 'text-primary-medium hover:bg-primary-light hover:text-primary-dark'
                            }`
                          }
                        >
                          Posts
                        </NavLink>
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <NavLink 
                  to="/auth" 
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-lg text-white bg-primary-medium hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-light transition-all hover:scale-105"
                >
                  Login
                </NavLink>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="-mr-2 flex items-center sm:hidden">
              <button
                onClick={toggleBtnControll}
                className="inline-flex items-center justify-center p-2 rounded-md text-primary-medium hover:text-primary-dark hover:bg-primary-light focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-medium transition-colors"
              >
                <span className="sr-only">Open main menu</span>
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isSideBar && (
          <div className="sm:hidden bg-primary-very-light border-t border-primary-light">
            <div className="pt-2 pb-3 space-y-1">
              <NavLink
                to="/"
                onClick={toggleBtnControll}
                className={({isActive}) => 
                  `block pl-3 pr-4 py-2 border-l-4 text-base font-medium transition-colors ${
                    isActive 
                      ? 'bg-primary-light border-primary-dark text-primary-dark' 
                      : 'border-transparent text-primary-medium hover:bg-primary-light hover:border-primary-medium hover:text-primary-dark'
                  }`
                }
              >
                Home
              </NavLink>
              <NavLink
                to="/about"
                onClick={toggleBtnControll}
                className={({isActive}) => 
                  `block pl-3 pr-4 py-2 border-l-4 text-base font-medium transition-colors ${
                    isActive 
                      ? 'bg-primary-light border-primary-dark text-primary-dark' 
                      : 'border-transparent text-primary-medium hover:bg-primary-light hover:border-primary-medium hover:text-primary-dark'
                  }`
                }
              >
                About
              </NavLink>
              {user ? (
                <NavLink
                  to="/#"
                  onClick={toggleBtnControll}
                  className={({isActive}) => 
                    `block pl-3 pr-4 py-2 border-l-4 text-base font-medium transition-colors ${
                      isActive 
                        ? 'bg-primary-light border-primary-dark text-primary-dark' 
                        : 'border-transparent text-primary-medium hover:bg-primary-light hover:border-primary-medium hover:text-primary-dark'
                    }`
                  }
                >
                  News
                </NavLink>
              ) : (
                <NavLink
                  to="/auth"
                  onClick={toggleBtnControll}
                  className={({isActive}) => 
                    `block pl-3 pr-4 py-2 border-l-4 text-base font-medium transition-colors ${
                      isActive 
                        ? 'bg-primary-light border-primary-dark text-primary-dark' 
                        : 'border-transparent text-primary-medium hover:bg-primary-light hover:border-primary-medium hover:text-primary-dark'
                    }`
                  }
                >
                  Login
                </NavLink>
              )}
            </div>
          </div>
        )}
      </nav>

      {/* Mobile user profile bar */}
      {isMobileSize && user && (
        <div className="flex items-center p-4 bg-primary-very-light border-b border-primary-light shadow-sm">
          <img 
            src={user.avatar || "logo.jpg"} 
            alt="User avatar" 
            className="h-10 w-10 rounded-full mr-3 border-2 border-primary-light" 
          />
          <div className="flex-1">
            <h5 className="font-medium text-primary-dark">{user.username}</h5>
            <p className="text-sm text-primary-medium">{user.email}</p>
          </div>
          <button 
            onClick={hanlideSettingmob}
            className="p-2 rounded-full hover:bg-primary-light transition-colors"
          >

          </button>
        </div>
      )}
    </>
  );
};

export default Header;