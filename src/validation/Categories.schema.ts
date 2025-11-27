import * as Yup from "yup";

export const categoriesSchema = Yup.object({
  name: Yup.string().required("Tên danh mục không được bỏ trống"),
  description: Yup.string().required("Mô tả không được bỏ trống"),
});
