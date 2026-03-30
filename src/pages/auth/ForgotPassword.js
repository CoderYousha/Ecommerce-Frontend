import { Box, Button, Typography } from "@mui/material";
import Background from '../../images/forgot_password/background.png';
import VerificationInput from "react-verification-input";

function ForgotPassword() {
    return (
        <>
            <Box>
                <Box className="w-1/2 h-screen float-right relative max-sm:hidden">
                    <img src={Background} className='h-full' />
                </Box>
                <Box className=''>
                    <Box className='w-1/2 h-screen flex justify-center items-center max-sm:w-full'>
                        <Box className='w-2/3 rounded-xl shadow-lg px-5 py-5 max-sm:w-4/5'>
                            <Typography variant='h5' className='text-purple-600 !mt-5' fontWeight={700}>Watten</Typography>
                            <Typography variant='h3' className='!my-5' fontWeight={700}>Forgot Password</Typography>
                            <Box className=''>
                                <Typography variant='body1'>Email</Typography>
                                <input type='text' className='w-full py-2 rounded-lg indent-2 outline-none bg-purple-100' />
                                <Box className='mx-auto w-fit my-5'>
                                    <Button variant='outlined' className='!rounded-full w-32 !border-green-500 !bg-green-500 !text-white hover:!bg-white hover:!text-green-500'>NEXT</Button>
                                </Box>
                            </Box>
                            <Box className='hidden'>
                                <Typography variant='body1'>Verification Code</Typography>
                                <Box className='mx-auto w-fit my-5'>
                                    <VerificationInput
                                        passwordChar="*"
                                        passwordMode
                                        classNames={{
                                            character: "character",
                                            characterInactive: "character--inactive",
                                            characterSelected: "character--selected",
                                            characterFilled: "character--filled",
                                        }}
                                    />
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </>
    );
}

export default ForgotPassword;