import { Box, Button, Checkbox, CircularProgress, Divider, FormControlLabel, TextField, Typography, useTheme } from "@mui/material";
import { FormattedMessage } from "react-intl";
import { useConstants } from "../hooks/UseConstants";
import PhoneInput from "react-phone-input-2";
import { useWaits } from "../hooks/UseWait";
import CloseIcon from '@mui/icons-material/Close';
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
import Fetch from "../services/Fetch";
import { useAddUser } from "../hooks/UseAddUser";
import { buildAddUserFormData } from "../helper/AddUserFormData";
import { useAddCategory } from "../hooks/UseAddCategory";
import { buildAddCategoryFormData } from "../helper/AddCategoryFormData";

function AddCategory({ onClickCancel, setSnackBar, setCategories }) {
    const theme = useTheme();
    const { host, language } = useConstants();
    const { sendWait, setSendWait } = useWaits();
    const { nameEn, setNameEn, nameAr, setNameAr, status, setStatus } = useAddCategory();

    const addCategory = async () => {
        setSendWait(true);
        const formData = buildAddCategoryFormData({
            nameEn: nameEn,
            nameAr: nameAr,
            status: status ? 1 : 0,
        });

        let result = await Fetch(host + '/admin/categories', 'post', formData);

        if (result.status === 201) {
            setSnackBar('success', <FormattedMessage id="added_success" />);
            setCategories((prevCategories) => [result.data.data.category, ...prevCategories]);
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
        setStatus(1);
    }

    return (
        <Box sx={{ backgroundColor: theme.palette.background.paper }} className="shadow-lg w-3/5 h-fit rounded-3xl px-4 py-5 overflow-y-scroll none-view-scroll max-sm:w-4/5 max-sm:translate-x-0 max-sm:left-0 relative max-sm:overflow-y-scroll" dir={language === 'en' ? 'ltr' : "rtl"}>
            <Typography variant="h5" className="!font-semibold max-sm:!text-xl">
                <FormattedMessage id='add_category' />
            </Typography>
            <CloseIcon onClick={() => { resetValue(); onClickCancel(); }} className="text-gray-700 cursor-pointer absolute top-5 left-5" fontSize="large" sx={{ left: language === 'en' && '90%' }}></CloseIcon>
            <Divider className="!my-5" />
            <Box>
                <Box className='flex justify-between mt-16 max-sm:flex-col'>
                    <TextField variant="outlined" label={<FormattedMessage id="name_en" />} className="w-2/5 max-sm:w-full" value={nameEn} onChange={(e) => setNameEn(e.target.value)} />
                    <TextField variant="outlined" label={<FormattedMessage id="name_ar" />} className="w-2/5 max-sm:w-full max-sm:!mt-3" value={nameAr} onChange={(e) => setNameAr(e.target.value)} />
                </Box>
                <FormControlLabel
                    control={<Checkbox checked={status} onChange={(e) => setStatus(e.target.checked)} />}
                    label={<FormattedMessage id="status" />}
                />
                <Box className='mx-auto w-1/3 mt-10 max-sm:w-full'>
                    <Button onClick={addCategory} variant='outlined' className='!rounded-full w-full !border-green-500 !bg-green-500 !text-white hover:!bg-white hover:!text-green-500'>
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

export default AddCategory;