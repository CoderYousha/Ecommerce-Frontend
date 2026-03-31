import { Box, Button, CircularProgress, Typography } from "@mui/material";
import Background from '../../images/forgot_password/background.png';
import VerificationInput from "react-verification-input";
import { useState } from "react";
import Fetch from "../../services/Fetch";
import { useConstants } from "../../hooks/UseConstants";
import { useWaits } from "../../hooks/UseWait";
import SnackbarAlert from "../../components/SnackBar";
import useSnackBar from "../../hooks/UseSnackBar";
import { useNavigate } from "react-router-dom";

function ForgotPassword() {
    const { host } = useConstants();
    const { openSnackBar, type, message, setOpenSnackBar, setSnackBar } = useSnackBar();
    const { sendWait, setSendWait } = useWaits();
    const [openCodeSection, setOpenCodeSection] = useState(false);
    const [openResetPasswordSection, setOpenResetPasswordSection] = useState(false);
    const [email, setEmail] = useState();
    const [code, setCode] = useState();
    const [newPassword, setNewPassword] = useState();
    const [confirmNewPassword, setConfirmNewPassword] = useState();
    const navigate = useNavigate();

    const sendVerificationCode = async () => {
        setSendWait(true);

        const formData = new FormData();
        formData.append('email', email);
        let result = await Fetch(host + '/api/forget-password', 'POST', formData);

        if (result.status === 201) {
            setOpenCodeSection(true);
            localStorage.setItem('verification_token', result.data.data);
        } else if (result.status === 422) {
            setSnackBar('error', 'Email is required');
        }

        setSendWait(false);
    }

    const checkVerificationCode = async (code) => {
        const formData = new FormData();
        formData.append('code', code);

        let result = await Fetch(host + '/api/forget-password-verify', 'POST', formData, localStorage.getItem('verification_token'));

        if (result.status === 200) {
            setOpenResetPasswordSection(true);
            setOpenCodeSection(false);
            localStorage.setItem('verification_token', result.data.data);
        } else if (result.status === 400) {
            setSnackBar('error', 'Incorrect verification code');
        }
    }

    const resetPassword = async () => {
        setSendWait(true);

        const formData = new FormData();
        formData.append('password', newPassword);
        formData.append('password_confirmation', confirmNewPassword);

        let result = await Fetch(host + '/api/reset-forget-password', 'POST', formData, localStorage.getItem('verification_token'));

        if (result.status === 200) {
            navigate('/login');
            localStorage.removeItem('verification_token');
        } else if (result.status === 422) {
            setSnackBar('error', result.data.errors[0]);
        }

        setSendWait(false);
    }

    return (
        <>
            <Box>
                <Box className="w-1/2 h-screen float-right relative max-sm:hidden">
                    <img src={Background} className='h-full float-right' />
                </Box>
                <Box className=''>
                    <Box className='w-1/2 h-screen flex justify-center items-center max-sm:w-full'>
                        <Box className='w-2/3 rounded-xl shadow-lg px-5 py-5 max-sm:w-4/5'>
                            <Typography variant='h5' className='text-purple-600 !mt-5' fontWeight={700}>Watten</Typography>
                            <Typography variant='h3' className='!my-5' fontWeight={700}>Forgot Password</Typography>
                            {
                                !openCodeSection && !openResetPasswordSection &&
                                <Box className=''>
                                    <Typography variant='body1'>Email</Typography>
                                    <input onChange={(e) => setEmail(e.target.value)} type='text' className='w-full py-2 rounded-lg indent-2 outline-none bg-purple-100' />
                                    <Box className='mx-auto w-fit my-5'>
                                        <Button onClick={sendVerificationCode} variant='outlined' className='!rounded-full w-32 !border-green-500 !bg-green-500 !text-white hover:!bg-white hover:!text-green-500'>
                                            {
                                                sendWait ?
                                                    <CircularProgress size={20} className="" color="white" />
                                                    :
                                                    'Next'
                                            }
                                        </Button>
                                    </Box>
                                </Box>
                            }
                            {
                                openCodeSection &&
                                <Box className=''>
                                    <Typography variant='body1'>Verification Code</Typography>
                                    <Box className='mx-auto w-fit my-5'>
                                        <VerificationInput
                                            autoFocus
                                            passwordChar="*"
                                            passwordMode
                                            classNames={{
                                                character: "character",
                                                characterInactive: "character--inactive",
                                                characterSelected: "character--selected",
                                                characterFilled: "character--filled",
                                            }}
                                            onComplete={(value) => checkVerificationCode(value)}
                                        />
                                    </Box>
                                </Box>

                            }
                            {
                                openResetPasswordSection &&
                                <Box className=''>
                                    <Typography variant='body1'>New Password</Typography>
                                    <input onChange={(e) => setNewPassword(e.target.value)} type='password' className='w-full py-2 rounded-lg indent-2 outline-none bg-purple-100' />
                                    <Typography className="!mt-5" variant='body1'>Confirm Password</Typography>
                                    <input onChange={(e) => setConfirmNewPassword(e.target.value)} type='password' className='w-full py-2 rounded-lg indent-2 outline-none bg-purple-100' />
                                    <Box className='mx-auto w-fit my-5'>
                                        <Button onClick={resetPassword} variant='outlined' className='!rounded-full w-32 !border-green-500 !bg-green-500 !text-white hover:!bg-white hover:!text-green-500'>
                                            {
                                                sendWait ?
                                                    <CircularProgress size={20} className="" color="white" />
                                                    :
                                                    'Reset'
                                            }
                                        </Button>
                                    </Box>
                                </Box>
                            }
                        </Box>
                    </Box>
                </Box>
            </Box>

            {/* Snackbar Alert */}
            <SnackbarAlert open={openSnackBar} message={message} severity={type} onClose={() => setOpenSnackBar(false)} />
        </>
    );
}

export default ForgotPassword;