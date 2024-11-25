import{j as e,R as T}from"./index-1d78c4ac.js";import{B as p}from"./Breadcrumb-4b5ba697.js";import{P as g}from"./PageContainer-51f17055.js";import{P as I}from"./ParentCard-b3c2f72c.js";import{C as s}from"./ChildCard-8626bfcd.js";import{C as d}from"./CodeDialog-4128d6b6.js";import{ai as C,aP as f,bn as u}from"./index.esm-4ca6571d.js";import{G as n}from"./Grid-ba112631.js";import{T as m,a as j,b}from"./TabPanel-d397c9c1.js";import{B as o}from"./Box-3b2e6d90.js";import{a as c,T as h}from"./Tabs-44f41707.js";import{D as B}from"./Divider-32914f08.js";import"./Link-5958468e.js";import"./Card-ed0a9074.js";import"./CardHeader-4375bfdf.js";import"./CardContent-97c31a3d.js";import"./Tooltip-58d28098.js";import"./Popper-880e6f72.js";import"./useId-521a9597.js";import"./Portal-8f313b54.js";import"./createPopper-04c39de4.js";import"./useControlled-05793c79.js";import"./Grow-cf41a8df.js";import"./utils-f13413e5.js";import"./IconButton-6eb83b27.js";import"./DialogContent-aa8a214a.js";import"./Modal-5026ae4f.js";import"./ownerWindow-f1e1d6ee.js";import"./createChainedFunction-0bab83cf.js";import"./DialogTitle-be3ad24b.js";import"./toConsumableArray-d8b147df.js";import"./clsx-0839fdbe.js";import"./useThemeProps-fa04b35d.js";import"./useThemeProps-a461f42f.js";import"./debounce-517eeb3c.js";import"./KeyboardArrowRight-3d509d4a.js";import"./dividerClasses-40064371.js";const w=()=>e.jsx(e.Fragment,{children:e.jsx(d,{children:`
import * as React from 'react';
import {Box, Divider } from '@mui/material';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

import { IconHeart, IconPhone, IconUser } from '@tabler/icons';

const COMMON_TAB = [
  { value: '1', icon: <IconPhone width={20} height={20} />, label: 'Item One', disabled: false },
  { value: '2', icon: <IconHeart width={20} height={20} />, label: 'Item Two', disabled: false },
  { value: '3', icon: <IconUser width={20} height={20} />, label: 'Item Three', disabled: true }
];

const [value, setValue] = React.useState('1');

const handleChange = (event, newValue) => {
  setValue(newValue);
};

<TabContext value={value}>
    <Tabs value={value} onChange={handleChange} aria-label="icon tabs example">
        {COMMON_TAB.map((tab) => (
            <Tab key={tab.value} icon={tab.icon} label={tab.label} value={tab.value} disabled={tab.disabled} />
        ))}
    </Tabs>
    <Box bgcolor="grey.200" mt={2}>
        {COMMON_TAB.map((panel) => (
            <TabPanel key={panel.value} value={panel.value} >
                {panel.label}
            </TabPanel>
        ))}
    </Box>
</TabContext>`})}),P=()=>e.jsx(e.Fragment,{children:e.jsx(d,{children:`
import * as React from 'react';
import {Box, Divider } from '@mui/material';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

import { IconHeart, IconPhone, IconUser } from '@tabler/icons';

const COMMON_TAB = [
  { value: '1', icon: <IconPhone width={20} height={20} />, label: 'Item One', disabled: false },
  { value: '2', icon: <IconHeart width={20} height={20} />, label: 'Item Two', disabled: false },
  { value: '3', icon: <IconUser width={20} height={20} />, label: 'Item Three', disabled: true }
];

const [value, setValue] = React.useState('1');

const handleChange = (event, newValue) => {
  setValue(newValue);
};

<TabContext value={value}>
    <Tabs value={value} onChange={handleChange} aria-label="icon tabs example">
        {COMMON_TAB.map((tab) => (
            <Tab key={tab.value} icon={tab.icon} label={tab.label} iconPosition="bottom" value={tab.value} disabled={tab.disabled} />
        ))}
    </Tabs>
    <Box bgcolor="grey.200" mt={2}>
        {COMMON_TAB.map((panel) => (
            <TabPanel key={panel.value} value={panel.value} >
                {panel.label}
            </TabPanel>
        ))}
    </Box>
</TabContext>`})}),O=()=>e.jsx(e.Fragment,{children:e.jsx(d,{children:`
import * as React from 'react';
import {Box, Divider } from '@mui/material';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

import { IconHeart, IconPhone, IconUser } from '@tabler/icons';

const COMMON_TAB = [
  { value: '1', icon: <IconPhone width={20} height={20} />, label: 'Item One', disabled: false },
  { value: '2', icon: <IconHeart width={20} height={20} />, label: 'Item Two', disabled: false },
  { value: '3', icon: <IconUser width={20} height={20} />, label: 'Item Three', disabled: true }
];

const [value, setValue] = React.useState('1');

const handleChange = (event, newValue) => {
  setValue(newValue);
};

<TabContext value={value}>
    <Tabs value={value} onChange={handleChange} aria-label="icon tabs example">
        {COMMON_TAB.map((tab) => (
            <Tab key={tab.value} icon={tab.icon} label={tab.label} iconPosition="start" value={tab.value} disabled={tab.disabled} />
        ))}
    </Tabs>
    <Box bgcolor="grey.200" mt={2}>
        {COMMON_TAB.map((panel) => (
            <TabPanel key={panel.value} value={panel.value} >
                {panel.label}
            </TabPanel>
        ))}
    </Box>
</TabContext>`})}),M=()=>e.jsx(e.Fragment,{children:e.jsx(d,{children:`
import * as React from 'react';
import {Box, Divider } from '@mui/material';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

import { IconHeart, IconPhone, IconUser } from '@tabler/icons';

const COMMON_TAB = [
  { value: '1', icon: <IconPhone width={20} height={20} />, label: 'Item One', disabled: false },
  { value: '2', icon: <IconHeart width={20} height={20} />, label: 'Item Two', disabled: false },
  { value: '3', icon: <IconUser width={20} height={20} />, label: 'Item Three', disabled: true }
];

const [value, setValue] = React.useState('1');

const handleChange = (event, newValue) => {
  setValue(newValue);
};

<TabContext value={value}>
    <Tabs value={value} onChange={handleChange} aria-label="icon tabs example">
        {COMMON_TAB.map((tab) => (
            <Tab key={tab.value} icon={tab.icon} label={tab.label} iconPosition="end" value={tab.value} disabled={tab.disabled} />
        ))}
    </Tabs>
    <Box bgcolor="grey.200" mt={2}>
        {COMMON_TAB.map((panel) => (
            <TabPanel key={panel.value} value={panel.value} >
                {panel.label}
            </TabPanel>
        ))}
    </Box>
</TabContext>`})}),L=()=>e.jsx(e.Fragment,{children:e.jsx(d,{children:`
import * as React from 'react';
import {Box, Divider } from '@mui/material';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

import { IconHeart, IconPhone, IconUser } from '@tabler/icons';

const SCROLLABLE_TAB = [
  { value: '1', icon: <IconUser width={20} height={20} />, label: 'Item 1' },
  { value: '2', icon: <IconUser width={20} height={20} />, label: 'Item 2' },
  { value: '3', icon: <IconUser width={20} height={20} />, label: 'Item 3' },
  { value: '4', icon: <IconUser width={20} height={20} />, label: 'Item 4' },
  { value: '5', icon: <IconUser width={20} height={20} />, label: 'Item 5' },
  { value: '6', icon: <IconUser width={20} height={20} />, label: 'Item 6' },
  { value: '7', icon: <IconUser width={20} height={20} />, label: 'Item 7' }
];

const [value, setValue] = React.useState('1');

const handleChange = (event, newValue) => {
  setValue(newValue);
};

<TabContext value={value}>
    <Tabs value={value} onChange={handleChange} aria-label="icon tabs example" variant="scrollable" scrollButtons="auto">
        {SCROLLABLE_TAB.map((tab) => (
            <Tab key={tab.value} icon={tab.icon} label={tab.label} iconPosition="top" value={tab.value} />
        ))}
    </Tabs>
    <Box bgcolor="grey.200" mt={2}>
        {SCROLLABLE_TAB.map((panel) => (
            <TabPanel key={panel.value} value={panel.value} >
                {panel.label}
            </TabPanel>
        ))}
    </Box>
</TabContext>`})}),A=()=>e.jsx(e.Fragment,{children:e.jsx(d,{children:`
import * as React from 'react';
import {Box, Divider } from '@mui/material';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

const COMMON_TAB = [
  { value: '1', icon: <IconPhone width={20} height={20} />, label: 'Item One', disabled: false },
  { value: '2', icon: <IconHeart width={20} height={20} />, label: 'Item Two', disabled: false },
  { value: '3', icon: <IconUser width={20} height={20} />, label: 'Item Three', disabled: true }
];

const [value, setValue] = React.useState('1');

const handleChange = (event, newValue) => {
  setValue(newValue);
};

<TabContext value={value}>
    <Box>
        <TabList onChange={handleChange} aria-label="lab API tabs example">
            {COMMON_TAB.map((tab, index) => (
                <Tab key={tab.value} label={tab.label} value={String(index + 1)} />
            ))}
        </TabList>
    </Box>
    <Divider />
    <Box bgcolor="grey.200" mt={2}>
        {COMMON_TAB.map((panel, index) => (
            <TabPanel key={panel.value} value={String(index + 1)}>
                {panel.label}
            </TabPanel>
        ))}
    </Box>
</TabContext>
`})}),y=()=>e.jsx(e.Fragment,{children:e.jsx(d,{children:`
import * as React from 'react';
import {Box, Divider } from '@mui/material';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

import { IconHeart, IconPhone, IconUser } from '@tabler/icons';

const COMMON_TAB = [
  { value: '1', icon: <IconPhone width={20} height={20} />, label: 'Item One', disabled: false },
  { value: '2', icon: <IconHeart width={20} height={20} />, label: 'Item Two', disabled: false },
  { value: '3', icon: <IconUser width={20} height={20} />, label: 'Item Three', disabled: true }
];

const [value, setValue] = React.useState('1');

const handleChange = (event, newValue) => {
  setValue(newValue);
};

<TabContext value={value}>
    <Tabs value={value} onChange={handleChange} aria-label="icon tabs example">
        {COMMON_TAB.map((tab) => (
            <Tab key={tab.value} icon={tab.icon} value={tab.value} />
        ))}
    </Tabs>
    <Box bgcolor="grey.200" mt={2}>
        {COMMON_TAB.map((panel) => (
            <TabPanel key={panel.value} value={panel.value} >
                {panel.label}
            </TabPanel>
        ))}
    </Box>
</TabContext>
`})}),V=()=>e.jsx(e.Fragment,{children:e.jsx(d,{children:`
import * as React from 'react';
import {Box, Divider } from '@mui/material';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

import { IconHeart, IconPhone, IconUser } from '@tabler/icons';

const SCROLLABLE_TAB = [
  { value: '1', icon: <IconUser width={20} height={20} />, label: 'Item 1' },
  { value: '2', icon: <IconUser width={20} height={20} />, label: 'Item 2' },
  { value: '3', icon: <IconUser width={20} height={20} />, label: 'Item 3' },
  { value: '4', icon: <IconUser width={20} height={20} />, label: 'Item 4' },
  { value: '5', icon: <IconUser width={20} height={20} />, label: 'Item 5' },
  { value: '6', icon: <IconUser width={20} height={20} />, label: 'Item 6' },
  { value: '7', icon: <IconUser width={20} height={20} />, label: 'Item 7' }
];

const [value, setValue] = React.useState('1');

const handleChange = (event, newValue) => {
  setValue(newValue);
};

<TabContext value={value}>
    <Box width="100%" gap={2} display="flex" flexGrow={1}
    sx={{ height: 224 }}
    >
        <Tabs value={value} orientation="vertical" onChange={handleChange} variant="scrollable" scrollButtons="auto">
            {SCROLLABLE_TAB.map((tab) => (
                <Tab key={tab.value} icon={tab.icon} label={tab.label} iconPosition="top" value={tab.value} />
            ))}
        </Tabs>
        <Box bgcolor="grey.200" width="100%">
            {SCROLLABLE_TAB.map((panel) => (
                <TabPanel key={panel.value} value={panel.value} >
                    {panel.label}
                </TabPanel>
            ))}
        </Box>
    </Box>
</TabContext>`})}),R=[{to:"/",title:"Home"},{title:"Tabs"}],i=[{value:"1",icon:e.jsx(C,{width:20,height:20}),label:"Item One",disabled:!1},{value:"2",icon:e.jsx(f,{width:20,height:20}),label:"Item Two",disabled:!1},{value:"3",icon:e.jsx(u,{width:20,height:20}),label:"Item Three",disabled:!0}],x=[{value:"1",icon:e.jsx(u,{width:20,height:20}),label:"Item 1"},{value:"2",icon:e.jsx(u,{width:20,height:20}),label:"Item 2"},{value:"3",icon:e.jsx(u,{width:20,height:20}),label:"Item 3"},{value:"4",icon:e.jsx(u,{width:20,height:20}),label:"Item 4"},{value:"5",icon:e.jsx(u,{width:20,height:20}),label:"Item 5"},{value:"6",icon:e.jsx(u,{width:20,height:20}),label:"Item 6"},{value:"7",icon:e.jsx(u,{width:20,height:20}),label:"Item 7"}],Te=()=>{const[t,v]=T.useState("1"),r=(a,l)=>{v(l)};return e.jsxs(g,{title:"Tabs",description:"this is Tabs page",children:[e.jsx(p,{title:"Tabs",items:R}),e.jsx(I,{title:"Tabs",children:e.jsxs(n,{container:!0,spacing:3,children:[e.jsx(n,{item:!0,xs:12,sm:6,display:"flex",alignItems:"stretch",children:e.jsx(s,{title:"Text",codeModel:e.jsx(A,{}),children:e.jsxs(m,{value:t,children:[e.jsx(o,{children:e.jsx(j,{variant:"scrollable",scrollButtons:"auto",onChange:r,"aria-label":"lab API tabs example",children:i.map((a,l)=>e.jsx(c,{label:a.label,value:String(l+1)},a.value))})}),e.jsx(B,{}),e.jsx(o,{bgcolor:"grey.A200",mt:2,children:i.map((a,l)=>e.jsx(b,{value:String(l+1),children:a.label},a.value))})]})})}),e.jsx(n,{item:!0,xs:12,sm:6,display:"flex",alignItems:"stretch",children:e.jsx(s,{title:"Icon",codeModel:e.jsx(y,{}),children:e.jsxs(m,{value:t,children:[e.jsx(h,{variant:"scrollable",scrollButtons:"auto",value:t,onChange:r,"aria-label":"icon tabs example",children:i.map((a,l)=>e.jsx(c,{icon:a.icon,value:a.value},a.value))}),e.jsx(o,{bgcolor:"grey.A200",mt:2,children:i.map((a,l)=>e.jsx(b,{value:a.value,children:a.label},a.value))})]})})}),e.jsx(n,{item:!0,xs:12,sm:6,display:"flex",alignItems:"stretch",children:e.jsx(s,{title:"Icon with Label",codeModel:e.jsx(w,{}),children:e.jsxs(m,{value:t,children:[e.jsx(h,{variant:"scrollable",scrollButtons:"auto",value:t,onChange:r,"aria-label":"icon tabs example",children:i.map((a,l)=>e.jsx(c,{icon:a.icon,label:a.label,value:a.value,disabled:a.disabled},a.value))}),e.jsx(o,{bgcolor:"grey.A200",mt:2,children:i.map((a,l)=>e.jsx(b,{value:a.value,children:a.label},a.value))})]})})}),e.jsx(n,{item:!0,xs:12,sm:6,display:"flex",alignItems:"stretch",children:e.jsx(s,{title:"Icon Bottom",codeModel:e.jsx(P,{}),children:e.jsxs(m,{value:t,children:[e.jsx(h,{variant:"scrollable",scrollButtons:"auto",value:t,onChange:r,"aria-label":"icon tabs example",children:i.map((a,l)=>e.jsx(c,{icon:a.icon,label:a.label,iconPosition:"bottom",value:a.value,disabled:a.disabled},a.value))}),e.jsx(o,{bgcolor:"grey.A200",mt:2,children:i.map((a,l)=>e.jsx(b,{value:a.value,children:a.label},a.value))})]})})}),e.jsx(n,{item:!0,xs:12,sm:6,display:"flex",alignItems:"stretch",children:e.jsx(s,{title:"Icon Left",codeModel:e.jsx(O,{}),children:e.jsxs(m,{value:t,children:[e.jsx(h,{variant:"scrollable",scrollButtons:"auto",value:t,onChange:r,"aria-label":"icon tabs example",children:i.map((a,l)=>e.jsx(c,{icon:a.icon,label:a.label,iconPosition:"start",value:a.value,disabled:a.disabled},a.value))}),e.jsx(o,{bgcolor:"grey.A200",mt:2,children:i.map((a,l)=>e.jsx(b,{value:a.value,children:a.label},a.value))})]})})}),e.jsx(n,{item:!0,xs:12,sm:6,display:"flex",alignItems:"stretch",children:e.jsx(s,{title:"Icon Right",codeModel:e.jsx(M,{}),children:e.jsxs(m,{value:t,children:[e.jsx(h,{variant:"scrollable",scrollButtons:"auto",value:t,onChange:r,"aria-label":"icon tabs example",children:i.map((a,l)=>e.jsx(c,{icon:a.icon,label:a.label,iconPosition:"end",value:a.value,disabled:a.disabled},a.value))}),e.jsx(o,{bgcolor:"grey.A200",mt:2,children:i.map((a,l)=>e.jsx(b,{value:a.value,children:a.label},a.value))})]})})}),e.jsx(n,{item:!0,xs:12,sm:6,display:"flex",alignItems:"stretch",children:e.jsx(s,{title:"Scrollable",codeModel:e.jsx(L,{}),children:e.jsxs(m,{value:t,children:[e.jsx(h,{value:t,onChange:r,"aria-label":"icon tabs example",variant:"scrollable",scrollButtons:"auto",children:x.map((a,l)=>e.jsx(c,{icon:a.icon,label:a.label,iconPosition:"top",value:a.value,disabled:a.disabled},a.value))}),e.jsx(o,{bgcolor:"grey.A200",mt:2,children:x.map((a,l)=>e.jsx(b,{value:a.value,children:a.label},a.value))})]})})}),e.jsx(n,{item:!0,xs:12,sm:6,display:"flex",alignItems:"stretch",children:e.jsx(s,{title:"Vertical",codeModel:e.jsx(V,{}),children:e.jsx(m,{value:t,children:e.jsxs(o,{width:"100%",gap:2,display:"flex",flexGrow:1,sx:{height:224},children:[e.jsx(h,{value:t,orientation:"vertical",onChange:r,variant:"scrollable",scrollButtons:"auto",children:x.map((a,l)=>e.jsx(c,{icon:a.icon,label:a.label,iconPosition:"top",value:a.value,disabled:a.disabled},a.value))}),e.jsx(o,{bgcolor:"grey.A200",width:"100%",children:x.map((a,l)=>e.jsx(b,{value:a.value,children:a.label},a.value))})]})})})})]})})]})};export{Te as default};
