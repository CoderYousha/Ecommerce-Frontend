export function buildOrderStatusFormData ({
    status,
    paymentStatus
}){
    const formData = new FormData();
    
    formData.append('status', status);
    formData.append('payment_status', paymentStatus);

    return formData;
}