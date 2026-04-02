export function buildAddCategoryFormData({
    nameEn,
    nameAr,
    status
}) {
    const formData = new FormData();

    formData.append('name_en', nameEn);
    formData.append('name_ar', nameAr);
    formData.append('status',status);

    return formData;
}