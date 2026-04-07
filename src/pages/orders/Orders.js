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
import OrderDetails from "../../popup/OrderDetails";
import { buildOrderStatusFormData } from "../../helper/OrderStatusFormData";
import { useNavigate } from "react-router-dom";

function Orders() {
    const { language, host } = useConstants();
    const { wait } = useContext(AuthContext);
    const theme = useTheme();
    const { getWait, setGetWait, sendWait, setSendWait } = useWaits();
    const { setPopup } = usePopups();
    const { search, setSearch } = useSearch();
    const intl = useIntl();
    const { StyledTableCell, StyledTableRow } = useTableStyles();
    const { openSnackBar, type, message, setSnackBar, setOpenSnackBar } = useSnackBar();
    const { page, setPage, currentPage, setCurrentPage, totalPages, setTotalPages } = usePagination();
    const [ordersCounts, setOrdersCounts] = useState();
    const [orders, setOrders] = useState([]);
    const [order, setOrder] = useState();
    const navigate = useNavigate();

    {/* Get Orders Function */ }
    const getOrders = async () => {
        let result = await Fetch(host + `/api/orders?page=${page + 1}&search=${search}`, 'GET', null);
        if (result.status === 200) {
            setTotalPages(result.data.data.pagination.last_page);
            setOrdersCounts(result.data.data.pagination.total);
            setOrders(result.data.data.orders);
            setCurrentPage(page);
        }

        setGetWait(false);
    }

    {/* Change Order Status */ }
    const changeStatus = async (order, status, paymentStatus) => {
        setSendWait(true);
        let formData = null;
        if (status) {
            formData = buildOrderStatusFormData({
                status: status,
                paymentStatus: order.payment_status,
            });
        } else if (paymentStatus) {
            formData = buildOrderStatusFormData({
                status: order.status,
                paymentStatus: paymentStatus,
            });
        }


        let result = await Fetch(host + `/employee/orders/${order.id}/status`, 'POST', formData);

        setOrders(prev =>
            prev.map(o =>
                o.id === order.id ? { ...o, payment_status: result.data.data.order.payment_status, status: result.data.data.order.status } : o
            )
        );
        if (result.status === 200) {
            setSnackBar('success', <FormattedMessage id="updated_success" />);
        }

        setSendWait(false);
    }

    {/*  Get Specefic Order Details */ }
    const orderDetails = async (id) => {
        setOrder(orders.filter((order) => order.id === id)[0]);
    }

    useEffect(() => {
        getOrders();
    }, [page, search]);

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
                                            <Typography variant="h5" className="py-2 px-3 max-sm:!text-lg"><FormattedMessage id='orders' /></Typography>
                                            {/* <Button variant="contained" onClick={() => setPopup('add', 'flex')} className="!bg-purple-500">
                                                <AddIcon />
                                                <FormattedMessage id='add_category' />
                                            </Button> */}
                                        </Box>


                                        <Box>
                                            <TableContainer className="" component={Paper} dir={language === 'en' ? 'ltr' : "rtl"}>
                                                {/* Top Table */}
                                                <Box className="min-h-12 py-2 px-2 flex justify-between items-center max-sm:flex-col">
                                                    <Box className="w-full flex items-center">
                                                        {/* <FilterAltOutlinedIcon onClick={() => setPopup('filter', 'flex')} className="cursor-pointer" fontSize="large" /> */}
                                                        <Box className="w-2/4 relative mr-3 max-sm:w-full">
                                                            <input style={{ backgroundColor: theme.palette.background.default }} onChange={(e) => setSearch(e.target.value)} className="w-11/12 h-12 rounded-md border indent-14 outline-none max-sm:w-full" placeholder={intl.formatMessage({ id: "search_order" })} />
                                                            <SearchOutlinedIcon className="absolute top-1/2 -translate-y-1/2 right-3 text-gray-500" sx={{ right: language === 'en' && '90%' }} />
                                                        </Box>
                                                    </Box>
                                                    <Box className="flex w-2/4 items-center justify-end max-sm:mt-2 max-sm:w-full max-sm:justify-between">
                                                        <Typography variant="body1" className="!text-gray-500"><FormattedMessage id='total_orders' />: {ordersCounts}</Typography>
                                                    </Box>
                                                </Box>

                                                {/* Orders Table */}
                                                <Table className="" sx={{ minWidth: 700 }} aria-label="customized table">
                                                    <TableHead className="bg-gray-200">
                                                        <TableRow sx={{ backgroundColor: theme.palette.background.paper }}>
                                                            <StyledTableCell align={language === 'en' ? "left" : "right"}><FormattedMessage id='id' /></StyledTableCell>
                                                            <StyledTableCell align={language === 'en' ? "left" : "right"}><FormattedMessage id='client' /></StyledTableCell>
                                                            <StyledTableCell align={language === 'en' ? "left" : "right"}><FormattedMessage id='payment_method' /></StyledTableCell>
                                                            <StyledTableCell align={language === 'en' ? "left" : "right"} className=""><FormattedMessage id='payment_status' /></StyledTableCell>
                                                            <StyledTableCell align={language === 'en' ? "left" : "right"} className=""><FormattedMessage id='status' /></StyledTableCell>
                                                            <StyledTableCell align={language === 'en' ? 'left' : 'right'} className="!text-center"><FormattedMessage id='procedures' /></StyledTableCell>
                                                        </TableRow>
                                                    </TableHead>
                                                    <TableBody>
                                                        {orders.map((order, index) => (
                                                            <StyledTableRow key={index} className="hover:bg-gray-200 duration-100 cursor-pointer">
                                                                <StyledTableCell align={language === 'en' ? "left" : "right"} onClick={() => navigate(`/orders/${order.id}`)}>{order.id}</StyledTableCell>
                                                                <StyledTableCell align={language === 'en' ? "left" : "right"} className="!flex">
                                                                    <Box>
                                                                        {
                                                                            order.user.image ?
                                                                                <Avatar className="w-10 h-10" alt="Cindy Baker" src={`${host}/${order.user.image}`} />
                                                                                :
                                                                                <Box className='w-10 h-10 rounded-full bg-gray-400 text-white text-3xl flex justify-center items-center'>
                                                                                    {order.user.full_name.charAt(0)}
                                                                                </Box>
                                                                        }
                                                                    </Box>
                                                                    <Box className='ml-3'>
                                                                        <Typography variant="body2">{order.user.full_name}</Typography>
                                                                    </Box>
                                                                </StyledTableCell>
                                                                <StyledTableCell align={language === 'en' ? "left" : "right"} className=""><FormattedMessage id={order.payment_method} /></StyledTableCell>
                                                                <StyledTableCell align={language === 'en' ? "left" : "right"} className="">
                                                                    <select value={order.payment_status} disabled={sendWait} onChange={(e) => changeStatus(order, null, e.target.value)} className="bg-transparent outline-none">
                                                                        <option value='pending'><FormattedMessage id="pending" /></option>
                                                                        <option value='paid'><FormattedMessage id="paid" /></option>
                                                                    </select>
                                                                    {/* <FormattedMessage id={order.payment_status} /> */}
                                                                </StyledTableCell>
                                                                <StyledTableCell align={language === 'en' ? "left" : "right"} className="">
                                                                    <select value={order.status} disabled={sendWait} onChange={(e) => changeStatus(order, e.target.value, null)} className="bg-transparent outline-none">
                                                                        <option value='pending'><FormattedMessage id="pending" /></option>
                                                                        <option value='accepted'><FormattedMessage id="accepted" /></option>
                                                                        <option value='in_preparation'><FormattedMessage id="in_preparation" /></option>
                                                                        <option value='to_deliver'><FormattedMessage id="to_deliver" /></option>
                                                                        <option value='delivered'><FormattedMessage id="delivered" /></option>
                                                                        <option value='canceled'><FormattedMessage id="canceled" /></option>
                                                                    </select>
                                                                    {/* <FormattedMessage id={order.status} /> */}
                                                                </StyledTableCell>
                                                                <StyledTableCell align="right">
                                                                    <Box className="!flex justify-center items-center">
                                                                        {/* <Button variant="contained" className="!bg-red-300 !font-bold !text-red-800 hover:!bg-red-500 hover:!text-white duration-300 !mr-2" onClick={(e) => { orderDetails(order.id); setPopup('delete', 'flex') }}><FormattedMessage id='delete' /></Button> */}
                                                                        <Button disabled={sendWait} variant="contained" className="!bg-green-300 !font-bold !text-green-800 hover:!bg-green-500 hover:!text-white duration-300" onClick={(e) => { orderDetails(order.id); setPopup('details', 'flex') }}><FormattedMessage id='details' /></Button>
                                                                    </Box>
                                                                </StyledTableCell>
                                                            </StyledTableRow>
                                                        ))}
                                                    </TableBody>
                                                </Table>

                                                {/* Pagination Buttons */}
                                                <Box className="flex justify-center items-center" dir="rtl">
                                                    <Button disabled={page + 1 === totalPages} className="cursor-pointer" onClick={() => setPage(currentPage + 1)}>
                                                        <NavigateNextIcon fontSize="large" />
                                                    </Button>
                                                    <Typography variant="body1" className="!text-xl" dir='ltr'>{currentPage + 1} / {totalPages}</Typography>
                                                    <Button disabled={page + 1 === 1} className="cursor-pointer" onClick={() => setPage(currentPage - 1)}>
                                                        <NavigateBeforeIcon fontSize="large" />
                                                    </Button>
                                                </Box>
                                            </TableContainer>
                                        </Box>
                                    </Box>
                            }
                        </Box>

                        {/* Order Details Popup */}
                        <Box id="details" sx={{ right: language === 'en' && '0' }} className="w-4/5 h-screen fixed top-0 bg-gray-200 bg-opacity-5 hidden justify-center items-center">
                            <OrderDetails order={order} onClickCancel={() => setPopup('details', 'none')} />
                        </Box>

                        {/* Update Category Popup */}
                        {/* <Box id="update" sx={{ right: language === 'en' && '0' }} className="w-4/5 h-screen fixed top-0 bg-gray-200 bg-opacity-5 hidden justify-center items-center">
                            <UpdateCategory category={category} onClickCancel={() => setPopup('update', 'none')} getCategories={getCategories} setSnackBar={setSnackBar} />
                        </Box> */}

                        {/* Delete Category Popup */}
                        {/* <Box id="delete" sx={{ right: language === 'en' && '0' }} className="w-4/5 h-screen fixed top-0 bg-gray-200 bg-opacity-5 hidden justify-center items-center">
                            <DeleteDialog onClickConfirm={deleteCategory} onClickCancel={() => setPopup('delete', 'none')} title={<FormattedMessage id="delete_category_title" />} subtitle={<FormattedMessage id="delete_category_description" />} />
                        </Box> */}

                        {/* Snackbar Alert */}
                        <SnackbarAlert open={openSnackBar} message={message} severity={type} onClose={() => setOpenSnackBar(false)} />
                    </Box>
            }
        </>
    );
}

export default Orders;