import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { assets } from "../assets/assets";
import { useAppContext } from "../context/AppContext";

const Navbar = () => {
    const [open, setOpen] = React.useState(false);

    const {
        user,
        setUser,
        setShowUserLogin,
        navigate,
        searchQuery,
        setSearchQuery,
        cartItems,
        getCartCount,

    } = useAppContext();

    const logout = async () => {
        setUser(null);
        setOpen(false);
        navigate("/");
    };

    useEffect(() => {
        if (searchQuery?.length > 0) {
            navigate("/products");
        }
    }, [searchQuery]);

    const cartCount = Object.values(cartItems || {}).reduce(
        (total, count) => total + count,
        0
    );

    return (
        <nav className="relative flex items-center justify-between px-4 sm:px-6 md:px-16 lg:px-24 xl:px-32 py-4 border-b border-gray-300 bg-white">

            {/* Logo */}
            <NavLink to="/"
                onClick={() => setOpen(false)}>
                <img
                    className="h-8 sm:h-9"
                    src={assets.logo}
                    alt="Logo"
                />
            </NavLink>

            {/* Desktop Menu */}
            <div className="hidden sm:flex items-center gap-5 md:gap-6 lg:gap-8">

                <NavLink
                    to="/"
                    className="hover:text-primary-500 transition"
                >
                    Home
                </NavLink>

                <NavLink
                    to="/products"
                    className="hover:text-primary-500 transition"
                >
                    All Products
                </NavLink>

                <NavLink
                    to="/"
                    className="hover:text-primary-500 transition"
                >
                    Contact
                </NavLink>

                {/* Search */}
                <div className=" lg:flex items-center gap-2 text-sm border border-gray-300 px-3 rounded-full w-48 xl:w-56">
                    <input
                        value={searchQuery || ""}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="py-1.5 w-full bg-transparent outline-none placeholder-gray-500"
                        type="text"
                        placeholder="Search products"
                    />

                    <img
                        src={assets.search_icon}
                        alt="search"
                        className="w-4 h-4"
                    />
                </div>

                {/* Cart */}
                <div
                    onClick={() => navigate("/cart")}
                    className="relative cursor-pointer"
                >
                    <img
                        src={assets.nav_cart_icon}
                        alt="cart"
                        className="w-6 opacity-80"
                    />

                    {cartCount > 0 && (
                        <span className="absolute -top-2 -right-3 flex items-center justify-center text-[10px] text-white bg-primary-500 w-5 h-5 rounded-full">
                            {cartCount}
                        </span>
                    )}
                </div>

                {/* Login / Profile */}
                {!user ? (
                    <button
                        onClick={() => setShowUserLogin(true)}
                        className="cursor-pointer px-6 md:px-8 py-2 bg-primary-500 hover:bg-primary-dull transition text-white rounded-full"
                    >
                        Login
                    </button>
                ) : (
                    <div className="relative group cursor-pointer">
                        <img
                            src={assets.profile_icon}
                            alt="profile"
                            className="w-9 h-9"
                        />

                        <ul className="hidden group-hover:block absolute top-9 right-0 bg-white shadow-lg border border-gray-200 py-2 w-32 rounded-md text-sm z-40">
                            <li
                                onClick={() => navigate("/my-orders")}
                                className="p-2 pl-3 hover:bg-primary-500/10 cursor-pointer"
                            >
                                My Orders
                            </li>

                            <li
                                onClick={logout}
                                className="p-2 pl-3 hover:bg-primary-500/10 cursor-pointer"
                            >
                                Logout
                            </li>
                        </ul>
                    </div>
                )}
            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center gap-6 sm:hidden">
                <div
                    onClick={() => navigate("/cart")}
                    className="relative cursor-pointer"
                >
                    <img
                        src={assets.nav_cart_icon}
                        alt="cart"
                        className="w-6 opacity-80"
                    />
                    

                    {cartCount > 0 && (
                        <span className="absolute -top-2 -right-3 flex items-center justify-center text-[10px] text-white bg-primary-500 w-5 h-5 rounded-full">
                            {cartCount}
                        </span>
                    )}
                </div>
                <button
                    onClick={() => setOpen(!open)}
                    aria-label="Menu"
                    className="sm:hidden cursor-pointer"
                >
                    <img
                        src={assets.menu_icon}
                        alt="menu"
                        className="w-6"
                    />
                </button>
            </div>

            {/* Mobile Menu */}
            {open && (
                <div className="absolute top-full left-0 w-full bg-white shadow-md py-5 px-5 flex flex-col gap-4 text-sm z-50 sm:hidden">

                    {/* Mobile Search */}
                    <div className="flex items-center gap-2 border border-gray-300 px-3 rounded-full">
                        <input
                            value={searchQuery || ""}
                            onChange={(e) => {
                                setSearchQuery(e.target.value);
                                setOpen(false);
                            }}
                            className="py-2 w-full bg-transparent outline-none placeholder-gray-500"
                            type="text"
                            placeholder="Search products"
                        />

                        <img
                            src={assets.search_icon}
                            alt="search"
                            className="w-4 h-4"
                        />
                    </div>

                    <NavLink
                        to="/"
                        onClick={() => setOpen(false)}
                        className="hover:text-primary-500"
                    >
                        Home
                    </NavLink>

                    <NavLink
                        to="/products"
                        onClick={() => setOpen(false)}
                        className="hover:text-primary-500"
                    >
                        All Products
                    </NavLink>

                    {user && (
                        <NavLink
                            to="/my-orders"
                            onClick={() => setOpen(false)}
                            className="hover:text-primary-500"
                        >
                            My Orders
                        </NavLink>
                    )}

                    <NavLink
                        to="/"
                        onClick={() => setOpen(false)}
                        className="hover:text-primary-500"
                    >
                        Contact
                    </NavLink>

                    {/* Mobile Cart */}
                    <button
                        onClick={() => {
                            setOpen(false);
                            navigate("/cart");
                        }}
                        className="text-left hover:text-primary-500"
                    >
                        Cart {cartCount > 0 && `(${cartCount})`}
                    </button>

                    {/* Login / Logout */}
                    {!user ? (
                        <button
                            onClick={() => {
                                setOpen(false);
                                setShowUserLogin(true);
                            }}
                            className="cursor-pointer px-6 py-2 mt-1 bg-primary-500 hover:bg-primary-dull transition text-white rounded-full text-sm"
                        >
                            Login
                        </button>
                    ) : (
                        <button
                            onClick={logout}
                            className="cursor-pointer px-6 py-2 mt-1 bg-primary-500 hover:bg-primary-dull transition text-white rounded-full text-sm"
                        >
                            Logout
                        </button>
                    )}
                </div>
            )}
        </nav>
    );
};

export default Navbar;