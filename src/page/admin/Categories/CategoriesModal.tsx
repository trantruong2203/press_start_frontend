import { useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Button, TextField } from '@mui/material';
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../../../store/store';
import { handleChange } from '../../../features/categories/CategoriesSlice';
import type { CategoriesCreate } from '../../../interface/CategoriesResponse';
import { categoriesSchema } from '../../../validation/Categories.schema';
import { useFormik } from 'formik';

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

export default function CategoriesModal({ open, handleClose, category, setCategory, handleSubmit }: { open: boolean, handleClose: () => void, category: CategoriesCreate, setCategory: (category: CategoriesCreate) => void, handleSubmit: (values: CategoriesCreate) => void }) {
 const dispatch = useDispatch<AppDispatch>();

 const formik = useFormik({
  initialValues: {
    name: '',
    description: '',
  },
  validationSchema: categoriesSchema,
  onSubmit: (values) => {
    handleSubmit(values);
  },
 });

 useEffect(() => {
   if (open && category) {
     formik.setValues(category);
     dispatch(handleChange(category));
   } else if (open) {
     formik.resetForm();
   }
 }, [open, category, dispatch, formik]);

 const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
   formik.handleChange(e);
   const { name, value } = e.target;
   const nextCategory = { ...formik.values, [name]: value } as CategoriesCreate;
   dispatch(handleChange(nextCategory));
   setCategory(nextCategory);
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
          <form onSubmit={formik.handleSubmit} className='flex flex-col gap-4 mt-4'>
            <TextField 
              label="Name" 
              name="name" 
              value={formik.values.name} 
              onChange={onInputChange}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
            />
            <TextField 
              label="Description" 
              name="description" 
              value={formik.values.description} 
              onChange={onInputChange}
              error={formik.touched.description && Boolean(formik.errors.description)}
              helperText={formik.touched.description && formik.errors.description}
            />
    
            <Button type="submit" variant="contained" color="primary">Submit</Button>
            <Button type="button" variant="contained" color="secondary" onClick={handleClose}>Cancel</Button>
          </form>
        </Box>
      </Modal>
    </div>
  );
}
