import React, { useEffect, useMemo, useState } from 'react';
import {
    Avatar,
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
import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../../../store/store';
import { getUsers } from '../../../features/users/UsersThunks';
import { FaEdit, FaTrash } from 'react-icons/fa';

const UsersTable: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();

    const items = useSelector((state: RootState) => state.users.users);
    const status = useSelector((state: RootState) => state.users.status);

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    useEffect(() => {
        if (status === 'idle') {
            void dispatch(getUsers());
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
            <Typography variant="h6" sx={{ mb: 2 }}>Danh sách người dùng</Typography>

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
                                    <TableCell align="center">Avatar</TableCell>
                                    <TableCell align="center">Username</TableCell>
                                    <TableCell align="center">Email</TableCell>
                                    <TableCell align="center">Phone</TableCell>
                                    <TableCell align="center">Role</TableCell>
                                    <TableCell align="center">Action</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {paginatedItems.map((user) => (
                                    <TableRow key={user.email} hover>
                                        <TableCell align="center">
                                            <Avatar src={user.avatar} alt={user.username} />
                                        </TableCell>
                                        <TableCell align="center" sx={{ fontWeight: 'bold' }}>{user.username}</TableCell>
                                        <TableCell align="center">{user.email}</TableCell>
                                        <TableCell align="center">{user.phone}</TableCell>
                                        <TableCell align="center">{user.role}</TableCell>
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

export default UsersTable;