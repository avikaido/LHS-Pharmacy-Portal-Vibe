import{j as e,w as b,R as k}from"./index-1d78c4ac.js";import{B as g}from"./Breadcrumb-4b5ba697.js";import{P as j}from"./PageContainer-51f17055.js";import{P as y}from"./ParentCard-b3c2f72c.js";import{C as c}from"./ChildCard-8626bfcd.js";import{C as o,a as l}from"./CustomCheckbox-0154e390.js";import{F as v}from"./FormControl-8a17c62f.js";import{F as C}from"./FormGroup-2de31926.js";import{F as r}from"./FormControlLabel-d06535e3.js";import{r as f}from"./createSvgIcon-325a983d.js";import{d as w,a as B}from"./FavoriteBorder-e27a2e48.js";import{B as n}from"./Box-3b2e6d90.js";import{C as i}from"./CodeDialog-4128d6b6.js";import{G as a}from"./Grid-ba112631.js";import"./index.esm-4ca6571d.js";import"./Link-5958468e.js";import"./Card-ed0a9074.js";import"./CardHeader-4375bfdf.js";import"./Divider-32914f08.js";import"./dividerClasses-40064371.js";import"./CardContent-97c31a3d.js";import"./SwitchBase-a9247a40.js";import"./useFormControl-9666228d.js";import"./useControlled-05793c79.js";import"./utils-5ebfb48b.js";import"./isMuiElement-a2555389.js";import"./formControlState-a1fb9590.js";import"./Stack-74791772.js";import"./createStack-08af7ebe.js";import"./styled-db48c038.js";import"./useThemeProps-a461f42f.js";import"./createChainedFunction-0bab83cf.js";import"./debounce-517eeb3c.js";import"./useId-521a9597.js";import"./ownerWindow-f1e1d6ee.js";import"./Tooltip-58d28098.js";import"./Popper-880e6f72.js";import"./Portal-8f313b54.js";import"./createPopper-04c39de4.js";import"./Grow-cf41a8df.js";import"./utils-f13413e5.js";import"./IconButton-6eb83b27.js";import"./DialogContent-aa8a214a.js";import"./Modal-5026ae4f.js";import"./DialogTitle-be3ad24b.js";import"./toConsumableArray-d8b147df.js";const I=()=>e.jsx(v,{component:"fieldset",sx:{display:"flex",justifyContent:"center"},children:e.jsxs(C,{"aria-label":"position",row:!0,sx:{justifyContent:"center"},children:[e.jsx(r,{value:"top",control:e.jsx(o,{color:"primary"}),label:"Top",labelPlacement:"top"}),e.jsx(r,{value:"start",control:e.jsx(o,{color:"primary"}),label:"Start",labelPlacement:"start"}),e.jsx(r,{value:"bottom",control:e.jsx(o,{color:"primary"}),label:"Bottom",labelPlacement:"bottom"}),e.jsx(r,{value:"end",control:e.jsx(o,{color:"primary"}),label:"End",labelPlacement:"end"})]})});var u={},F=b;Object.defineProperty(u,"__esModule",{value:!0});var d=u.default=void 0,P=F(f()),S=e;d=u.default=(0,P.default)((0,S.jsx)("path",{d:"M19 5v14H5V5zm0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2"}),"CheckBoxOutlineBlank");var x={},L=b;Object.defineProperty(x,"__esModule",{value:!0});var p=x.default=void 0,R=L(f()),M=e;p=x.default=(0,R.default)((0,M.jsx)("path",{d:"M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.11 0 2-.9 2-2V5c0-1.1-.89-2-2-2m-9 14-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8z"}),"CheckBox");const E=()=>e.jsxs(C,{row:!0,sx:{display:"flex",justifyContent:"center"},children:[e.jsx(r,{control:e.jsx(l,{color:"primary",icon:e.jsx(d,{}),checkedIcon:e.jsx(p,{}),name:"checkednormal"}),label:"Normal Size"}),e.jsx(r,{control:e.jsx(l,{color:"secondary",icon:e.jsx(d,{fontSize:"small"}),checkedIcon:e.jsx(p,{fontSize:"small"}),name:"checkedsmall"}),label:"Small size"}),e.jsx(r,{control:e.jsx(l,{color:"error",icon:e.jsx(w,{}),checkedIcon:e.jsx(B,{}),name:"checkedH"}),label:"Heart"})]}),z=()=>e.jsxs(n,{textAlign:"center",children:[e.jsx(l,{defaultChecked:!0,color:"primary",inputprops:{"aria-label":"checkbox with default color"}}),e.jsx(l,{defaultChecked:!0,color:"secondary",inputprops:{"aria-label":"checkbox with default color"}}),e.jsx(l,{defaultChecked:!0,sx:{color:t=>t.palette.success.main,"&.Mui-checked":{color:t=>t.palette.success.main}}}),e.jsx(l,{defaultChecked:!0,sx:{color:t=>t.palette.error.main,"&.Mui-checked":{color:t=>t.palette.error.main}}}),e.jsx(l,{defaultChecked:!0,sx:{color:t=>t.palette.warning.main,"&.Mui-checked":{color:t=>t.palette.warning.main}}})]}),A=()=>{const[t,s]=k.useState(!0),m=h=>{s(h.target.checked)};return e.jsxs(n,{textAlign:"center",children:[e.jsx(o,{checked:t,onChange:m,inputprops:{"aria-label":"primary checkbox"}}),e.jsx(o,{disabled:!0,checked:!0,inputprops:{"aria-label":"disabled checked checkbox"}}),e.jsx(o,{defaultChecked:!0,indeterminate:!0,color:"secondary",inputprops:{"aria-label":"indeterminate checkbox"}}),e.jsx(o,{defaultChecked:!0,color:"default",inputprops:{"aria-label":"checkbox with default color"}})]})},_=()=>{const[t,s]=k.useState(!0),m=h=>{s(h.target.checked)};return e.jsxs(n,{textAlign:"center",children:[e.jsx(o,{checked:t,onChange:m,inputprops:{"aria-label":"primary checkbox"}}),e.jsx(o,{disabled:!0,checked:!0,inputprops:{"aria-label":"disabled checked checkbox"}}),e.jsx(o,{defaultChecked:!0,indeterminate:!0,inputprops:{"aria-label":"indeterminate checkbox"}}),e.jsx(o,{defaultChecked:!0,color:"default",inputprops:{"aria-label":"checkbox with default color"}})]})},D=()=>e.jsxs(n,{textAlign:"center",children:[e.jsx(r,{control:e.jsx(o,{defaultChecked:!0}),label:"Primary"}),e.jsx(r,{control:e.jsx(o,{defaultChecked:!0,bgcolor:"#3DD9EB",inputprops:{"aria-label":"checkbox with default color"}}),label:"Secondary"}),e.jsx(r,{control:e.jsx(o,{defaultChecked:!0,bgcolor:"#39B69A",inputprops:{"aria-label":"checkbox with default color"}}),label:"Success"}),e.jsx(r,{control:e.jsx(o,{defaultChecked:!0,bgcolor:"#FFAE1F",inputprops:{"aria-label":"checkbox with default color"}}),label:"Warning"}),e.jsx(r,{control:e.jsx(o,{defaultChecked:!0,bgcolor:"#FA896B",inputprops:{"aria-label":"checkbox with default color"}}),label:"Error"})]}),O=()=>e.jsx(e.Fragment,{children:e.jsx(i,{children:`
import * as React from 'react';
import { Box } from '@mui/material';
import CustomCheckbox from '../../theme-elements/CustomCheckbox';
import { styled } from '@mui/material/styles';
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

const [checked, setChecked] = React.useState(true);

const handleChange = (event) => {
    setChecked(event.target.checked);
};

<Box textAlign="center">
    <CustomCheckbox
        checked={checked}
        onChange={handleChange}
        inputProps={{ 'aria-label': 'primary checkbox' }}
    />

    <CustomCheckbox disabled checked inputProps={{ 'aria-label': 'disabled checked checkbox' }} />
    <CustomCheckbox
        defaultChecked
        indeterminate
        color="secondary"
        inputProps={{ 'aria-label': 'indeterminate checkbox' }}
    />
    <CustomCheckbox
        defaultChecked
        color="default"
        inputProps={{ 'aria-label': 'checkbox with default color' }}
    />
</Box>`})}),G=()=>e.jsx(e.Fragment,{children:e.jsx(i,{children:`
import * as React from 'react';
import { Box } from '@mui/material';
import CustomCheckbox from '../../theme-elements/CustomCheckbox';
import { styled } from '@mui/material/styles';
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

const [checked, setChecked] = React.useState(true);

const handleChange = (event) => {
    setChecked(event.target.checked);
};

<Box textAlign="center">
    <FormControlLabel control={<CustomCheckbox defaultChecked />} label="Primary" />
    <FormControlLabel
      control={
        <CustomCheckbox
          defaultChecked
          color="secondary"
          inputProps={{ 'aria-label': 'checkbox with default color' }}
        />
      }
      label="Secondary"
    />
    <FormControlLabel
      control={
        <CustomCheckbox
          defaultChecked
          color="success"
          inputProps={{ 'aria-label': 'checkbox with default color' }}
        />
      }
      label="Success"
    />
    <FormControlLabel
      control={
        <CustomCheckbox
          defaultChecked
          color="warning"
          inputProps={{ 'aria-label': 'checkbox with default color' }}
        />
      }
      label="Warning"
    />
    <FormControlLabel
      control={
        <CustomCheckbox
          defaultChecked
          color="error"
          inputProps={{ 'aria-label': 'checkbox with default color' }}
        />
      }
      label="Error"
    />
</Box>`})}),H=()=>e.jsx(e.Fragment,{children:e.jsx(i,{children:`
import * as React from 'react';
import { Box } from '@mui/material';
import CustomCheckbox from '../../theme-elements/CustomCheckbox';
import { styled } from '@mui/material/styles';
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

const [checked, setChecked] = React.useState(true);

const handleChange = (event: any) => {
    setChecked(event.target.checked);
};

<Box textAlign="center">
    <CustomCheckbox
        checked={checked}
        onChange={handleChange}
        inputProps={{ 'aria-label': 'primary checkbox' }}
    />
    <CustomCheckbox
        disabled
        checked
        inputProps={{ 'aria-label': 'disabled checked checkbox' }}
    />
    <CustomCheckbox
        defaultChecked
        indeterminate
        inputProps={{ 'aria-label': 'indeterminate checkbox' }}
    />
    <CustomCheckbox
        defaultChecked
        color="default"
        inputProps={{ 'aria-label': 'checkbox with default color' }}
    />
</Box>`})}),$=()=>e.jsx(e.Fragment,{children:e.jsx(i,{children:`
import * as React from 'react';
import { Box, Checkbox } from '@mui/material';

<Box textAlign="center">
    <Checkbox
        defaultChecked
        color="primary"
        inputProps={{ 'aria-label': 'checkbox with default color' }}
    />
    <Checkbox
        defaultChecked
        color="secondary"
        inputProps={{ 'aria-label': 'checkbox with default color' }}
    />
    <Checkbox
        defaultChecked
        sx={{
            color: (theme) => theme.palette.success.main,
            '&.Mui-checked': {
                color: (theme) => theme.palette.success.main,
            },
        }}
    />
    <Checkbox
        defaultChecked
        sx={{
            color: (theme) => theme.palette.error.main,
            '&.Mui-checked': {
                color: (theme) => theme.palette.error.main,
            },
        }}
    />
    <Checkbox
        defaultChecked
        sx={{
            color: (theme) => theme.palette.warning.main,
            '&.Mui-checked': {
                color: (theme) => theme.palette.warning.main,
            },
        }}
    />
</Box>`})}),V=()=>e.jsx(e.Fragment,{children:e.jsx(i,{children:`
import * as React from 'react';
import { FormGroup, FormControlLabel, Checkbox } from '@mui/material';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import Favorite from '@mui/icons-material/Favorite';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';

<FormGroup
    row
    sx={{
        display: 'flex',
        justifyContent: 'center',
    }}
>
    <FormControlLabel
        control={
            <Checkbox color="primary"
                icon={<CheckBoxOutlineBlankIcon />}
                checkedIcon={<CheckBoxIcon />}
                name="checkednormal"
            />
        }
        label="Normal Size"
    />
    <FormControlLabel
        control={
            <Checkbox color="secondary"
                icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                checkedIcon={<CheckBoxIcon fontSize="small" />}
                name="checkedsmall"
            />
        }
        label="Small size"
    />
    <FormControlLabel
        control={
            <Checkbox color="error"
                icon={<FavoriteBorder />}
                checkedIcon={<Favorite />}
                name="checkedH"
            />
        }
        label="Heart"
    />
</FormGroup>`})}),q=()=>e.jsx(e.Fragment,{children:e.jsx(i,{children:`
import * as React from 'react';
import { FormGroup, FormControlLabel, FormControl } from '@mui/material';
import { styled } from '@mui/material/styles';
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
        ? '0px auto $theme.palette.grey[200]}'
        : '0px auto  $theme.palette.grey[300]}',
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

<FormControl
    component="fieldset"
    sx={{
      display: 'flex',
      justifyContent: 'center',
    }}
>
    <FormGroup
        aria-label="position"
        row
        sx={{
            justifyContent: 'center',
        }}
    >
        <FormControlLabel
            value="top"
            control={<CustomCheckbox color="primary" />}
            label="Top"
            labelPlacement="top"
        />
        <FormControlLabel
            value="start"
            control={<CustomCheckbox color="primary" />}
            label="Start"
            labelPlacement="start"
        />
        <FormControlLabel
            value="bottom"
            control={<CustomCheckbox color="primary" />}
            label="Bottom"
            labelPlacement="bottom"
        />
        <FormControlLabel
            value="end"
            control={<CustomCheckbox color="primary" />}
            label="End"
            labelPlacement="end"
        />
    </FormGroup>
</FormControl>
`})}),N=[{to:"/",title:"Home"},{title:"Checkbox"}],De=()=>e.jsxs(j,{title:"Checkbox",description:"this is Checkbox page",children:[e.jsx(g,{title:"Checkbox",items:N}),e.jsx(y,{title:"Checkbox",children:e.jsxs(a,{container:!0,spacing:3,children:[e.jsx(a,{item:!0,xs:12,lg:6,sm:6,display:"flex",alignItems:"stretch",children:e.jsx(c,{title:"Custom",codeModel:e.jsx(O,{}),children:e.jsx(A,{})})}),e.jsx(a,{item:!0,xs:12,lg:6,sm:6,display:"flex",alignItems:"stretch",children:e.jsx(c,{title:"Colors",codeModel:e.jsx(G,{}),children:e.jsx(D,{})})}),e.jsx(a,{item:!0,xs:12,lg:6,sm:6,display:"flex",alignItems:"stretch",children:e.jsx(c,{title:"Default",codeModel:e.jsx(H,{}),children:e.jsx(_,{})})}),e.jsx(a,{item:!0,xs:12,lg:6,sm:6,display:"flex",alignItems:"stretch",children:e.jsx(c,{title:"Default with Colors",codeModel:e.jsx($,{}),children:e.jsx(z,{})})}),e.jsx(a,{item:!0,xs:12,lg:6,sm:6,display:"flex",alignItems:"stretch",children:e.jsx(c,{title:"Sizes & Custom Icon",codeModel:e.jsx(V,{}),children:e.jsx(E,{})})}),e.jsx(a,{item:!0,xs:12,lg:6,sm:6,display:"flex",alignItems:"stretch",children:e.jsx(c,{title:"Position",codeModel:e.jsx(q,{}),children:e.jsx(I,{})})})]})})]});export{De as default};
