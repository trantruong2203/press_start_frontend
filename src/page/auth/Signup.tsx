import { useMemo, useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import {
	Box,
	Button,
	Container,
	IconButton,
	InputAdornment,
	TextField,
	Typography,
	Paper,
	Divider,
} from '@mui/material';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { createUser } from '../../features/users/UsersThunks';
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../../store/store';
import type { UserResponse } from '../../interface/UserResponse';

interface FormState {
	displayName: string;
	email: string;
	password: string;
	confirmPassword: string;
}

export default function Signup() {
	const [form, setForm] = useState<FormState>({
		displayName: '',
		email: '',
		password: '',
		confirmPassword: '',
	});
	const [showPassword, setShowPassword] = useState<boolean>(false);
	const [submitting, setSubmitting] = useState<boolean>(false);
	const [error, setError] = useState<string>('');
	const [successMsg, setSuccessMsg] = useState<string>('');
	const dispatch = useDispatch<AppDispatch>();
	const emailValid = useMemo(() => {
		if (!form.email) return false;
		return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email);
	}, [form.email]);

	const passwordsMatch = useMemo(
		() => form.password === form.confirmPassword && form.confirmPassword.length > 0,
		[form.password, form.confirmPassword]
	);

	const canSubmit = emailValid && passwordsMatch && !submitting;

	function handleChange<K extends keyof FormState>(key: K, value: FormState[K]) {
		setForm((prev) => ({ ...prev, [key]: value }));
	}

	async function handleSubmit(e: FormEvent) {
		e.preventDefault();
		setError('');
		setSuccessMsg('');
		if (!canSubmit) return;
		try {
			setSubmitting(true);
			await dispatch(createUser({email: form.email, password: form.password, username: form.displayName} as UserResponse)).unwrap();
			setSuccessMsg('Tạo tài khoản thành công! Hãy kiểm tra email để xác minh tài khoản.');
		} catch (err) {
			console.error(err);
			setError('Có lỗi xảy ra. Vui lòng thử lại sau.');
		} finally {
			setSubmitting(false);
		}
	}

	return (
		<Box className="min-h-screen w-full flex items-center justify-center px-4"
			sx={{ 
				background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)',
				position: 'relative',
				'&::before': {
					content: '""',
					position: 'absolute',
					top: 0,
					left: 0,
					right: 0,
					bottom: 0,
					background: 'radial-gradient(circle at 20% 80%, rgba(6, 182, 212, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(139, 92, 246, 0.1) 0%, transparent 50%)',
					pointerEvents: 'none'
				}
			}}
		>
			<Container maxWidth="sm">
				<Paper 
					elevation={0} 
					sx={{ 
						p: { xs: 3, md: 4 }, 
						borderRadius: 3, 
						bgcolor: 'rgba(30, 41, 59, 0.8)', 
						backdropFilter: 'blur(10px)',
						border: '1px solid rgba(6, 182, 212, 0.2)',
						boxShadow: '0 0 30px rgba(6, 182, 212, 0.1), 0 0 60px rgba(139, 92, 246, 0.05)',
						position: 'relative',
						overflow: 'hidden',
						'&::before': {
							content: '""',
							position: 'absolute',
							top: 0,
							left: 0,
							right: 0,
							bottom: 0,
							background: 'linear-gradient(45deg, transparent 30%, rgba(6, 182, 212, 0.05) 50%, transparent 70%)',
							pointerEvents: 'none'
						}
					}}
				>
					<Typography 
						variant="h4" 
						component="h1" 
						gutterBottom
						sx={{ 
							color: '#e2e8f0', 
							fontWeight: 700, 
							textAlign: 'center',
							background: 'linear-gradient(45deg, #06b6d4, #8b5cf6)',
							backgroundClip: 'text',
							WebkitBackgroundClip: 'text',
							WebkitTextFillColor: 'transparent',
							textShadow: '0 0 20px rgba(6, 182, 212, 0.3)'
						}}
					>
						Tạo tài khoản
					</Typography>
					<Typography variant="body2" sx={{ color: '#94a3b8', mb: 3, textAlign: 'center' }}>
						Tham gia miễn phí và bắt đầu khám phá kho trò chơi khổng lồ.
					</Typography>

					<Box component="form" onSubmit={handleSubmit} noValidate>
						<TextField
							label="Tên hiển thị"
							placeholder="Ví dụ: gamer_pro"
							fullWidth
							margin="normal"
							value={form.displayName}
							onChange={(e) => handleChange('displayName', e.target.value)}
							InputLabelProps={{ shrink: true }}
							variant="outlined"
							sx={muiTextFieldSx}
						/>

						<TextField
							label="Email"
							type="email"
							placeholder="you@example.com"
							fullWidth
							margin="normal"
							value={form.email}
							onChange={(e) => handleChange('email', e.target.value)}
							InputLabelProps={{ shrink: true }}
							helperText={!emailValid && form.email.length > 0 ? 'Email không hợp lệ.' : ' '}
							error={!emailValid && form.email.length > 0}
							variant="outlined"
							sx={muiTextFieldSx}
						/>

						<TextField
							label="Mật khẩu"
							type={showPassword ? 'text' : 'password'}
							placeholder="Tối thiểu 8 ký tự, có chữ và số"
							fullWidth
							margin="normal"
							value={form.password}
							onChange={(e) => handleChange('password', e.target.value)}
							InputLabelProps={{ shrink: true }}
							variant="outlined"
							InputProps={{
								endAdornment: (
									<InputAdornment position="end">
										<IconButton 
											onClick={() => setShowPassword((s) => !s)} 
											edge="end" 
											aria-label="toggle password visibility" 
											sx={{ 
												color: '#06b6d4',
												'&:hover': {
													color: '#8b5cf6',
													backgroundColor: 'rgba(6, 182, 212, 0.1)',
													transform: 'scale(1.1)',
													transition: 'all 0.2s ease'
												}
											}}
										>
											{showPassword ? <FaEyeSlash /> : <FaEye />}
										</IconButton>
									</InputAdornment>
								),
							}}
							sx={muiTextFieldSx}
						/>

						<TextField
							label="Xác nhận mật khẩu"
							type={showPassword ? 'text' : 'password'}
							placeholder="Nhập lại mật khẩu"
							fullWidth
							margin="normal"
							value={form.confirmPassword}
							onChange={(e) => handleChange('confirmPassword', e.target.value)}
							InputLabelProps={{ shrink: true }}
							helperText={!passwordsMatch && form.confirmPassword.length > 0 ? 'Mật khẩu không khớp.' : ' '}
							error={!passwordsMatch && form.confirmPassword.length > 0}
							variant="outlined"
							sx={muiTextFieldSx}
						/>

						{error && (
							<Box sx={alertErrorSx}>{error}</Box>
						)}
						{successMsg && (
							<Box sx={alertSuccessSx}>{successMsg}</Box>
						)}

						<Button
							type="submit"
							fullWidth
							variant="contained"
							disabled={!canSubmit}
							sx={{
								mt: 2,
								py: 1.5,
								fontWeight: 700,
								fontSize: '1.1rem',
								background: 'linear-gradient(45deg, #06b6d4 0%, #8b5cf6 100%)',
								boxShadow: '0 0 20px rgba(6, 182, 212, 0.4), 0 0 40px rgba(139, 92, 246, 0.2)',
								borderRadius: 2,
								textTransform: 'none',
								position: 'relative',
								overflow: 'hidden',
								'&:hover': {
									background: 'linear-gradient(45deg, #0891b2 0%, #7c3aed 100%)',
									boxShadow: '0 0 25px rgba(6, 182, 212, 0.6), 0 0 50px rgba(139, 92, 246, 0.3)',
									transform: 'translateY(-2px)',
									transition: 'all 0.3s ease'
								},
								'&:active': {
									transform: 'translateY(0px)',
								},
								'&.Mui-disabled': { 
									opacity: 0.4,
									background: 'linear-gradient(45deg, #64748b 0%, #6b7280 100%)',
									boxShadow: 'none'
								},
								'&::before': {
									content: '""',
									position: 'absolute',
									top: 0,
									left: '-100%',
									width: '100%',
									height: '100%',
									background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
									transition: 'left 0.5s'
								},
								'&:hover::before': {
									left: '100%'
								}
							}}
						>
							{submitting ? 'Đang tạo...' : 'Tạo tài khoản'}
						</Button>

						<Divider sx={{ 
							my: 3, 
							borderColor: 'rgba(6, 182, 212, 0.2)',
							'&::before, &::after': {
								borderColor: 'rgba(139, 92, 246, 0.2)'
							}
						}} />
						<Typography variant="body2" sx={{ color: '#94a3b8', textAlign: 'center' }}>
							Đã có tài khoản?{' '}
							<Link 
								to="/login" 
								style={{ 
									color: '#06b6d4', 
									textDecoration: 'none',
									fontWeight: 600,
									position: 'relative',
									transition: 'all 0.3s ease'
								}}
								onMouseEnter={(e) => {
									e.currentTarget.style.color = '#8b5cf6';
									e.currentTarget.style.textShadow = '0 0 10px rgba(6, 182, 212, 0.5)';
								}}
								onMouseLeave={(e) => {
									e.currentTarget.style.color = '#06b6d4';
									e.currentTarget.style.textShadow = 'none';
								}}
							>
								Đăng nhập
							</Link>
						</Typography>
					</Box>
				</Paper>
			</Container>
		</Box>
	);
}

