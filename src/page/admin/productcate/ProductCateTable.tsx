import React, { useEffect, useMemo, useState } from 'react';
import {
    Box,
    Button,
    CircularProgress,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    Typography
} from '@mui/material';
import type { RootState, AppDispatch } from '../../../store/store';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { getProductCateThunk } from '../../../features/productcate/ProductCateThunks';

const ProductCateTable: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();

    const items = useSelector((state: RootState) => state.productCate.productCates);
    const status = useSelector((state: RootState) => state.productCate.status);

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    useEffect(() => {
        if (status === 'idle') {
            void dispatch(getProductCateThunk());
        }
    }, [dispatch, status]);

    const paginatedItems = useMemo(() => {
        const start = page * rowsPerPage;
        const end = start + rowsPerPage;
        return items.slice(start, end);
    }, [items, page, rowsPerPage]);

    const handleChangePage = (_: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <Box>
            <Typography variant="h6" sx={{ mb: 2 }}>Danh sách sản phẩm và danh mục</Typography>

            {status === 'loading' ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', py: 6 }}>
                    <CircularProgress />
                </Box>
            ) : (
                <Paper>
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell align="center">ID</TableCell>
                                    <TableCell align="center">Product Id</TableCell>
                                    <TableCell align="center">Category Id</TableCell>
                                    <TableCell align="center">Action</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {paginatedItems.map((productCate) => (
                                    <TableRow key={productCate.id} hover>
                                        <TableCell align="center">{productCate.id}</TableCell>
                                        <TableCell align="center">{productCate.productId}</TableCell>
                                        <TableCell align="center">{productCate.categoryId}</TableCell>
                                        <TableCell align="center">
                                            <Button variant="contained" color="primary" sx={{ mr: 1 }}>
                                                <FaEdit />
                                            </Button>
                                            <Button variant="contained" color="error" sx={{ mr: 1 }}>
                                                <FaTrash />
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                                {paginatedItems.length === 0 && (
                                    <TableRow>
                                        <TableCell colSpan={6} align="center">
                                            Không có dữ liệu
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        component="div"
                        count={items.length}
                        page={page}
                        onPageChange={handleChangePage}
                        rowsPerPage={rowsPerPage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                        rowsPerPageOptions={[5, 10, 25, 50]}
                        labelRowsPerPage="Số dòng mỗi trang"
                    />
                </Paper>
            )}
        </Box>
    );
};

export default ProductCateTable;