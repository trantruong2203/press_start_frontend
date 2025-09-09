import { Button, Input, Typography, Box } from '@mui/material';
import { FaPlus } from 'react-icons/fa';

function Header({ title, handleOpen }: { title: string, handleOpen: () => void }) {
    return (
        <Box className='flex justify-between gap-4 items-center p-4'>
            <Typography variant="h6" sx={{ mb: 2 }}>{title}</Typography>
            <Input placeholder='Search' sx={{ width: '200px' }} />
            <Button variant='contained' color='primary' onClick={handleOpen}>
                <FaPlus />
                Add
            </Button>
        </Box>
    );
}

export default Header;