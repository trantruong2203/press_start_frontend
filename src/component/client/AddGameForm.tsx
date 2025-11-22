import { Button, MenuItem, Select, TextField, styled } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "../../store/store";
import { handleChange, resetProduct } from "../../features/production/ProductSlice";
import type {
  CreateProductRequest,
  ProductResponse,
} from "../../interface/ProductResponse";
import { useState, useEffect, type ChangeEvent } from "react";
import { uploadImageToCloudinary, deleteImageFromCloudinary } from "../../config/CloundinaryConfig";
import { toast } from "react-hot-toast";
import { FaTrash } from "react-icons/fa";
import { createProductThunk } from "../../features/production/ProductThucks";

interface AddGameFormProps {
  selectedProduct?: ProductResponse;
  isAddNewGame: boolean;
}

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

function AddGameForm({ selectedProduct, isAddNewGame }: AddGameFormProps) {
  const { items: platforms } = useSelector(
    (state: RootState) => state.platform
  );
  const productData = useSelector((state: RootState) => state.product.product);
  const dispatch = useDispatch<AppDispatch>();
  const [previewBanner, setPreviewBanner] = useState<string>("");
  const [previewListImg, setPreviewListImg] = useState<string[]>([]);
  const [isUploadingBanner, setIsUploadingBanner] = useState<boolean>(false);

  useEffect(() => {
    if (selectedProduct && !isUploadingBanner && !isAddNewGame) {
      // Set preview images cho chế độ chỉnh sửa
      setPreviewBanner(selectedProduct.banner_url || "");
      setPreviewListImg(selectedProduct.listImg || []);
    } else if (isAddNewGame && !isUploadingBanner) {
      setPreviewBanner("");
      setPreviewListImg([]);
    }
  }, [selectedProduct, isUploadingBanner, isAddNewGame, platforms, dispatch]);

  // Cập nhật Redux state khi selectedProduct thay đổi (chỉ một lần)
  // useEffect(() => {
  //   if (selectedProduct && !isUploadingBanner && selectedProduct.id && !isAddNewGame) {
  //     // Chỉ cập nhật Redux state một lần khi selectedProduct được chọn và không phải chế độ tạo mới
  //     dispatch(handleChange({
  //       ...selectedProduct,
  //     } as unknown as CreateProductRequest));
  //   }
  // }, [selectedProduct, isUploadingBanner, dispatch, isAddNewGame]);

  const onInputChange = (name: string, value: string | number) => {
    dispatch(
      handleChange({
        ...productData,
        [name]: value,
      } as unknown as CreateProductRequest)
    );
  };

  const handleFileChangeBanner = async (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        setIsUploadingBanner(true);
        
        // Tạo preview ngay lập tức
        const previewUrl = URL.createObjectURL(file);
        setPreviewBanner(previewUrl);

        // Xóa ảnh cũ trên Cloudinary nếu có
        if (selectedProduct?.banner_url && selectedProduct.banner_url.startsWith('http')) {
          try {
            // Lấy public_id từ URL Cloudinary
            const urlParts = selectedProduct.banner_url.split('/');
            const publicId = urlParts[urlParts.length - 1].split('.')[0];
            await deleteImageFromCloudinary(publicId);
            console.log('Đã xóa ảnh cũ:', publicId);
          } catch (deleteError) {
            console.warn('Không thể xóa ảnh cũ:', deleteError);
            // Không dừng quá trình upload nếu không xóa được ảnh cũ
          }
        }

        // Upload ảnh mới lên Cloudinary
        const newImageUrl = await uploadImageToCloudinary(file, "banner");

        // Cập nhật state với URL mới
        dispatch(handleChange({
          ...productData,
          banner_url: newImageUrl,
        } as unknown as CreateProductRequest));

        toast.success("Banner đã được tải lên thành công!");
      } catch (error) {
        toast.error("Lỗi khi tải lên banner");
        console.error(error);
        setPreviewBanner("");
        dispatch(handleChange({
          ...productData,
          banner_url: "",
        } as unknown as CreateProductRequest));
      } finally {
        setIsUploadingBanner(false);
      }
    }
  };

  const handleFileChangeListImg = async (e: ChangeEvent<HTMLInputElement>) => {
    const { files } = (e.target as HTMLInputElement);
    const validFiles = Array.from(files || []).filter((file: File) =>
      file.type.startsWith("image/")
    );

    if (validFiles.length === 0) {
      toast.error("Không có file ảnh hợp lệ");
      return;
    }

    try {
      const previewUrls = validFiles.map((file) => URL.createObjectURL(file));
      setPreviewListImg(previewUrls);

      const uploadPromises = validFiles.map((file) =>
        uploadImageToCloudinary(file, "products/images")
      );

      const imageUrls = await Promise.all(uploadPromises);
      dispatch(
        handleChange({
          ...productData,
          listImg: imageUrls,
        } as unknown as CreateProductRequest)
      );
      toast.success(`${imageUrls.length} ảnh đã được tải lên thành công!`);
    } catch (error) {
      toast.error("Lỗi khi tải lên ảnh");
      console.error(error);
    }
  };

  const handleDeleteImage = (image: string) => {
    dispatch(handleChange({
      ...productData,
      listImg: productData.listImg?.filter((img) => img !== image),
    } as unknown as CreateProductRequest));
  };

  const handleSubmit = async () => {
    try {
      // Validation cơ bản
      if (!productData.name.trim()) {
        toast.error("Vui lòng nhập tên game");
        return;
      }
      
      if (!productData.description.trim()) {
        toast.error("Vui lòng nhập mô tả game");
        return;
      }
      
      if (!productData.banner_url) {
        toast.error("Vui lòng tải lên banner game");
        return;
      }
      
      if (productData.platform_id === 0) {
        toast.error("Vui lòng chọn platform");
        return;
      }

      // Gửi dữ liệu từ Redux state
      await dispatch(createProductThunk(productData)).unwrap();
      toast.success("Tạo game thành công!");
      
      // Reset form sau khi tạo thành công
      dispatch(resetProduct());
      setPreviewBanner("");
      setPreviewListImg([]);
      
    } catch (error) {
      console.error("Lỗi khi tạo game:", error);
      toast.error("Có lỗi xảy ra khi tạo game");
    }
  };

  return (
    <div className="bg-black/40 backdrop-blur-lg rounded-2xl p-8 border border-cyan-500/30 shadow-2xl shadow-cyan-500/20">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent mb-2">
          {!isAddNewGame ? "👁️ Xem Thông tin Game" : "✨ Thêm Game Mới"}
        </h2>
        <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-purple-400 mx-auto rounded-full"></div>
      </div>

      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-cyan-400 font-semibold text-lg">
              🎮 Tên Game
            </label>
            <TextField
              name="name"
              value={productData.name}
              onChange={(e) => onInputChange("name", e.target.value)}
              disabled={!isAddNewGame}
              fullWidth
              sx={{
                "& .MuiOutlinedInput-root": {
                  backgroundColor: !isAddNewGame
                    ? "rgba(0, 0, 0, 0.5)"
                    : "rgba(0, 0, 0, 0.3)",
                  borderRadius: "12px",
                  "& fieldset": {
                    borderColor: !isAddNewGame ? "#374151" : "#06b6d4",
                    borderWidth: "2px",
                  },
                  "&:hover fieldset": {
                    borderColor: !isAddNewGame ? "#374151" : "#06b6d4",
                    boxShadow: !isAddNewGame
                      ? "none"
                      : "0 0 20px rgba(6, 182, 212, 0.3)",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: !isAddNewGame ? "#374151" : "#06b6d4",
                    boxShadow: !isAddNewGame
                      ? "none"
                      : "0 0 20px rgba(6, 182, 212, 0.5)",
                  },
                },
                "& .MuiInputBase-input": {
                  color: !isAddNewGame ? "#9ca3af" : "#ffffff",
                  fontSize: "1.1rem",
                  fontWeight: "600",
                },
                "& .MuiInputBase-input.Mui-disabled": {
                  color: "#9ca3af !important",
                  WebkitTextFillColor: "#9ca3af !important",
                },
              }}
            />
          </div>

          <div className="space-y-2">
            <label className="text-purple-400 font-semibold text-lg">
              🎬 Trailer URL
            </label>
            <TextField
              name="trailer_url"
              value={productData.trailer_url}
              onChange={(e) => onInputChange("trailer_url", e.target.value)}
              disabled={!isAddNewGame}
              fullWidth
              sx={{
                "& .MuiOutlinedInput-root": {
                  backgroundColor: !isAddNewGame
                    ? "rgba(0, 0, 0, 0.5)"
                    : "rgba(0, 0, 0, 0.3)",
                  borderRadius: "12px",
                  "& fieldset": {
                    borderColor: !isAddNewGame ? "#374151" : "#8b5cf6",
                    borderWidth: "2px",
                  },
                  "&:hover fieldset": {
                    borderColor: !isAddNewGame ? "#374151" : "#8b5cf6",
                    boxShadow: !isAddNewGame
                      ? "none"
                      : "0 0 20px rgba(139, 92, 246, 0.3)",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: !isAddNewGame ? "#374151" : "#8b5cf6",
                    boxShadow: !isAddNewGame
                      ? "none"
                      : "0 0 20px rgba(139, 92, 246, 0.5)",
                  },
                },
                "& .MuiInputBase-input": {
                  color: !isAddNewGame ? "#9ca3af" : "#ffffff",
                  fontSize: "1.1rem",
                  fontWeight: "600",
                },
                "& .MuiInputBase-input.Mui-disabled": {
                  color: "#9ca3af !important",
                  WebkitTextFillColor: "#9ca3af !important",
                },
              }}
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-pink-400 font-semibold text-lg">
            🎯 Platform
          </label>
          <Select
            name="platform"
            value={productData.platform_id}
            onChange={(e) => onInputChange("platform_id", e.target.value)}
            disabled={!isAddNewGame}
            fullWidth
            sx={{
              backgroundColor: !isAddNewGame
                ? "rgba(0, 0, 0, 0.5)"
                : "rgba(0, 0, 0, 0.3)",
              borderRadius: "12px",
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: !isAddNewGame ? "#374151" : "#ec4899",
                borderWidth: "2px",
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: !isAddNewGame ? "#374151" : "#ec4899",
                boxShadow: !isAddNewGame
                  ? "none"
                  : "0 0 20px rgba(236, 72, 153, 0.3)",
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: !isAddNewGame ? "#374151" : "#ec4899",
                boxShadow: !isAddNewGame
                  ? "none"
                  : "0 0 20px rgba(236, 72, 153, 0.5)",
              },
              "& .MuiSelect-select": {
                color: !isAddNewGame ? "#9ca3af" : "#ffffff",
                fontSize: "1.1rem",
                fontWeight: "600",
              },
              "& .MuiSelect-select.Mui-disabled": {
                color: "#9ca3af !important",
                WebkitTextFillColor: "#9ca3af !important",
              },
            }}
          >
            {platforms.map((platform) => (
              <MenuItem key={platform.id} value={platform.id}>
                {platform.name}
              </MenuItem>
            ))}
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-green-400 font-semibold text-lg">
          📝 Mô tả Game
        </label>
        <TextField
          name="description"
          value={productData.description}
          onChange={(e) => onInputChange("description", e.target.value)}
          disabled={!isAddNewGame}
          multiline
          rows={4}
          fullWidth
          sx={{
            "& .MuiOutlinedInput-root": {
              backgroundColor: !isAddNewGame
                ? "rgba(0, 0, 0, 0.5)"
                : "rgba(0, 0, 0, 0.3)",
              borderRadius: "12px",
              "& fieldset": {
                borderColor: !isAddNewGame ? "#374151" : "#10b981",
                borderWidth: "2px",
              },
              "&:hover fieldset": {
                borderColor: !isAddNewGame ? "#374151" : "#10b981",
                boxShadow: !isAddNewGame
                  ? "none"
                  : "0 0 20px rgba(16, 185, 129, 0.3)",
              },
              "&.Mui-focused fieldset": {
                borderColor: !isAddNewGame ? "#374151" : "#10b981",
                boxShadow: !isAddNewGame
                  ? "none"
                  : "0 0 20px rgba(16, 185, 129, 0.5)",
              },
            },
            "& .MuiInputBase-input": {
              color: !isAddNewGame ? "#9ca3af" : "#ffffff",
              fontSize: "1rem",
              lineHeight: "1.5",
            },
            "& .MuiInputBase-input.Mui-disabled": {
              color: "#9ca3af !important",
              WebkitTextFillColor: "#9ca3af !important",
            },
          }}
        />
      </div>

      {/* Phần hiển thị và upload ảnh */}
      <div className="mt-8">
        <div className="text-center mb-6">
          <h3 className="text-2xl font-bold text-white mb-2">
            {!isAddNewGame ? "🖼️ Hình ảnh Game" : "📸 Upload Hình ảnh"}
          </h3>
          <div className="w-16 h-1 bg-gradient-to-r from-yellow-400 to-orange-400 mx-auto rounded-full"></div>
        </div>

        {/* Banner Section */}
        <div className="mb-8">
          <div className="text-center mb-4">
            <h4 className="text-cyan-400 font-bold text-xl mb-2">
              🎨 Banner Game
            </h4>
            <p className="text-gray-400 text-sm">Ảnh banner chính của game</p>
          </div>

          {!isAddNewGame ? (
            <div className="space-y-4">
              {previewBanner && (
                <div className="flex justify-center">
                  <img
                    src={previewBanner}
                    alt="Current Banner"
                    className="w-full max-w-md h-48 object-cover rounded-xl border-2 border-cyan-500/50 shadow-lg shadow-cyan-500/20"
                  />
                </div>
              )}
            </div>
          ) : (
            // Chế độ tạo mới: Nút upload + preview
            <div className="flex flex-col items-center space-y-4">
              <Button
                component="label"
                role={undefined}
                variant="contained"
                tabIndex={-1}
              >
                📸 Tải ảnh banner
                <VisuallyHiddenInput
                  type="file"
                  accept="image/*"
                  onChange={handleFileChangeBanner}
                />
              </Button>
              {previewBanner && (
                <div className="flex justify-center">
                  <img
                    src={previewBanner}
                    alt="Banner Preview"
                    className="w-32 h-20 object-cover rounded-xl border-2 border-cyan-500/50 shadow-lg shadow-cyan-500/20"
                  />
                </div>
              )}
            </div>
          )}
        </div>

        {/* List Images Section */}
        <div className="mb-8">
          <div className="text-center mb-4">
            <h4 className="text-purple-400 font-bold text-xl mb-2">
              🖼️ Danh sách ảnh Game
            </h4>
            <p className="text-gray-400 text-sm">
              Các ảnh minh họa chi tiết về game
            </p>
          </div>

          {!isAddNewGame ? (
            <div className="space-y-4">
              {previewListImg.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {previewListImg.map((image, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={image}
                        alt={`Game Image ${index + 1}`}
                        className="w-full h-24 object-cover rounded-xl border-2 border-purple-500/50 shadow-lg shadow-purple-500/20 group-hover:border-purple-400 transition-all duration-300"
                      />
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl flex items-center justify-center">
                        <span className="text-white text-sm font-semibold">
                          Ảnh {index + 1}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            // Chế độ tạo mới: Nút upload + preview
            <div className="space-y-4">
              <div className="flex justify-center">
              <Button
                component="label"
                role={undefined}
                variant="contained"
                tabIndex={-1}
              >
                  📸 Tải lên danh sách ảnh
                  <VisuallyHiddenInput
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleFileChangeListImg}
                  />
                </Button>
              </div>
              {previewListImg.length > 0 && (
                <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
                  {previewListImg.map((image, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={image}
                        alt={`Preview ${index + 1}`}
                        className="w-full h-16 object-cover rounded-lg border-2 border-purple-500/50 shadow-lg shadow-purple-500/20 group-hover:border-purple-400 transition-all duration-300"
                      />
                      <button
                        onClick={() => handleDeleteImage(image)}
                        className="absolute top-2 right-2 z-10 text-red-500 hover:text-red-600"
                      >
                        <FaTrash />
                      </button>
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg flex items-center justify-center">
                        <span className="text-white text-xs font-semibold">
                          {index + 1}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="mt-8">
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          ✨ Thêm Game
        </Button>
      </div>
    </div>
  );
}

export default AddGameForm;
