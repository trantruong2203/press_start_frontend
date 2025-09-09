import { NavLink, useNavigate } from 'react-router-dom';
import { FaUser, FaCaretDown, FaSignOutAlt } from 'react-icons/fa';
import { ContextAuth } from '../../contexts/AuthContext';
import { useContext, useState } from 'react';
import { listMenu } from '../../utils/Contants';

type NavbarProps = {
	header?: string;
	className?: string;
};

export default function Navbar({ header = 'Admin Dashboard', className = '' }: NavbarProps) {
	const { logout } = useContext(ContextAuth);
	const navigate = useNavigate();
	const [activeDropdown, setActiveDropdown] = useState<number | null>(null);

	const handleLogout = async () => {
		await logout();
		navigate('/');
	};

	const handleDropdownToggle = (id: number) => {
		setActiveDropdown(activeDropdown === id ? null : id);
	};

	return (
		<nav className={`w-full border-b border-gray-200 bg-white shadow-sm ${className}`}>
			<div className="mx-auto max-w-7xl px-4">
				<div className="flex h-16 items-center justify-between">
					{/* Logo/Header */}
					<div className="flex items-center">
						<div className="text-xl font-bold text-gray-800">{header}</div>
					</div>

					{/* Navigation Menu */}
					<div className="flex items-center space-x-1">
						{listMenu.map((item) => (
							<div key={item.id} className="relative">
								<button
									onClick={() => handleDropdownToggle(item.id)}
									className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200 ${
										activeDropdown === item.id
											? 'bg-blue-50 text-blue-700 border border-blue-200'
											: 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
									}`}
								>
									<span className="text-base">{item.icon}</span>
									<span>{item.title}</span>
									<FaCaretDown className={`transition-transform duration-200 ${
										activeDropdown === item.id ? 'rotate-180' : ''
									}`} />
								</button>

								{/* Dropdown Menu */}
								{activeDropdown === item.id && (
									<div className="absolute top-full left-0 mt-1 w-56 rounded-lg bg-white border border-gray-200 shadow-lg z-50">
										<div className="py-2">
											{item.items.map((subItem) => (
												<NavLink
													key={subItem.id}
													to={subItem.path}
													onClick={() => setActiveDropdown(null)}
													className={({ isActive }) =>
														`block px-4 py-2 text-sm transition-colors ${
															isActive
																? 'bg-blue-50 text-blue-700 border-r-2 border-blue-500'
																: 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
														}`
													}
												>
													{subItem.title}
												</NavLink>
											))}
										</div>
									</div>
								)}
							</div>
						))}
					</div>

					{/* User Actions */}
					<div className="flex items-center space-x-3">
						<div className="flex items-center space-x-2 text-sm text-gray-600">
							<div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
								<FaUser className="text-blue-600 text-sm" />
							</div>
							<span className="font-medium">Admin</span>
						</div>
						
						<button 
							onClick={handleLogout}
							className="flex items-center gap-2 bg-red-50 text-red-600 hover:bg-red-100 rounded-lg px-3 py-2 text-sm font-medium transition-colors duration-200"
						>
							<FaSignOutAlt className="text-sm" />
							<span>Đăng xuất</span>
						</button>
					</div>
				</div>
			</div>

			{/* Overlay to close dropdown when clicking outside */}
			{activeDropdown && (
				<div 
					className="fixed inset-0 z-40" 
					onClick={() => setActiveDropdown(null)}
				/>
			)}
		</nav>
	);
}
