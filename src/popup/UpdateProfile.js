import { Box, Button, CircularProgress, Divider, TextField, Typography, useTheme } from "@mui/material";
import { FormattedMessage } from "react-intl";
import { useConstants } from "../hooks/UseConstants";
import PhoneInput from "react-phone-input-2";
import { useWaits } from "../hooks/UseWait";
import CloseIcon from '@mui/icons-material/Close';
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
import { useContext, useEffect } from "react";
import AuthContext from "../context/AuthContext";
import { useUpdateProfile } from "../hooks/UseUpdateProfile";
import Fetch from "../services/Fetch";
import { buildUpdateProfileFormData } from "../helper/UpdateProfileFormData";

function UpdateProfile({ onClickCancel, setSnackBar }) {
    const theme = useTheme();
    const { host, language } = useConstants();
    const { sendWait, setSendWait } = useWaits();
    const { profile, setProfile } = useContext(AuthContext);
    const { fullName, setFullName, email, setEmail, phone, setPhone, image, setImage, whatsappPhone, setWhatsappPhone } = useUpdateProfile();

    const handlePhone = (value, country, e, formattedValue) => {
        setPhone(value);
    };

    const handleWhatsapp = (value, country, e, formattedValue) => {
        setWhatsappPhone(value);
    };

    const updateProfile = async () => {
        setSendWait(true);

        const formData = buildUpdateProfileFormData({
            fullName: fullName,
            email: email,
            phone: phone,
            whatsappPhone: whatsappPhone,
            image: image,
            language: language
        });

        let result = await Fetch(host + '/api/profile', 'post', formData);

        if (result.status === 200) {
            setSnackBar('success', <FormattedMessage id="updated_success" />);
            setProfile(result.data.data.data);
        } else if (result.status === 422) {
            setSnackBar('error', result.data.errors[0]);
        }

        setSendWait(false);
    }

    const resetValue = () => {
        setFullName(profile.full_name);
        setEmail(profile.email);
        setPhone(profile.phone);
        setWhatsappPhone(profile.whatsapp_phone);
        setImage('');
    }

    useEffect(() => {
        if (profile)
            resetValue();
    }, [profile]);

    return (
        <Box sx={{ backgroundColor: theme.palette.background.paper }} className="shadow-lg w-3/5 h-fit rounded-3xl px-4 py-5 overflow-y-scroll none-view-scroll max-sm:w-4/5 max-sm:translate-x-0 max-sm:left-0 relative max-sm:overflow-y-scroll max-sm:h-screen" dir={language === 'en' ? 'ltr' : "rtl"}>
            <Typography variant="h5" className="!font-semibold max-sm:!text-xl"><FormattedMessage id='update_profile' /></Typography>
            <CloseIcon onClick={() => { resetValue(); onClickCancel(); }} className="text-gray-700 cursor-pointer absolute top-5 left-5" fontSize="large" sx={{ left: language === 'en' && '90%' }}></CloseIcon>
            <Divider className="!my-5" />
            <Box>
                <Box className='flex justify-between max-sm:flex-col'>
                    <TextField variant="outlined" label='Full Name' className="w-2/5 max-sm:w-full" value={fullName} onChange={(e) => setFullName(e.target.value)} />
                    <TextField aria-readonly variant="outlined" label='Email' className="w-2/5 max-sm:w-full max-sm:!mt-3" value={email} />
                </Box>
                <Box className='flex justify-between max-sm:flex-col'>
                    <Box dir="ltr" className="w-2/5 h-14 mt-5 max-sm:h-12 max-sm:w-full">
                        <Typography variant="body2" className="!mb-2"><FormattedMessage id="phone" /></Typography>
                        <PhoneInput value={phone} onChange={handlePhone} country={'us'} containerStyle={{ width: "100%" }} inputStyle={{
                            width: '100%',
                            height: "100%"
                        }} />
                    </Box>
                    <Box dir="ltr" className="w-2/5 h-14 mt-5 max-sm:h-12 max-sm:w-full max-sm:!mt-10">
                        <Typography variant="body2" className="!mb-2"><FormattedMessage id="whatsapp_phone" /></Typography>
                        <PhoneInput value={whatsappPhone} onChange={handleWhatsapp} country={'us'} containerStyle={{ width: "100%" }} inputStyle={{
                            width: '100%',
                            height: "100%"
                        }} />
                    </Box>
                </Box>
                <Box className="relative w-full h-32 bg-gray-200 rounded-xl mt-10 flex flex-col items-center justify-center cursor-pointer">
                    <CloudUploadOutlinedIcon fontSize="large" className="" />
                    <Typography variant="body1" className="text-gray-700"><FormattedMessage id="add_image" /></Typography>
                    <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])} className="w-full h-full opacity-0 absolute cursor-pointer" />
                </Box>
                <Box className='mx-auto w-1/3 mt-10 max-sm:w-full'>
                    <Button onClick={updateProfile} variant='outlined' className='!rounded-full w-full !border-green-500 !bg-green-500 !text-white hover:!bg-white hover:!text-green-500'>
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

export default UpdateProfile;