import{R as c,j as e}from"./index-1d78c4ac.js";import{C as o}from"./CustomTextField-cf77374e.js";import{C as b}from"./CustomCheckbox-0154e390.js";import{C as t}from"./CustomFormLabel-ad90862e.js";import{P as x}from"./ParentCard-b3c2f72c.js";import{F as s}from"./FormControlLabel-d06535e3.js";import{B as m}from"./Button-6de5bece.js";import{C as w}from"./CustomSelect-caffa199.js";import{C as f}from"./CustomRadio-12ec259e.js";import{C as g}from"./CodeDialog-4128d6b6.js";import{G as a}from"./Grid-ba112631.js";import{F as d}from"./FormControl-8a17c62f.js";import{R as T}from"./RadioGroup-a420755c.js";import{M as I}from"./MenuItem-39bf6f11.js";import{A as W}from"./Alert-eeacdfc1.js";import{B as R}from"./Box-3b2e6d90.js";import{bn as S,E as B,b7 as C}from"./index.esm-4ca6571d.js";import{S as L}from"./Stack-74791772.js";import{O as p}from"./Select-07709760.js";import{I as h}from"./InputAdornment-d2fe32aa.js";import{P as O}from"./PageContainer-51f17055.js";import{B as P}from"./Breadcrumb-4b5ba697.js";import"./TextField-84ec9af9.js";import"./useId-521a9597.js";import"./formControlState-a1fb9590.js";import"./useFormControl-9666228d.js";import"./SwitchBase-a9247a40.js";import"./useControlled-05793c79.js";import"./Card-ed0a9074.js";import"./CardHeader-4375bfdf.js";import"./Divider-32914f08.js";import"./dividerClasses-40064371.js";import"./CardContent-97c31a3d.js";import"./Radio-aefd0abb.js";import"./createChainedFunction-0bab83cf.js";import"./Tooltip-58d28098.js";import"./Popper-880e6f72.js";import"./Portal-8f313b54.js";import"./createPopper-04c39de4.js";import"./Grow-cf41a8df.js";import"./utils-f13413e5.js";import"./IconButton-6eb83b27.js";import"./DialogContent-aa8a214a.js";import"./Modal-5026ae4f.js";import"./ownerWindow-f1e1d6ee.js";import"./DialogTitle-be3ad24b.js";import"./toConsumableArray-d8b147df.js";import"./utils-5ebfb48b.js";import"./isMuiElement-a2555389.js";import"./FormGroup-2de31926.js";import"./List-eaf26c6f.js";import"./listItemTextClasses-76a31095.js";import"./useSlot-a49cf6b5.js";import"./Close-feb8b2ff.js";import"./createStack-08af7ebe.js";import"./styled-db48c038.js";import"./useThemeProps-a461f42f.js";import"./Popover-e3ff4288.js";import"./debounce-517eeb3c.js";import"./Link-5958468e.js";const M=()=>{const[l,u]=c.useState({checkedB:!1}),n=i=>{u({...l,[i.target.name]:i.target.checked})};return e.jsx(x,{title:"Ordrinary Form",children:e.jsxs("form",{children:[e.jsx(t,{sx:{mt:0},htmlFor:"email-address",children:"Email"}),e.jsx(o,{id:"email-address",helperText:"We'll never share your email with anyone else.",variant:"outlined",fullWidth:!0}),e.jsx(t,{htmlFor:"ordinary-outlined-password-input",children:"Password"}),e.jsx(o,{id:"ordinary-outlined-password-input",type:"password",autoComplete:"current-password",variant:"outlined",fullWidth:!0,sx:{mb:"10px"}}),e.jsx(s,{control:e.jsx(b,{checked:l.checkedB,onChange:n,name:"checkedB",color:"primary"}),label:"Check Me Out!",sx:{mb:1}}),e.jsx("div",{children:e.jsx(m,{color:"primary",variant:"contained",children:"Submit"})})]})})},A=()=>e.jsx(e.Fragment,{children:e.jsx(g,{children:`
import * as React from 'react';
import { styled } from '@mui/material/styles';
import { Typography } from '@mui/material';
import { TextField } from '@mui/material';
import { Select } from '@mui/material';
import { FormControl } from '@mui/material';
import Radio, { RadioProps } from '@mui/material/Radio';
import Checkbox, { CheckboxProps } from '@mui/material/Checkbox';

const BpIcon = styled('span')(({ theme }) => ({
  borderRadius: 3,
  width: 19,
  height: 19,
  marginLeft: '4px',
  boxShadow:
    theme.palette.mode === 'dark'
      ? '0 0 0 1px {theme.palette.grey[200]}'
      : 'inset 0 0 0 1px {theme.palette.grey[300]}',
  backgroundColor: 'transparent',

  '.Mui-focusVisible &': {
    outline:
      theme.palette.mode === 'dark'
        ? '0px auto {theme.palette.grey[200]}'
        : '0px auto  {theme.palette.grey[300]}',
    outlineOffset: 2,
  },
  'input:hover ~ &': {
    backgroundColor: theme.palette.mode === 'dark' ? theme.palette.primary : theme.palette.primary,
  },
  'input:disabled ~ &': {
    boxShadow: 'none',
    background: theme.palette.grey[100],
  },
}));

const BpCheckedIcon = styled(BpIcon)({
  boxShadow: 'none',
  width: 19,
  height: 19,
  '&:before': {
    display: 'block',
    width: 19,
    height: 19,
    backgroundImage:
      "url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath" +
      " fill-rule='evenodd' clip-rule='evenodd' d='M12 5c-.28 0-.53.11-.71.29L7 9.59l-2.29-2.3a1.003 " +
      "1.003 0 00-1.42 1.42l3 3c.18.18.43.29.71.29s.53-.11.71-.29l5-5A1.003 1.003 0 0012 5z' fill='%23fff'/%3E%3C/svg%3E")",
    content: '""',
  },
});

const BpIcon2 = styled('span')(({ theme }) => ({
  borderRadius: '50%',
  width: 21,
  height: 21,
  boxShadow:
    theme.palette.mode === 'dark'
      ? '0 0 0 1px {theme.palette.grey[200]}'
      : 'inset 0 0 0 1px {theme.palette.grey[300]}',
  backgroundColor: 'transparent',
  '.Mui-focusVisible &': {
    outline:
      theme.palette.mode === 'dark'
        ? '0px auto {theme.palette.grey[200]}'
        : '0px auto  {theme.palette.grey[300]}',
    outlineOffset: 2,
  },
  'input:hover ~ &': {
    backgroundColor: theme.palette.primary,
  },
  'input:disabled ~ &': {
    boxShadow: 'none',
    background: theme.palette.grey[100],
  },
}));

const BpCheckedIcon2 = styled(BpIcon2)(({ theme }) => ({
  boxShadow: 'none',
  '&:before': {
    display: 'block',
    width: 21,
    height: 21,
    backgroundImage:
      theme.palette.mode === 'dark'
        ? 'radial-gradient({theme.palette.background.paper},{theme.palette.background.paper} 28%,transparent 32%)'
        : 'radial-gradient(#fff,#fff 28%,transparent 32%)',
    content: '""',
  },
}));

const CustomTextField = styled((props) => <TextField {...props} />)(({ theme }) => ({
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

const CustomFormLabel = styled((props) => (
  <Typography
    variant="subtitle1"
    fontWeight={600}
    {...props}
    component="label"
    htmlFor={props.htmlFor}
  />
))(() => ({
  marginBottom: '5px',
  marginTop: '25px',
  display: 'block',
}));

const CustomSelect = styled((props) => <Select {...props} />)(({}) => ({}));

function CustomCheckbox(props: CheckboxProps) {
  return (
    <Checkbox
      disableRipple
      color={props.color ? props.color : 'default'}
      checkedIcon={
        <BpCheckedIcon
          sx={{
            backgroundColor: props.color ? '{props.color}.main' : 'primary.main',
          }}
        />
      }
      icon={<BpIcon />}
      inputProps={{ 'aria-label': 'Checkbox demo' }}
      {...props}
    />
  );
}

function CustomRadio(props: RadioProps) {
  return (
    <Radio
      disableRipple
      color="default"
      checkedIcon={
        <BpCheckedIcon2
          sx={{
            backgroundColor: props.color ? '{props.color}.main' : 'primary.main',
          }}
        />
      }
      icon={<BpIcon2 />}
      inputProps={{ 'aria-label': 'Checkbox demo' }}
      {...props}
    />
  );
}

const numbers = [
  {
    value: 'one',
    label: 'One',
  },
  {
    value: 'two',
    label: 'Two',
  },
  {
    value: 'three',
    label: 'Three',
  },
  {
    value: 'four',
    label: 'Four',
  },
];

const [state, setState] = React.useState({
    checkedA: false,
    checkedB: false,
    checkedC: false,
});

const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
};

const [value, setValue] = React.useState('');

const handleChange2 = (event) => {
    setValue(event.target.value);
};

const [number, setNumber] = React.useState('');

const handleChange3 = (event) => {
    setNumber(event.target.value);
};

<form>
    <CustomFormLabel
        sx={{
            mt: 0,
        }}
        htmlFor="success-input"
    >
        Success Input
    </CustomFormLabel>
    <CustomTextField
        id="success-input"
        variant="outlined"
        defaultValue="Success value"
        fullWidth
        required
        sx={{
            '& input:valid + fieldset': {
              borderColor: '#39cb7f',
            },
            '& input:invalid + fieldset': {
              borderColor: '#fc4b6c',
            },
        }}
    />
    <CustomFormLabel htmlFor="error-input">Error Input</CustomFormLabel>
    <CustomTextField
        id="error-input"
        variant="outlined"
        fullWidth
        required
        error
    />
    <FormControl fullWidth error>
        <CustomFormLabel htmlFor="error-text-input">Input with Error text</CustomFormLabel>
        <CustomTextField
            id="error-text-input"
            variant="outlined"
            fullWidth
            required
            error
            helperText="Incorrect entry."
        />
    </FormControl>
</form>
`})}),E=[{value:"one",label:"One"},{value:"two",label:"Two"},{value:"three",label:"Three"},{value:"four",label:"Four"}],V=()=>{const[l,u]=c.useState({checkedA:!1,checkedB:!1,checkedC:!1}),n=r=>{u({...l,[r.target.name]:r.target.checked})},[i,F]=c.useState(""),j=r=>{F(r.target.value)},[y,v]=c.useState(""),k=r=>{v(r.target.value)};return e.jsx(x,{title:"Default Form",codeModel:e.jsx(A,{}),children:e.jsxs("form",{children:[e.jsx(t,{sx:{mt:0},htmlFor:"default-value",children:"Default Text"}),e.jsx(o,{id:"default-value",variant:"outlined",defaultValue:"George deo",fullWidth:!0}),e.jsx(t,{htmlFor:"email-text",children:"Email"}),e.jsx(o,{id:"email-text",type:"email",variant:"outlined",fullWidth:!0}),e.jsx(t,{htmlFor:"default-outlined-password-input",children:"Password"}),e.jsx(o,{id:"default-outlined-password-input",type:"password",autoComplete:"current-password",variant:"outlined",fullWidth:!0}),e.jsx(t,{htmlFor:"outlined-multiline-static",children:"Textarea"}),e.jsx(o,{id:"outlined-multiline-static",multiline:!0,rows:4,variant:"outlined",fullWidth:!0}),e.jsx(t,{htmlFor:"readonly-text",children:"Read Only"}),e.jsx(o,{id:"readonly-text",defaultValue:"Hello World",InputProps:{readOnly:!0},variant:"outlined",fullWidth:!0}),e.jsxs(a,{container:!0,spacing:0,my:2,children:[e.jsxs(a,{item:!0,lg:4,md:6,sm:12,children:[e.jsx(s,{control:e.jsx(b,{checked:l.checkedA,onChange:n,name:"checkedA",color:"primary"}),label:"Check this custom checkbox"}),e.jsx(s,{control:e.jsx(b,{checked:l.checkedB,onChange:n,name:"checkedB",color:"primary"}),label:"Check this custom checkbox"}),e.jsx(s,{control:e.jsx(b,{checked:l.checkedC,onChange:n,name:"checkedC",color:"primary"}),label:"Check this custom checkbox"})]}),e.jsx(a,{item:!0,lg:4,md:6,sm:12,children:e.jsx(d,{component:"fieldset",children:e.jsxs(T,{"aria-label":"gender",name:"gender1",value:i,onChange:j,children:[e.jsx(s,{value:"radio1",control:e.jsx(f,{}),label:"Toggle this custom radio"}),e.jsx(s,{value:"radio2",control:e.jsx(f,{}),label:"Toggle this custom radio"}),e.jsx(s,{value:"radio3",control:e.jsx(f,{}),label:"Toggle this custom radio"})]})})})]}),e.jsx(t,{htmlFor:"standard-select-number",children:"Select"}),e.jsx(w,{fullWidth:!0,id:"standard-select-number",variant:"outlined",value:y,onChange:k,sx:{mb:2},children:E.map(r=>e.jsx(I,{value:r.value,children:r.label},r.value))}),e.jsx("div",{children:e.jsx(m,{color:"primary",variant:"contained",children:"Submit"})})]})})},q=()=>e.jsx(e.Fragment,{children:e.jsx(g,{children:`
import * as React from 'react';
import { styled } from '@mui/material/styles';
import { Typography } from '@mui/material';
import { TextField } from '@mui/material';
import { Select } from '@mui/material';
import { FormControl } from '@mui/material';
import Radio, { RadioProps } from '@mui/material/Radio';

const BpIcon2 = styled('span')(({ theme }) => ({
  borderRadius: '50%',
  width: 21,
  height: 21,
  boxShadow:
    theme.palette.mode === 'dark'
      ? '0 0 0 1px {theme.palette.grey[200]}'
      : 'inset 0 0 0 1px {theme.palette.grey[300]}',
  backgroundColor: 'transparent',
  '.Mui-focusVisible &': {
    outline:
      theme.palette.mode === 'dark'
        ? '0px auto {theme.palette.grey[200]}'
        : '0px auto  {theme.palette.grey[300]}',
    outlineOffset: 2,
  },
  'input:hover ~ &': {
    backgroundColor: theme.palette.primary,
  },
  'input:disabled ~ &': {
    boxShadow: 'none',
    background: theme.palette.grey[100],
  },
}));

const BpCheckedIcon2 = styled(BpIcon2)(({ theme }) => ({
  boxShadow: 'none',
  '&:before': {
    display: 'block',
    width: 21,
    height: 21,
    backgroundImage:
      theme.palette.mode === 'dark'
        ? 'radial-gradient({theme.palette.background.paper},{theme.palette.background.paper} 28%,transparent 32%)'
        : 'radial-gradient(#fff,#fff 28%,transparent 32%)',
    content: '""',
  },
}));

const CustomTextField = styled((props) => <TextField {...props} />)(({ theme }) => ({
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

const CustomFormLabel = styled((props) => (
  <Typography
    variant="subtitle1"
    fontWeight={600}
    {...props}
    component="label"
    htmlFor={props.htmlFor}
  />
))(() => ({
  marginBottom: '5px',
  marginTop: '25px',
  display: 'block',
}));

const CustomSelect = styled((props) => <Select {...props} />)(({}) => ({}));

function CustomRadio(props: RadioProps) {
  return (
    <Radio
      disableRipple
      color="default"
      checkedIcon={
        <BpCheckedIcon2
          sx={{
            backgroundColor: props.color ? '{props.color}.main' : 'primary.main',
          }}
        />
      }
      icon={<BpIcon2 />}
      inputProps={{ 'aria-label': 'Checkbox demo' }}
      {...props}
    />
  );
}

const currencies = [
  {
    value: 'female',
    label: 'Female',
  },
  {
    value: 'male',
    label: 'Male',
  },
  {
    value: 'other',
    label: 'Other',
  },
];

const countries = [
  {
    value: 'india',
    label: 'India',
  },
  {
    value: 'uk',
    label: 'United Kingdom',
  },
  {
    value: 'srilanka',
    label: 'Srilanka',
  },
];

const [currency, setCurrency] = React.useState('');

const handleChange2 = (event) => {
    setCurrency(event.target.value);
};

const [selectedValue, setSelectedValue] = React.useState('');

const handleChange3 = (event) => {
    setSelectedValue(event.target.value);
};

const [country, setCountry] = React.useState('');

const handleChange4 = (event) => {
    setCountry(event.target.value);
};

<form>
    <CustomFormLabel
        sx={{
            mt: 0,
        }}
        htmlFor="success-input"
    >
        Success Input
    </CustomFormLabel>
    <CustomTextField
        id="success-input"
        variant="outlined"
        defaultValue="Success value"
        fullWidth
        required
        sx={{
            '& input:valid + fieldset': {
              borderColor: '#39cb7f',
            },
            '& input:invalid + fieldset': {
              borderColor: '#fc4b6c',
            },
        }}
    />
    <CustomFormLabel htmlFor="error-input">Error Input</CustomFormLabel>
    <CustomTextField
        id="error-input"
        variant="outlined"
        fullWidth
        required
        error
    />
    <FormControl fullWidth error>
        <CustomFormLabel htmlFor="error-text-input">Input with Error text</CustomFormLabel>
        <CustomTextField
            id="error-text-input"
            variant="outlined"
            fullWidth
            required
            error
            helperText="Incorrect entry."
        />
    </FormControl>
</form>
`})}),U=[{value:"female",label:"Female"},{value:"male",label:"Male"},{value:"other",label:"Other"}],D=[{value:"india",label:"India"},{value:"uk",label:"United Kingdom"},{value:"srilanka",label:"Srilanka"}],N=()=>{const[l,u]=c.useState(""),n=r=>{u(r.target.value)},[i,F]=c.useState(""),j=r=>{F(r.target.value)},[y,v]=c.useState(""),k=r=>{v(r.target.value)};return e.jsx("div",{children:e.jsxs(x,{title:"Basic Header Form",codeModel:e.jsx(q,{}),footer:e.jsxs(e.Fragment,{children:[e.jsx(m,{variant:"contained",color:"error",sx:{mr:1},children:"Cancel"}),e.jsx(m,{variant:"contained",color:"primary",children:"Submit"})]}),children:[e.jsx(W,{severity:"info",children:"Person Info"}),e.jsx("form",{children:e.jsxs(a,{container:!0,spacing:3,mb:3,children:[e.jsxs(a,{item:!0,lg:6,md:12,sm:12,children:[e.jsx(t,{htmlFor:"fname-text",children:"First Name"}),e.jsx(o,{id:"fname-text",variant:"outlined",fullWidth:!0}),e.jsx(t,{htmlFor:"standard-select-currency",children:"Select Gender"}),e.jsx(w,{id:"standard-select-currency",value:l,onChange:n,fullWidth:!0,variant:"outlined",children:U.map(r=>e.jsx(I,{value:r.value,children:r.label},r.value))}),e.jsx(t,{children:"Membership"}),e.jsx(d,{sx:{width:"100%"},children:e.jsxs(R,{children:[e.jsx(s,{checked:i==="a",onChange:j,value:"a",label:"Free",name:"radio-button-demo",control:e.jsx(f,{}),inputprops:{"aria-label":"A"}}),e.jsx(s,{checked:i==="b",onChange:j,value:"b",label:"Paid",control:e.jsx(f,{}),name:"radio-button-demo",inputprops:{"aria-label":"B"}})]})})]}),e.jsxs(a,{item:!0,lg:6,md:12,sm:12,children:[e.jsx(t,{htmlFor:"lname-text",children:"Last Name"}),e.jsx(o,{id:"lname-text",variant:"outlined",fullWidth:!0}),e.jsx(t,{htmlFor:"date",children:"Date of Birth"}),e.jsx(o,{id:"date",type:"date",variant:"outlined",fullWidth:!0,InputLabelProps:{shrink:!0}})]})]})}),e.jsx(W,{severity:"info",children:"Address"}),e.jsxs(a,{container:!0,spacing:3,mb:3,mt:1,children:[e.jsxs(a,{item:!0,lg:12,md:12,sm:12,xs:12,children:[e.jsx(t,{sx:{mt:0},htmlFor:"street-text",children:"Street"}),e.jsx(o,{id:"street-text",variant:"outlined",fullWidth:!0})]}),e.jsxs(a,{item:!0,lg:6,md:12,sm:12,xs:12,children:[e.jsx(t,{sx:{mt:0},htmlFor:"city-text",children:"City"}),e.jsx(o,{id:"city-text",variant:"outlined",fullWidth:!0})]}),e.jsxs(a,{item:!0,lg:6,md:12,sm:12,xs:12,children:[e.jsx(t,{sx:{mt:0},htmlFor:"state-text",children:"State"}),e.jsx(o,{id:"state-text",variant:"outlined",fullWidth:!0})]}),e.jsxs(a,{item:!0,lg:6,md:12,sm:12,xs:12,children:[e.jsx(t,{sx:{mt:0},htmlFor:"post-text",children:"Post Code"}),e.jsx(o,{id:"post-text",variant:"outlined",fullWidth:!0})]}),e.jsxs(a,{item:!0,lg:6,md:12,sm:12,xs:12,children:[e.jsx(t,{sx:{mt:0},htmlFor:"country-text",children:"Country"}),e.jsx(w,{id:"country-select",value:y,onChange:k,fullWidth:!0,variant:"outlined",children:D.map(r=>e.jsx(I,{value:r.value,children:r.label},r.value))})]})]})]})})},G=()=>e.jsx(x,{title:"Readonly Form",children:e.jsxs("form",{children:[e.jsx(t,{sx:{mt:0},htmlFor:"ro-name",children:"Name"}),e.jsx(o,{id:"ro-name",variant:"outlined",defaultValue:"Wrappixel",fullWidth:!0,InputProps:{readOnly:!0}}),e.jsx(t,{htmlFor:"ro-email-address",children:"Email"}),e.jsx(o,{id:"ro-email-address",helperText:"We'll never share your email with anyone else.",variant:"outlined",defaultValue:"info@wrappixel.com",fullWidth:!0,InputProps:{readOnly:!0}}),e.jsx(t,{htmlFor:"ro-outlined-password-input",children:"Password"}),e.jsx(o,{id:"ro-outlined-password-input",type:"password",autoComplete:"current-password",defaultValue:"info@wrappixel.com",variant:"outlined",fullWidth:!0,InputProps:{readOnly:!0},sx:{mb:2}}),e.jsx("div",{children:e.jsx(m,{color:"primary",variant:"contained",children:"Submit"})})]})}),H=()=>e.jsx(x,{title:"Disabled Form",children:e.jsxs("form",{children:[e.jsx(t,{sx:{mt:0},htmlFor:"df-name",children:"Name"}),e.jsx(o,{id:"df-name",variant:"outlined",fullWidth:!0,disabled:!0,sx:{"& .MuiOutlinedInput-notchedOutline":{borderColor:l=>`${l.palette.mode==="dark"?"rgba(255, 255, 255, 0.12) !important":"#dee3e9 !important"}`}}}),e.jsx(t,{htmlFor:"df-email-address",children:"Email"}),e.jsx(o,{id:"df-email-address",helperText:"We'll never share your email with anyone else.",variant:"outlined",fullWidth:!0,disabled:!0,sx:{"& .MuiOutlinedInput-notchedOutline":{borderColor:l=>`${l.palette.mode==="dark"?"rgba(255, 255, 255, 0.12) !important":"#dee3e9 !important"}`}}}),e.jsx(t,{htmlFor:"df-outlined-password-input",children:"Password"}),e.jsx(o,{id:"df-outlined-password-input",type:"password",autoComplete:"current-password",variant:"outlined",fullWidth:!0,disabled:!0,sx:{mb:2,"& .MuiOutlinedInput-notchedOutline":{borderColor:l=>`${l.palette.mode==="dark"?"rgba(255, 255, 255, 0.12) !important":"#dee3e9 !important"}`}}}),e.jsx("div",{children:e.jsx(m,{color:"primary",variant:"contained",disabled:!0,children:"Submit"})})]})}),$=()=>e.jsx(e.Fragment,{children:e.jsx(g,{children:`
import * as React from 'react';
import { styled } from '@mui/material/styles';
import { Typography } from '@mui/material';
import Checkbox, { CheckboxProps } from '@mui/material/Checkbox';

const BpIcon = styled('span')(({ theme }) => ({
  borderRadius: 3,
  width: 19,
  height: 19,
  marginLeft: '4px',
  boxShadow:
    theme.palette.mode === 'dark'
      ? '0 0 0 1px {theme.palette.grey[200]}'
      : 'inset 0 0 0 1px {theme.palette.grey[300]}',
  backgroundColor: 'transparent',

  '.Mui-focusVisible &': {
    outline:
      theme.palette.mode === 'dark'
        ? '0px auto {theme.palette.grey[200]}'
        : '0px auto  {theme.palette.grey[300]}',
    outlineOffset: 2,
  },
  'input:hover ~ &': {
    backgroundColor: theme.palette.mode === 'dark' ? theme.palette.primary : theme.palette.primary,
  },
  'input:disabled ~ &': {
    boxShadow: 'none',
    background: theme.palette.grey[100],
  },
}));

const BpCheckedIcon = styled(BpIcon)({
  boxShadow: 'none',
  width: 19,
  height: 19,
  '&:before': {
    display: 'block',
    width: 19,
    height: 19,
    backgroundImage:
      "url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath" +
      " fill-rule='evenodd' clip-rule='evenodd' d='M12 5c-.28 0-.53.11-.71.29L7 9.59l-2.29-2.3a1.003 " +
      "1.003 0 00-1.42 1.42l3 3c.18.18.43.29.71.29s.53-.11.71-.29l5-5A1.003 1.003 0 0012 5z' fill='%23fff'/%3E%3C/svg%3E")",
    content: '""',
  },
});

// Inspired by blueprintjs
function CustomCheckbox(props: CheckboxProps) {
  return (
    <Checkbox
      disableRipple
      color={props.color ? props.color : 'default'}
      checkedIcon={
        <BpCheckedIcon
          sx={{
            backgroundColor: props.color ? '{props.color}.main' : 'primary.main',
          }}
        />
      }
      icon={<BpIcon />}
      inputProps={{ 'aria-label': 'Checkbox demo' }}
      {...props}
    />
  );
}

const CustomFormLabel = styled((props) => (
  <Typography
    variant="subtitle1"
    fontWeight={600}
    {...props}
    component="label"
    htmlFor={props.htmlFor}
  />
))(() => ({
  marginBottom: '5px',
  marginTop: '25px',
  display: 'block',
}));

const [state, setState] = React.useState({
    checkedA: false,
});

const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
};

<form>
    <FormControl fullWidth>
        <CustomFormLabel
            sx={{
              mt: 0,
            }}
            htmlFor="username-text"
        >
            Username
        </CustomFormLabel>
        <OutlinedInput
            startAdornment={
              <InputAdornment position="start">
                <IconUser width={20} />
              </InputAdornment>
            }
            id="username-text"
            placeholder="Username"
            fullWidth
        />
    </FormControl>
    <FormControl fullWidth>
        <CustomFormLabel htmlFor="mail-text">Email</CustomFormLabel>
        <OutlinedInput
            startAdornment={
              <InputAdornment position="start">
                <IconMail width={20} />
              </InputAdornment>
            }
            id="mail-text"
            placeholder="Email"
            fullWidth
        />
    </FormControl>
    <FormControl fullWidth>
        <CustomFormLabel htmlFor="pwd-text">Password</CustomFormLabel>
        <OutlinedInput
            type="password"
            startAdornment={
              <InputAdornment position="start">
                <IconLock width={20} />
              </InputAdornment>
            }
            id="pwd-text"
            placeholder="Password"
            fullWidth
        />
    </FormControl>
    <FormControl fullWidth>
        <CustomFormLabel htmlFor="cpwd-text">Confirm Password</CustomFormLabel>
        <OutlinedInput
            startAdornment={
              <InputAdornment position="start">
                <IconLock width={20} />
              </InputAdornment>
            }
            id="cpwd-text"
            placeholder="Confirm Password"
            fullWidth
        />
    </FormControl>

    <FormControlLabel
        control={
            <CustomCheckbox checked={state.checkedA} onChange={handleChange} name="checkedA" />
        }
        sx={{
            mt: '10px',
        }}
        label="Remember Me!"
    />
</form>
`})}),z=()=>{const[l,u]=c.useState({checkedA:!1}),n=i=>{u({...l,[i.target.name]:i.target.checked})};return e.jsx(x,{title:"Form with Left Icon",codeModel:e.jsx($,{}),footer:e.jsx(e.Fragment,{children:e.jsxs(L,{direction:"row",spacing:2,children:[e.jsx(m,{color:"primary",variant:"contained",children:"Submit"}),e.jsx(m,{variant:"contained",color:"error",children:"Cancel"})]})}),children:e.jsxs("form",{children:[e.jsxs(d,{fullWidth:!0,children:[e.jsx(t,{sx:{mt:0},htmlFor:"username-text",children:"Username"}),e.jsx(p,{startAdornment:e.jsx(h,{position:"start",children:e.jsx(S,{width:20})}),id:"username-text",placeholder:"Username",fullWidth:!0})]}),e.jsxs(d,{fullWidth:!0,children:[e.jsx(t,{htmlFor:"mail-text",children:"Email"}),e.jsx(p,{startAdornment:e.jsx(h,{position:"start",children:e.jsx(B,{width:20})}),id:"mail-text",placeholder:"Email",fullWidth:!0})]}),e.jsxs(d,{fullWidth:!0,children:[e.jsx(t,{htmlFor:"pwd-text",children:"Password"}),e.jsx(p,{type:"password",startAdornment:e.jsx(h,{position:"start",children:e.jsx(C,{width:20})}),id:"pwd-text",placeholder:"Password",fullWidth:!0})]}),e.jsxs(d,{fullWidth:!0,children:[e.jsx(t,{htmlFor:"cpwd-text",children:"Confirm Password"}),e.jsx(p,{startAdornment:e.jsx(h,{position:"start",children:e.jsx(C,{width:20})}),id:"cpwd-text",placeholder:"Confirm Password",fullWidth:!0})]}),e.jsx(s,{control:e.jsx(b,{checked:l.checkedA,onChange:n,name:"checkedA"}),sx:{mt:"10px"},label:"Remember Me!"})]})})},K=()=>{const[l,u]=c.useState({checkedB:!1}),n=i=>{u({...l,[i.target.name]:i.target.checked})};return e.jsx(x,{title:"Form with Right Icon",footer:e.jsx(e.Fragment,{children:e.jsxs(L,{direction:"row",spacing:1,children:[e.jsx(m,{color:"primary",variant:"contained",children:"Submit"}),e.jsx(m,{variant:"contained",color:"error",children:"Cancel"})]})}),children:e.jsxs("form",{children:[e.jsxs(d,{fullWidth:!0,children:[e.jsx(t,{sx:{mt:0},htmlFor:"username2-text",children:"Username"}),e.jsx(p,{endAdornment:e.jsx(h,{position:"end",children:e.jsx(S,{width:20})}),id:"username2-text",placeholder:"Username",fullWidth:!0})]}),e.jsxs(d,{fullWidth:!0,children:[e.jsx(t,{htmlFor:"mail2-text",children:"Email"}),e.jsx(p,{endAdornment:e.jsx(h,{position:"end",children:e.jsx(B,{width:20})}),id:"mail2-text",placeholder:"Email",fullWidth:!0})]}),e.jsxs(d,{fullWidth:!0,children:[e.jsx(t,{htmlFor:"pwd2-text",children:"Password"}),e.jsx(p,{type:"password",endAdornment:e.jsx(h,{position:"end",children:e.jsx(C,{width:20})}),id:"pwd2-text",placeholder:"Password",fullWidth:!0})]}),e.jsxs(d,{fullWidth:!0,children:[e.jsx(t,{htmlFor:"cpwd2-text",children:"Confirm Password"}),e.jsx(p,{endAdornment:e.jsx(h,{position:"end",children:e.jsx(C,{width:20})}),id:"cpwd2-text",placeholder:"Confirm Password",fullWidth:!0})]}),e.jsx(s,{control:e.jsx(b,{checked:l.checkedB,onChange:n,name:"checkedB"}),sx:{mt:"10px"},label:"Remember Me!"})]})})},J=()=>e.jsx(e.Fragment,{children:e.jsx(g,{children:`
import * as React from 'react';
import { styled } from '@mui/material/styles';
import { Typography } from '@mui/material';
import { TextField } from '@mui/material';
import { FormControl } from '@mui/material';

const CustomTextField = styled((props) => <TextField {...props} />)(({ theme }) => ({
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

const CustomFormLabel = styled((props) => (
  <Typography
    variant="subtitle1"
    fontWeight={600}
    {...props}
    component="label"
    htmlFor={props.htmlFor}
  />
))(() => ({
  marginBottom: '5px',
  marginTop: '25px',
  display: 'block',
}));

<form>
    <CustomFormLabel
        sx={{
            mt: 0,
        }}
        htmlFor="success-input"
    >
        Success Input
    </CustomFormLabel>
    <CustomTextField
        id="success-input"
        variant="outlined"
        defaultValue="Success value"
        fullWidth
        required
        sx={{
            '& input:valid + fieldset': {
              borderColor: '#39cb7f',
            },
            '& input:invalid + fieldset': {
              borderColor: '#fc4b6c',
            },
        }}
    />
    <CustomFormLabel htmlFor="error-input">Error Input</CustomFormLabel>
    <CustomTextField
        id="error-input"
        variant="outlined"
        fullWidth
        required
        error
    />
    <FormControl fullWidth error>
        <CustomFormLabel htmlFor="error-text-input">Input with Error text</CustomFormLabel>
        <CustomTextField
            id="error-text-input"
            variant="outlined"
            fullWidth
            required
            error
            helperText="Incorrect entry."
        />
    </FormControl>
</form>
`})}),Q=()=>e.jsx(x,{title:"Input Variants",codeModel:e.jsx(J,{}),children:e.jsxs("form",{children:[e.jsx(t,{sx:{mt:0},htmlFor:"success-input",children:"Success Input"}),e.jsx(o,{id:"success-input",variant:"outlined",defaultValue:"Success value",fullWidth:!0,required:!0,sx:{"& input:valid + fieldset":{borderColor:"#39cb7f"},"& input:invalid + fieldset":{borderColor:"#fc4b6c"}}}),e.jsx(t,{htmlFor:"error-input",children:"Error Input"}),e.jsx(o,{id:"error-input",variant:"outlined",fullWidth:!0,required:!0,error:!0}),e.jsxs(d,{fullWidth:!0,error:!0,children:[e.jsx(t,{htmlFor:"error-text-input",children:"Input with Error text"}),e.jsx(o,{id:"error-text-input",variant:"outlined",fullWidth:!0,required:!0,error:!0,helperText:"Incorrect entry."})]})]})}),X=[{to:"/",title:"Home"},{title:"Form Layouts"}],ot=()=>e.jsxs(O,{title:"Form Layouts",description:"this is innerpage",children:[e.jsx(P,{title:"Form Layouts",items:X}),e.jsxs(a,{container:!0,spacing:3,children:[e.jsx(a,{item:!0,lg:12,md:12,xs:12,children:e.jsx(M,{})}),e.jsx(a,{item:!0,lg:12,md:12,xs:12,children:e.jsx(Q,{})}),e.jsx(a,{item:!0,lg:12,md:12,xs:12,children:e.jsx(V,{})}),e.jsx(a,{item:!0,lg:12,md:12,xs:12,children:e.jsx(N,{})}),e.jsx(a,{item:!0,lg:12,md:12,xs:12,children:e.jsx(G,{})}),e.jsx(a,{item:!0,lg:12,md:12,xs:12,children:e.jsx(H,{})}),e.jsx(a,{item:!0,lg:6,md:12,xs:12,children:e.jsx(z,{})}),e.jsx(a,{item:!0,lg:6,md:12,xs:12,children:e.jsx(K,{})})]})]});export{ot as default};
