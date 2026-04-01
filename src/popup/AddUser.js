import { Box, Button, Checkbox, CircularProgress, Divider, FormControlLabel, TextField, Typography, useTheme } from "@mui/material";
import { FormattedMessage } from "react-intl";
import { useConstants } from "../hooks/UseConstants";
import PhoneInput from "react-phone-input-2";
import { useWaits } from "../hooks/UseWait";
import CloseIcon from '@mui/icons-material/Close';
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
import AuthContext from "../context/AuthContext";
import Fetch from "../services/Fetch";
import { useAddUser } from "../hooks/UseAddUser";
import { buildAddUserFormData } from "../helper/AddUserFormData";

function AddUser({ onClickCancel, setSnackBar, setUsers, accountRole }) {
    const theme = useTheme();
    const { host, language } = useConstants();
    const { sendWait, setSendWait } = useWaits();
    const { fullName, setFullName, email, setEmail, phone, setPhone, image, setImage, whatsappPhone, setWhatsappPhone, password, setPassword, passwordConfirmation, setPasswordConfirmation, status, setStatus } = useAddUser();

    const handlePhone = (value, country, e, formattedValue) => {
        setPhone(value);
    };

    const handleWhatsapp = (value, country, e, formattedValue) => {
        setWhatsappPhone(value);
    };

    const addUser = async () => {
        setSendWait(true);

        const formData = buildAddUserFormData({
            fullName: fullName,
            email: email,
            phone: phone,
            whatsappPhone: whatsappPhone,
            image: image,
            role: accountRole,
            password: password,
            passwordConfirmation: passwordConfirmation,
            status: status == 1 ? 1 : 0,
        });

        let result = await Fetch(host + '/admin/users', 'post', formData);

        if (result.status === 201) {
            setSnackBar('success', <FormattedMessage id="added_success" />);
            setUsers((prevEmployees) => [result.data.data.user, ...prevEmployees]);
            onClickCancel();
        } else if (result.status === 422) {
            setSnackBar('error', result.data.errors[0]);
        } else if (result.status === 400) {
            setSnackBar('error', result.data.error);
        }

        setSendWait(false);
    }

    const resetValue = () => {
        setFullName('');
        setEmail('');
        setPhone('');
        setWhatsappPhone('');
        setImage('');
        setPassword('');
        setPasswordConfirmation('');
    }

    return (
        <Box sx={{ backgroundColor: theme.palette.background.paper }} className="shadow-lg w-3/5 h-fit rounded-3xl px-4 py-5 overflow-y-scroll none-view-scroll max-sm:w-4/5 max-sm:translate-x-0 max-sm:left-0 relative max-sm:overflow-y-scroll max-sm:h-screen" dir={language === 'en' ? 'ltr' : "rtl"}>
            <Typography variant="h5" className="!font-semibold max-sm:!text-xl">
                {
                    accountRole === 'employee' ?
                        <FormattedMessage id='add_employee' />
                        :
                        <FormattedMessage id='add_client' />
                }
            </Typography>
            <CloseIcon onClick={() => { resetValue(); onClickCancel(); }} className="text-gray-700 cursor-pointer absolute top-5 left-5" fontSize="large" sx={{ left: language === 'en' && '90%' }}></CloseIcon>
            <Divider className="!my-5" />
            <Box>
                <Box className='flex justify-between'>
                    <TextField variant="outlined" label='Full Name' className="w-2/5" value={fullName} onChange={(e) => setFullName(e.target.value)} />
                    <TextField variant="outlined" label='Email' className="w-2/5" value={email} onChange={(e) => setEmail(e.target.value)} />
                </Box>
                <Box className='flex justify-between'>
                    <Box dir="ltr" className="w-2/5 h-14 mt-5 max-sm:h-12">
                        <Typography variant="body2" className="!mb-2"><FormattedMessage id="phone" /></Typography>
                        <PhoneInput value={phone} onChange={handlePhone} country={'us'} containerStyle={{ width: "100%" }} inputStyle={{
                            width: '100%',
                            height: "100%"
                        }} />
                    </Box>
                    <Box dir="ltr" className="w-2/5 h-14 mt-5 max-sm:h-12">
                        <Typography variant="body2" className="!mb-2"><FormattedMessage id="whatsapp_phone" /></Typography>
                        <PhoneInput value={whatsappPhone} onChange={handleWhatsapp} country={'us'} containerStyle={{ width: "100%" }} inputStyle={{
                            width: '100%',
                            height: "100%"
                        }} />
                    </Box>
                </Box>
                <Box className='flex justify-between mt-16'>
                    <TextField type="password" variant="outlined" label={<FormattedMessage id="password" />} className="w-2/5" value={password} onChange={(e) => setPassword(e.target.value)} />
                    <TextField type="password" variant="outlined" label={<FormattedMessage id="confirm_password" />} className="w-2/5" value={passwordConfirmation} onChange={(e) => setPasswordConfirmation(e.target.value)} />
                </Box>
                <FormControlLabel
                    control={<Checkbox checked={status} onChange={(e) => setStatus(e.target.checked)} />}
                    label={<FormattedMessage id="status" />}
                />
                <Box className="relative w-full h-32 bg-gray-200 rounded-xl mt-10 flex flex-col items-center justify-center cursor-pointer">
                    <CloudUploadOutlinedIcon fontSize="large" className="" />
                    <Typography variant="body1" className="text-gray-700"><FormattedMessage id="add_image" /></Typography>
                    <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])} className="w-full h-full opacity-0 absolute cursor-pointer" />
                </Box>
                <Box className='mx-auto w-1/3 mt-10'>
                    <Button onClick={addUser} variant='outlined' className='!rounded-full w-full !border-green-500 !bg-green-500 !text-white hover:!bg-white hover:!text-green-500'>
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

export default AddUser;