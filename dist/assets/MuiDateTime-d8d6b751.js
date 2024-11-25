import{j as e,R as l}from"./index-1d78c4ac.js";import{P as c}from"./ParentCard-b3c2f72c.js";import{C as r}from"./ChildCard-8626bfcd.js";import{B as x}from"./Breadcrumb-4b5ba697.js";import{P as h}from"./PageContainer-51f17055.js";import{C as o}from"./CustomTextField-cf77374e.js";import{L as a,A as p}from"./index-fee8f92e.js";import{C as m}from"./CodeDialog-4128d6b6.js";import{G as i}from"./Grid-ba112631.js";import{M as f,D as y,T as j}from"./TimePicker-f84ac46a.js";import"./Card-ed0a9074.js";import"./Box-3b2e6d90.js";import"./CardHeader-4375bfdf.js";import"./Divider-32914f08.js";import"./dividerClasses-40064371.js";import"./CardContent-97c31a3d.js";import"./index.esm-4ca6571d.js";import"./Link-5958468e.js";import"./TextField-84ec9af9.js";import"./FormControl-8a17c62f.js";import"./utils-5ebfb48b.js";import"./useFormControl-9666228d.js";import"./isMuiElement-a2555389.js";import"./useId-521a9597.js";import"./formControlState-a1fb9590.js";import"./Select-07709760.js";import"./Popover-e3ff4288.js";import"./Modal-5026ae4f.js";import"./ownerWindow-f1e1d6ee.js";import"./createChainedFunction-0bab83cf.js";import"./utils-f13413e5.js";import"./Portal-8f313b54.js";import"./debounce-517eeb3c.js";import"./Grow-cf41a8df.js";import"./List-eaf26c6f.js";import"./useControlled-05793c79.js";import"./IconButton-6eb83b27.js";import"./useThemeProps-fa04b35d.js";import"./useThemeProps-a461f42f.js";import"./DialogContent-aa8a214a.js";import"./Button-6de5bece.js";import"./DialogActions-d883cc36.js";import"./colorManipulator-94529648.js";import"./InputAdornment-d2fe32aa.js";import"./index-0f1c3eaf.js";import"./index-5a0c5ef2.js";import"./index-6a3f0062.js";import"./index-0c50ee4d.js";import"./Tooltip-58d28098.js";import"./Popper-880e6f72.js";import"./createPopper-04c39de4.js";import"./DialogTitle-be3ad24b.js";import"./toConsumableArray-d8b147df.js";import"./useMediaQuery-4c88f6cc.js";import"./DesktopWrapper-d49f0e8c.js";import"./Tabs-44f41707.js";import"./KeyboardArrowRight-3d509d4a.js";const T=()=>e.jsx(e.Fragment,{children:e.jsx(m,{children:`
import * as React from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { MobileDateTimePicker } from '@mui/x-date-pickers/MobileDateTimePicker';
import { styled } from '@mui/material/styles';
import { TextField } from '@mui/material';

const CustomTextField = styled((props: any) => <TextField {...props} />)(({ theme }) => ({
  '& .MuiOutlinedInput-input::-webkit-input-placeholder': {
    color: theme.palette.text.secondary,
    opacity: '0.8',
  },
  '& .MuiOutlinedInput-input.Mui-disabled::-webkit-input-placeholder': {
    color: theme.palette.text.secondary,
    opacity: '1',
  },
  '& .Mui-disabled .MuiOutlinedInput-notchedOutline': {
    borderColor: theme.palette.grey[200],
  },
}));

<LocalizationProvider dateAdapter={AdapterDateFns}>
    <MobileDateTimePicker
        onChange={(newValue) => {
            setValue3(newValue);
        }}
        renderInput={(inputProps) => (
            <CustomTextField
                fullWidth
                variant="outlined"
                size="small"
                inputProps={{ 'aria-label': 'basic date picker' }}
                {...inputProps}
            />
        )}
        value={value3}
    />
</LocalizationProvider>
`})}),D=()=>e.jsx(e.Fragment,{children:e.jsx(m,{children:`
import * as React from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { styled } from '@mui/material/styles';
import { TextField } from '@mui/material';

const CustomTextField = styled((props: any) => <TextField {...props} />)(({ theme }) => ({
  '& .MuiOutlinedInput-input::-webkit-input-placeholder': {
    color: theme.palette.text.secondary,
    opacity: '0.8',
  },
  '& .MuiOutlinedInput-input.Mui-disabled::-webkit-input-placeholder': {
    color: theme.palette.text.secondary,
    opacity: '1',
  },
  '& .Mui-disabled .MuiOutlinedInput-notchedOutline': {
    borderColor: theme.palette.grey[200],
  },
}));

<LocalizationProvider dateAdapter={AdapterDateFns}>
    <DateTimePicker
        renderInput={(props) => (
            <CustomTextField
                {...props}
                fullWidth
                size="small"
                sx={{
                    '& .MuiSvgIcon-root': {
                        width: '18px',
                        height: '18px',
                    },
                    '& .MuiFormHelperText-root': {
                        display: 'none',
                    },
                }}
            />
        )}
        value={value}
        onChange={(newValue) => {
        setValue(newValue);
        }}
    />
</LocalizationProvider>
`})}),k=()=>e.jsx(e.Fragment,{children:e.jsx(m,{children:`
import * as React from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { styled } from '@mui/material/styles';
import { TextField } from '@mui/material';

const CustomTextField = styled((props: any) => <TextField {...props} />)(({ theme }) => ({
  '& .MuiOutlinedInput-input::-webkit-input-placeholder': {
    color: theme.palette.text.secondary,
    opacity: '0.8',
  },
  '& .MuiOutlinedInput-input.Mui-disabled::-webkit-input-placeholder': {
    color: theme.palette.text.secondary,
    opacity: '1',
  },
  '& .Mui-disabled .MuiOutlinedInput-notchedOutline': {
    borderColor: theme.palette.grey[200],
  },
}));

<LocalizationProvider dateAdapter={AdapterDateFns}>
    <TimePicker
        value={value2}
        onChange={(newValue) => {
            setValue2(newValue);
        }}
        renderInput={(params) => (
            <CustomTextField
                size="small"
                {...params}
                fullWidth
                sx={{
                    '& .MuiSvgIcon-root': {
                        width: '18px',
                        height: '18px',
                    },
                    '& .MuiFormHelperText-root': {
                        display: 'none',
                    },
                }}
            />
        )}
    />
</LocalizationProvider>
`})}),g=[{to:"/",title:"Home"},{title:"Date Time"}],Ce=()=>{const[s,d]=l.useState(new Date),[n,u]=l.useState(new Date);return e.jsxs(h,{title:"Date Time",description:"this is Date Time page",children:[e.jsx(x,{title:"Date Picker",items:g}),e.jsx(c,{title:"Date Time",children:e.jsxs(i,{container:!0,spacing:3,children:[e.jsx(i,{item:!0,xs:12,lg:6,sm:6,display:"flex",alignItems:"stretch",children:e.jsx(r,{title:"Basic",codeModel:e.jsx(T,{}),children:e.jsx(a,{dateAdapter:p,children:e.jsx(f,{placeholder:"Start date",onChange:()=>{},renderInput:t=>e.jsx(o,{fullWidth:!0,variant:"outlined",size:"small",inputProps:{"aria-label":"basic date picker"},...t}),value:new Date})})})}),e.jsx(i,{item:!0,xs:12,lg:6,sm:6,display:"flex",alignItems:"stretch",children:e.jsx(r,{title:"Different Design",codeModel:e.jsx(D,{}),children:e.jsx(a,{dateAdapter:p,children:e.jsx(y,{renderInput:t=>e.jsx(o,{...t,fullWidth:!0,size:"small",sx:{"& .MuiSvgIcon-root":{width:"18px",height:"18px"},"& .MuiFormHelperText-root":{display:"none"}}}),placeholder:"DateTimePicker",value:s,onChange:t=>{d(t)}})})})}),e.jsx(i,{item:!0,xs:12,lg:6,sm:6,display:"flex",alignItems:"stretch",children:e.jsx(r,{title:"Timepicker",codeModel:e.jsx(k,{}),children:e.jsx(a,{dateAdapter:p,children:e.jsx(j,{value:n,onChange:t=>{u(t)},renderInput:t=>e.jsx(o,{size:"small",...t,fullWidth:!0,sx:{"& .MuiSvgIcon-root":{width:"18px",height:"18px"},"& .MuiFormHelperText-root":{display:"none"}}})})})})})]})})]})};export{Ce as default};
