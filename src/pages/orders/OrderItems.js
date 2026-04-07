import { Avatar, Box, Button, CircularProgress, Paper, Table, TableBody, TableContainer, TableHead, TableRow, Typography, useTheme } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../../context/AuthContext";
import { useConstants } from "../../hooks/UseConstants";
import { useWaits } from "../../hooks/UseWait";
import { FormattedMessage, useIntl } from "react-intl";
import { usePopups } from "../../hooks/UsePopups";
import { useSearch } from "../../hooks/UseSearch";
import { useTableStyles } from "../../hooks/UseTableStyles";
import { usePagination } from "../../hooks/UsePagination";
import SnackbarAlert from "../../components/SnackBar";
import useSnackBar from "../../hooks/UseSnackBar";
import AddIcon from '@mui/icons-material/Add';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import Fetch from "../../services/Fetch";
import DeleteDialog from "../../popup/DeleteDialog";
import AddCategory from "../../popup/AddCategory";
import UpdateCategory from "../../popup/UpdateCategory";
import { useParams } from "react-router-dom";

function OrderItems() {
    const { language, host } = useConstants();
    const { wait } = useContext(AuthContext);
    const theme = useTheme();
    const { getWait, setGetWait } = useWaits();
    const { setPopup } = usePopups();
    const { search, setSearch } = useSearch();
    const intl = useIntl();
    const { StyledTableCell, StyledTableRow } = useTableStyles();
    const { openSnackBar, type, message, setSnackBar, setOpenSnackBar } = useSnackBar();
    const [items, setItems] = useState([]);
    const param = useParams();

    {/* Get Order Items Function */ }
    const getOrderItems = async () => {
        let result = await Fetch(host + `/api/orders/${param.id}`, 'GET', null);
        if (result.status === 200) {
            setItems(result.data.data.order.items);
            console.log(result.data.data.order.items);

        }

        setGetWait(false);
    }

    useEffect(() => {
        getOrderItems();
    }, [search]);

    return (
        <>
            {
                wait ?
                    <Box className="w-full h-screen relative flex justify-center items-center" sx={{ float: language === 'en' && 'right' }}>
                        <CircularProgress className="!text-purple-500" size={70} />
                    </Box>
                    :
                    <Box sx={{ backgroundColor: theme.palette.background.default }}>
                        <Box className="w-4/5 rounded-xl relative" dir={language === 'en' ? 'ltr' : "rtl"} sx={{ float: language === 'en' && 'right' }}>
                            {
                                getWait ?
                                    <Box className="w-full h-screen relative flex justify-center items-center">
                                        <CircularProgress className="!text-purple-500" size={70} />
                                    </Box>
                                    :
                                    <Box sx={{ backgroundColor: theme.palette.background.paper }} className="bg-white rounded-xl px-2">
                                        {/* Top Section */}
                                        <Box sx={{ backgroundColor: theme.palette.background.default }} className="flex justify-between items-center px-2">
                                            <Typography variant="h5" className="py-2 px-3 max-sm:!text-lg"><FormattedMessage id='items' /></Typography>
                                        </Box>


                                        <Box>
                                            <TableContainer className="" component={Paper} dir={language === 'en' ? 'ltr' : "rtl"}>
                                                {/* Top Table */}
                                                <Box className="min-h-12 py-2 px-2 flex justify-between items-center max-sm:flex-col">
                                                    <Box className="flex w-full items-center justify-end max-sm:mt-2 max-sm:w-full max-sm:justify-between">
                                                        <Typography variant="body1" className="!text-gray-500"><FormattedMessage id='total_items' />: {items.length}</Typography>
                                                    </Box>
                                                </Box>

                                                {/* Categories Table */}
                                                <Table className="" sx={{ minWidth: 700 }} aria-label="customized table">
                                                    <TableHead className="bg-gray-200">
                                                        <TableRow sx={{ backgroundColor: theme.palette.background.paper }}>
                                                            <StyledTableCell align={language === 'en' ? "left" : "right"}><FormattedMessage id='product' /></StyledTableCell>
                                                            <StyledTableCell align={language === 'en' ? "left" : "right"}><FormattedMessage id='amount' /></StyledTableCell>
                                                            <StyledTableCell align={language === 'en' ? "left" : "right"}><FormattedMessage id='total_price' /></StyledTableCell>
                                                        </TableRow>
                                                    </TableHead>
                                                    <TableBody>
                                                        {items.map((item, index) => (
                                                            <StyledTableRow key={index} className="hover:bg-gray-200 duration-100 cursor-pointer">
                                                                <StyledTableCell align={language === 'en' ? "left" : "right"} className="!flex">
                                                                    <Box>
                                                                        {
                                                                            item.product.images.length != 0 ?
                                                                                <Avatar className="w-10 h-10" alt="Cindy Baker" src={`${host}/${item.product.images[0].image}`} />
                                                                                :
                                                                                <Box className='w-10 h-10 rounded-full bg-gray-400 text-white text-3xl flex justify-center items-center'>
                                                                                    {item.product.name_en.charAt(0)}
                                                                                </Box>
                                                                        }
                                                                    </Box>
                                                                    <Box className='ml-3'>
                                                                        <Typography variant="body2">{language === 'en' ? item.product.name_en : item.product.name_ar}</Typography>
                                                                    </Box>
                                                                </StyledTableCell>
                                                                <StyledTableCell align={language === 'en' ? "left" : "right"} className="">{item.amount}</StyledTableCell>
                                                                <StyledTableCell align={language === 'en' ? "left" : "right"} className="">{item.total_price}</StyledTableCell>
                                                            </StyledTableRow>
                                                        ))}
                                                    </TableBody>
                                                </Table>
                                            </TableContainer>
                                        </Box>
                                    </Box>
                            }
                        </Box>

                        {/* Snackbar Alert */}
                        <SnackbarAlert open={openSnackBar} message={message} severity={type} onClose={() => setOpenSnackBar(false)} />
                    </Box>
            }
        </>
    );
}

export default OrderItems;