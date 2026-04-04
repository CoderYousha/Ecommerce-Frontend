export function buildAddProductFormData ({
    categoryId,
    nameEn,
    nameAr,
    descriptionEn,
    descriptionAr,
    price,
    amount,
    images
}){
    const formData = new FormData();

    formData.append('category_id', categoryId);
    formData.append('name_en', nameEn);
    formData.append('name_ar', nameAr);
    formData.append('description_en', descriptionEn);
    formData.append('description_ar', descriptionAr);
    formData.append('price', price);
    formData.append('amount', amount);


    // console.log(images[0]);
    
    Array.from(images).forEach((image) => {
        formData.append('images[]', image);
    });

    return formData;
}