import { useState } from "react";

export function useUpdateProfile() {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [whatsappPhone, setWhatsappPhone] = useState('');
    const [image, setImage] = useState('');

    return {
        fullName, setFullName, phone, setPhone, image, setImage, whatsappPhone, setWhatsappPhone, email, setEmail,
    };
}