const muiTextFieldSx = {
	'& .MuiInputBase-root': {
		bgcolor: 'rgba(15, 23, 42, 0.6)',
		color: '#e2e8f0',
		borderRadius: 2,
		border: '1px solid rgba(6, 182, 212, 0.2)',
		backdropFilter: 'blur(10px)',
		transition: 'all 0.3s ease',
		'&:hover': {
			borderColor: 'rgba(6, 182, 212, 0.4)',
			boxShadow: '0 0 15px rgba(6, 182, 212, 0.1)',
		},
		'&.Mui-focused': {
			borderColor: '#06b6d4',
			boxShadow: '0 0 20px rgba(6, 182, 212, 0.2)',
		}
	},
	'& .MuiOutlinedInput-notchedOutline': {
		borderColor: 'transparent',
	},
	'& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
		borderColor: 'transparent',
	},
	'& .MuiFormLabel-root': {
		color: '#94a3b8',
		fontWeight: 500,
	},
	'& .MuiFormHelperText-root': {
		marginLeft: 0,
		color: '#f87171',
		fontSize: '0.875rem',
	},
	'& .MuiInputBase-input': {
		'&::placeholder': {
			color: '#64748b',
			opacity: 1,
		}
	}
};

const alertErrorSx = {
	mt: 2,
	px: 2,
	py: 1.5,
	borderRadius: 2,
	backgroundColor: 'rgba(239, 68, 68, 0.1)',
	border: '1px solid rgba(239, 68, 68, 0.3)',
	color: '#fca5a5',
	fontSize: '0.875rem',
	fontWeight: 500,
	backdropFilter: 'blur(10px)',
	boxShadow: '0 0 15px rgba(239, 68, 68, 0.1)',
	textAlign: 'center'
};

const alertSuccessSx = {
	mt: 2,
	px: 2,
	py: 1.5,
	borderRadius: 2,
	backgroundColor: 'rgba(34, 197, 94, 0.1)',
	border: '1px solid rgba(34, 197, 94, 0.3)',
	color: '#86efac',
	fontSize: '0.875rem',
	fontWeight: 500,
	backdropFilter: 'blur(10px)',
	boxShadow: '0 0 15px rgba(34, 197, 94, 0.1)',
	textAlign: 'center'
};
