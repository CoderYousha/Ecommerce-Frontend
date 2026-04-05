import { useState } from "react";

export function useAddBanner() {
    const [categoryId, setCategoryId] = useState('');
    const [productId, setProductId] = useState('');
    const [nameEn, setNameEn] = useState('');
    const [nameAr, setNameAr] = useState('');
    const [startDate, setSartDate] = useState('2026-01-01');
    const [endDate, setEndDate] = useState('2026-01-01');
    const [status, setStatus] = useState('');
    const [images, setImages] = useState([]);

    return {
        categoryId, setCategoryId, productId, setProductId, nameEn, setNameEn, nameAr, setNameAr, startDate, setSartDate,
        endDate, setEndDate, status, setStatus, images, setImages,
    };
}