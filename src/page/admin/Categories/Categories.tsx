import React, { useState } from "react";
import Header from "../../../component/admin/Header";
import CategoriesTable from "./CategoriesTable";
import type { CategoriesCreate } from "../../../interface/CategoriesResponse";
import CategoriesModal from "./CategoriesModal";
import { createCategoryThunk } from "../../../features/categories/CategoriesThunks";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../../store/store";

const inner = {
  name: "",
  description: "",
} as CategoriesCreate;

function Categories() {
  const [open, setOpen] = useState(false);
  const [category, setCategory] = useState<CategoriesCreate>(inner);
  const [page, setPage] = useState(0);
  const items = useSelector((state: RootState) => state.categories.items);
  const status = useSelector((state: RootState) => state.categories.status);
  const dispatch = useDispatch<AppDispatch>();
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setCategory(inner);
    setOpen(false);
  };

  const handleSubmit = (values: CategoriesCreate) => {
    dispatch(createCategoryThunk(values));
    setCategory(inner);
    handleClose();
  };

  return (
    <div>
      <Header title="Categories" handleOpen={handleOpen} />
      <CategoriesTable
        items={items}
        status={status}
        page={page}
        setPage={setPage}
      />
      <CategoriesModal
        open={open}
        handleClose={handleClose}
        category={category}
        setCategory={setCategory}
        handleSubmit={handleSubmit}
      />
    </div>
  );
}

export default Categories;
