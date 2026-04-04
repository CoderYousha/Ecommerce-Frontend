import { Box, Button, Checkbox, CircularProgress, Divider, FormControlLabel, TextField, Typography, useTheme } from "@mui/material";
import { FormattedMessage } from "react-intl";
import { useConstants } from "../hooks/UseConstants";
import { useWaits } from "../hooks/UseWait";
import CloseIcon from '@mui/icons-material/Close';
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
import Fetch from "../services/Fetch";
import { useAddProduct } from "../hooks/UseAddProduct";
import { buildAddProductFormData } from "../helper/AddProductFormData";
import { AsyncPaginate } from "react-select-async-paginate";
import { useState } from "react";

function AddProduct({ onClickCancel, setSnackBar, setProducts }) {
    const theme = useTheme();
    const { host, language } = useConstants();
    const { sendWait, setSendWait } = useWaits();
    const { nameEn, setNameEn, nameAr, setNameAr, descriptionAr, setDescriptionAr, descriptionEn, setDescriptionEn,
        amount, setAmount, price, setPrice, categoryId, setCategoryId, images, setImages } = useAddProduct();
    const [option, setOption] = useState('');
    const [categories, setCategories] = useState({});

    const loadCategories = async (search, loadedOptions, { page }) => {
        let result = await Fetch(host + `/api/categories?page=${page}`, 'GET', null);

        if (result.status == 200) {
            setCategories(result.data.data.categories);
        }
        return {
            options: result.data.data.categories.map(
                item => ({ value: item.id, label: language == 'ar' ? item.name_ar : item.name_en, })),
            hasMore: result.data.data.pagination.current_page * result.data.data.pagination.per_page < result.data.data.pagination.total, additional: { page: page + 1, },
        };
    }

    const addProduct = async () => {
        setSendWait(true);
        const formData = buildAddProductFormData({
            categoryId: categoryId,
            nameEn: nameEn,
            nameAr: nameAr,
            images: images,
            amount: amount,
            descriptionAr: descriptionAr,
            descriptionEn: descriptionEn,
            price: price,
        });

        let result = await Fetch(host + '/employee/products', 'post', formData);

        if (result.status === 201) {
            setSnackBar('success', <FormattedMessage id="added_success" />);
            setProducts((prevProducts) => [result.data.data.product, ...prevProducts]);
            onClickCancel();
        } else if (result.status === 422) {
            setSnackBar('error', result.data.errors[0]);
        } else if (result.status === 400) {
            setSnackBar('error', result.data.error);
        }

        setSendWait(false);
    }

    const resetValue = () => {
        setNameEn('');
        setNameAr('');
        setDescriptionEn('');
        setDescriptionAr('');
        setAmount('');
        setPrice('');
        setCategoryId('');
        setImages([]);
    }

    return (
        <Box sx={{ backgroundColor: theme.palette.background.paper }} className="shadow-lg w-3/5 h-screen rounded-3xl px-4 py-5 overflow-y-scroll none-view-scroll max-sm:w-4/5 max-sm:translate-x-0 max-sm:left-0 relative max-sm:overflow-y-scroll max-sm:h-screen" dir={language === 'en' ? 'ltr' : "rtl"}>
            <Typography variant="h5" className="!font-semibold max-sm:!text-xl">
                <FormattedMessage id='add_product' />
            </Typography>
            <CloseIcon onClick={() => { resetValue(); onClickCancel(); }} className="text-gray-700 cursor-pointer absolute top-5 left-5" fontSize="large" sx={{ left: language === 'en' && '90%' }}></CloseIcon>
            <Divider className="!my-5" />
            <Box>
                <Box className='flex justify-between mt-16 max-sm:flex-col'>
                    <TextField variant="outlined" label={<FormattedMessage id="name_en" />} className="w-2/5 max-sm:w-full" value={nameEn} onChange={(e) => setNameEn(e.target.value)} />
                    <TextField variant="outlined" label={<FormattedMessage id="name_ar" />} className="w-2/5 max-sm:w-full max-sm:!mt-3" value={nameAr} onChange={(e) => setNameAr(e.target.value)} />
                </Box>
                <Box className='flex justify-between mt-10'>
                    <TextField variant="outlined" label={<FormattedMessage id="description_en" />} className="w-full" multiline rows={4} value={descriptionEn} onChange={(e) => setDescriptionEn(e.target.value)} />
                </Box>
                <Box className='flex justify-between mt-10'>
                    <TextField variant="outlined" label={<FormattedMessage id="description_ar" />} className="w-full" multiline rows={4} value={descriptionAr} onChange={(e) => setDescriptionAr(e.target.value)} />
                </Box>
                <Box className='flex justify-between mt-10 max-sm:flex-col'>
                    <TextField type="number" variant="outlined" label={<FormattedMessage id="price" />} className="w-2/5 max-sm:w-full" value={price} onChange={(e) => setPrice(e.target.value)} />
                    <TextField type="number" variant="outlined" label={<FormattedMessage id="amount" />} className="w-2/5 max-sm:w-full max-sm:!mt-3" value={amount} onChange={(e) => setAmount(e.target.value)} />
                </Box>
                <Box className='mt-10'>
                    <AsyncPaginate
                        className='z-50 text-black'
                        value={option}
                        loadOptions={loadCategories}
                        onChange={option => {
                            setOption(option);
                            setCategoryId(option.value);
                        }}
                        placeholder={<FormattedMessage id="category" />}
                        additional={{ page: 1 }}
                        isSearchable={false}
                    />
                </Box>
                <Box className="relative w-full h-32 bg-gray-200 rounded-xl mt-10 flex flex-col items-center justify-center cursor-pointer">
                    <CloudUploadOutlinedIcon fontSize="large" className="" />
                    <Typography variant="body1" className="text-gray-700"><FormattedMessage id="add_image" /></Typography>
                    <input type="file" accept="image/*" multiple onChange={(e) => setImages(e.target.files)} className="w-full h-full opacity-0 absolute cursor-pointer" />
                </Box>
                <Box className='mx-auto w-1/3 mt-10 max-sm:w-full'>
                    <Button onClick={addProduct} variant='outlined' className='!rounded-full w-full !border-green-500 !bg-green-500 !text-white hover:!bg-white hover:!text-green-500'>
                        {
                            sendWait ?
                                <CircularProgress size={20} className="" color="white" />
                                :
                                <FormattedMessage id="add" />
                        }
                    </Button>
                </Box>
            </Box>
        </Box>
    );
}

export default AddProduct;