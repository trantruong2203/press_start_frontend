import { useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Button, TextField } from '@mui/material';
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../../../store/store';
import { handleChange } from '../../../features/categories/CategoriesSlice';
import type { CategoriesCreate } from '../../../interface/CategoriesResponse';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function CategoriesModal({ open, handleClose, category, setCategory, handleSubmit }: { open: boolean, handleClose: () => void, category: CategoriesCreate, setCategory: (category: CategoriesCreate) => void, handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void }) {
 const dispatch = useDispatch<AppDispatch>();

 useEffect(() => {
   if (open && category) {
     dispatch(handleChange(category));
   }
 }, [open, category, dispatch]);

 const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
   const { name, value } = e.target;
   const nextCategory = { ...category, [name]: value } as typeof category;
   dispatch(handleChange(nextCategory));
   setCategory({ ...category, ...nextCategory });
 };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Categories
          </Typography>
          <form onSubmit={handleSubmit} className='flex flex-col gap-4 mt-4'>
            <TextField label="Name" name="name" value={category?.name ?? ''} onChange={onInputChange} />
            <TextField label="Description" name="description" value={category?.description ?? ''} onChange={onInputChange} />
    
            <Button type="submit" variant="contained" color="primary">Submit</Button>
            <Button type="button" variant="contained" color="secondary" onClick={handleClose}>Cancel</Button>
          </form>
        </Box>
      </Modal>
    </div>
  );
}
