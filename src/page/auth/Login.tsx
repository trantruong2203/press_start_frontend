import { useContext, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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
import { useDispatch } from 'react-redux';
import { loginUser } from '../../features/users/UsersThunks';
import type { LoginRequest } from '../../interface/UserResponse';
import type { AppDispatch } from '../../store/store';
import { ContextAuth } from '../../contexts/AuthContext';

interface FormState {
	email: string;
	password: string;
}

export default function Signup() {
	const [form, setForm] = useState<FormState>({
		email: '',
		password: '',
	});
	const [showPassword, setShowPassword] = useState<boolean>(false);
	const [submitting, setSubmitting] = useState<boolean>(false);
	const [error, setError] = useState<string>('');
	const dispatch = useDispatch<AppDispatch>();
	const navigate = useNavigate();
	const emailValid = useMemo(() => {
		if (!form.email) return false;
		return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email);
	}, [form.email]);


	const canSubmit = emailValid && !submitting;

	function handleChange<K extends keyof FormState>(key: K, value: FormState[K]) {
		setForm((prev) => ({ ...prev, [key]: value }));
	}

	const {getToken} = useContext(ContextAuth);

	const handleSubmit = async (values: LoginRequest): Promise<void> => {
		try {
		  setSubmitting(true);
		  await dispatch(loginUser(values)).unwrap();
		  await getToken();
		  navigate('/');
		  console.log('Đăng nhập thành công');
		} catch (error: unknown) {
		  setError(error as string);
		  console.log(error);
		} finally {
		  setSubmitting(false);
		}
	  };

	return (
		<Box className="min-h-screen w-full flex items-center justify-center px-4"
			sx={{ background: 'linear-gradient(180deg, rgba(32,38,46,0.95), rgba(23,26,33,0.95))' }}
		>
			<Container maxWidth="sm">
				<Paper elevation={8} sx={{ p: { xs: 3, md: 4 }, borderRadius: 2, bgcolor: 'rgba(23,26,33,0.9)', border: '1px solid rgba(255,255,255,0.06)' }}>
					<Typography variant="h4" component="h1" color="#fff" fontWeight={700} gutterBottom>
						Đăng nhập
					</Typography>
					<Typography variant="body2" sx={{ color: '#9fb4c6', mb: 2 }}>
						Đăng nhập để tiếp tục.
					</Typography>

					<Box component="form" onSubmit={(e) => { e.preventDefault(); handleSubmit({ email: form.email, password: form.password } as LoginRequest); }} noValidate>
						<TextField
							label="Email"
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
							placeholder="********"
							fullWidth
							margin="normal"
							value={form.password}
							onChange={(e) => handleChange('password', e.target.value)}
							InputLabelProps={{ shrink: true }}
							error={form.password.length > 0}
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

						

						{error && (
							<Box sx={alertErrorSx}>{error}</Box>
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
							{submitting ? 'Đang đăng nhập...' : 'Đăng nhập'}
						</Button>

						<Divider sx={{ my: 2, borderColor: 'rgba(255,255,255,0.08)' }} />
						<Typography variant="body2" sx={{ color: '#9fb4c6' }}>
							Chưa có tài khoản?{' '}
							<Link to="/signup" style={{ color: '#5fb341', textDecoration: 'underline' }}>Đăng ký</Link>
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


