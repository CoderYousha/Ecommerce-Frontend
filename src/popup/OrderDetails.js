import { Box, Button, Checkbox, CircularProgress, Divider, FormControlLabel, TextField, Typography, useTheme } from "@mui/material";
import { FormattedMessage, useIntl } from "react-intl";
import { useConstants } from "../hooks/UseConstants";
import CloseIcon from '@mui/icons-material/Close';

function OrderDetails({ onClickCancel, order }) {
    const theme = useTheme();
    const { language } = useConstants();
    const intl = useIntl();

    const totalPrice = () => {
        var total_price = 0;
        order?.items?.map((item) =>
            total_price += item.total_price
        )

        return total_price;
    }

    return (
        <Box sx={{ backgroundColor: theme.palette.background.paper }} className="shadow-lg w-3/5 h-fit rounded-3xl px-4 py-5 overflow-y-scroll none-view-scroll max-sm:h-screen max-sm:w-4/5 max-sm:translate-x-0 max-sm:left-0 relative max-sm:overflow-y-scroll" dir={language === 'en' ? 'ltr' : "rtl"}>
            <Typography variant="h5" className="!font-semibold max-sm:!text-xl">
                <FormattedMessage id='order_details' />
            </Typography>
            <CloseIcon onClick={() => { onClickCancel(); }} className="text-gray-700 cursor-pointer absolute top-5 left-5" fontSize="large" sx={{ left: language === 'en' && '90%' }}></CloseIcon>
            <Divider className="!my-5" />
            <Box>
                <Box className='flex justify-between mt-10 max-sm:flex-col'>
                    <TextField variant="outlined" label={<FormattedMessage id="id" />} className="w-2/5 max-sm:w-full" value={order?.id} aria-readonly />
                    <TextField variant="outlined" label={<FormattedMessage id="status" />} className="w-2/5 max-sm:w-full max-sm:!mt-3" value={intl.formatMessage({ id: order?.status || "pending" })} aria-readonly />
                </Box>
                <Box className='flex justify-center mt-10 max-sm:flex-col'>
                    <TextField variant="outlined" label={<FormattedMessage id="price" />} className="w-2/5 max-sm:w-full" value={totalPrice()} aria-readonly />
                </Box>
                <Box className='flex justify-between mt-10 max-sm:flex-col'>
                    <TextField variant="outlined" label={<FormattedMessage id="payment_method" />} className="w-2/5 max-sm:w-full max-sm:!mt-3" value={intl.formatMessage({ id: order?.payment_method || "pending" })} aria-readonly />
                    <TextField variant="outlined" label={<FormattedMessage id="payment_status" />} className="w-2/5 max-sm:w-full max-sm:!mt-3" value={intl.formatMessage({ id: order?.payment_status || "pending" })} aria-readonly />
                </Box>
                <Typography variant="h6" fontWeight={800} className="!mt-10"><FormattedMessage id="location" /></Typography>
                <Box className='flex justify-between mt-3 max-sm:flex-col'>
                    <TextField variant="outlined" label={<FormattedMessage id="city" />} className="w-2/5 max-sm:w-full" value={order?.location.city} aria-readonly />
                    <TextField variant="outlined" label={<FormattedMessage id="street" />} className="w-2/5 max-sm:w-full max-sm:!mt-3" value={order?.location.street} aria-readonly />
                </Box>
                <Box className='flex justify-between mt-10 max-sm:flex-col'>
                    <TextField variant="outlined" label={<FormattedMessage id="building" />} className="w-2/5 max-sm:w-full" value={order?.location.building} aria-readonly />
                    <TextField variant="outlined" label={<FormattedMessage id="floor" />} className="w-2/5 max-sm:w-full max-sm:!mt-3" value={order?.location.floor} aria-readonly />
                </Box>
            </Box>
        </Box>
    );
}

export default OrderDetails;