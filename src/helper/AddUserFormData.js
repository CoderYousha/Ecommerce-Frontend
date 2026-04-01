export function buildAddUserFormData({
    fullName,
    email,
    phone,
    whatsappPhone,
    image,
    role,
    password,
    passwordConfirmation,
    status,
}) {
    const formData = new FormData();

    formData.append('full_name', fullName);
    formData.append('email', email);
    formData.append('phone', phone);
    formData.append('whatsapp_phone', whatsappPhone); 
    formData.append('role', role); 
    formData.append('password', password); 
    formData.append('password_confirmation', passwordConfirmation); 
    formData.append('status', status); 

    if (image)
        formData.append('image', image);

    return formData;
}