
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Autocomplete, TextField, styled, Stack, Divider, FormControlLabel, Switch } from '@mui/material';
import { Button } from '@mui/material';
import { useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../../../store/store';
import { useDispatch } from 'react-redux';
import type { CategoriesResponse } from '../../../interface/CategoriesResponse';
import type { CreateProductRequest } from '../../../interface/ProductResponse';
import { handleChange } from '../../../features/production/ProductSlice';
import { FaFileImage } from 'react-icons/fa';
import toast from "react-hot-toast";
import type { Dispatch, SetStateAction } from 'react';
import { uploadImageToCloudinary } from '../../../config/CloundinaryConfig';
import { MdCancel } from 'react-icons/md';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 720,
    maxWidth: '95vw',
    bgcolor: 'background.paper',
    borderRadius: 2,
    boxShadow: 24,
    p: 3,
    maxHeight: '90vh',
    overflowY: 'auto',
};

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

export default function ProductsModal({ open, handleClose, handleUpdate, handleSubmit, setPreviewBanner, previewBanner, previewListImg, setPreviewListImg, loading }: { open: boolean, handleClose: () => void, handleUpdate: (e: React.FormEvent<HTMLFormElement>) => void, handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void, setPreviewBanner: Dispatch<SetStateAction<string>>, previewBanner: string, previewListImg: string[], setPreviewListImg: Dispatch<SetStateAction<string[]>>, loading: boolean }) {
    const dispatch = useDispatch<AppDispatch>();
    const categories = useSelector((state: RootState) => state.categories.items);
    const categoriesStatus = useSelector((state: RootState) => state.categories.status);
    const platforms = useSelector((state: RootState) => state.platform.items);
    const platformsStatus = useSelector((state: RootState) => state.platform.status);
    const product = useSelector((state: RootState) => state.product.product);


    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        dispatch(handleChange({ ...product, [name]: value } as unknown as CreateProductRequest));
    };

    const handleFileChangeBanner = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const isImage = file.type.startsWith('image/');
        if (!isImage) {
            toast.error('Chỉ được phép tải lên file ảnh!');
            return;
        }
        const isLt5M = file.size / 1024 / 1024 < 5;
        if (!isLt5M) {
            toast.error('Kích thước file phải nhỏ hơn 5MB!');
            return;
        }

        try {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                if (reader.result) {
                    setPreviewBanner(reader.result as string);
                }
            };

            const imageUrl = await uploadImageToCloudinary(file, 'products/banners');
            dispatch(handleChange({ ...product, banner_url: imageUrl } as unknown as CreateProductRequest));
            toast.success('Ảnh banner đã được tải lên thành công!');
        } catch (error) {
            toast.error('Lỗi khi tải lên ảnh banner');
            console.error(error);
        }
    };

    const handleFileChangeListImg = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const { files } = e.target;
        const validFiles = Array.from(files || []).filter((file: File) => file.type.startsWith('image/'));
        
        if (validFiles.length === 0) {
            toast.error('Không có file ảnh hợp lệ');
            return;
        }

        try {
            const previewUrls = validFiles.map(file => URL.createObjectURL(file));
            setPreviewListImg(previewUrls);

            const uploadPromises = validFiles.map(file => 
                uploadImageToCloudinary(file, 'products/images')
            );
            
            const imageUrls = await Promise.all(uploadPromises);
            dispatch(handleChange({ ...product, listImg: imageUrls } as unknown as CreateProductRequest));
            toast.success(`${imageUrls.length} ảnh đã được tải lên thành công!`);
        } catch (error) {
            toast.error('Lỗi khi tải lên ảnh');
            console.error(error);
        }
    };

    const handleRemoveImage = (indexToRemove: number) => {
        const newPreviewList = previewListImg.filter((_, index) => index !== indexToRemove);
        setPreviewListImg(newPreviewList);
        
        const newListImg = product.listImg?.filter((_, index) => index !== indexToRemove) || [];
        dispatch(handleChange({ ...product, listImg: newListImg } as unknown as CreateProductRequest));
        
        toast.success('Đã xóa ảnh');
    };

    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        {product?.id ? 'Cập nhật sản phẩm' : 'Thêm sản phẩm'}
                    </Typography>
                    <Divider sx={{ my: 2 }} />
                    <form onSubmit={product?.id ? handleUpdate : handleSubmit} >
                        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 2 }}>
                            <Box>
                                <Stack spacing={2}>
                                    <TextField 
                                    label="Tên sản phẩm" 
                                    name="name" 
                                    fullWidth 
                                    value={product.name} 
                                    onChange={onInputChange} 
                                    />
                                    <TextField 
                                    label="Mô tả" 
                                    name="description" 
                                    fullWidth 
                                    multiline 
                                    minRows={3} 
                                    value={product.description} 
                                    onChange={onInputChange} 
                                    className='line-clamp-3'
                                    />
                                    <FormControlLabel
                                        control={
                                            <Switch
                                                checked={Boolean(product.status)}
                                                onChange={(_, checked) => {
                                                    dispatch(handleChange({ ...product, status: checked } as unknown as CreateProductRequest));
                                                }}
                                                color="primary"
                                            />
                                        }
                                        label={product.status ? 'Đang hoạt động' : 'Ngừng hoạt động'}
                                    />
                                </Stack>
                                <Stack spacing={2}>
                                    <Autocomplete
                                            disablePortal
                                        options={platforms || []}
                                        value={platforms.find(p => String(p.id) === String(product.platform_id)) ?? null}
                                        getOptionLabel={(option) => option.name}
                                        isOptionEqualToValue={(option, value) => String(option.id) === String(value?.id)}
                                        filterSelectedOptions
                                        loading={platformsStatus === 'loading'}
                                        noOptionsText={platformsStatus === 'loading' ? 'Đang tải...' : 'Không có dữ liệu'}
                                        onChange={(_, newValue) => {
                                            dispatch(handleChange({ ...product, platform_id: newValue ? Number(newValue.id) : 0 } as unknown as CreateProductRequest));
                                        }}
                                        renderInput={(params) => <TextField {...params} label="Nền tảng" />}
                                    />
                                    <Autocomplete<CategoriesResponse, true, false, false>
                                        multiple
                                        fullWidth
                                        options={categories || []}
                                        value={product.listCate?.map((c) => c)}
                                        getOptionLabel={(option) => option.name}
                                        isOptionEqualToValue={(option, value) => String(option.id) === String(value.id)}
                                        filterSelectedOptions
                                        loading={categoriesStatus === 'loading'}
                                        noOptionsText={categoriesStatus === 'loading' ? 'Đang tải...' : 'Không có dữ liệu'}
                                        onChange={(_, newValue) => {
                                            dispatch(handleChange({ ...product, listCate: newValue } as unknown as CreateProductRequest));
                                        }}
                                        renderInput={(params) => (
                                            <TextField {...params} label="Danh mục" />
                                        )}
                                    />
                                    
                                </Stack>
                            </Box>
                            <Box >
                                <Stack direction="row" spacing={4} alignItems="center">
                                    <TextField
                                        label="Trailer URL  "
                                        value={product.trailer_url}
                                        onChange={(e) => dispatch(handleChange({ ...product, trailer_url: e.target.value } as unknown as CreateProductRequest))}
                                    />  
                                </Stack>
                            <Stack direction="row" spacing={4} alignItems="center" className="mt-4">
                                        <Button
                                            component="label"
                                            role={undefined}
                                            variant="outlined"
                                            startIcon={<FaFileImage />}
                                        >
                                            Tải ảnh banner
                                            <VisuallyHiddenInput
                                                type="file"
                                                onChange={handleFileChangeBanner}
                                            />
                                        </Button>
                                        {previewBanner && (
                                            <img
                                                src={previewBanner}
                                                alt="preview"
                                                style={{ width: 64, height: 64, objectFit: 'cover', borderRadius: 8, border: '1px solid #eee' }}
                                            />
                                        )}
                                    </Stack>

                                    <Stack spacing={2} className="mt-4">
                                        <Button
                                            component="label"
                                            role={undefined}
                                            variant="outlined"
                                            startIcon={<FaFileImage />}
                                            sx={{ alignSelf: 'flex-start' }}
                                        >
                                            Tải lên danh sách ảnh
                                            <VisuallyHiddenInput
                                                type="file"
                                                onChange={handleFileChangeListImg}
                                                multiple
                                            />
                                        </Button>
                                        {(previewListImg?.length ?? 0) > 0 && (
                                            <Box sx={{ 
                                                display: 'flex', 
                                                flexWrap: 'wrap', 
                                                gap: 1,
                                                maxHeight: '200px',
                                                overflowY: 'auto',
                                                p: 1,
                                                border: '1px solid #eee',
                                                borderRadius: 1
                                            }}>
                                                {(previewListImg ?? []).map((image, index) => (
                                                    <Box 
                                                        key={index}
                                                        sx={{ 
                                                            position: 'relative',
                                                            width: 64,
                                                            height: 64,
                                                            '&:hover .delete-btn': {
                                                                opacity: 1
                                                            }
                                                        }}
                                                    >
                                                        <img
                                                            src={image}
                                                            alt={`preview-${index}`}
                                                            style={{ 
                                                                width: '100%', 
                                                                height: '100%', 
                                                                objectFit: 'cover', 
                                                                borderRadius: 8, 
                                                                border: '1px solid #ddd',
                                                                display: 'block'
                                                            }}
                                                        />
                                                        <Box
                                                            className="delete-btn"
                                                            onClick={() => handleRemoveImage(index)}
                                                            sx={{
                                                                position: 'absolute',
                                                                top: -8,
                                                                right: -8,
                                                                opacity: 0,
                                                                transition: 'opacity 0.2s',
                                                                cursor: 'pointer',
                                                                backgroundColor: 'white',
                                                                borderRadius: '50%',
                                                                display: 'flex',
                                                                alignItems: 'center',
                                                                justifyContent: 'center',
                                                                boxShadow: 1,
                                                                '&:hover': {
                                                                    backgroundColor: '#f5f5f5'
                                                                }
                                                            }}
                                                        >
                                                            <MdCancel size={20} color="#d32f2f" />
                                                        </Box>
                                                    </Box>
                                                ))}
                                            </Box>
                                        )}
                                    </Stack>
                            </Box>
                        </Box>

                        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="flex-end" sx={{ mt: 3 }}>
                            <Button variant="text" color="inherit" onClick={handleClose}>Hủy</Button>
                            <Button type="submit" variant="contained" color="primary" disabled={loading}>Lưu</Button>
                        </Stack>
                    </form>
                </Box>
            </Modal>
        </div>
    );
}
