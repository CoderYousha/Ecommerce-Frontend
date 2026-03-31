import { Box, Button, CircularProgress, ListItemIcon, Menu, MenuItem, Switch, Typography, useTheme } from "@mui/material";

import 'react-phone-input-2/lib/style.css'
import { useConstants } from "../../hooks/UseConstants";
import { FormattedMessage } from "react-intl";
import { usePopups } from "../../hooks/UsePopups";
import { useWaits } from "../../hooks/UseWait";
import { useState } from "react";
import SyImage from '../../images/flags/sy.png';
import AuImage from '../../images/flags/au.png';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import AdminPanelSettingsOutlinedIcon from '@mui/icons-material/AdminPanelSettingsOutlined';
import GppGoodOutlinedIcon from '@mui/icons-material/GppGoodOutlined';
import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined';
import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import CampaignOutlinedIcon from '@mui/icons-material/CampaignOutlined';
import LockOpenOutlinedIcon from '@mui/icons-material/LockOpenOutlined';
import GTranslateOutlinedIcon from '@mui/icons-material/GTranslateOutlined';

function Profile() {
    const theme = useTheme();
    const { language } = useConstants();
    const { setPopup } = usePopups();
    const {sendWait} = useWaits();
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const [lang, setLang] = useState(language);

    {/* Open Language Menue */ }
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    {/* Close Language Menue */ }
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
            <Box className="w-full px-5">
                {/* Profile Information */}
                <Box sx={{ background: theme.palette.mode === 'dark' ? theme.palette.background.paper : language === 'en' ? 'linear-gradient(to left, #A855F7, #C491F7, white 80%)' : 'linear-gradient(to right, #2563EA, #85A4E8, white 80%)', flexDirection: language === 'en' && 'row-reverse' }} className="h-48 py-5 px-5 rounded-xl mt-10 flex justify-between items-center shadow-lg max-sm:min-h-52 max-sm:flex-col" dir="rtl">
                    <Box className="flex items-center" sx={{ flexDirection: language === 'en' && 'row-reverse' }}>
                        {/* { */}
                        {/* profile.image ?
                                <Box className="w-14 h-14 text-white rounded-full flex justify-center items-center">
                                     <img src={profile.image} className="w-full h-full rounded-full" />
                                </Box>
                                : */}
                        <Box className="w-14 h-14 text-white rounded-full bg-purple-500 flex justify-center items-center">
                            <PermIdentityIcon fontSize="large" />
                        </Box>
                        {/* } */}
                        <Box className="mr-5 flex flex-col">
                            <Box className="flex items-center" sx={{ flexDirection: language === 'en' && 'row-reverse' }}>
                                <Typography variant="h5" fontWeight={800} className="">John Mal</Typography>
                                <Typography variant="body2" className="!text-purple-600 w-fit h-full bg-purple-200 px-2 py-1 rounded-full !mx-3"><FormattedMessage id="general_manager" /></Typography>
                            </Box>
                            <Box className="flex items-center my-5" sx={{ flexDirection: language === 'en' && 'row-reverse' }}>
                                <EmailOutlinedIcon className="ml-5" />
                                <Typography variant="body2" className="!ml-5">admin@gmail.com</Typography>
                                <LocalPhoneOutlinedIcon className="ml-5" />
                                <Typography variant="body2" dir="ltr" className="">+963951474132</Typography>
                            </Box>
                            <Button sx={{ backgroundImage: 'linear-gradient(to right, #C491F7, #A855F7)' }} className="!rounded-full" variant="contained" onClick={() => setPopup('update', 'flex')}>
                                <EditOutlinedIcon />
                                <FormattedMessage id="update_profile" />
                            </Button>
                        </Box>
                    </Box>
                    <Box className="h-full flex flex-col justify-between max-sm:flex-row max-sm:w-full max-sm:mt-5">
                        <Box className="max-sm:flex">
                            <Typography className="text-gray-400 max-sm:text-black max-sm:!ml-5" variant="body2"><FormattedMessage id="member_since" /></Typography>
                            <Typography className="text-white max-sm:text-gray-600" variant="body2">20-10-2025</Typography>
                        </Box>
                        <Box className="max-sm:flex">
                            <Typography className="text-gray-400 max-sm:text-black max-sm:!ml-5" variant="body2"><FormattedMessage id="access_level" /></Typography>
                            <Typography className="text-white max-sm:text-gray-700" variant="body2"><FormattedMessage id="full_powers" /></Typography>
                        </Box>
                    </Box>
                </Box>

                {/* Admin Roles & Profile Management */}
                <Box className="" dir="rtl">
                    {/* Permissions & Access */}
                    <Box sx={{ backgroundColor: theme.palette.background.paper, float: language === 'en' && 'left !important' }} className="mt-10 w-7/12 rounded-xl px-4 py-4 float-right max-sm:float-none max-sm:w-full" dir={language === 'en' ? 'ltr' : 'rtl'}>
                        <Box className="flex items-center">
                            <AdminPanelSettingsOutlinedIcon fontSize="large" />
                            <Typography variant="h6" fontWeight={800} className="!mr-2"><FormattedMessage id="permissions_access" /></Typography>
                        </Box>
                        <Box className="mt-5 grid grid-cols-2 gap-x-5 gap-y-7 max-sm:grid-cols-1">
                            <Box className="h-24 flex items-center justify-between px-3 rounded-3xl bg-gray-100 overflow-hidden relative shadow-sm" sx={{ boxShadow: theme.palette.mode === 'dark' ? '5px 0px 4px -3px gray' : '5px 0px 4px -3px #A855F7' }}>
                                <Box className="w-12 h-12 rounded-full bg-gray-300 absolute -top-5 -right-6"></Box>
                                <Box className="w-12 h-12 rounded-full bg-gray-300 absolute -bottom-5 -left-6"></Box>
                                <Box className="flex items-center">
                                    <LocalMallOutlinedIcon fontSize="large" className="mr-2 text-purple-500" />
                                    <Box className="mr-5">
                                        <Typography variant="h6" fontWeight={800} className="text-black"><FormattedMessage id="product_management" /></Typography>
                                        <Typography variant="body2" className="text-gray-500 !mt-5"><FormattedMessage id="product_management_description" /></Typography>
                                    </Box>
                                </Box>
                                <Switch color="success" checked={true} />
                            </Box>
                            <Box className="h-24 flex items-center justify-between px-3 rounded-3xl bg-gray-100 overflow-hidden relative" sx={{ boxShadow: theme.palette.mode === 'dark' ? '5px 0px 4px -3px gray' : '5px 0px 4px -3px #A855F7' }}>
                                <Box className="w-12 h-12 rounded-full bg-gray-300 absolute -top-5 -right-6"></Box>
                                <Box className="w-12 h-12 rounded-full bg-gray-300 absolute -bottom-5 -left-6"></Box>
                                <Box className="flex items-center">
                                    <CategoryOutlinedIcon fontSize="large" className="mr-2 text-purple-500" />
                                    <Box className="mr-5">
                                        <Typography variant="h6" fontWeight={800} className="text-black"><FormattedMessage id="category_management" /></Typography>
                                        <Typography variant="body2" className="text-gray-500 !mt-5"><FormattedMessage id="category_management_description" /></Typography>
                                    </Box>
                                </Box>
                                <Switch color="success" checked={true} />
                            </Box>
                            <Box className="h-24 flex items-center justify-between px-3 rounded-3xl bg-gray-100 overflow-hidden relative" sx={{ boxShadow: theme.palette.mode === 'dark' ? '5px 0px 4px -3px gray' : '5px 0px 4px -3px #A855F7' }}>
                                <Box className="w-12 h-12 rounded-full bg-gray-300 absolute -top-5 -right-6"></Box>
                                <Box className="w-12 h-12 rounded-full bg-gray-300 absolute -bottom-5 -left-6"></Box>
                                <Box className="flex items-center">
                                    <PeopleOutlineIcon fontSize="large" className="mr-2 text-purple-500" />
                                    <Box className="mr-5">
                                        <Typography variant="h6" fontWeight={800} className="text-black"><FormattedMessage id="user_management" /></Typography>
                                        <Typography variant="body2" className="text-gray-500 !mt-5"><FormattedMessage id="user_management_description" /></Typography>
                                    </Box>
                                </Box>
                                <Switch color="success" checked={true} />
                            </Box>
                            <Box className="h-24 flex items-center justify-between px-3 rounded-3xl bg-gray-100 overflow-hidden relative" sx={{ boxShadow: theme.palette.mode === 'dark' ? '5px 0px 4px -3px gray' : '5px 0px 4px -3px #A855F7' }}>
                                <Box className="w-12 h-12 rounded-full bg-gray-300 absolute -top-5 -right-6"></Box>
                                <Box className="w-12 h-12 rounded-full bg-gray-300 absolute -bottom-5 -left-6"></Box>
                                <Box className="flex items-center">
                                    <CampaignOutlinedIcon fontSize="large" className="mr-2 text-purple-500" />
                                    <Box className="mr-5">
                                        <Typography variant="h6" fontWeight={800} className="text-black"><FormattedMessage id="banner_management" /></Typography>
                                        <Typography variant="body2" className="text-gray-500 !mt-5"><FormattedMessage id="banner_management_description" /></Typography>
                                    </Box>
                                </Box>
                                <Switch color="success" checked={true} />
                            </Box>
                        </Box>
                    </Box>

                    {/* Security & Settings */}
                    <Box sx={{ backgroundColor: theme.palette.background.paper, float: language === 'en' ? 'right' : 'left' }} className="mt-10 w-4/12 rounded-xl px-4 py-4 float-left max-sm:float-none max-sm:w-full" dir={language === 'en' ? 'ltr' : "rtl"}>
                        <Box className="flex items-center">
                            <GppGoodOutlinedIcon fontSize="large" />
                            <Typography variant="h6" fontWeight={800} className="!mr-2"><FormattedMessage id="security_settings" /></Typography>
                        </Box>
                        <Box className="h-24 flex items-center justify-between px-3 rounded-3xl bg-gray-100 overflow-hidden relative shadow-sm mt-5 cursor-pointer" onClick={() => setPopup('update-password', 'flex')} sx={{ boxShadow: theme.palette.mode === 'dark' ? '10px 0px gray' : '10px 0px #A855F7' }}>
                            <Box className="w-12 h-12 rounded-full bg-gray-300 absolute -top-5 -right-6 !z-0"></Box>
                            <Box className="w-12 h-12 rounded-full bg-gray-300 absolute -bottom-5 -left-6 !z-0"></Box>
                            <Box className="flex items-center">
                                <LockOpenOutlinedIcon fontSize="large" className="mr-2 text-purple-500" />
                                <Box className="mr-5">
                                    <Typography variant="h6" fontWeight={800} className="text-black"><FormattedMessage id="reset_password" /></Typography>
                                    <Typography variant="body2" className="text-gray-500 !mt-5"><FormattedMessage id="reset_password_description" /></Typography>
                                </Box>
                            </Box>
                        </Box>
                        <Box className="h-24 flex items-center justify-between px-3 rounded-3xl bg-gray-100 overflow-hidden relative shadow-sm mt-5 cursor-pointer" onClick={handleClick} sx={{ boxShadow: theme.palette.mode === 'dark' ? '10px 0px gray' : '10px 0px #A855F7' }}>
                            <Box className="w-12 h-12 rounded-full bg-gray-300 absolute -top-5 -right-6"></Box>
                            <Box className="w-12 h-12 rounded-full bg-gray-300 absolute -bottom-5 -left-6"></Box>
                            <Box className="flex items-center">
                                <GTranslateOutlinedIcon fontSize="large" className="mr-2 text-purple-500" />
                                <Box className="mr-5">
                                    <Typography variant="h6" fontWeight={800} className="text-black"><FormattedMessage id="system_language" /></Typography>
                                    <Typography variant="body2" className="text-gray-500 !mt-5"><FormattedMessage id="system_language_description" /></Typography>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                </Box>

                {/* Languages Menu */}
                <Menu
                    anchorEl={anchorEl}
                    id="account-menu"
                    open={open}
                    onClose={handleClose}
                    slotProps={{
                        paper: {
                            elevation: 0,
                            sx: {
                                overflow: 'visible',
                                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                mt: 1.5,
                                width: '30%',
                                '& .MuiAvatar-root': {
                                    width: 32,
                                    height: 32,
                                    ml: -0.5,
                                    mr: 1,
                                },
                                '&::before': {
                                    content: '""',
                                    display: 'block',
                                    position: 'absolute',
                                    top: 0,
                                    right: 14,
                                    width: 10,
                                    height: 10,
                                    bgcolor: 'background.paper',
                                    transform: 'translateY(-50%) rotate(45deg)',
                                    zIndex: 0,
                                },
                            },
                        },
                    }}
                    transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                    dir="rtl"
                >
                    <MenuItem sx={{ background: lang === 'en' && '#F3F4F6' }} onClick={() => { setLang('en'); }}>
                        <ListItemIcon className="ml-5">
                            {
                                sendWait && lang === 'en' ?
                                    <CircularProgress size={20} className="" color="white" />
                                    :
                                    <img src={AuImage} />
                            }
                        </ListItemIcon>
                        <FormattedMessage id="english_language" />
                    </MenuItem>
                    <MenuItem sx={{ background: lang === 'ar' && '#F3F4F6' }} className="!mt-5" onClick={() => { setLang('ar'); }}>
                        <ListItemIcon className="ml-5">
                            {
                                sendWait && lang === 'ar' ?
                                    <CircularProgress size={20} className="" color="white" />
                                    :
                                    <img src={SyImage} />
                            }
                        </ListItemIcon>
                        <FormattedMessage id="arabic_language" />
                    </MenuItem>
                </Menu>
            </Box>
        </>
    );
}

export default Profile;