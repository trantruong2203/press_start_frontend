import { Autocomplete, TextField } from "@mui/material";
import { 
    FaSearch, 
    FaUser, 
    FaShoppingCart, 
    FaBars,
    FaTimes,
    FaSteam,
    FaGamepad,
    FaXbox,
    FaUserShield
} from "react-icons/fa";
import { SiEa } from "react-icons/si";
import { useContext, useState } from "react";
import logo from "../../assets/logo.png";
import { Link } from "react-router-dom";
import { ContextAuth } from "../../contexts/AuthContext";
import UserModal from "./modal/UserModal";

function Header({ handleOpen }: { handleOpen: () => void }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { accountLogin } = useContext(ContextAuth);
    const [openUserMenu, setOpenUserMenu] = useState(false);
    const navigationItems = [
        { name: "Game Steam", icon: <FaSteam color="white" />, color: "from-orange-400 to-orange-600" },
        { name: "Game Online", icon: <FaGamepad color="white" />, color: "from-green-400 to-green-600" },
        { name: "Xbox Game Pass", icon: <FaXbox color="white" />, color: "from-green-500 to-green-700" },
        { name: "Game EA", icon: <SiEa color="white" />, color: "from-red-400 to-red-600" },
        { name: "Tài Khoản", icon: <FaUserShield color="white" />, color: "from-blue-400 to-blue-600" },
        
    ];

    return (
        <header className="bg-gray-900 fixed z-50 w-full border-b border-cyan-400/30 shadow-lg shadow-cyan-400/20">
            <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
                {/* Top Header */}
                <div className="flex items-center justify-around h-16 ">
                    {/* Logo */}
                    <div className="flex-shrink-0">
                        <div className="w-12 h-12 relative group">
                            <img 
                                src={logo} 
                                alt="logo" 
                                className="w-full h-full object-contain filter drop-shadow-[0_0_8px_rgba(34,211,238,0.6)]"
                            />
                            <div className="absolute inset-0 bg-cyan-400/20 rounded-full blur-sm group-hover:bg-cyan-400/30 transition-all duration-300"></div>
                        </div>
                    </div>

                    {/* Search Bar - Desktop */}
                    <div className="hidden md:flex flex-1 max-w-md mx-8">
                        <Autocomplete
                            freeSolo
                            id="search-autocomplete"
                            disableClearable
                            options={[]}
                            sx={{ 
                                width: '100%',
                                '& .MuiOutlinedInput-root': {
                                    backgroundColor: 'rgba(17, 24, 39, 0.8)',
                                    border: '1px solid rgba(34, 211, 238, 0.3)',
                                    borderRadius: '12px',
                                    '&:hover': {
                                        border: '1px solid rgba(34, 211, 238, 0.6)',
                                        boxShadow: '0 0 20px rgba(34, 211, 238, 0.2)',
                                    },
                                    '&.Mui-focused': {
                                        border: '1px solid rgba(34, 211, 238, 0.8)',
                                        boxShadow: '0 0 25px rgba(34, 211, 238, 0.3)',
                                    }
                                },
                                '& .MuiInputLabel-root': {
                                    color: 'rgba(156, 163, 175, 0.8)',
                                    '&.Mui-focused': {
                                        color: 'rgba(34, 211, 238, 0.8)',
                                    }
                                },
                                '& .MuiInputBase-input': {
                                    color: 'rgba(229, 231, 235, 0.9)',
                                }
                            }}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Tìm kiếm sản phẩm..."
                                    InputProps={{
                                        ...params.InputProps,
                                        startAdornment: (
                                            <FaSearch className="text-cyan-400 mr-2 text-lg" />
                                        ),
                                    }}
                                />
                            )}
                        />
                    </div>

                    {/* Navigation Buttons - Desktop */}
                    <div className="hidden md:flex items-center space-x-4">
                        {accountLogin ? (
                            <div onClick={() => setOpenUserMenu(!openUserMenu)} 
                            className="cursor-pointer group relative px-6 py-2 bg-transparent border border-cyan-400/50 text-cyan-400 rounded-lg hover:bg-cyan-400/10 hover:border-cyan-400 transition-all duration-300 hover:shadow-[0_0_20px_rgba(34,211,238,0.3)]">
                                <FaUser className="inline-block mr-2 text-sm" />
                                <span className="font-medium">Cá nhân</span>
                                <div className="absolute inset-0 bg-cyan-400/5 rounded-lg blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            </div>
                        ) : (
                        <Link to="/login" className="group relative px-6 py-2 bg-transparent border border-cyan-400/50 text-cyan-400 rounded-lg hover:bg-cyan-400/10 hover:border-cyan-400 transition-all duration-300 hover:shadow-[0_0_20px_rgba(34,211,238,0.3)]">
                            <FaUser className="inline-block mr-2 text-sm" />
                            <span className="font-medium">Đăng nhập</span>
                            <div className="absolute inset-0 bg-cyan-400/5 rounded-lg blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </Link>
                        )}
                        <button className="group relative px-6 py-2 bg-gradient-to-r from-cyan-400/20 to-blue-500/20 border border-cyan-400/50 text-cyan-400 rounded-lg hover:from-cyan-400/30 hover:to-blue-500/30 hover:border-cyan-400 transition-all duration-300 hover:shadow-[0_0_25px_rgba(34,211,238,0.4)]">
                            <FaShoppingCart className="inline-block mr-2 text-sm" />
                            <span className="font-medium">Giỏ hàng</span>
                            <div className="absolute inset-0 bg-cyan-400/10 rounded-lg blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </button>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="p-2 rounded-lg text-cyan-400 hover:bg-cyan-400/10 hover:shadow-[0_0_15px_rgba(34,211,238,0.3)] transition-all duration-300"
                        >
                            {isMenuOpen ? (
                                <FaTimes className="text-xl" />
                            ) : (
                                <FaBars className="text-xl" />
                            )}
                        </button>
                    </div>
                </div>

                {/* Navigation Bar */}
                <div className=" border-cyan-400/20">
                    <div className="flex items-center justify-around py-3">
                        {/* Categories Button */}
                        <button 
                            onClick={handleOpen} 
                            className="group relative px-6 py-3 bg-gradient-to-r from-cyan-400/20 to-blue-500/20 border border-cyan-400/50 text-cyan-400 rounded-lg hover:from-cyan-400/30 hover:to-blue-500/30 hover:border-cyan-400 transition-all duration-300 hover:shadow-[0_0_20px_rgba(34,211,238,0.4)] font-medium"
                        >
                            <FaBars className="inline-block mr-2 text-lg" />
                            Danh mục
                            <div className="absolute inset-0 bg-cyan-400/10 rounded-lg blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </button>

                        {/* Navigation Items - Desktop */}
                        <div className="hidden lg:flex items-center space-x-6">
                            {navigationItems.map((item, index) => (
                                <button
                                    key={index}
                                    className="group relative px-4 py-2 text-gray-300 hover:text-white transition-all duration-300 hover:scale-105"
                                >
                                    <div className="flex items-center space-x-2">
                                        <div className={`text-transparent bg-gradient-to-r ${item.color} bg-clip-text group-hover:scale-110 transition-transform duration-300`}>
                                            {item.icon}
                                        </div>
                                        <span className="font-medium text-sm whitespace-nowrap">{item.name}</span>
                                    </div>
                                    <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500 group-hover:w-full transition-all duration-300"></div>
                                </button>
                            ))}
                        </div>

                        {/* Mobile Navigation Toggle */}
                        <div className="lg:hidden">
                            <button className="p-2 text-cyan-400 hover:bg-cyan-400/10 rounded-lg transition-all duration-300">
                                <FaBars className="text-lg" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <div className="md:hidden border-t border-cyan-400/30 bg-gray-800/95 backdrop-blur-sm">
                        <div className="px-4 py-4 space-y-4">
                            {/* Mobile Search */}
                            <div className="w-full">
                                <Autocomplete
                                    freeSolo
                                    id="mobile-search"
                                    disableClearable
                                    options={[]}
                                    sx={{ 
                                        width: '100%',
                                        '& .MuiOutlinedInput-root': {
                                            backgroundColor: 'rgba(17, 24, 39, 0.8)',
                                            border: '1px solid rgba(34, 211, 238, 0.3)',
                                            borderRadius: '12px',
                                        }
                                    }}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            label="Tìm kiếm..."
                                            InputProps={{
                                                ...params.InputProps,
                                                startAdornment: (
                                                    <FaSearch className="text-cyan-400 mr-2 text-sm" />
                                                ),
                                            }}
                                        />
                                    )}
                                />
                            </div>

                            {/* Mobile Navigation */}
                            <div className="flex flex-col space-y-3">
                                <button className="flex items-center justify-center px-4 py-3 bg-transparent border border-cyan-400/50 text-cyan-400 rounded-lg hover:bg-cyan-400/10 transition-all duration-300">
                                    <FaUser className="mr-3 text-lg" />
                                    <span className="font-medium">Đăng nhập</span>
                                </button>

                                <button className="flex items-center justify-center px-4 py-3 bg-gradient-to-r from-cyan-400/20 to-blue-500/20 border border-cyan-400/50 text-cyan-400 rounded-lg hover:from-cyan-400/30 hover:to-blue-500/30 transition-all duration-300">
                                    <FaShoppingCart className="mr-3 text-lg" />
                                    <span className="font-medium">Giỏ hàng</span>
                                </button>
                            </div>

                            {/* Mobile Categories */}
                            <div className="border-t border-cyan-400/20 pt-4">
                                <h3 className="text-cyan-400 font-medium mb-3">Danh mục</h3>
                                <div className="grid grid-cols-2 gap-3">
                                    {navigationItems.map((item, index) => (
                                        <button
                                            key={index}
                                            className="flex items-center p-3 bg-gray-700/50 border border-gray-600/30 rounded-lg hover:bg-gray-600/50 hover:border-cyan-400/50 transition-all duration-300"
                                        >
                                            <div className={`text-transparent bg-gradient-to-r ${item.color} bg-clip-text mr-2`}>
                                                {item.icon}
                                            </div>
                                            <span className="text-gray-300 text-sm font-medium">{item.name}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            
            {/* User Modal - render outside of buttons */}
            {accountLogin && (
                <UserModal 
                    openUserMenu={openUserMenu} 
                    accountLogin={accountLogin}
                    onClose={() => setOpenUserMenu(false)}
                />
            )}
        </header>
    );
}

export default Header;