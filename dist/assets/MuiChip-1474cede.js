import{j as e,u as c,D as d,H as m}from"./index-1d78c4ac.js";import{B as u}from"./Breadcrumb-4b5ba697.js";import{P as D}from"./PageContainer-51f17055.js";import{P as x}from"./ParentCard-b3c2f72c.js";import{C as i}from"./ChildCard-8626bfcd.js";import{I as n}from"./InlineItemCard-057cd918.js";import{C as s}from"./CodeDialog-4128d6b6.js";import{bw as t,ac as p,bx as h}from"./index.esm-4ca6571d.js";import{G as o}from"./Grid-ba112631.js";import{C as a}from"./Chip-ef3907c5.js";import{A as l}from"./Avatar-49c7f2db.js";import"./Box-3b2e6d90.js";import"./Link-5958468e.js";import"./Card-ed0a9074.js";import"./CardHeader-4375bfdf.js";import"./Divider-32914f08.js";import"./dividerClasses-40064371.js";import"./CardContent-97c31a3d.js";import"./Tooltip-58d28098.js";import"./Popper-880e6f72.js";import"./useId-521a9597.js";import"./Portal-8f313b54.js";import"./createPopper-04c39de4.js";import"./useControlled-05793c79.js";import"./Grow-cf41a8df.js";import"./utils-f13413e5.js";import"./IconButton-6eb83b27.js";import"./DialogContent-aa8a214a.js";import"./Modal-5026ae4f.js";import"./ownerWindow-f1e1d6ee.js";import"./createChainedFunction-0bab83cf.js";import"./DialogTitle-be3ad24b.js";import"./toConsumableArray-d8b147df.js";import"./useSlot-a49cf6b5.js";const j=()=>e.jsx(e.Fragment,{children:e.jsx(s,{children:`
import * as React from 'react';
import { 
Avatar, 
Chip, 
Grid }  from '@mui/material';
import { 
IconCheck, 
IconChecks, 
IconMoodHappy } from '@tabler/icons';
import InlineItemCard from "@/app/components/shared/InlineItemCard";

import User1 from "../../assets/images/profile/user-1.jpg"
import User2 from "../../assets/images/profile/user-2.jpg"
import User3 from "../../assets/images/profile/user-5.jpg"

<InlineItemCard>
    <Chip avatar={<Avatar>M</Avatar>} label="Default Filled" />
    <Chip avatar={<Avatar>M</Avatar>} label="Default Deletable" onDelete={handleDelete} />
    <Chip avatar={<Avatar alt="Natacha" src={User1} />} label="Primary Filled" color="primary" />
    <Chip avatar={<Avatar alt="Natacha" src={User1} />} label="Primary Deletable" color="primary" onDelete={handleDelete} />
    <Chip icon={<IconMoodHappy />} label="Secondary Filled" color="secondary" />
    <Chip icon={<IconMoodHappy />} label="Secondary Deletable" color="secondary" onDelete={handleDelete} />
    <Chip avatar={<Avatar alt="Natacha" src={"User2"} />} label="Default Filled" color="success" />
    <Chip avatar={<Avatar alt="Natacha" src={"User2"} />} label="Default Deletable" color="success" onDelete={handleDelete} />
    <Chip icon={<IconMoodHappy />} label="Default Filled" color="warning" />
    <Chip icon={<IconMoodHappy />} label="Default Deletable" color="warning" onDelete={handleDelete} />
    <Chip avatar={<Avatar alt="Natacha" src={User3} />} label="Default Filled" color="error" />
    <Chip avatar={<Avatar alt="Natacha" src={User3} />} label="Default Deletable" color="error" onDelete={handleDelete} />
</InlineItemCard>`})}),C=()=>e.jsx(e.Fragment,{children:e.jsx(s,{children:`
import * as React from 'react';
import { 
Avatar, 
Chip, 
Grid }  from '@mui/material';
import { 
IconCheck, 
IconChecks, 
IconMoodHappy } from '@tabler/icons';
import InlineItemCard from "@/app/components/shared/InlineItemCard";

import User1 from "../../assets/images/profile/user-1.jpg"
import User2 from "../../assets/images/profile/user-2.jpg"
import User3 from "../../assets/images/profile/user-5.jpg"

<InlineItemCard>
    <Chip variant="outlined" avatar={<Avatar>M</Avatar>} label="Default Filled" />
    <Chip variant="outlined" avatar={<Avatar>M</Avatar>} label="Default Deletable" onDelete={handleDelete} />
    <Chip variant="outlined" avatar={<Avatar alt="Natacha" src={User1} />} label="Default Filled" color="primary" />
    <Chip variant="outlined" avatar={<Avatar alt="Natacha" src={User1} />} label="Default Deletable" color="primary" onDelete={handleDelete} />
    <Chip variant="outlined" icon={<IconMoodHappy />} label="Default Filled" color="secondary" />
    <Chip variant="outlined" icon={<IconMoodHappy />} label="Default Deletable" color="secondary" onDelete={handleDelete} />
    <Chip variant="outlined" avatar={<Avatar alt="Natacha" src={User2} />} label="Default Filled" color="success" />
    <Chip variant="outlined" avatar={<Avatar alt="Natacha" src={User2} />} label="Default Deletable" color="success" onDelete={handleDelete} />
    <Chip variant="outlined" icon={<IconMoodHappy />} label="Default Filled" color="warning" />
    <Chip variant="outlined" icon={<IconMoodHappy />} label="Default Deletable" color="warning" onDelete={handleDelete} />
    <Chip variant="outlined" avatar={<Avatar alt="Natacha" src={User3} />} label="Default Filled" color="error" />
    <Chip variant="outlined" avatar={<Avatar alt="Natacha" src={User3} />} label="Default Deletable" color="error" onDelete={handleDelete} />
</InlineItemCard>`})}),v=()=>e.jsx(e.Fragment,{children:e.jsx(s,{children:`
import * as React from 'react';
import { 
Avatar, 
Chip, 
Grid }  from '@mui/material';
import { 
IconCheck, 
IconChecks } from '@tabler/icons';
import InlineItemCard from "@/app/components/shared/InlineItemCard";

<InlineItemCard>
    <Chip
        label="Custom Icon" color="primary" avatar={<Avatar >M</Avatar>}
        onDelete={handleDelete}
        deleteIcon={<IconCheck width={20} />}
    />
    <Chip
        label="Custom Icon" color="secondary" avatar={<Avatar >S</Avatar>}
        onDelete={handleDelete}
        deleteIcon={<IconChecks width={20} />}
    />
</InlineItemCard>`})}),I=()=>e.jsx(e.Fragment,{children:e.jsx(s,{children:`
import * as React from 'react';
import { 
Avatar, 
Chip, 
Grid }  from '@mui/material';
import InlineItemCard from "@/app/components/shared/InlineItemCard";

<InlineItemCard>
    <Chip
        label="Custom Icon" color="primary" avatar={<Avatar >M</Avatar>}
        onDelete={handleDelete}
        deleteIcon={<IconCheck width={20} />}
    />
    <Chip
        label="Custom Icon" color="secondary" avatar={<Avatar >S</Avatar>}
        onDelete={handleDelete}
        deleteIcon={<IconChecks width={20} />}
    />
</InlineItemCard>`})}),b=()=>e.jsx(e.Fragment,{children:e.jsx(s,{children:`
import * as React from 'react';
import { 
Avatar, 
Chip, 
Grid }  from '@mui/material';
import { 
IconCheck, 
IconChecks, 
IconMoodHappy } from '@tabler/icons';
import InlineItemCard from "@/app/components/shared/InlineItemCard";

<InlineItemCard>
    <Chip
        label="Custom Icon" disabled avatar={<Avatar >M</Avatar>}
        onDelete={handleDelete}
    />
    <Chip
        label="Custom Icon" color="primary" disabled avatar={<Avatar >S</Avatar>}
        onDelete={handleDelete}
    />
</InlineItemCard>`})}),f=()=>e.jsx(e.Fragment,{children:e.jsx(s,{children:`
import * as React from 'react';
import { 
Avatar, 
Chip, 
Grid }  from '@mui/material';
import InlineItemCard from "@/app/components/shared/InlineItemCard";

<InlineItemCard>
    <Chip label="Small" size="small" color="primary" />
    <Chip label="Normal" color="primary" />
</InlineItemCard>`})}),y=[{to:"/",title:"Home"},{title:"Chip"}],te=()=>{const r=()=>{console.info("You clicked the delete icon.")};return e.jsxs(D,{title:"Chip",description:"this is Chip page",children:[e.jsx(u,{title:"Chip",items:y}),e.jsx(x,{title:"Accordion",children:e.jsxs(o,{container:!0,spacing:3,children:[e.jsx(o,{item:!0,xs:12,display:"flex",alignItems:"stretch",children:e.jsx(i,{title:"Filled",codeModel:e.jsx(j,{}),children:e.jsxs(n,{children:[e.jsx(a,{avatar:e.jsx(l,{children:"M"}),label:"Default Filled"}),e.jsx(a,{avatar:e.jsx(l,{children:"M"}),label:"Default Deletable",onDelete:r}),e.jsx(a,{avatar:e.jsx(l,{alt:"Natacha",src:c}),label:"Primary Filled",color:"primary"}),e.jsx(a,{avatar:e.jsx(l,{alt:"Natacha",src:c}),label:"Primary Deletable",color:"primary",onDelete:r}),e.jsx(a,{icon:e.jsx(t,{}),label:"Secondary Filled",color:"secondary"}),e.jsx(a,{icon:e.jsx(t,{}),label:"Secondary Deletable",color:"secondary",onDelete:r}),e.jsx(a,{avatar:e.jsx(l,{alt:"Natacha",src:d}),label:"Default Filled",color:"success"}),e.jsx(a,{avatar:e.jsx(l,{alt:"Natacha",src:d}),label:"Default Deletable",color:"success",onDelete:r}),e.jsx(a,{icon:e.jsx(t,{}),label:"Default Filled",color:"warning"}),e.jsx(a,{icon:e.jsx(t,{}),label:"Default Deletable",color:"warning",onDelete:r}),e.jsx(a,{avatar:e.jsx(l,{alt:"Natacha",src:m}),label:"Default Filled",color:"error"}),e.jsx(a,{avatar:e.jsx(l,{alt:"Natacha",src:m}),label:"Default Deletable",color:"error",onDelete:r})]})})}),e.jsx(o,{item:!0,xs:12,display:"flex",alignItems:"stretch",children:e.jsx(i,{title:"Outlined",codeModel:e.jsx(C,{}),children:e.jsxs(n,{children:[e.jsx(a,{variant:"outlined",avatar:e.jsx(l,{children:"M"}),label:"Default Filled"}),e.jsx(a,{variant:"outlined",avatar:e.jsx(l,{children:"M"}),label:"Default Deletable",onDelete:r}),e.jsx(a,{variant:"outlined",avatar:e.jsx(l,{alt:"Natacha",src:c}),label:"Default Filled",color:"primary"}),e.jsx(a,{variant:"outlined",avatar:e.jsx(l,{alt:"Natacha",src:c}),label:"Default Deletable",color:"primary",onDelete:r}),e.jsx(a,{variant:"outlined",icon:e.jsx(t,{}),label:"Default Filled",color:"secondary"}),e.jsx(a,{variant:"outlined",icon:e.jsx(t,{}),label:"Default Deletable",color:"secondary",onDelete:r}),e.jsx(a,{variant:"outlined",avatar:e.jsx(l,{alt:"Natacha",src:d}),label:"Default Filled",color:"success"}),e.jsx(a,{variant:"outlined",avatar:e.jsx(l,{alt:"Natacha",src:d}),label:"Default Deletable",color:"success",onDelete:r}),e.jsx(a,{variant:"outlined",icon:e.jsx(t,{}),label:"Default Filled",color:"warning"}),e.jsx(a,{variant:"outlined",icon:e.jsx(t,{}),label:"Default Deletable",color:"warning",onDelete:r}),e.jsx(a,{variant:"outlined",avatar:e.jsx(l,{alt:"Natacha",src:m}),label:"Default Filled",color:"error"}),e.jsx(a,{variant:"outlined",avatar:e.jsx(l,{alt:"Natacha",src:m}),label:"Default Deletable",color:"error",onDelete:r})]})})}),e.jsx(o,{item:!0,xs:12,sm:6,display:"flex",alignItems:"stretch",children:e.jsx(i,{title:"Custom Icon",codeModel:e.jsx(v,{}),children:e.jsxs(n,{children:[e.jsx(a,{label:"Custom Icon",color:"primary",avatar:e.jsx(l,{children:"M"}),onDelete:r,deleteIcon:e.jsx(p,{width:20})}),e.jsx(a,{label:"Custom Icon",color:"secondary",avatar:e.jsx(l,{children:"S"}),onDelete:r,deleteIcon:e.jsx(h,{width:20})})]})})}),e.jsx(o,{item:!0,xs:12,sm:6,display:"flex",alignItems:"stretch",children:e.jsx(i,{title:"Custom outlined Icon",codeModel:e.jsx(I,{}),children:e.jsxs(n,{children:[e.jsx(a,{label:"Custom Icon",variant:"outlined",color:"primary",avatar:e.jsx(l,{children:"M"}),onDelete:r,deleteIcon:e.jsx(p,{width:20})}),e.jsx(a,{label:"Custom Icon",variant:"outlined",color:"secondary",avatar:e.jsx(l,{children:"S"}),onDelete:r,deleteIcon:e.jsx(h,{width:20})})]})})}),e.jsx(o,{item:!0,xs:12,sm:6,display:"flex",alignItems:"stretch",children:e.jsx(i,{title:"Disabled",codeModel:e.jsx(b,{}),children:e.jsxs(n,{children:[e.jsx(a,{label:"Custom Icon",disabled:!0,avatar:e.jsx(l,{children:"M"}),onDelete:r}),e.jsx(a,{label:"Custom Icon",color:"primary",disabled:!0,avatar:e.jsx(l,{children:"S"}),onDelete:r})]})})}),e.jsx(o,{item:!0,xs:12,sm:6,display:"flex",alignItems:"stretch",children:e.jsx(i,{title:"Sizes",codeModel:e.jsx(f,{}),children:e.jsxs(n,{children:[e.jsx(a,{label:"Small",size:"small",color:"primary"}),e.jsx(a,{label:"Normal",color:"primary"})]})})})]})})]})};export{te as default};
