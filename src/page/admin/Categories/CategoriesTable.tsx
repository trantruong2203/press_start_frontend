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
} from '@mui/material';
import type { AppDispatch } from '../../../store/store';
import { getCategoriesThunk } from '../../../features/categories/CategoriesThunks';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import type { CategoriesResponse } from '../../../interface/CategoriesResponse';

const CategoriesTable: React.FC<{ items: CategoriesResponse[], status: string, page: number, setPage: (page: number) => void }> = ({ items, status, page, setPage }) => {
    const dispatch = useDispatch<AppDispatch>();
    const [rowsPerPage, setRowsPerPage] = useState(10);

    useEffect(() => {
        if (status === 'idle') {
            void dispatch(getCategoriesThunk());
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
                                    <TableCell align="center">Name</TableCell>
                                    <TableCell align="center">Description</TableCell>
                                    <TableCell align="center">Status</TableCell>
                                    <TableCell align="center">Action</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {paginatedItems.map((category) => (
                                    <TableRow key={category.id} hover>
                                        <TableCell align="center">{category.id}</TableCell>
                                        <TableCell align="center">{category.name}</TableCell>
                                        <TableCell align="center">{category.description}</TableCell>
                                        <TableCell align="center">{category.status ? 'Hoạt động' : 'Không hoạt động'}</TableCell>
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

export default CategoriesTable;