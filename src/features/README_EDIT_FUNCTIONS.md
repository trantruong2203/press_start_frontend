# Hướng dẫn sử dụng các hàm Edit trong Redux

## Tổng quan

Các hàm edit đã được cải thiện với pattern nhất quán và xử lý lỗi tốt hơn. Tất cả các thunks đều sử dụng helper function `handleApiError` để xử lý lỗi một cách thống nhất.

## Cấu trúc đã cải thiện

### 1. Error Handler (`utils/errorHandler.ts`)
- Xử lý lỗi API một cách nhất quán
- Hỗ trợ các HTTP status codes phổ biến
- Trả về message lỗi bằng tiếng Việt

### 2. Thunks Pattern
Tất cả các thunks đều tuân theo pattern:
```typescript
export const updateEntityThunk = createAsyncThunk<ResponseType, { id: number, data: UpdateType }, { rejectValue: string }>(
  'entity/update',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await apiFunction(id, data);
      return response;
    } catch (err: unknown) {
      return rejectWithValue(handleApiError(err));
    }
  }
);
```

### 3. Slice Pattern
Tất cả các slices đều có:
- State `isEditing` để theo dõi trạng thái edit
- Actions `resetEntity`, `setEditingMode`, `clearError`
- Xử lý đầy đủ pending, fulfilled, rejected states
- Reset form sau khi thành công

## Cách sử dụng

### 1. Sử dụng Custom Hooks (Khuyến nghị)

```typescript
import { useEditProduct, useEditCategory, useEditPlatform } from '../hooks/useEdit';

// Trong component
const MyComponent = () => {
  const { 
    product, 
    status, 
    error, 
    isEditing, 
    startEdit, 
    cancelEdit, 
    updateProduct 
  } = useEditProduct();

  const handleEdit = (productData) => {
    startEdit(productData);
  };

  const handleSave = async () => {
    const result = await updateProduct(product.id, {
      name: product.name,
      description: product.description,
      // ... other fields
    });
    
    if (result.success) {
      // Handle success
    } else {
      // Handle error
      console.error(result.error);
    }
  };

  const handleCancel = () => {
    cancelEdit();
  };

  return (
    <div>
      {isEditing ? (
        <div>
          <input 
            value={product.name} 
            onChange={(e) => dispatch(handleChange({ name: e.target.value }))}
          />
          <button onClick={handleSave}>Lưu</button>
          <button onClick={handleCancel}>Hủy</button>
        </div>
      ) : (
        <button onClick={() => handleEdit(productData)}>Sửa</button>
      )}
      
      {error && <div className="error">{error}</div>}
      {status === 'loading' && <div>Đang tải...</div>}
    </div>
  );
};
```

### 2. Sử dụng trực tiếp với Redux

```typescript
import { useAppDispatch, useAppSelector } from '../store/store';
import { 
  setProduct, 
  resetProduct, 
  setEditingMode, 
  updateProductThunk 
} from '../features/production/ProductSlice';

const MyComponent = () => {
  const dispatch = useAppDispatch();
  const { product, isEditing, error, status } = useAppSelector(state => state.product);

  const handleStartEdit = (productData) => {
    dispatch(setProduct(productData));
    dispatch(setEditingMode(true));
  };

  const handleSave = async () => {
    try {
      await dispatch(updateProductThunk({ 
        id: product.id, 
        product: {
          name: product.name,
          description: product.description,
          // ... other fields
        }
      })).unwrap();
      // Success
    } catch (error) {
      // Error handling
      console.error(error);
    }
  };

  const handleCancel = () => {
    dispatch(resetProduct());
  };
};
```

## Các tính năng mới

### 1. Error Handling
- Tất cả lỗi được xử lý nhất quán
- Message lỗi bằng tiếng Việt
- Tự động clear error khi bắt đầu action mới

### 2. Loading States
- Theo dõi trạng thái loading cho từng action
- Hiển thị loading indicator khi cần

### 3. Form Management
- Tự động reset form sau khi thành công
- Theo dõi trạng thái editing
- Hỗ trợ cancel edit

### 4. Type Safety
- TypeScript support đầy đủ
- Interface rõ ràng cho request/response

## Best Practices

1. **Sử dụng Custom Hooks**: Để code sạch và tái sử dụng
2. **Error Handling**: Luôn xử lý lỗi và hiển thị cho user
3. **Loading States**: Hiển thị loading khi cần thiết
4. **Form Reset**: Tự động reset form sau khi thành công
5. **Type Safety**: Sử dụng TypeScript interfaces

## Migration từ code cũ

Nếu bạn đang sử dụng code cũ, chỉ cần:

1. Import custom hooks mới
2. Thay thế logic edit cũ bằng hooks mới
3. Cập nhật UI để sử dụng `isEditing` state
4. Thêm error handling và loading states

## Ví dụ Migration

**Trước:**
```typescript
const handleEdit = (product) => {
  dispatch(setProduct(product));
  // Không có error handling
  // Không có loading state
};
```

**Sau:**
```typescript
const { startEdit, updateProduct, error, status, isEditing } = useEditProduct();

const handleEdit = (product) => {
  startEdit(product); // Tự động clear error và set editing mode
};

const handleSave = async () => {
  const result = await updateProduct(product.id, updateData);
  if (!result.success) {
    // Handle error
  }
};
``` 