
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { 
  MdClose, 
  MdPerson, 
  MdShoppingCart, 
  MdStore, 
  MdContentPaste, 
  MdLogout 
} from 'react-icons/md';
import { getOjectByEmail } from '../../../services/FunctionRepone';
import { useSelector } from 'react-redux';
import type { RootState } from '../../../store/store';
import type { UserResponse } from '../../../interface/UserResponse';
import { ContextAuth } from '../../../contexts/AuthContext';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

interface UserModalProps {
  openUserMenu: boolean;
  accountLogin: UserResponse;
  onClose: () => void;
}

export default function UserModal({ openUserMenu, accountLogin, onClose }: UserModalProps) {
    const users = useSelector((state: RootState) => state.users.users);
    const userInfo = accountLogin ? getOjectByEmail(users, accountLogin.email) : null;
    const { logout } = useContext(ContextAuth);
    const navigate = useNavigate();
    return (
        <Modal
            open={openUserMenu}
            onClose={onClose}
            aria-labelledby="user-menu-modal"
            aria-describedby="user-menu-description"
            disableAutoFocus
            disableEnforceFocus
            disableRestoreFocus
        >
            <div className='w-full max-w-md mx-auto bg-white rounded-lg'>
                    {/* Header */}
                    <div className="flex items-center justify-between p-4 border-b border-gray-200">
                        <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                                <MdPerson className="text-white text-xl" />
                            </div>
                            <div>
                                <Typography variant="h6" className="font-semibold">
                                    Xin chào, {userInfo?.username || 'Người dùng'}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {userInfo?.email}
                                </Typography>
                            </div>
                        </div>
                        <IconButton 
                            onClick={onClose}
                            size="small"
                            className="hover:bg-gray-100"
                        >
                            <MdClose />
                        </IconButton>
                    </div>

                    {/* Menu Items */}
                    <div className="p-4 space-y-2 ">
                        <Button
                            fullWidth
                            variant="text"
                            startIcon={<MdPerson />}
                            onClick={() => {}}
                            className="justify-start  hover:bg-gray-50 py-3"
                        >
                            <div >
                                <div className="font-medium">Quản lý tài khoản</div>
                            </div>
                        </Button>

                        <Button
                            fullWidth
                            variant="text"
                            startIcon={<MdShoppingCart />}
                            onClick={() => {}}
                            className="justify-start  hover:bg-gray-50 py-3"
                        >
                            <div >
                                <div className="font-medium">Quản lý đơn hàng</div>
                            </div>
                        </Button>

                        <Button
                            fullWidth
                            variant="text"
                            startIcon={<MdContentPaste />}
                            onClick={() => {}}
                            className="justify-start  hover:bg-gray-50 py-3"
                        >
                            <div >
                                <div className="font-medium">Quản lý nội dung</div>
                            </div>
                        </Button>

                        <Button
                            fullWidth
                            variant="text"
                            startIcon={<MdStore />}
                            onClick={() => {navigate('/seller')}}
                            className="justify-start  hover:bg-gray-50 py-3"
                        >
                            <div >
                                <div className="font-medium">Đăng ký bán hàng</div>
                            </div>
                        </Button>

                        <div className="border-t border-gray-200 my-3"></div>

                        <Button
                            fullWidth
                            variant="text"
                            startIcon={<MdLogout />}
                            onClick={() => logout()}
                            className="justify-start text-left hover:bg-red-50 py-3 text-red-600"
                        >
                            <div >
                                <div className="font-medium">Đăng xuất</div>
                            </div>
                        </Button>
                    </div>
            </div>
        </Modal>
    );
}
