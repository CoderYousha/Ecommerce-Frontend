import { useState } from "react";

export function useAddProduct(){
    const [categoryId, setCategoryId] = useState('');
    const [nameEn, setNameEn] = useState('');
    const [nameAr, setNameAr] = useState('');
    const [descriptionEn, setDescriptionEn] = useState('');
    const [descriptionAr, setDescriptionAr] = useState('');
    const [price, setPrice] = useState('');
    const [amount, setAmount] = useState('');
    const [images, setImages] = useState([]);

    return {
        categoryId, setCategoryId, nameEn, setNameEn, nameAr, setNameAr, descriptionEn, setDescriptionEn, descriptionAr,
        setDescriptionAr, price, setPrice, amount, setAmount, images, setImages
    };
}