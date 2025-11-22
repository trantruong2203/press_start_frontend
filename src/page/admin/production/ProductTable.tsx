import React, { useEffect, useMemo, useState } from 'react';
import {
    Box,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
} from '@mui/material';
import type { RootState, AppDispatch } from '../../../store/store';
import { getAllProductsThunk } from '../../../features/production/ProductThucks';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { getObjectByPlatformId } from '../../../services/FunctionRepone';
import { Chip, Tooltip, IconButton } from '@mui/material';
import type { ProductResponse } from '../../../interface/ProductResponse';

const ProductTable: React.FC<{ handleDelete: (id: number) => void, handleEdit: (item: ProductResponse) => void }> = ({ handleDelete, handleEdit }) => {
    const dispatch = useDispatch<AppDispatch>();
    const items = useSelector((state: RootState) => state.product.products);
    const status = useSelector((state: RootState) => state.product.status);
    const platforms = useSelector((state: RootState) => state.platform.items);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    useEffect(() => {
        if (status === 'idle') {
            void dispatch(getAllProductsThunk());
        }
    }, [dispatch, status]);

    const paginatedItems = useMemo(() => {
        const listProduct = items.filter((product) => {
            return product.status === true;
        });
        const start = page * rowsPerPage;
        const end = start + rowsPerPage;
        return listProduct.slice(start, end);
    }, [items, page, rowsPerPage]);


    const handleChangePage = (_: unknown, newPage: number) => {
        setPage(newPage);
    };

    const convertDescription = (description: string) => {
        return description.length > 100 ? description.slice(0, 100) + '...' : description;
    }

    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <Box> 
                <Paper>
                    <TableContainer sx={{ maxHeight: 560 }}>
                        <Table stickyHeader size="small">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="center">ID</TableCell>
                                    <TableCell align="center">Name</TableCell>
                                    <TableCell align="center">Description</TableCell>
                                    <TableCell align="center">Banner</TableCell>
                                    <TableCell align="center">Author</TableCell>
                                    <TableCell align="center">Platform</TableCell>
                                    <TableCell align="center">Category</TableCell>
                                    <TableCell align="center">Status</TableCell>
                                    <TableCell align="center">Action</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {paginatedItems.map((p) => (
                                    <TableRow key={p.id} hover>
                                        <TableCell align="center" sx={{ whiteSpace: 'nowrap' }}>{p.id}</TableCell>
                                        <TableCell align="center" sx={{ whiteSpace: 'nowrap' }}>{p.name}</TableCell>
                                        <TableCell align="center">{convertDescription(p.description)}</TableCell>
                                        <TableCell align="center">
                                            <img src={p.banner_url} alt={p.name} style={{ width: 100, height: 100, objectFit: 'cover' }} />
                                        </TableCell>
                                       
                                        <TableCell align="center">{p.author}</TableCell>
                                        <TableCell align="center">{getObjectByPlatformId(platforms, Number(p.platform_id))?.name}</TableCell>
                                        <TableCell align="center">{p.listCate?.map((cate) => cate.name).join(', ')}</TableCell>
                                        <TableCell align="center">
                                            <Chip
                                                label={p.status ? 'Active' : 'Inactive'}
                                                color={p.status ? 'success' : 'default'}
                                                size="small"
                                                variant={p.status ? 'filled' : 'outlined'}
                                            />
                                        </TableCell>
                                        <TableCell align="center">
                                            <Tooltip title="Chỉnh sửa">
                                                <IconButton color="primary" sx={{ mr: 0.5 }} onClick={() => handleEdit(p)}>
                                                    <FaEdit />
                                                </IconButton>
                                            </Tooltip>
                                            <Tooltip title="Xóa">
                                                <IconButton color="error" sx={{ ml: 0.5 }} onClick={() => handleDelete(p.id)}>
                                                    <FaTrash />
                                                </IconButton>
                                            </Tooltip>
                                        </TableCell>
                                    </TableRow>
                                ))}
                               
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        component="div"
                        count={items.filter((product) => {
                            return product.status === true;
                        }).length}
                        page={page}
                        onPageChange={handleChangePage}
                        rowsPerPage={rowsPerPage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                        rowsPerPageOptions={[5, 10, 25, 50]}
                        labelRowsPerPage="Rows per page"
                    />
                </Paper>
            
        </Box>
    );
};

export default ProductTable;