import Divider from '@mui/material/Divider';
import Background from '../../images/login/background.png';
import { Typography, Box, Button } from '@mui/material';

function Login() {
    return (
        <>
            <Box>
                <Box className="h-screen w-2/5 bg-purple-400 float-right relative max-sm:hidden">
                    <img src={Background} className='absolute -left-32 bottom-10' />
                </Box>
                <Divider className='text-black w-full absolute bottom-10  !border-purple-600 max-sm:hidden' />
                <Box className='w-3/5 h-screen flex justify-center items-center max-sm:w-full'>
                    <Box className='w-1/2 rounded-xl shadow-lg px-5 py-5 max-sm:w-4/5'>
                        <Typography variant='h5' className='text-purple-600 !mt-5' fontWeight={700}>Watten</Typography>
                        <Typography variant='body2' className='!mt-7 text-gray-500'>Welcome back !!!</Typography>
                        <Typography variant='h3' className='!my-5' fontWeight={700}>Sign in</Typography>
                        <Typography variant='body1'>Email</Typography>
                        <input type='text' className='w-full py-2 rounded-lg indent-2 outline-none bg-purple-100' />
                        <Typography variant='body1' className='!mt-3'>Password</Typography>
                        <input type='password' className='w-full py-2 rounded-lg indent-2 outline-none bg-purple-100' />
                        <Typography variant='body1' className='!my-3 cursor-pointer text-gray-600 hover:text-green-500'>Forgot Password?</Typography>
                        <Box className='mx-auto w-fit'>
                            <Button variant='outlined' className='!rounded-full w-32 !border-green-500 !bg-green-500 !text-white hover:!bg-white hover:!text-green-500'>SIGN IN</Button>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </>
    );
}

export default Login;