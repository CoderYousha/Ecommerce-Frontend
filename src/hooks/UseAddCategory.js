import { useState } from "react";

export function useAddCategory(){
    const [nameEn, setNameEn] = useState('');
    const [nameAr, setNameAr] = useState('');
    const [status, setStatus] = useState(1);

    return {
        nameEn, setNameEn, nameAr, setNameAr, status, setStatus
    };
}