import { useContext, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import type { AppDispatch } from './src/store/store';
import { ContextAuth } from './src/contexts/AuthContext';
import { getUsers } from './src/features/users/UsersThunks';
import { getPlatformsThunk } from './src/features/platform/PlatformThunks';
import { getCategoriesThunk } from './src/features/categories/CategoriesThunks';
import { getProductCateThunk } from './src/features/productcate/ProductCateThunks';
import { getAllProductsThunk } from './src/features/production/ProductThucks';



function Fetcher() {
    const dispatch = useDispatch<AppDispatch>();
    const { accountLogin } = useContext(ContextAuth);
    useEffect(() => {
        Promise.all([
            dispatch(getUsers()),
            dispatch(getPlatformsThunk()),
            dispatch(getCategoriesThunk()),
            dispatch(getProductCateThunk()),
            dispatch(getAllProductsThunk()),
        ]);
        
    }, [dispatch, accountLogin?.email]);
    return null;
}

export default Fetcher;