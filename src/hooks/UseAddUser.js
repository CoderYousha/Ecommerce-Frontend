import { useState } from "react";

export function useAddUser() {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [whatsappPhone, setWhatsappPhone] = useState('');
    const [image, setImage] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [status, setStatus] = useState(1);

    return {
        fullName, setFullName, phone, setPhone, image, setImage, whatsappPhone, setWhatsappPhone, email, setEmail,
        password, setPassword, passwordConfirmation, setPasswordConfirmation, status, setStatus,
    };
}