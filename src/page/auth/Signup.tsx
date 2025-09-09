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
			sx={{ background: 'linear-gradient(180deg, rgba(32,38,46,0.95), rgba(23,26,33,0.95))' }}
		>
			<Container maxWidth="sm">
				<Paper elevation={8} sx={{ p: { xs: 3, md: 4 }, borderRadius: 2, bgcolor: 'rgba(23,26,33,0.9)', border: '1px solid rgba(255,255,255,0.06)' }}>
					<Typography variant="h4" component="h1" color="#fff" fontWeight={700} gutterBottom>
						Tạo tài khoản
					</Typography>
					<Typography variant="body2" sx={{ color: '#9fb4c6', mb: 2 }}>
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
										<IconButton onClick={() => setShowPassword((s) => !s)} edge="end" aria-label="toggle password visibility" sx={{ color: '#9fb4c6' }}>
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
								mt: 1.5,
								py: 1.2,
								fontWeight: 700,
								background: 'linear-gradient(180deg, #5fb341 0%, #2f7d1a 100%)',
								boxShadow: '0 0 12px rgba(95,179,65,0.35)',
								'&.Mui-disabled': { opacity: 0.6 },
							}}
						>
							{submitting ? 'Đang tạo...' : 'Tạo tài khoản'}
						</Button>

						<Divider sx={{ my: 2, borderColor: 'rgba(255,255,255,0.08)' }} />
						<Typography variant="body2" sx={{ color: '#9fb4c6' }}>
							Đã có tài khoản?{' '}
							<Link to="/login" style={{ color: '#5fb341', textDecoration: 'underline' }}>Đăng nhập</Link>
						</Typography>
					</Box>
				</Paper>
			</Container>
		</Box>
	);
}

const muiTextFieldSx = {
	'& .MuiInputBase-root': {
		bgcolor: '#0b1118',
		color: '#dfe6ee',
		borderRadius: 1,
		border: '1px solid #2a3f55',
	},
	'& .MuiOutlinedInput-notchedOutline': {
		borderColor: 'transparent',
	},
	'& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
		borderColor: '#355775',
	},
	'& .MuiFormLabel-root': {
		color: '#9fb4c6',
	},
	'& .MuiFormHelperText-root': {
		marginLeft: 0,
		color: '#ffb4b4',
	},
};

const alertErrorSx = {
	mt: 1,
	px: 1.5,
	py: 1,
	borderRadius: 1,
	backgroundColor: 'rgba(255,80,80,0.08)',
	border: '1px solid rgba(255,80,80,0.3)',
	color: '#ffb4b4',
	fontSize: 13,
};

const alertSuccessSx = {
	mt: 1,
	px: 1.5,
	py: 1,
	borderRadius: 1,
	backgroundColor: 'rgba(80,255,120,0.08)',
	border: '1px solid rgba(80,255,120,0.3)',
	color: '#b6f0c6',
	fontSize: 13,
};
