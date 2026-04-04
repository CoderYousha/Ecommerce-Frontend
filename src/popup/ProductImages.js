import { Box, CircularProgress, useTheme } from "@mui/material";
import { useConstants } from "../hooks/UseConstants";
import CloseIcon from '@mui/icons-material/Close';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import Fetch from "../services/Fetch";
import { useEffect, useState } from "react";
import { useWaits } from "../hooks/UseWait";

function ProductImages({ images = [], onClickCancel, setSnackBar, setProducts }) {
    const theme = useTheme();
    const { language, host } = useConstants();
    const { sendWait, setSendWait } = useWaits();
    const [imageId, setImageId] = useState('');
    const [imgs, setImgs] = useState(images);

    const deleteImage = async (image) => {
        setImageId(image.id);
        setSendWait(true);
        let result = await Fetch(host + `/employee/products/images/${image.id}`, 'DELETE', null);

        if (result.status === 200) {
            setSnackBar('success', 'deleted_success');
            setProducts((products) =>
                products.map((product) =>
                    product.id === image.product_id
                        ? {
                            ...product,
                            images: product.images.filter((img) => img.id !== 23),
                        }
                        : product
                )
            );
            setImgs((prevImgs) => prevImgs.filter((prevImg) => prevImg.id !== image.id));
        }
        setSendWait(false);
    }

    useEffect(() => {
        setImgs(images);
    }, images);

    return (
        <Box sx={{ backgroundColor: theme.palette.background.paper }} className="shadow-lg w-4/5 h-screen rounded-3xl px-4 py-5 overflow-y-scroll none-view-scroll max-sm:w-4/5 max-sm:translate-x-0 max-sm:left-0 relative max-sm:overflow-y-scroll max-sm:h-screen" dir={language === 'en' ? 'ltr' : "rtl"}>
            <CloseIcon onClick={() => { onClickCancel(); }} className="text-gray-700 cursor-pointer absolute top-5 left-5" fontSize="large" sx={{ left: language === 'en' && '90%' }}></CloseIcon>
            <Box className='mt-10 grid grid-cols-3 gap-2 max-sm:grid-cols-1'>
                {
                    imgs.map((image, index) =>
                        <Box key={index} className='w-60 h-60 rounded-xl overflow-hidden relative border-2'>
                            {
                                sendWait && image.id === imageId ?
                                    <CircularProgress size={20} className="absolute top-3 right-3 cursor-pointer z-50" color="error" />
                                    :
                                    <DeleteForeverOutlinedIcon color="error" className="absolute top-3 right-3 cursor-pointer z-50" onClick={() => deleteImage(image)} />
                            }
                            <img src={host + '/' + image.image} className="w-full h-60 hover:scale-125 duration-100" />
                        </Box>
                    )
                }
            </Box>
        </Box>
    );
}

export default ProductImages;