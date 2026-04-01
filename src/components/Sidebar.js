import { Avatar, Box, Typography } from "@mui/material";
import InboxIcon from '@mui/icons-material/Inbox';
import Person2OutlinedIcon from '@mui/icons-material/Person2Outlined';
import BadgeOutlinedIcon from '@mui/icons-material/BadgeOutlined';
import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined';
import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined';
import CampaignOutlinedIcon from '@mui/icons-material/CampaignOutlined';
import { NavLink } from "react-router-dom";
import { FormattedMessage } from "react-intl";
import AuthContext from "../context/AuthContext";
import { useContext } from "react";
import { useConstants } from "../hooks/UseConstants";

function Sidebar() {
    const {host} = useConstants();
    const { wait, profile } = useContext(AuthContext);
    const contents = [
        {
            "title": <FormattedMessage id="employees" />,
            "icon": <BadgeOutlinedIcon fontSize="large" className="text-purple-500" />,
            "path": "/employees",
        },
        {
            "title": <FormattedMessage id="users" />,
            "icon": <Person2OutlinedIcon fontSize="large" className="text-purple-500" />,
            "path": "/users",
        },
        {
            "title": <FormattedMessage id="categories" />,
            "icon": <CategoryOutlinedIcon fontSize="large" className="text-purple-500" />,
            "path": "/categories",
        },
        {
            "title": <FormattedMessage id="products" />,
            "icon": <LocalMallOutlinedIcon fontSize="large" className="text-purple-500" />,
            "path": "/products",
        },
        {
            "title": <FormattedMessage id="orders" />,
            "icon": <InboxIcon fontSize="large" className="text-purple-500" />,
            "path": "/orders",
        },
        {
            "title": <FormattedMessage id="banners" />,
            "icon": <CampaignOutlinedIcon fontSize="large" className="text-purple-500" />,
            "path": "/banners",
        },
    ];

    return (
        <>
            {
                !wait &&
                <Box className='w-1/5 h-screen overflow-y-scroll none-view-scroll bg-white px-5 float-left'>
                    <Box className='py-5 flex items-center'>
                        <Box className='px-1 py-1 border border-purple-400 border-r-4 border-b-4 rounded-full relative'>
                            {
                                profile.image ?
                                    <Avatar className="w-10 h-10" alt="Cindy Baker" src={`${host}/${profile.image}`} />
                                    :
                                    <Box className='w-10 h-10 rounded-full bg-gray-400 text-white text-3xl flex justify-center items-center'>
                                        {profile.full_name.charAt(0)}
                                    </Box>
                            }
                            {/* <Avatar className="cursor-pointer" alt="Cindy Baker" src="/static/images/avatar/1.jpg" /> */}
                        </Box>
                        <Box className='!ml-5 max-sm:hidden'>
                            <Typography variant="h6" fontWeight={800}>John Mal</Typography>
                            <Typography variant="body2">Admin</Typography>
                        </Box>
                    </Box>
                    <Box className=''>
                        {
                            contents.map((content, index) =>
                                <NavLink key={index} to={content.path} className='mt-5 flex justify-between cursor-pointer rounded-full px-3 py-2'>
                                    {content.icon}
                                    <Typography variant="h6" className="max-sm:hidden" style={{ color: '#A855F7' }}>{content.title}</Typography>
                                </NavLink>
                            )
                        }
                    </Box>
                </Box>
            }
        </>
    );
}

export default Sidebar;