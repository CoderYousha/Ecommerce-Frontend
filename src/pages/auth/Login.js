import Divider from '@mui/material/Divider';
import Background from '../../images/login/background.png';
import { Typography, Box, Button, CircularProgress } from '@mui/material';
import useSnackBar from '../../hooks/UseSnackBar';
import SnackbarAlert from "../../components/SnackBar";
import { useLogin } from '../../hooks/UseLogin';
import { useConstants } from '../../hooks/UseConstants';
import Fetch from '../../services/Fetch';
import { useNavigate } from 'react-router-dom';
import { useWaits } from '../../hooks/UseWait';
import CheckLogin from '../../services/CheckLogin';
import { useEffect } from 'react';

function Login() {
    const { host } = useConstants();
    const { openSnackBar, type, message, setOpenSnackBar, setSnackBar } = useSnackBar();
    const { email, setEmail, password, setPassword } = useLogin();
    const { getWait, setGetWait, sendWait, setSendWait } = useWaits();
    const navigate = useNavigate();

    {/* Check Login Function */ }
    const checkLogin = async () => {
        let result = await CheckLogin(host);
        if (result) {
            navigate('/profile');
        } else {
            setGetWait(false);
        }
    }

    const login = async () => {
        setSendWait(true);

        const formData = new FormData();
        formData.append('email', email);
        formData.append('password', password);

        let result = await Fetch(host + '/api/login', 'POST', formData);

        if (result.status === 200) {
            localStorage.setItem('token', result.data.data.token);
            navigate('/profile');
        } else if (result.status === 400) {
            setSnackBar('error', result.data.error)
        } else if (result.status === 422) {
            setSnackBar('error', result.data.errors[0]);
        }

        setSendWait(false);
    }

    useEffect(() => {
        checkLogin();
    }, [])

    return (
        <>
            {
                getWait ?
                    <Box className="w-full h-screen relative flex justify-center items-center">
                        <CircularProgress size={70} className='!text-purple-500' />
                    </Box>
                    :
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
                                <input onChange={(e) => setEmail(e.target.value)} type='text' className='w-full py-2 rounded-lg indent-2 outline-none bg-purple-100' />
                                <Typography variant='body1' className='!mt-3'>Password</Typography>
                                <input onChange={(e) => setPassword(e.target.value)} type='password' className='w-full py-2 rounded-lg indent-2 outline-none bg-purple-100' />
                                <Typography variant='body1' className='!my-3 cursor-pointer text-gray-600 hover:text-purple-500'>Forgot Password?</Typography>
                                <Box className='mx-auto w-fit'>
                                    <Button onClick={login} variant='outlined' className='!rounded-full w-32 !border-green-500 !bg-green-500 !text-white hover:!bg-white hover:!text-green-500'>
                                        {
                                            sendWait ?
                                                <CircularProgress size={20} className="" color="white" />
                                                :
                                                'SIGN IN'
                                        }
                                    </Button>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
            }

            {/* Snackbar Alert */}
            <SnackbarAlert open={openSnackBar} message={message} severity={type} onClose={() => setOpenSnackBar(false)} />
        </>
    );
}

export default Login;