import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../store/store';
import { 
  setProduct, 
  resetProduct, 
  setEditingMode, 
  clearError,
  updateProductThunk 
} from '../features/production/ProductSlice';
import { 
  setCategory, 
  resetCategory, 
  updateCategoryThunk 
} from '../features/categories/CategoriesSlice';
import { 
  setPlatforms, 
  resetPlatform, 
  updatePlatformThunk 
} from '../features/platform/PlatformSlice';
import type { ProductResponse, UpdateProductRequest } from '../interface/ProductResponse';
import type { CategoriesCreate } from '../interface/CategoriesResponse';
import type { PlatformResponse } from '../interface/PlatformResponse';

// Hook cho Product
export const useEditProduct = () => {
  const dispatch = useAppDispatch();
  const { product, status, error, isEditing } = useAppSelector((state) => state.product);

  const startEdit = useCallback((productData: ProductResponse) => {
    dispatch(setProduct(productData));
    dispatch(setEditingMode(true));
    dispatch(clearError());
  }, [dispatch]);

  const cancelEdit = useCallback(() => {
    dispatch(resetProduct());
  }, [dispatch]);

  const updateProduct = useCallback(async (id: number, updateData: UpdateProductRequest) => {
    try {
      await dispatch(updateProductThunk({ id, product: updateData })).unwrap();
      return { success: true };
    } catch (error) {
      return { success: false, error: error as string };
    }
  }, [dispatch]);

  return {
    product,
    status,
    error,
    isEditing,
    startEdit,
    cancelEdit,
    updateProduct,
  };
};

// Hook cho Category
export const useEditCategory = () => {
  const dispatch = useAppDispatch();
  const { category, status, error, isEditing } = useAppSelector((state) => state.category);

  const startEdit = useCallback((categoryData: CategoriesCreate & { id?: number }) => {
    dispatch(setCategory(categoryData));
    dispatch(setEditingMode(true));
    dispatch(clearError());
  }, [dispatch]);

  const cancelEdit = useCallback(() => {
    dispatch(resetCategory());
  }, [dispatch]);

  const updateCategory = useCallback(async (id: number, updateData: CategoriesCreate) => {
    try {
      await dispatch(updateCategoryThunk({ id, category: updateData })).unwrap();
      return { success: true };
    } catch (error) {
      return { success: false, error: error as string };
    }
  }, [dispatch]);

  return {
    category,
    status,
    error,
    isEditing,
    startEdit,
    cancelEdit,
    updateCategory,
  };
};

// Hook cho Platform
export const useEditPlatform = () => {
  const dispatch = useAppDispatch();
  const { platform, status, error, isEditing } = useAppSelector((state) => state.platform);

  const startEdit = useCallback((platformData: PlatformResponse) => {
    dispatch(setPlatforms(platformData));
    dispatch(setEditingMode(true));
    dispatch(clearError());
  }, [dispatch]);

  const cancelEdit = useCallback(() => {
    dispatch(resetPlatform());
  }, [dispatch]);

  const updatePlatform = useCallback(async (id: number, updateData: PlatformResponse) => {
    try {
      await dispatch(updatePlatformThunk({ id, platform: updateData })).unwrap();
      return { success: true };
    } catch (error) {
      return { success: false, error: error as string };
    }
  }, [dispatch]);

  return {
    platform,
    status,
    error,
    isEditing,
    startEdit,
    cancelEdit,
    updatePlatform,
  };
}; 