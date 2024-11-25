import{j as r,u as a,D as m,E as n,G as p,H as h}from"./index-1d78c4ac.js";import{B as x}from"./Breadcrumb-4b5ba697.js";import{P as g}from"./PageContainer-51f17055.js";import{P as j}from"./ParentCard-b3c2f72c.js";import{C as i}from"./ChildCard-8626bfcd.js";import{a0 as s}from"./index.esm-4ca6571d.js";import{C as c}from"./CodeDialog-4128d6b6.js";import{G as e}from"./Grid-ba112631.js";import{S as o}from"./Stack-74791772.js";import{A as t}from"./Avatar-49c7f2db.js";import{A as d}from"./AvatarGroup-707c9b19.js";import{B as l}from"./Badge-cb787faa.js";import"./Box-3b2e6d90.js";import"./Link-5958468e.js";import"./Card-ed0a9074.js";import"./CardHeader-4375bfdf.js";import"./Divider-32914f08.js";import"./dividerClasses-40064371.js";import"./CardContent-97c31a3d.js";import"./Tooltip-58d28098.js";import"./Popper-880e6f72.js";import"./useId-521a9597.js";import"./Portal-8f313b54.js";import"./createPopper-04c39de4.js";import"./useControlled-05793c79.js";import"./Grow-cf41a8df.js";import"./utils-f13413e5.js";import"./IconButton-6eb83b27.js";import"./DialogContent-aa8a214a.js";import"./Modal-5026ae4f.js";import"./ownerWindow-f1e1d6ee.js";import"./createChainedFunction-0bab83cf.js";import"./DialogTitle-be3ad24b.js";import"./toConsumableArray-d8b147df.js";import"./createStack-08af7ebe.js";import"./styled-db48c038.js";import"./useThemeProps-a461f42f.js";import"./useSlot-a49cf6b5.js";import"./usePreviousProps-39045d8b.js";const v=()=>r.jsx(r.Fragment,{children:r.jsx(c,{children:`
import * as React from 'react';
import { Avatar, Stack } from '@mui/material';

<Stack direction="row" spacing={1} justifyContent="center">
    <Avatar sx={{ bgcolor: 'primary.main' }}>A</Avatar>
    <Avatar sx={{ bgcolor: 'secondary.main' }}>B</Avatar>
    <Avatar sx={{ bgcolor: 'error.main' }}>C</Avatar>
    <Avatar sx={{ bgcolor: 'warning.main' }}>D</Avatar>
    <Avatar sx={{ bgcolor: 'success.main' }}>E</Avatar>
</Stack>`})}),u=()=>r.jsx(r.Fragment,{children:r.jsx(c,{children:`
import * as React from 'react';
import { Avatar, Stack } from '@mui/material';

import User2 from "../../assets/images/profile/user-2.jpg"
import User3 from "../../assets/images/profile/user-3.jpg"
import User4 from "../../assets/images/profile/user-4.jpg"

<Stack direction="row" spacing={1} justifyContent="center">
    <Avatar alt="Remy Sharp" src={User4} />
    <Avatar alt="Travis Howard" src={User2} />
    <Avatar alt="Cindy Baker" src={User3} />
</Stack>`})}),f=()=>r.jsx(r.Fragment,{children:r.jsx(c,{children:`
import * as React from 'react';
import { Avatar, Stack } from '@mui/material';
import { IconMoodSmile } from '@tabler/icons';

<Stack direction="row" spacing={1} justifyContent="center">
    <Avatar sx={{ bgcolor: 'primary.main' }}>
        <IconMoodSmile width={24} />
    </Avatar>
    <Avatar sx={{ bgcolor: 'secondary.main' }}>
        <IconMoodSmile width={24} />
    </Avatar>
    <Avatar sx={{ bgcolor: 'error.main' }}>
        <IconMoodSmile width={24} />
    </Avatar>
    <Avatar sx={{ bgcolor: 'warning.main' }}>
        <IconMoodSmile width={24} />
    </Avatar>
    <Avatar sx={{ bgcolor: 'success.main' }}>
        <IconMoodSmile width={24} />
    </Avatar>
</Stack>`})}),A=()=>r.jsx(r.Fragment,{children:r.jsx(c,{children:`
import * as React from 'react';
import { Avatar, Stack } from '@mui/material';
import { IconMoodSmile } from '@tabler/icons';

<Stack direction="row" spacing={1} justifyContent="center">
    <Avatar sx={{ bgcolor: 'primary.main' }}>
        <IconMoodSmile width={24} />
    </Avatar>
    <Avatar sx={{ bgcolor: 'primary.main' }} variant="square">
        <IconMoodSmile width={24} />
    </Avatar>
    <Avatar sx={{ bgcolor: 'primary.main' }} variant="rounded">
        <IconMoodSmile width={24} />
    </Avatar>
</Stack>`})}),y=()=>r.jsx(r.Fragment,{children:r.jsx(c,{children:`
import * as React from 'react';
import { Avatar, AvatarGroup, Stack } from '@mui/material';
import { IconMoodSmile } from '@tabler/icons';

import User2 from "../../assets/images/profile/user-2.jpg"
import User3 from "../../assets/images/profile/user-3.jpg"
import User4 from "../../assets/images/profile/user-4.jpg"

<Stack direction="row" spacing={1} justifyContent="center">
    <AvatarGroup max={4}>
        <Avatar alt="Remy Sharp" src={User4} />
        <Avatar alt="Travis Howard" src={User2} />
        <Avatar alt="Cindy Baker" src={User3} />
    </AvatarGroup>
</Stack>`})}),S=()=>r.jsx(r.Fragment,{children:r.jsx(c,{children:`
import * as React from 'react';
import { Avatar, AvatarGroup, Badge, Stack } from '@mui/material';
import { IconMoodSmile } from '@tabler/icons';

import User2 from "../../assets/images/profile/user-2.jpg"
import User3 from "../../assets/images/profile/user-3.jpg"
import User4 from "../../assets/images/profile/user-4.jpg"

<Stack direction="row" spacing={1} justifyContent="center">
    <AvatarGroup max={4}>
        <Avatar alt="Remy Sharp" sx={{ width: 56, height: 56 }} src={User4} />
        <Avatar alt="Travis Howard" sx={{ width: 56, height: 56 }} src={User2} />
        <Avatar alt="Cindy Baker" sx={{ width: 56, height: 56 }} src={User3} />
    </AvatarGroup>
</Stack>`})}),w=()=>r.jsx(r.Fragment,{children:r.jsx(c,{children:`
import * as React from 'react';
import { Avatar, AvatarGroup, Stack } from '@mui/material';
import { IconMoodSmile } from '@tabler/icons';

import User1 from "../../assets/images/profile/user-1.jpg"
import User2 from "../../assets/images/profile/user-2.jpg"
import User3 from "../../assets/images/profile/user-3.jpg"
import User4 from "../../assets/images/profile/user-4.jpg"
import User5 from "../../assets/images/profile/user-5.jpg"

<Stack direction="row" spacing={1} justifyContent="center">
    <AvatarGroup>
        <Badge
            overlap="circular"
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            badgeContent={
                <Avatar sx={{ width: 22, height: 22 }} alt="Remy Sharp" src={User4} />
            }
        >
            <Avatar alt="Travis Howard" src={User2} />
        </Badge>
    </AvatarGroup>
    <Badge
        overlap="circular"
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        variant="dot"
        color="success"
    >
        <Avatar alt="Remy Sharp" src={User3} />
    </Badge>
    <Badge
        overlap="circular"
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        variant="dot"
        color="warning"
    >
        <Avatar alt="Remy Sharp" src={"User4"} />
    </Badge>
    <Badge
        overlap="circular"
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        variant="dot"
        color="error"
    >
        <Avatar alt="Remy Sharp" src={User5} />
    </Badge>
</Stack>`})}),b=()=>r.jsx(r.Fragment,{children:r.jsx(c,{children:`
import * as React from 'react';
import { Avatar, Stack } from '@mui/material';
import { IconMoodSmile } from '@tabler/icons';

import User1 from "../../assets/images/profile/user-1.jpg"
import User2 from "../../assets/images/profile/user-2.jpg"
import User3 from "../../assets/images/profile/user-3.jpg"
import User4 from "../../assets/images/profile/user-4.jpg"
import User5 from "../../assets/images/profile/user-5.jpg"
import User6 from "../../assets/images/profile/user-6.jpg"

<Stack direction="row" spacing={1} justifyContent="center">
    <Avatar alt="Remy Sharp" src={User1} sx={{ width: 24, height: 24 }} />
    <Avatar alt="Remy Sharp" src={User2} sx={{ width: 32, height: 32 }} />
    <Avatar alt="Remy Sharp" src={User3} />
    <Avatar alt="Remy Sharp" src={User4} sx={{ width: 50, height: 50 }} />
    <Avatar alt="Remy Sharp" src={User5} sx={{ width: 60, height: 60 }} />
    <Avatar alt="Remy Sharp" src={User6} sx={{ width: 65, height: 65 }} />
</Stack>`})}),C=[{to:"/",title:"Home"},{title:"Avatar"}],dr=()=>r.jsxs(g,{title:"Avatar",description:"this is Avatar page",children:[r.jsx(x,{title:"Avatar",items:C}),r.jsx(j,{title:"Avatar",children:r.jsxs(e,{container:!0,spacing:3,children:[r.jsx(e,{item:!0,xs:12,lg:4,sm:6,display:"flex",alignItems:"stretch",children:r.jsx(i,{title:"Image avatars",codeModel:r.jsx(v,{}),children:r.jsxs(o,{direction:"row",spacing:1,justifyContent:"center",children:[r.jsx(t,{alt:"Remy Sharp",src:a}),r.jsx(t,{alt:"Travis Howard",src:m}),r.jsx(t,{alt:"Cindy Baker",src:n})]})})}),r.jsx(e,{item:!0,xs:12,lg:4,sm:6,display:"flex",alignItems:"stretch",children:r.jsx(i,{title:"Letter avatars",codeModel:r.jsx(u,{}),children:r.jsxs(o,{direction:"row",spacing:1,justifyContent:"center",children:[r.jsx(t,{sx:{bgcolor:"primary.main"},children:"A"}),r.jsx(t,{sx:{bgcolor:"secondary.main"},children:"B"}),r.jsx(t,{sx:{bgcolor:"error.main"},children:"C"}),r.jsx(t,{sx:{bgcolor:"warning.main"},children:"D"}),r.jsx(t,{sx:{bgcolor:"success.main"},children:"E"})]})})}),r.jsx(e,{item:!0,xs:12,lg:4,sm:6,display:"flex",alignItems:"stretch",children:r.jsx(i,{title:"Icon avatars",codeModel:r.jsx(f,{}),children:r.jsxs(o,{direction:"row",spacing:1,justifyContent:"center",children:[r.jsx(t,{sx:{bgcolor:"primary.main"},children:r.jsx(s,{width:24})}),r.jsx(t,{sx:{bgcolor:"secondary.main"},children:r.jsx(s,{width:24})}),r.jsx(t,{sx:{bgcolor:"error.main"},children:r.jsx(s,{width:24})}),r.jsx(t,{sx:{bgcolor:"warning.main"},children:r.jsx(s,{width:24})}),r.jsx(t,{sx:{bgcolor:"success.main"},children:r.jsx(s,{width:24})})]})})}),r.jsx(e,{item:!0,xs:12,lg:4,sm:6,display:"flex",alignItems:"stretch",children:r.jsx(i,{title:"Variant",codeModel:r.jsx(A,{}),children:r.jsxs(o,{direction:"row",spacing:1,justifyContent:"center",children:[r.jsx(t,{sx:{bgcolor:"primary.main"},children:r.jsx(s,{width:24})}),r.jsx(t,{sx:{bgcolor:"primary.main"},variant:"square",children:r.jsx(s,{width:24})}),r.jsx(t,{sx:{bgcolor:"primary.main"},variant:"rounded",children:r.jsx(s,{width:24})})]})})}),r.jsx(e,{item:!0,xs:12,lg:4,sm:6,display:"flex",alignItems:"stretch",children:r.jsx(i,{title:"Grouped",codeModel:r.jsx(y,{}),children:r.jsx(o,{direction:"row",spacing:1,justifyContent:"center",children:r.jsxs(d,{max:4,children:[r.jsx(t,{alt:"Remy Sharp",src:a}),r.jsx(t,{alt:"Travis Howard",src:m}),r.jsx(t,{alt:"Cindy Baker",src:n})]})})})}),r.jsx(e,{item:!0,xs:12,lg:4,sm:6,display:"flex",alignItems:"stretch",children:r.jsx(i,{title:"Grouped Size",codeModel:r.jsx(S,{}),children:r.jsx(o,{direction:"row",spacing:1,justifyContent:"center",children:r.jsxs(d,{max:4,children:[r.jsx(t,{alt:"Remy Sharp",sx:{width:56,height:56},src:a}),r.jsx(t,{alt:"Travis Howard",sx:{width:56,height:56},src:m}),r.jsx(t,{alt:"Cindy Baker",sx:{width:56,height:56},src:n})]})})})}),r.jsx(e,{item:!0,xs:12,lg:4,sm:6,display:"flex",alignItems:"stretch",children:r.jsx(i,{title:"With Badge",codeModel:r.jsx(w,{}),children:r.jsxs(o,{direction:"row",spacing:1,justifyContent:"center",children:[r.jsx(d,{children:r.jsx(l,{overlap:"circular",anchorOrigin:{vertical:"bottom",horizontal:"right"},badgeContent:r.jsx(t,{sx:{width:22,height:22},alt:"Remy Sharp",src:a}),children:r.jsx(t,{alt:"Travis Howard",src:m})})}),r.jsx(l,{overlap:"circular",anchorOrigin:{vertical:"bottom",horizontal:"right"},variant:"dot",color:"success",children:r.jsx(t,{alt:"Remy Sharp",src:n})}),r.jsx(l,{overlap:"circular",anchorOrigin:{vertical:"bottom",horizontal:"right"},variant:"dot",color:"warning",children:r.jsx(t,{alt:"Remy Sharp",src:p})}),r.jsx(l,{overlap:"circular",anchorOrigin:{vertical:"bottom",horizontal:"right"},variant:"dot",color:"error",children:r.jsx(t,{alt:"Remy Sharp",src:h})})]})})}),r.jsx(e,{item:!0,xs:12,lg:8,sm:6,display:"flex",alignItems:"stretch",children:r.jsx(i,{title:"Sizes",codeModel:r.jsx(b,{}),children:r.jsxs(o,{direction:{xs:"column",sm:"row"},spacing:1,justifyContent:"center",children:[r.jsx(t,{alt:"Remy Sharp",src:a,sx:{width:24,height:24}}),r.jsx(t,{alt:"Remy Sharp",src:a,sx:{width:32,height:32}}),r.jsx(t,{alt:"Remy Sharp",src:a}),r.jsx(t,{alt:"Remy Sharp",src:a,sx:{width:50,height:50}}),r.jsx(t,{alt:"Remy Sharp",src:a,sx:{width:60,height:60}}),r.jsx(t,{alt:"Remy Sharp",src:a,sx:{width:65,height:65}})]})})})]})})]});export{dr as default};
