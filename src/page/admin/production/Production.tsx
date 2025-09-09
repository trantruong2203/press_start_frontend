import { useContext, useState } from 'react';
import Header from '../../../component/admin/Header';
import ProductTable from './ProductTable';
import ProductsModal from './ProductsModal';
import type { CreateProductRequest, ProductResponse, UpdateProductRequest } from '../../../interface/ProductResponse';
import { createProductThunk, deleteProductThunk, updateProductThunk } from '../../../features/production/ProductThucks';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../../../store/store';
import dayjs from 'dayjs';
import { uploadImageToCloudinary } from '../../../config/CloundinaryConfig';
import toast from 'react-hot-toast';
import { ContextAuth } from '../../../contexts/AuthContext';
import { handleChange } from '../../../features/production/ProductSlice';


function Production() {
    const [open, setOpen] = useState(false);
    const [editingId, setEditingId] = useState<number | null>(null);
    const dispatch = useDispatch<AppDispatch>();
    const [previewBanner, setPreviewBanner] = useState<string>('');
    const [previewListImg, setPreviewListImg] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);
    const { accountLogin } = useContext(ContextAuth);
    const product = useSelector((state: RootState) => state.product.product);

    const handleOpen = () => setOpen(true);
    
    const handleClose = () => {
        setOpen(false);
        dispatch(handleChange({
            name: "",
            description: "",
            platform_id: 0,
            banner_url: "",
            trailer_url: "",
            status: true,
            author: 0,
            createdAt: dayjs().format('YYYY-MM-DD HH:mm:ss'),
            listCate: [],
            listImg: [],
        } as unknown as CreateProductRequest));
        setEditingId(null);
        setPreviewBanner('');
        setPreviewListImg([]);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        if (!validateForm()) {
            return;
        }

        try {
            setLoading(true);
    
            let imageUrl = '';
            const listImgUrl: string[] = [];
            
            // Xử lý upload ảnh lên Cloudinary
            if (previewBanner) {
              // Nếu là base64, chuyển đổi thành File
              const response = await fetch(previewBanner);
              const blob = await response.blob();
              const file = new File([blob], 'user_image.jpg', { type: blob.type });
              imageUrl = await uploadImageToCloudinary(file, 'user');
            } else {
              imageUrl = '';
            }

            
            if (previewListImg.length > 0) {
                const uploadPromises = previewListImg.map(async (image, index) => {
                    try {
                        const resp = await fetch(image);
                        const blob = await resp.blob();
                        const file = new File([blob], `list_image_${index}.jpg`, { type: blob.type });
                        const url = await uploadImageToCloudinary(file, 'user');
                        return url;
                    } catch (uploadError) {
                        console.error(`Lỗi khi upload ảnh ${index + 1}:`, uploadError);
                        return null;
                    }
                });

                const results = await Promise.all(uploadPromises);
                results.forEach((url) => { if (url) listImgUrl.push(url); });
            }
            await dispatch(createProductThunk({ ...product,   listImg: listImgUrl, listCate: product.listCate || [], banner_url: imageUrl, author: accountLogin?.id as number })).unwrap();
            toast.success('Tạo sản phẩm thành công!');
            handleClose();
        } catch (error) {
            console.error('Lỗi khi tải ảnh lên:', error);
            toast.error('Lỗi khi tải ảnh lên!');
        } finally {
            setLoading(false);
        }
    };

    const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Sử dụng validation
        if (!validateForm()) {
            return;
        }

        try {
            setLoading(true);
    
            let imageUrl = '';
            const listImgUrl: string[] = [];
            
            // Xử lý upload ảnh lên Cloudinary - chỉ khi ảnh thay đổi
            if (previewBanner && previewBanner !== product.banner_url) {
              // Nếu là base64, chuyển đổi thành File
              const response = await fetch(previewBanner);
              const blob = await response.blob();
              const file = new File([blob], 'user_image.jpg', { type: blob.type });
              imageUrl = await uploadImageToCloudinary(file, 'user');
            } else {
              imageUrl = product.banner_url; // Giữ nguyên ảnh cũ
            }

            
            if (previewListImg.length > 0) {
                const uploadPromises = previewListImg.map(async (image, index) => {
                    try {
                        // Kiểm tra xem ảnh có phải là URL mới không
                        if (image.startsWith('data:')) {
                            const resp = await fetch(image);
                            const blob = await resp.blob();
                            const file = new File([blob], `list_image_${index}.jpg`, { type: blob.type });
                            const url = await uploadImageToCloudinary(file, 'user');
                            return url;
                        } else {
                            // Nếu là URL cũ, giữ nguyên
                            return image;
                        }
                    } catch (uploadError) {
                        console.error(`Lỗi khi upload ảnh ${index + 1}:`, uploadError);
                        return null;
                    }
                });

                const results = await Promise.all(uploadPromises);
                results.forEach((url) => { if (url) listImgUrl.push(url); });
            }
            
            const updateData = {
                name: product.name,
                description: product.description,
                platform_id: product.platform_id,
                banner_url: imageUrl,
                trailer_url: product.trailer_url,
                status: product.status,
                author: accountLogin?.id,
                listImg: listImgUrl,
                listCate: product.listCate || []
            };

            await dispatch(updateProductThunk({ 
                id: editingId!, 
                product: updateData as unknown as UpdateProductRequest  
            })).unwrap();
            setLoading(true);
            toast.success('Cập nhật sản phẩm thành công!');
            handleClose();
        } catch (error) {
            console.error('Lỗi khi tải ảnh lên:', error);
            toast.error('Lỗi khi tải ảnh lên!');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: number) => {
        try {
            await dispatch(deleteProductThunk(id)).unwrap();
            toast.success('Xóa sản phẩm thành công!');
        } catch (error) {
            console.error('Lỗi khi xóa sản phẩm:', error);
            toast.error('Lỗi khi xóa sản phẩm!');
        }
    }


    const handleEdit = async (item: ProductResponse) => {
        dispatch(handleChange(item as unknown as CreateProductRequest));
        setEditingId(item.id);
        setPreviewBanner(item.banner_url);
        setPreviewListImg(item.listImg as string[]);
        handleOpen();
    }

    const validateForm = () => {
      if (!product.name.trim()) {
        toast.error('Vui lòng nhập tên sản phẩm!');
        return false;
      }
      if (!product.description.trim()) {
        toast.error('Vui lòng nhập mô tả sản phẩm!');
        return false;
      }
      if (!product.platform_id) {
        toast.error('Vui lòng chọn platform!');
        return false;
      }
      if (!previewBanner) {
        toast.error('Vui lòng chọn ảnh banner!');
        return false;
      }
      return true;
    };

    return (
        <div>
            <Header 
            title="Products List"
            handleOpen={handleOpen}
            />
            <ProductTable
             handleDelete={handleDelete}
             handleEdit={handleEdit}
             />
            <ProductsModal
             open={open}
             handleClose={handleClose}
             handleSubmit={handleSubmit}
             handleUpdate={handleUpdate}
             setPreviewBanner={setPreviewBanner}
             previewBanner={previewBanner}
             previewListImg={previewListImg}
             setPreviewListImg={setPreviewListImg}
             loading={loading}
             />
        </div>
    );
}

export default Production;