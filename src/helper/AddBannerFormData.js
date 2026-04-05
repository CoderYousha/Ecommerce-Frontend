export function buildAddBannerFormData({
    categoryId,
    productId,
    nameEn,
    nameAr,
    startDate,
    endDate,
    status,
    images
}) {
    const formData = new FormData();

    formData.append('category_id', categoryId);
    formData.append('product_id', productId);
    formData.append('name_en', nameEn);
    formData.append('name_ar', nameAr);
    formData.append('start_date', startDate);
    formData.append('end_date', endDate);
    formData.append('status', status);

    Array.from(images).forEach((image) => {
        formData.append('images[]', image);
    });

    return formData;
}