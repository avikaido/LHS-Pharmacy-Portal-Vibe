import{j as t}from"./index-1d78c4ac.js";import{P as m}from"./ParentCard-b3c2f72c.js";import{C as o}from"./ChildCard-8626bfcd.js";import{B as d}from"./Breadcrumb-4b5ba697.js";import{P as n}from"./PageContainer-51f17055.js";import{C as a}from"./CustomSwitch-dd9f44e8.js";import{B as l}from"./Box-3b2e6d90.js";import{S as e}from"./Switch-77494226.js";import{F as s}from"./FormGroup-2de31926.js";import{F as i}from"./FormControlLabel-d06535e3.js";import{C as c}from"./CodeDialog-4128d6b6.js";import{G as r}from"./Grid-ba112631.js";import"./Card-ed0a9074.js";import"./CardHeader-4375bfdf.js";import"./Divider-32914f08.js";import"./dividerClasses-40064371.js";import"./CardContent-97c31a3d.js";import"./index.esm-4ca6571d.js";import"./Link-5958468e.js";import"./SwitchBase-a9247a40.js";import"./useFormControl-9666228d.js";import"./useControlled-05793c79.js";import"./formControlState-a1fb9590.js";import"./Stack-74791772.js";import"./createStack-08af7ebe.js";import"./styled-db48c038.js";import"./useThemeProps-a461f42f.js";import"./Tooltip-58d28098.js";import"./Popper-880e6f72.js";import"./useId-521a9597.js";import"./Portal-8f313b54.js";import"./createPopper-04c39de4.js";import"./Grow-cf41a8df.js";import"./utils-f13413e5.js";import"./IconButton-6eb83b27.js";import"./DialogContent-aa8a214a.js";import"./Modal-5026ae4f.js";import"./ownerWindow-f1e1d6ee.js";import"./createChainedFunction-0bab83cf.js";import"./DialogTitle-be3ad24b.js";import"./toConsumableArray-d8b147df.js";const h=()=>t.jsxs(l,{textAlign:"center",children:[t.jsx(a,{checked:!0}),t.jsx(a,{}),t.jsx(a,{disabled:!0,defaultChecked:!0}),t.jsx(a,{disabled:!0})]}),x=()=>t.jsxs(l,{textAlign:"center",children:[t.jsx(e,{defaultChecked:!0}),t.jsx(e,{}),t.jsx(e,{disabled:!0,defaultChecked:!0}),t.jsx(e,{disabled:!0})]}),u=()=>t.jsx(l,{textAlign:"center",children:t.jsxs(s,{children:[t.jsx(i,{control:t.jsx(e,{defaultChecked:!0}),label:"Label"}),t.jsx(i,{disabled:!0,control:t.jsx(e,{}),label:"Disabled"})]})}),p=()=>t.jsxs(l,{textAlign:"center",children:[t.jsx(e,{defaultChecked:!0,size:"small"}),t.jsx(e,{defaultChecked:!0})]}),j=()=>t.jsxs(l,{textAlign:"center",children:[t.jsx(e,{defaultChecked:!0}),t.jsx(e,{defaultChecked:!0,color:"secondary"}),t.jsx(e,{defaultChecked:!0,color:"error"}),t.jsx(e,{defaultChecked:!0,color:"warning"}),t.jsx(e,{defaultChecked:!0,color:"success"}),t.jsx(e,{defaultChecked:!0,color:"default"})]}),f=()=>t.jsx(l,{textAlign:"center",children:t.jsxs(s,{"aria-label":"position",row:!0,children:[t.jsx(i,{value:"top",control:t.jsx(e,{color:"primary"}),label:"Top",labelPlacement:"top"}),t.jsx(i,{value:"start",control:t.jsx(e,{color:"primary"}),label:"Start",labelPlacement:"start"}),t.jsx(i,{value:"bottom",control:t.jsx(e,{color:"primary"}),label:"Bottom",labelPlacement:"bottom"}),t.jsx(i,{value:"end",control:t.jsx(e,{color:"primary"}),label:"End",labelPlacement:"end"})]})}),w=()=>t.jsx(t.Fragment,{children:t.jsx(c,{children:`
import * as React from 'react';
import { styled } from '@mui/material/styles';
import { Switch } from '@mui/material';
import { Box } from '@mui/material';

const CustomSwitch = styled((props: any) => <Switch {...props} />)(({ theme }) => ({
  '&.MuiSwitch-root': {
    width: '68px',
    height: '49px',
  },
  '&  .MuiButtonBase-root': {
    top: '6px',
    left: '6px',
  },
  '&  .MuiButtonBase-root.Mui-checked .MuiSwitch-thumb': {
    backgroundColor: 'primary.main',
  },
  '& .MuiSwitch-thumb': {
    width: '18px',
    height: '18px',
    borderRadius: '6px',
  },

  '& .MuiSwitch-track': {
    backgroundColor: theme.palette.grey[200],
    opacity: 1,
    borderRadius: '5px',
  },
  '& .MuiSwitch-switchBase': {
    '&.Mui-checked': {
      '& + .MuiSwitch-track': {
        backgroundColor: 'primary',
        opacity: 0.18,
      },
    },
  },
}));

<Box textAlign="center">
    <CustomSwitch checked />
    <CustomSwitch />
    <CustomSwitch disabled defaultChecked />
    <CustomSwitch disabled />
</Box>
`})}),C=()=>t.jsx(t.Fragment,{children:t.jsx(c,{children:`
import * as React from 'react';
import { Box, Switch } from '@mui/material';

<Box textAlign="center">
    <Switch defaultChecked />
    <Switch />
    <Switch disabled defaultChecked />
    <Switch disabled />
</Box>
`})}),S=()=>t.jsx(t.Fragment,{children:t.jsx(c,{children:`
import * as React from 'react';
import { Box, Switch, FormGroup, FormControlLabel } from '@mui/material';

<Box textAlign="center">
    <FormGroup>
        <FormControlLabel control={<Switch defaultChecked />} label="Label" />
        <FormControlLabel disabled control={<Switch />} label="Disabled" />
    </FormGroup>
</Box>
`})}),b=()=>t.jsx(t.Fragment,{children:t.jsx(c,{children:`
import * as React from 'react';
import { Box, Switch } from '@mui/material';

<Box textAlign="center">
    <Switch defaultChecked size="small" />
    <Switch defaultChecked />
</Box>
`})}),g=()=>t.jsx(t.Fragment,{children:t.jsx(c,{children:`
import * as React from 'react';
import { Box, Switch } from '@mui/material';

<Box textAlign="center">
    <Switch defaultChecked />
    <Switch defaultChecked color="secondary" />
    <Switch defaultChecked color="error" />
    <Switch defaultChecked color="warning" />
    <Switch defaultChecked color="success" />
    <Switch defaultChecked color="default" />
</Box>
`})}),k=()=>t.jsx(t.Fragment,{children:t.jsx(c,{children:`
import * as React from 'react';
import { Box, Switch, FormGroup, FormControlLabel } from '@mui/material';

<Box textAlign="center">
    <FormGroup aria-label="position" row>
        <FormControlLabel
            value="top"
            control={<Switch color="primary" />}
            label="Top"
            labelPlacement="top"
        />
        <FormControlLabel
            value="start"
            control={<Switch color="primary" />}
            label="Start"
            labelPlacement="start"
        />
        <FormControlLabel
            value="bottom"
            control={<Switch color="primary" />}
            label="Bottom"
            labelPlacement="bottom"
        />
        <FormControlLabel
            value="end"
            control={<Switch color="primary" />}
            label="End"
            labelPlacement="end"
        />
    </FormGroup>
</Box>
`})}),B=[{to:"/",title:"Home"},{title:"Switch"}],ht=()=>t.jsxs(n,{title:"Switch",description:"this is Switch page",children:[t.jsx(d,{title:"Switch",items:B}),t.jsx(m,{title:"Switch",children:t.jsxs(r,{container:!0,spacing:3,children:[t.jsx(r,{item:!0,xs:12,lg:6,sm:6,display:"flex",alignItems:"stretch",children:t.jsx(o,{title:"Custom",codeModel:t.jsx(w,{}),children:t.jsx(h,{})})}),t.jsx(r,{item:!0,xs:12,lg:6,sm:6,display:"flex",alignItems:"stretch",children:t.jsx(o,{title:"Default",codeModel:t.jsx(C,{}),children:t.jsx(x,{})})}),t.jsx(r,{item:!0,xs:12,lg:6,sm:6,display:"flex",alignItems:"stretch",children:t.jsx(o,{title:"Default with Label",codeModel:t.jsx(S,{}),children:t.jsx(u,{})})}),t.jsx(r,{item:!0,xs:12,lg:6,sm:6,display:"flex",alignItems:"stretch",children:t.jsx(o,{title:"Sizes",codeModel:t.jsx(b,{}),children:t.jsx(p,{})})}),t.jsx(r,{item:!0,xs:12,lg:6,sm:6,display:"flex",alignItems:"stretch",children:t.jsx(o,{title:"Default Colors",codeModel:t.jsx(g,{}),children:t.jsx(j,{})})}),t.jsx(r,{item:!0,xs:12,lg:6,sm:6,display:"flex",alignItems:"stretch",children:t.jsx(o,{title:"Placement",codeModel:t.jsx(k,{}),children:t.jsx(f,{})})})]})})]});export{ht as default};
