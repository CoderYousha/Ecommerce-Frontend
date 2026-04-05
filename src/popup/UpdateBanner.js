import { Box, Button, Checkbox, CircularProgress, Divider, FormControlLabel, TextField, Typography, useTheme } from "@mui/material";
import { FormattedMessage } from "react-intl";
import { useConstants } from "../hooks/UseConstants";
import { useWaits } from "../hooks/UseWait";
import CloseIcon from '@mui/icons-material/Close';
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
import Fetch from "../services/Fetch";
import { buildAddCategoryFormData } from "../helper/AddCategoryFormData";
import { AsyncPaginate } from "react-select-async-paginate";
import { useEffect, useState } from "react";
import { useAddBanner } from "../hooks/UseAddBanner";
import { buildAddBannerFormData } from "../helper/AddBannerFormData";

function UpdateBanner({ onClickCancel, setSnackBar, getBanners, banner }) {
    const theme = useTheme();
    const { host, language } = useConstants();
    const { sendWait, setSendWait } = useWaits();
    const { nameEn, setNameEn, nameAr, setNameAr, status, setStatus, images, setImages, categoryId, setCategoryId, productId, setProductId, startDate, setSartDate, endDate, setEndDate } = useAddBanner();
    const [categoryOption, setCategoryOption] = useState();
    const [productOption, setProductOption] = useState();

    const loadCategories = async ({ page }) => {
        let result = await Fetch(host + `/api/categories?page=${page}`, 'GET', null);

        return {
            options: result.data.data.categories.map(
                item => ({ value: item.id, label: language == 'ar' ? item.name_ar : item.name_en, })),
            hasMore: result.data.data.pagination.current_page * result.data.data.pagination.per_page < result.data.data.pagination.total, additional: { page: page + 1, },
        };
    }

    const loadProducts = async ({ page }) => {
        let result = await Fetch(host + `/api/products?page=${page}&category_id=${categoryId}`, 'GET', null);

        return {
            options: result.data.data.products.map(
                item => ({ value: item.id, label: language == 'ar' ? item.name_ar : item.name_en, })),
            hasMore: result.data.data.pagination.current_page * result.data.data.pagination.per_page < result.data.data.pagination.total, additional: { page: page + 1, },
        };
    }

    const updateBanner = async () => {
        setSendWait(true);
        const formData = buildAddBannerFormData({
            nameEn: nameEn,
            nameAr: nameAr,
            startDate: startDate,
            endDate, endDate,
            images: images,
            categoryId: categoryId,
            productId: productId,
            status: status ? 1 : 0,
        });

        let result = await Fetch(host + `/admin/banners/${banner.id}`, 'post', formData);

        if (result.status === 200) {
            setSnackBar('success', <FormattedMessage id="updated_success" />);
            await getBanners();
            onClickCancel();
        } else if (result.status === 422) {
            setSnackBar('error', result.data.errors[0]);
        } else if (result.status === 400) {
            setSnackBar('error', result.data.error);
        }

        setSendWait(false);
    }

    const resetValue = () => {
        setNameEn(banner.name_en);
        setNameAr(banner.name_ar);
        setSartDate(banner.start_date);
        setEndDate(banner.end_date);
        setCategoryId(banner.category.id);
        setProductId(banner.product.id);
        setImages([]);
        setCategoryOption({ value: banner.category.id, label: language === 'en' ? banner.category.name_en : banner.category.name_ar });
        setProductOption({ value: banner.product.id, label: language === 'en' ? banner.product.name_en : banner.product.name_ar });
        setStatus(banner.status);
    }

    useEffect(() => {
        if (banner)
            resetValue();
    }, [banner]);

    return (
        <Box sx={{ backgroundColor: theme.palette.background.paper }} className="shadow-lg w-3/5 h-screen rounded-3xl px-4 py-5 overflow-y-scroll none-view-scroll max-sm:w-4/5 max-sm:translate-x-0 max-sm:left-0 relative max-sm:overflow-y-scroll" dir={language === 'en' ? 'ltr' : "rtl"}>
            <Typography variant="h5" className="!font-semibold max-sm:!text-xl">
                <FormattedMessage id='update_banner' />
            </Typography>
            <CloseIcon onClick={() => { resetValue(); onClickCancel(); }} className="text-gray-700 cursor-pointer absolute top-5 left-5" fontSize="large" sx={{ left: language === 'en' && '90%' }}></CloseIcon>
            <Divider className="!my-5" />
            <Box>
                <Box className='flex justify-between mt-16 max-sm:flex-col'>
                    <TextField variant="outlined" label={<FormattedMessage id="name_en" />} className="w-2/5 max-sm:w-full" value={nameEn} onChange={(e) => setNameEn(e.target.value)} />
                    <TextField variant="outlined" label={<FormattedMessage id="name_ar" />} className="w-2/5 max-sm:w-full max-sm:!mt-3" value={nameAr} onChange={(e) => setNameAr(e.target.value)} />
                </Box>
                <Box className='flex justify-between mt-16 max-sm:flex-col'>
                    <TextField defaultValue="01-01-2026" type="date" variant="outlined" label={<FormattedMessage id="start_date" />} className="w-2/5 max-sm:w-full" value={startDate} onChange={(e) => setSartDate(e.target.value)} />
                    <TextField type="date" variant="outlined" label={<FormattedMessage id="end_date" />} className="w-2/5 max-sm:w-full max-sm:!mt-3" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
                </Box>
                <Box className='mt-10 flex justify-between'>
                    <AsyncPaginate
                        className='z-50 text-black w-2/5'
                        value={categoryOption}
                        loadOptions={loadCategories}
                        onChange={option => {
                            setCategoryOption(option);
                            setCategoryId(option.value);
                            setProductOption({ value: null, label: <FormattedMessage id="product" /> });
                        }}
                        placeholder={<FormattedMessage id="category" />}
                        additional={{ page: 1 }}
                        isSearchable={false}
                    />
                    <AsyncPaginate
                        key={categoryId}
                        className='z-50 text-black w-2/5'
                        value={productOption}
                        loadOptions={loadProducts}
                        onChange={option => {
                            setProductOption(option);
                            setProductId(option.value);
                        }}
                        placeholder={<FormattedMessage id="product" />}
                        additional={{ page: 1 }}
                        isSearchable={false}
                        isDisabled={!categoryId}
                    />
                </Box>
                <FormControlLabel
                    control={<Checkbox checked={status} onChange={(e) => setStatus(e.target.checked)} />}
                    label={<FormattedMessage id="status" />}
                />
                <Box className="relative w-full h-32 bg-gray-200 rounded-xl mt-10 flex flex-col items-center justify-center cursor-pointer">
                    <CloudUploadOutlinedIcon fontSize="large" className="" />
                    <Typography variant="body1" className="text-gray-700"><FormattedMessage id="add_image" /></Typography>
                    <input type="file" accept="image/*" multiple onChange={(e) => setImages(e.target.files)} className="w-full h-full opacity-0 absolute cursor-pointer" />
                </Box>
                <Box className='mx-auto w-1/3 mt-10 max-sm:w-full'>
                    <Button onClick={updateBanner} variant='outlined' className='!rounded-full w-full !border-green-500 !bg-green-500 !text-white hover:!bg-white hover:!text-green-500'>
                        {
                            sendWait ?
                                <CircularProgress size={20} className="" color="white" />
                                :
                                <FormattedMessage id="update" />
                        }
                    </Button>
                </Box>
            </Box>
        </Box>
    );
}

export default UpdateBanner;