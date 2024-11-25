import{r as f,a4 as O,j as t,a5 as j}from"./index-1d78c4ac.js";import{I as Q}from"./InlineItemCard-057cd918.js";import{B as U}from"./Breadcrumb-4b5ba697.js";import{P as Y}from"./PageContainer-51f17055.js";import{P as tt}from"./ParentCard-b3c2f72c.js";import{C as c}from"./ChildCard-8626bfcd.js";import{C as m}from"./CodeDialog-4128d6b6.js";import{ao as w,X as S}from"./index.esm-4ca6571d.js";import{u as ot,s as F,B as it}from"./Box-3b2e6d90.js";import{T as o,t as W}from"./Tooltip-58d28098.js";import{u as et,G as a}from"./Grid-ba112631.js";import{S as g}from"./Stack-74791772.js";import{I as P}from"./IconButton-6eb83b27.js";import{B as i}from"./Button-6de5bece.js";import{F as b}from"./Fab-f5ac0b6f.js";import{F as nt}from"./Modal-5026ae4f.js";import{T as rt,r as lt,g as R}from"./utils-f13413e5.js";import"./Link-5958468e.js";import"./Card-ed0a9074.js";import"./CardHeader-4375bfdf.js";import"./Divider-32914f08.js";import"./dividerClasses-40064371.js";import"./CardContent-97c31a3d.js";import"./DialogContent-aa8a214a.js";import"./useId-521a9597.js";import"./DialogTitle-be3ad24b.js";import"./toConsumableArray-d8b147df.js";import"./Popper-880e6f72.js";import"./Portal-8f313b54.js";import"./createPopper-04c39de4.js";import"./useControlled-05793c79.js";import"./Grow-cf41a8df.js";import"./createStack-08af7ebe.js";import"./styled-db48c038.js";import"./useThemeProps-a461f42f.js";import"./ownerWindow-f1e1d6ee.js";import"./createChainedFunction-0bab83cf.js";const st=["addEndListener","appear","children","easing","in","onEnter","onEntered","onEntering","onExit","onExited","onExiting","style","timeout","TransitionComponent"],at={entering:{transform:"none"},entered:{transform:"none"}},dt=f.forwardRef(function(r,L){const l=et(),A={enter:l.transitions.duration.enteringScreen,exit:l.transitions.duration.leavingScreen},{addEndListener:y,appear:k=!0,children:h,easing:v,in:E,onEnter:C,onEntered:N,onEntering:M,onExit:I,onExited:D,onExiting:Z,style:x,timeout:T=A,TransitionComponent:q=rt}=r,G=O(r,st),u=f.useRef(null),_=ot(u,h.ref,L),s=e=>n=>{if(e){const d=u.current;n===void 0?e(d):e(d,n)}},$=s(M),z=s((e,n)=>{lt(e);const d=R({style:x,timeout:T,easing:v},{mode:"enter"});e.style.webkitTransition=l.transitions.create("transform",d),e.style.transition=l.transitions.create("transform",d),C&&C(e,n)}),V=s(N),X=s(Z),H=s(e=>{const n=R({style:x,timeout:T,easing:v},{mode:"exit"});e.style.webkitTransition=l.transitions.create("transform",n),e.style.transition=l.transitions.create("transform",n),I&&I(e)}),K=s(D),J=e=>{y&&y(u.current,e)};return t.jsx(q,j({appear:k,in:E,nodeRef:u,onEnter:z,onEntered:V,onEntering:$,onExit:H,onExited:K,onExiting:X,addEndListener:J,timeout:T},G,{children:(e,n)=>f.cloneElement(h,j({style:j({transform:"scale(0)",visibility:e==="exited"&&!E?"hidden":void 0},at[e],x,h.props.style),ref:_},n))}))}),ct=dt,mt=()=>t.jsx(t.Fragment,{children:t.jsx(m,{children:`
import * as React from 'react';
import { styled } from '@mui/material/styles';
import { IconButton, Button, Stack, Fab, Box } from '@mui/material';
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';

import { IconPlus, IconTrash } from '@tabler/icons';

<Stack direction="row" spacing={2} alignItems="center">
    <Tooltip title="Delete">
        <IconButton>
            <IconTrash width={20} height={20} />
        </IconButton>
    </Tooltip>
    <Tooltip title="Add">
        <Button variant="outlined" color="primary">
            Button
        </Button>
    </Tooltip>
    <Tooltip title="Delete">
        <IconButton color="error">
            <IconTrash width={20} height={20} />
        </IconButton>
    </Tooltip>
    <Tooltip title="Add">
        <Fab color="secondary">
            <IconPlus width={20} height={20} />
        </Fab>
    </Tooltip>
</Stack>`})}),pt=()=>t.jsx(t.Fragment,{children:t.jsx(m,{children:`
import * as React from 'react';
import { styled } from '@mui/material/styles';
import { IconButton, Button, Stack, Fab, Box } from '@mui/material';
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';

import { IconPlus } from '@tabler/icons';

<Box textAlign="center">
    <Tooltip title="Delete" arrow>
        <Fab color="secondary">
            <IconPlus width={20} height={20} />
        </Fab>
    </Tooltip>
</Box>
`})}),ut=()=>t.jsx(t.Fragment,{children:t.jsx(m,{children:`
import * as React from 'react';
import { styled } from '@mui/material/styles';
import { IconButton, Button, Stack, Fab, Box } from '@mui/material';
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';

const CustomWidthTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))({
  ['& .{tooltipClasses.tooltip}']: {
    maxWidth: 500,
  },
});

const NoMaxWidthTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))({
  ['& .{tooltipClasses.tooltip}']: {
    maxWidth: 'none',
  },
});

const longText = '
Aliquam eget finibus ante, non facilisis lectus. Sed vitae dignissim est, vel aliquam tellus.
Praesent non nunc mollis, fermentum neque at, semper arcu.
Nullam eget est sed sem iaculis gravida eget vitae justo.
';

import { IconPlus, IconTrash } from '@tabler/icons';

<Stack spacing={1} direction="row">
    <Tooltip title={longText}>
        <Button variant="outlined">Default Width [300px]</Button>
    </Tooltip>
    <CustomWidthTooltip title={longText}>
        <Button color="secondary" variant="outlined">Custom Width [500px]</Button>
    </CustomWidthTooltip>
    <NoMaxWidthTooltip title={longText}>
        <Button color="warning" variant="outlined">No wrapping</Button>
    </NoMaxWidthTooltip>
</Stack>`})}),ht=()=>t.jsx(t.Fragment,{children:t.jsx(m,{children:`
import * as React from 'react';
import { styled } from '@mui/material/styles';
import { IconButton, Button, Stack, Fab, Box } from '@mui/material';
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';
import Fade from '@mui/material/Fade';
import Zoom from '@mui/material/Zoom';

<Stack spacing={1} direction="row">
    <Tooltip title="Add">
        <Button variant="outlined" color="primary">Grow</Button>
    </Tooltip>
    <Tooltip
        TransitionComponent={Fade}
        TransitionProps={{ timeout: 600 }}
        title="Add"
    >
        <Button variant="outlined" color="secondary">Fade</Button>
    </Tooltip>
    <Tooltip TransitionComponent={Zoom} title="Add">
        <Button variant="outlined" color="warning">Zoom</Button>
    </Tooltip>
</Stack>`})}),xt=()=>t.jsx(t.Fragment,{children:t.jsx(m,{children:`
import * as React from 'react';
import { styled } from '@mui/material/styles';
import { Button } from '@mui/material';
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';
import InlineItemCard from "@/app/components/shared/InlineItemCard";

<InlineItemCard>
    <Tooltip title="Top Start" placement="top-start">
        <Button variant="outlined" color="primary">Top Start</Button>
    </Tooltip>
    <Tooltip title="Top" placement="top">
        <Button variant="outlined" color="secondary">Top</Button>
    </Tooltip>
    <Tooltip title="Top End" placement="top-end">
        <Button variant="outlined" color="warning">Top End</Button>
    </Tooltip>
    <Tooltip title="Left Start" placement="left-start">
        <Button variant="outlined" color="success">Left Start</Button>
    </Tooltip>
    <Tooltip title="Left" placement="left">
        <Button variant="outlined" color="error">Left</Button>
    </Tooltip>
    <Tooltip title="Left End" placement="left-end">
        <Button variant="outlined" color="primary">Left End</Button>
    </Tooltip>
    <Tooltip title="Right Start" placement="right-start">
        <Button variant="outlined" color="secondary">Right Start</Button>
    </Tooltip>
    <Tooltip title="Right" placement="right">
        <Button variant="outlined" color="warning">Right</Button>
    </Tooltip>
    <Tooltip title="Right End" placement="right-end">
        <Button variant="outlined" color="success">Right End</Button>
    </Tooltip>
    <Tooltip title="Bottom Start" placement="bottom-start">
        <Button variant="outlined" color="error">Bottom Start</Button>
    </Tooltip>
    <Tooltip title="Bottom" placement="bottom">
        <Button variant="outlined" color="primary">Bottom</Button>
    </Tooltip>
    <Tooltip title="Bottom End" placement="bottom-end">
        <Button variant="outlined" color="secondary">Bottom End</Button>
    </Tooltip>
</InlineItemCard>`})}),Tt=[{to:"/",title:"Home"},{title:"Tooltip"}],ft=F(({className:p,...r})=>t.jsx(o,{...r,classes:{popper:p}}))({[`& .${W.tooltip}`]:{maxWidth:500}}),jt=F(({className:p,...r})=>t.jsx(o,{...r,classes:{popper:p}}))({[`& .${W.tooltip}`]:{maxWidth:"none"}}),B=`
Aliquam eget finibus ante, non facilisis lectus. Sed vitae dignissim est, vel aliquam tellus.
Praesent non nunc mollis, fermentum neque at, semper arcu.
Nullam eget est sed sem iaculis gravida eget vitae justo.
`,io=()=>t.jsxs(Y,{title:"Tooltip",description:"this is Tooltip page",children:[t.jsx(U,{title:"Tooltip",items:Tt}),t.jsx(tt,{title:"Tooltip",children:t.jsxs(a,{container:!0,spacing:3,children:[t.jsx(a,{item:!0,xs:12,sm:6,display:"flex",alignItems:"stretch",children:t.jsx(c,{title:"Simple",codeModel:t.jsx(mt,{}),children:t.jsxs(g,{direction:{xs:"column",sm:"row"},spacing:2,alignItems:"center",children:[t.jsx(o,{title:"Delete",children:t.jsx(P,{children:t.jsx(w,{width:20,height:20})})}),t.jsx(o,{title:"Add",children:t.jsx(i,{variant:"outlined",color:"primary",children:"Button"})}),t.jsx(o,{title:"Delete",children:t.jsx(P,{color:"error",children:t.jsx(w,{width:20,height:20})})}),t.jsx(o,{title:"Add",children:t.jsx(b,{color:"secondary",children:t.jsx(S,{width:20,height:20})})})]})})}),t.jsx(a,{item:!0,xs:12,sm:6,display:"flex",alignItems:"stretch",children:t.jsx(c,{title:"Arrow",codeModel:t.jsx(pt,{}),children:t.jsx(it,{textAlign:"center",children:t.jsx(o,{title:"Delete",arrow:!0,children:t.jsx(b,{color:"secondary",children:t.jsx(S,{width:20,height:20})})})})})}),t.jsx(a,{item:!0,xs:12,sm:6,display:"flex",alignItems:"stretch",children:t.jsx(c,{title:"Variable Width",codeModel:t.jsx(ut,{}),children:t.jsxs(g,{spacing:1,direction:{xs:"column",sm:"row"},children:[t.jsx(o,{title:B,children:t.jsx(i,{variant:"outlined",children:"Default Width [300px]"})}),t.jsx(ft,{title:B,children:t.jsx(i,{color:"secondary",variant:"outlined",children:"Custom Width [500px]"})}),t.jsx(jt,{title:B,children:t.jsx(i,{color:"warning",variant:"outlined",children:"No wrapping"})})]})})}),t.jsx(a,{item:!0,xs:12,sm:6,display:"flex",alignItems:"stretch",children:t.jsx(c,{title:"Transitions",codeModel:t.jsx(ht,{}),children:t.jsxs(g,{spacing:1,direction:"row",children:[t.jsx(o,{title:"Add",children:t.jsx(i,{variant:"outlined",color:"primary",children:"Grow"})}),t.jsx(o,{TransitionComponent:nt,TransitionProps:{timeout:600},title:"Add",children:t.jsx(i,{variant:"outlined",color:"secondary",children:"Fade"})}),t.jsx(o,{TransitionComponent:ct,title:"Add",children:t.jsx(i,{variant:"outlined",color:"warning",children:"Zoom"})})]})})}),t.jsx(a,{item:!0,xs:12,display:"flex",alignItems:"stretch",children:t.jsx(c,{title:"Positions",codeModel:t.jsx(xt,{}),children:t.jsxs(Q,{children:[t.jsx(o,{title:"Top Start",placement:"top-start",children:t.jsx(i,{variant:"outlined",color:"primary",children:"Top Start"})}),t.jsx(o,{title:"Top",placement:"top",children:t.jsx(i,{variant:"outlined",color:"secondary",children:"Top"})}),t.jsx(o,{title:"Top End",placement:"top-end",children:t.jsx(i,{variant:"outlined",color:"warning",children:"Top End"})}),t.jsx(o,{title:"Left Start",placement:"left-start",children:t.jsx(i,{variant:"outlined",color:"success",children:"Left Start"})}),t.jsx(o,{title:"Left",placement:"left",children:t.jsx(i,{variant:"outlined",color:"error",children:"Left"})}),t.jsx(o,{title:"Left End",placement:"left-end",children:t.jsx(i,{variant:"outlined",color:"primary",children:"Left End"})}),t.jsx(o,{title:"Right Start",placement:"right-start",children:t.jsx(i,{variant:"outlined",color:"secondary",children:"Right Start"})}),t.jsx(o,{title:"Right",placement:"right",children:t.jsx(i,{variant:"outlined",color:"warning",children:"Right"})}),t.jsx(o,{title:"Right End",placement:"right-end",children:t.jsx(i,{variant:"outlined",color:"success",children:"Right End"})}),t.jsx(o,{title:"Bottom Start",placement:"bottom-start",children:t.jsx(i,{variant:"outlined",color:"error",children:"Bottom Start"})}),t.jsx(o,{title:"Bottom",placement:"bottom",children:t.jsx(i,{variant:"outlined",color:"primary",children:"Bottom"})}),t.jsx(o,{title:"Bottom End",placement:"bottom-end",children:t.jsx(i,{variant:"outlined",color:"secondary",children:"Bottom End"})})]})})})]})})]});export{io as default};
