import{j as e,R as h}from"./index-1d78c4ac.js";import{P as u}from"./ParentCard-b3c2f72c.js";import{C as s}from"./ChildCard-8626bfcd.js";import{B as x}from"./Breadcrumb-4b5ba697.js";import{P as b}from"./PageContainer-51f17055.js";import{C as t}from"./CustomRadio-12ec259e.js";import{B as d}from"./Box-3b2e6d90.js";import{F as n}from"./FormControlLabel-d06535e3.js";import{R as l}from"./Radio-aefd0abb.js";import{R as g}from"./RadioGroup-a420755c.js";import{C as p}from"./CodeDialog-4128d6b6.js";import{G as c}from"./Grid-ba112631.js";import"./Card-ed0a9074.js";import"./CardHeader-4375bfdf.js";import"./Divider-32914f08.js";import"./dividerClasses-40064371.js";import"./CardContent-97c31a3d.js";import"./index.esm-4ca6571d.js";import"./Link-5958468e.js";import"./formControlState-a1fb9590.js";import"./useFormControl-9666228d.js";import"./Stack-74791772.js";import"./createStack-08af7ebe.js";import"./styled-db48c038.js";import"./useThemeProps-a461f42f.js";import"./SwitchBase-a9247a40.js";import"./useControlled-05793c79.js";import"./createChainedFunction-0bab83cf.js";import"./useId-521a9597.js";import"./FormGroup-2de31926.js";import"./Tooltip-58d28098.js";import"./Popper-880e6f72.js";import"./Portal-8f313b54.js";import"./createPopper-04c39de4.js";import"./Grow-cf41a8df.js";import"./utils-f13413e5.js";import"./IconButton-6eb83b27.js";import"./DialogContent-aa8a214a.js";import"./Modal-5026ae4f.js";import"./ownerWindow-f1e1d6ee.js";import"./DialogTitle-be3ad24b.js";import"./toConsumableArray-d8b147df.js";const k=()=>e.jsxs(d,{textAlign:"center",children:[e.jsx(n,{value:"end",control:e.jsx(t,{bgcolor:"#615DFF",checked:!0}),label:"Primary",labelPlacement:"end"}),e.jsx(n,{value:"end",control:e.jsx(t,{bgcolor:"#3DD9EB",checked:!0}),label:"Secondary",labelPlacement:"end"}),e.jsx(n,{value:"end",control:e.jsx(t,{bgcolor:"#39B69A",checked:!0}),label:"Success",labelPlacement:"end"}),e.jsx(n,{value:"end",control:e.jsx(t,{bgcolor:"#FA896B",checked:!0}),label:"Danger",labelPlacement:"end"}),e.jsx(n,{value:"end",control:e.jsx(t,{bgcolor:"#FFAE1F",checked:!0}),label:"Warning",labelPlacement:"end"})]}),C=()=>{const[a,i]=h.useState(!0),r=o=>{i(o.target.checked)};return e.jsxs(d,{textAlign:"center",children:[e.jsx(l,{checked:a,onChange:r,inputprops:{"aria-label":"primary checkbox"}}),e.jsx(l,{disabled:!0,inputprops:{"aria-label":"disabled checked checkbox"}}),e.jsx(l,{color:"default",inputprops:{"aria-label":"checkbox with default color"}})]})},R=()=>{const[a,i]=h.useState(!0),r=o=>{i(o.target.checked)};return e.jsxs(d,{textAlign:"center",children:[e.jsx(l,{checked:a,onChange:r,color:"primary",inputprops:{"aria-label":"primary checkbox"}}),e.jsx(l,{checked:a,onChange:r,color:"secondary",inputprops:{"aria-label":"primary checkbox"}}),e.jsx(l,{checked:a,onChange:r,inputprops:{"aria-label":"primary checkbox"},sx:{color:o=>o.palette.success.main,"&.Mui-checked":{color:o=>o.palette.success.main}}}),e.jsx(l,{checked:a,onChange:r,inputprops:{"aria-label":"primary checkbox"},sx:{color:o=>o.palette.error.main,"&.Mui-checked":{color:o=>o.palette.error.main}}}),e.jsx(l,{checked:a,onChange:r,inputprops:{"aria-label":"primary checkbox"},sx:{color:o=>o.palette.warning.main,"&.Mui-checked":{color:o=>o.palette.warning.main}}})]})},f=()=>{const[a,i]=h.useState("a"),r=m=>{i(m.target.value)},o=m=>({checked:a===m,onChange:r,value:m,name:"size-radio-button-demo",inputProps:{"aria-label":m}});return e.jsxs(d,{textAlign:"center",children:[e.jsx(l,{...o("a"),size:"small"}),e.jsx(l,{...o("b")}),e.jsx(l,{...o("c"),sx:{"& .MuiSvgIcon-root":{fontSize:28}}})]})},j=()=>{const[a,i]=h.useState(!0),r=o=>{i(o.target.checked)};return e.jsxs(d,{textAlign:"center",children:[e.jsx(t,{checked:a,onChange:r,inputprops:{"aria-label":"primary checkbox"}}),e.jsx(t,{disabled:!0,inputprops:{"aria-label":"disabled checked checkbox"}}),e.jsx(t,{color:"default",inputprops:{"aria-label":"checkbox with default color"}})]})},y=()=>e.jsx(d,{textAlign:"center",children:e.jsxs(g,{row:!0,"aria-label":"position",name:"position",defaultValue:"top",children:[e.jsx(n,{value:"top",control:e.jsx(t,{}),label:"Top",labelPlacement:"top"}),e.jsx(n,{value:"start",control:e.jsx(t,{}),label:"Start",labelPlacement:"start"}),e.jsx(n,{value:"bottom",control:e.jsx(t,{}),label:"Bottom",labelPlacement:"bottom"}),e.jsx(n,{value:"end",control:e.jsx(t,{}),label:"End"})]})}),P=()=>e.jsx(e.Fragment,{children:e.jsx(p,{children:`
import * as React from 'react';
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import Radio, { RadioProps } from '@mui/material/Radio';

const BpIcon = styled('span')(({ theme }) => ({
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

const BpCheckedIcon = styled(BpIcon)(({ theme }) => ({
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

function CustomRadio(props: RadioProps) {
  return (
    <Radio
      disableRipple
      color="default"
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

const [checked, setChecked] = React.useState(true);

const handleChange = (event) => {
    setChecked(event.target.checked);
};

<Box textAlign="center">
    <CustomRadio
        checked={checked}
        onChange={handleChange}
        inputProps={{ 'aria-label': 'primary checkbox' }}
    />
    <CustomRadio disabled inputProps={{ 'aria-label': 'disabled checked checkbox' }} />
    <CustomRadio
        checked={!checked}
        inputProps={{ 'aria-label': 'checkbox with default color' }}
    />
</Box>`})}),B=()=>e.jsx(e.Fragment,{children:e.jsx(p,{children:`
import * as React from 'react';
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import Radio, { RadioProps } from '@mui/material/Radio';

const BpIcon = styled('span')(({ theme }) => ({
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

const BpCheckedIcon = styled(BpIcon)(({ theme }) => ({
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

function CustomRadio(props: RadioProps) {
  return (
    <Radio
      disableRipple
      color="default"
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

const [checked, setChecked] = React.useState(true);

const handleChange = (event) => {
    setChecked(event.target.checked);
};

<Box textAlign="center">
    <FormControlLabel
        value="end"
        control={<CustomRadio color="primary" checked />}
        label="Primary"
        labelPlacement="end"
    />
    <FormControlLabel
        value="end"
        control={<CustomRadio color="secondary" checked />}
        label="Secondary"
        labelPlacement="end"
    />
    <FormControlLabel
        value="end"
        control={<CustomRadio color="success" checked />}
        label="Success"
        labelPlacement="end"
    />
    <FormControlLabel
        value="end"
        control={<CustomRadio color="error" checked />}
        label="Danger"
        labelPlacement="end"
    />
    <FormControlLabel
        value="end"
        control={<CustomRadio color="warning" checked />}
        label="Warning"
        labelPlacement="end"
    />
</Box>`})}),v=()=>e.jsx(e.Fragment,{children:e.jsx(p,{children:`
import * as React from 'react';
import { Box, Radio } from '@mui/material';

const [checked, setChecked] = React.useState(true);

const handleChange = (event) => {
    setChecked(event.target.checked);
};

<Box textAlign="center">
    <Radio
        checked={checked}
        onChange={handleChange}
        inputProps={{ 'aria-label': 'primary checkbox' }}
    />
    <Radio disabled inputProps={{ 'aria-label': 'disabled checked checkbox' }} />
    <Radio color="default" inputProps={{ 'aria-label': 'checkbox with default color' }} />
</Box>`})}),S=()=>e.jsx(e.Fragment,{children:e.jsx(p,{children:`
import * as React from 'react';
import { Box, Radio } from '@mui/material';

const [checked, setChecked] = React.useState(true);

const handleChange = (event) => {
    setChecked(event.target.checked);
};

<Box textAlign="center">
    <Radio
        checked={checked}
        onChange={handleChange}
        color="primary"
        inputProps={{ 'aria-label': 'primary checkbox' }}
    />
    <Radio
        checked={checked}
        onChange={handleChange}
        color="secondary"
        inputProps={{ 'aria-label': 'primary checkbox' }}
    />
    <Radio
        checked={checked}
        onChange={handleChange}
        inputProps={{ 'aria-label': 'primary checkbox' }}
        sx={{
            color: (theme) => theme.palette.success.main,
            '&.Mui-checked': {
                color: (theme) => theme.palette.success.main,
            },
        }}
    />
    <Radio
        checked={checked}
        onChange={handleChange}
        inputProps={{ 'aria-label': 'primary checkbox' }}
        sx={{
            color: (theme) => theme.palette.error.main,
            '&.Mui-checked': {
                color: (theme) => theme.palette.error.main,
            },
        }}
    />
    <Radio
        checked={checked}
        onChange={handleChange}
        inputProps={{ 'aria-label': 'primary checkbox' }}
        sx={{
            color: (theme) => theme.palette.warning.main,
            '&.Mui-checked': {
                color: (theme) => theme.palette.warning.main,
            },
        }}
    />
</Box>`})}),I=()=>e.jsx(e.Fragment,{children:e.jsx(p,{children:`
import * as React from 'react';
import { Box, Radio } from '@mui/material';

const [selectedValue, setSelectedValue] = React.useState('a');
const handleChange2 = (event) => {
    setSelectedValue(event.target.value);
};
    
const controlProps = (item) => ({
    checked: selectedValue === item,
    onChange: handleChange2,
    value: item,
    name: 'size-radio-button-demo',
    inputProps: { 'aria-label': item },
});

<Box textAlign="center">
    <Radio {...controlProps('a')} size="small" />
    <Radio {...controlProps('b')} />
    <Radio
        {...controlProps('c')}
        sx={{
            '& .MuiSvgIcon-root': {
                fontSize: 28,
            },
        }}
    />
</Box>`})}),w=()=>e.jsx(e.Fragment,{children:e.jsx(p,{children:`
import * as React from 'react';
import { Box, RadioGroup, FormControlLabel  } from '@mui/material';
import { styled } from '@mui/material/styles';
import Radio, { RadioProps } from '@mui/material/Radio';

const BpIcon = styled('span')(({ theme }) => ({
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

const BpCheckedIcon = styled(BpIcon)(({ theme }) => ({
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

function CustomRadio(props: RadioProps) {
  return (
    <Radio
      disableRipple
      color="default"
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

<Box textAlign="center">
    <RadioGroup row aria-label="position" name="position" defaultValue="top">
        <FormControlLabel value="top" control={<CustomRadio />} label="Top" labelPlacement="top" />
        <FormControlLabel
            value="start"
            control={<CustomRadio />}
            label="Start"
            labelPlacement="start"
        />
        <FormControlLabel
            value="bottom"
            control={<CustomRadio />}
            label="Bottom"
            labelPlacement="bottom"
        />
        <FormControlLabel value="end" control={<CustomRadio />} label="End" />
    </RadioGroup>
</Box>
`})}),F=[{to:"/",title:"Home"},{title:"Radio"}],Ce=()=>e.jsxs(b,{title:"Radio",description:"this is Radio page",children:[e.jsx(x,{title:"Radio",items:F}),e.jsx(u,{title:"Radio",children:e.jsxs(c,{container:!0,spacing:3,children:[e.jsx(c,{item:!0,xs:12,lg:6,sm:6,display:"flex",alignItems:"stretch",children:e.jsx(s,{title:"Custom",codeModel:e.jsx(P,{}),children:e.jsx(j,{})})}),e.jsx(c,{item:!0,xs:12,lg:6,sm:6,display:"flex",alignItems:"stretch",children:e.jsx(s,{title:"Color with Label",codeModel:e.jsx(B,{}),children:e.jsx(k,{})})}),e.jsx(c,{item:!0,xs:12,lg:6,sm:6,display:"flex",alignItems:"stretch",children:e.jsx(s,{title:"Default",codeModel:e.jsx(v,{}),children:e.jsx(C,{})})}),e.jsx(c,{item:!0,xs:12,lg:6,sm:6,display:"flex",alignItems:"stretch",children:e.jsx(s,{title:"Default Colors",codeModel:e.jsx(S,{}),children:e.jsx(R,{})})}),e.jsx(c,{item:!0,xs:12,lg:6,sm:6,display:"flex",alignItems:"stretch",children:e.jsx(s,{title:"Sizes",codeModel:e.jsx(I,{}),children:e.jsx(f,{})})}),e.jsx(c,{item:!0,xs:12,lg:6,sm:6,display:"flex",alignItems:"stretch",children:e.jsx(s,{title:"Position",codeModel:e.jsx(w,{}),children:e.jsx(y,{})})})]})})]});export{Ce as default};
