import React from 'react';
import { styled, Select } from '@mui/material';

const CustomSelect = styled((props) => <Select {...props} />)(({ theme }) => ({
    '& .MuiOutlinedInput-input': {
        padding: '10px 14px',
    },
    '& .MuiSelect-select': {
        minHeight: 'auto',
    },
}));

export default CustomSelect;
