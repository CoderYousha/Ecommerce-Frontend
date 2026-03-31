export function buildUpdateProfileFormData({
    fullName,
    email,
    phone,
    whatsappPhone,
    image,
    language
}) {
    const formData = new FormData();

    formData.append('full_name', fullName);
    formData.append('email', email);
    formData.append('phone', phone);
    formData.append('whatsapp_phone', whatsappPhone); 
    
    formData.append('language', language); 

    if (image)
        formData.append('image', image);

    return formData;
}