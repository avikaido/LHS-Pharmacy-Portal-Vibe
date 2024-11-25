import{by as q,aQ as w,a5 as m,bx as J,r as U,aP as Y,a4 as tt,j as t,bT as et}from"./index-1d78c4ac.js";import{B as it}from"./Breadcrumb-4b5ba697.js";import{P as at}from"./PageContainer-51f17055.js";import{P as V}from"./ParentCard-b3c2f72c.js";import{C as l}from"./ChildCard-8626bfcd.js";import{S as a}from"./Stack-74791772.js";import{B as o,a as lt}from"./Button-6de5bece.js";import{ao as W,al as y,b6 as u,X as st,ae as ct,ba as F,bb as L,bc as z,bj as R,bk as M,bl as O}from"./index.esm-4ca6571d.js";import{g as ot,c as nt,s as $,d as dt,e as rt}from"./Box-3b2e6d90.js";import{u as ut}from"./useId-521a9597.js";import{T as d}from"./Tooltip-58d28098.js";import{I as f}from"./IconButton-6eb83b27.js";import{F as x}from"./Fab-f5ac0b6f.js";import{B as i}from"./ButtonGroup-bb426644.js";import{C as s}from"./CodeDialog-4128d6b6.js";import{G as e}from"./Grid-ba112631.js";import"./Link-5958468e.js";import"./Card-ed0a9074.js";import"./CardHeader-4375bfdf.js";import"./Divider-32914f08.js";import"./dividerClasses-40064371.js";import"./CardContent-97c31a3d.js";import"./createStack-08af7ebe.js";import"./styled-db48c038.js";import"./useThemeProps-a461f42f.js";import"./Popper-880e6f72.js";import"./Portal-8f313b54.js";import"./createPopper-04c39de4.js";import"./useControlled-05793c79.js";import"./Grow-cf41a8df.js";import"./utils-f13413e5.js";import"./DialogContent-aa8a214a.js";import"./Modal-5026ae4f.js";import"./ownerWindow-f1e1d6ee.js";import"./createChainedFunction-0bab83cf.js";import"./DialogTitle-be3ad24b.js";import"./toConsumableArray-d8b147df.js";function xt(r){return ot("MuiCircularProgress",r)}nt("MuiCircularProgress",["root","determinate","indeterminate","colorPrimary","colorSecondary","svg","circle","circleDeterminate","circleIndeterminate","circleDisableShrink"]);const ht=["className","color","disableShrink","size","style","thickness","value","variant"];let _=r=>r,K,X,H,Q;const b=44,mt=q(K||(K=_`
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
`)),jt=q(X||(X=_`
  0% {
    stroke-dasharray: 1px, 200px;
    stroke-dashoffset: 0;
  }

  50% {
    stroke-dasharray: 100px, 200px;
    stroke-dashoffset: -15px;
  }

  100% {
    stroke-dasharray: 100px, 200px;
    stroke-dashoffset: -125px;
  }
`)),pt=r=>{const{classes:n,variant:c,color:h,disableShrink:I}=r,j={root:["root",c,`color${w(h)}`],svg:["svg"],circle:["circle",`circle${w(c)}`,I&&"circleDisableShrink"]};return rt(j,xt,n)},Bt=$("span",{name:"MuiCircularProgress",slot:"Root",overridesResolver:(r,n)=>{const{ownerState:c}=r;return[n.root,n[c.variant],n[`color${w(c.color)}`]]}})(({ownerState:r,theme:n})=>m({display:"inline-block"},r.variant==="determinate"&&{transition:n.transitions.create("transform")},r.color!=="inherit"&&{color:(n.vars||n).palette[r.color].main}),({ownerState:r})=>r.variant==="indeterminate"&&J(H||(H=_`
      animation: ${0} 1.4s linear infinite;
    `),mt)),gt=$("svg",{name:"MuiCircularProgress",slot:"Svg",overridesResolver:(r,n)=>n.svg})({display:"block"}),bt=$("circle",{name:"MuiCircularProgress",slot:"Circle",overridesResolver:(r,n)=>{const{ownerState:c}=r;return[n.circle,n[`circle${w(c.variant)}`],c.disableShrink&&n.circleDisableShrink]}})(({ownerState:r,theme:n})=>m({stroke:"currentColor"},r.variant==="determinate"&&{transition:n.transitions.create("stroke-dashoffset")},r.variant==="indeterminate"&&{strokeDasharray:"80px, 200px",strokeDashoffset:0}),({ownerState:r})=>r.variant==="indeterminate"&&!r.disableShrink&&J(Q||(Q=_`
      animation: ${0} 1.4s ease-in-out infinite;
    `),jt)),yt=U.forwardRef(function(n,c){const h=Y({props:n,name:"MuiCircularProgress"}),{className:I,color:j="primary",disableShrink:A=!1,size:v=40,style:N,thickness:B=3.6,value:S=0,variant:D="indeterminate"}=h,E=tt(h,ht),T=m({},h,{color:j,disableShrink:A,size:v,thickness:B,value:S,variant:D}),k=pt(T),C={},g={},P={};if(D==="determinate"){const G=2*Math.PI*((b-B)/2);C.strokeDasharray=G.toFixed(3),P["aria-valuenow"]=Math.round(S),C.strokeDashoffset=`${((100-S)/100*G).toFixed(3)}px`,g.transform="rotate(-90deg)"}return t.jsx(Bt,m({className:dt(k.root,I),style:m({width:v,height:v},g,N),ownerState:T,ref:c,role:"progressbar"},P,E,{children:t.jsx(gt,{className:k.svg,ownerState:T,viewBox:`${b/2} ${b/2} ${b} ${b}`,children:t.jsx(bt,{className:k.circle,style:C,ownerState:T,cx:b,cy:b,r:(b-B)/2,fill:"none",strokeWidth:B})})}))}),ft=yt;function wt(r){return ot("MuiLoadingButton",r)}const It=nt("MuiLoadingButton",["root","loading","loadingIndicator","loadingIndicatorCenter","loadingIndicatorStart","loadingIndicatorEnd","endIconLoadingEnd","startIconLoadingStart"]),p=It,vt=["children","disabled","id","loading","loadingIndicator","loadingPosition","variant"],St=r=>{const{loading:n,loadingPosition:c,classes:h}=r,I={root:["root",n&&"loading"],startIcon:[n&&`startIconLoading${w(c)}`],endIcon:[n&&`endIconLoading${w(c)}`],loadingIndicator:["loadingIndicator",n&&`loadingIndicator${w(c)}`]},j=rt(I,wt,h);return m({},h,j)},Tt=r=>r!=="ownerState"&&r!=="theme"&&r!=="sx"&&r!=="as"&&r!=="classes",kt=$(o,{shouldForwardProp:r=>Tt(r)||r==="classes",name:"MuiLoadingButton",slot:"Root",overridesResolver:(r,n)=>[n.root,n.startIconLoadingStart&&{[`& .${p.startIconLoadingStart}`]:n.startIconLoadingStart},n.endIconLoadingEnd&&{[`& .${p.endIconLoadingEnd}`]:n.endIconLoadingEnd}]})(({ownerState:r,theme:n})=>m({[`& .${p.startIconLoadingStart}, & .${p.endIconLoadingEnd}`]:{transition:n.transitions.create(["opacity"],{duration:n.transitions.duration.short}),opacity:0}},r.loadingPosition==="center"&&{transition:n.transitions.create(["background-color","box-shadow","border-color"],{duration:n.transitions.duration.short}),[`&.${p.loading}`]:{color:"transparent"}},r.loadingPosition==="start"&&r.fullWidth&&{[`& .${p.startIconLoadingStart}, & .${p.endIconLoadingEnd}`]:{transition:n.transitions.create(["opacity"],{duration:n.transitions.duration.short}),opacity:0,marginRight:-8}},r.loadingPosition==="end"&&r.fullWidth&&{[`& .${p.startIconLoadingStart}, & .${p.endIconLoadingEnd}`]:{transition:n.transitions.create(["opacity"],{duration:n.transitions.duration.short}),opacity:0,marginLeft:-8}})),Ct=$("span",{name:"MuiLoadingButton",slot:"LoadingIndicator",overridesResolver:(r,n)=>{const{ownerState:c}=r;return[n.loadingIndicator,n[`loadingIndicator${w(c.loadingPosition)}`]]}})(({theme:r,ownerState:n})=>m({position:"absolute",visibility:"visible",display:"flex"},n.loadingPosition==="start"&&(n.variant==="outlined"||n.variant==="contained")&&{left:n.size==="small"?10:14},n.loadingPosition==="start"&&n.variant==="text"&&{left:6},n.loadingPosition==="center"&&{left:"50%",transform:"translate(-50%)",color:(r.vars||r).palette.action.disabled},n.loadingPosition==="end"&&(n.variant==="outlined"||n.variant==="contained")&&{right:n.size==="small"?10:14},n.loadingPosition==="end"&&n.variant==="text"&&{right:6},n.loadingPosition==="start"&&n.fullWidth&&{position:"relative",left:-10},n.loadingPosition==="end"&&n.fullWidth&&{position:"relative",right:-10})),Pt=U.forwardRef(function(n,c){const h=U.useContext(lt),I=et(h,n),j=Y({props:I,name:"MuiLoadingButton"}),{children:A,disabled:v=!1,id:N,loading:B=!1,loadingIndicator:S,loadingPosition:D="center",variant:E="text"}=j,T=tt(j,vt),k=ut(N),C=S??t.jsx(ft,{"aria-labelledby":k,color:"inherit",size:16}),g=m({},j,{disabled:v,loading:B,loadingIndicator:C,loadingPosition:D,variant:E}),P=St(g),G=B?t.jsx(Ct,{className:P.loadingIndicator,ownerState:g,children:C}):null;return t.jsxs(kt,m({disabled:v||B,id:k,ref:c},T,{variant:E,classes:P,ownerState:g,children:[g.loadingPosition==="end"?A:G,g.loadingPosition==="end"?G:A]}))}),Z=Pt,Gt=()=>t.jsxs(a,{spacing:1,direction:{xs:"column",sm:"row"},justifyContent:"center",children:[t.jsx(o,{variant:"contained",color:"primary",children:"Primary"}),t.jsx(o,{variant:"contained",color:"secondary",children:"Secondary"}),t.jsx(o,{disabled:!0,children:"Disabled"}),t.jsx(o,{href:"#text-buttons",variant:"contained",color:"primary",children:"Link"})]}),Ft=()=>t.jsxs(a,{gap:1,direction:{xs:"column",sm:"row"},justifyContent:"center",children:[t.jsx(o,{variant:"contained",color:"primary",children:"Primary"}),t.jsx(o,{variant:"contained",color:"secondary",children:"Secondary"}),t.jsx(o,{variant:"contained",color:"error",children:"Error"}),t.jsx(o,{variant:"contained",color:"warning",children:"Warning"}),t.jsx(o,{variant:"contained",color:"success",children:"Success"})]}),Lt=()=>t.jsxs(a,{spacing:1,direction:{xs:"column",sm:"row"},justifyContent:"center",children:[t.jsx(Z,{loading:!0,loadingIndicator:"Loading…",variant:"contained",color:"error",startIcon:t.jsx(W,{width:18}),children:"Left Icon"}),t.jsx(Z,{loading:!0,variant:"contained",color:"secondary",endIcon:t.jsx(W,{width:18}),children:"Right Icon"})]}),zt=()=>t.jsxs(a,{spacing:1,direction:{xs:"column",sm:"row"},alignItems:"center",justifyContent:"center",children:[t.jsx(o,{variant:"contained",size:"small",children:"Small"}),t.jsx(o,{variant:"contained",size:"medium",children:"Medium"}),t.jsx(o,{variant:"contained",size:"large",children:"Large"})]}),Rt=()=>t.jsxs(a,{spacing:1,direction:{xs:"column",sm:"row"},justifyContent:"center",children:[t.jsx(o,{variant:"outlined",color:"primary",children:"Primary"}),t.jsx(o,{variant:"outlined",color:"secondary",children:"Secondary"}),t.jsx(o,{disabled:!0,children:"Disabled"}),t.jsx(o,{href:"#text-buttons",variant:"outlined",color:"primary",children:"Link"})]}),Mt=()=>t.jsxs(a,{spacing:1,direction:{xs:"column",sm:"row"},justifyContent:"center",children:[t.jsx(o,{variant:"outlined",color:"error",startIcon:t.jsx(W,{width:18}),children:"Left Icon"}),t.jsx(o,{variant:"outlined",color:"secondary",endIcon:t.jsx(y,{width:18}),children:"Right Icon"})]}),Ot=()=>t.jsxs(a,{spacing:1,direction:{xs:"column",sm:"row"},alignItems:"center",justifyContent:"center",children:[t.jsx(o,{variant:"outlined",size:"small",children:"Small"}),t.jsx(o,{variant:"outlined",size:"medium",children:"Medium"}),t.jsx(o,{variant:"outlined",size:"large",children:"Large"})]}),$t=()=>t.jsxs(a,{spacing:1,direction:{xs:"column",sm:"row"},justifyContent:"center",children:[t.jsx(o,{color:"primary",children:"Primary"}),t.jsx(o,{color:"secondary",children:"Secondary"}),t.jsx(o,{disabled:!0,children:"Disabled"}),t.jsx(o,{href:"#text-buttons",color:"primary",children:"Link"})]}),At=()=>t.jsxs(a,{spacing:1,direction:{xs:"column",sm:"row"},justifyContent:"center",children:[t.jsx(o,{color:"primary",children:"Primary"}),t.jsx(o,{color:"secondary",children:"Secondary"}),t.jsx(o,{color:"error",children:"Error"}),t.jsx(o,{color:"warning",children:"Warning"}),t.jsx(o,{color:"success",children:"Success"})]}),Dt=()=>t.jsxs(a,{spacing:1,direction:"row",justifyContent:"center",children:[t.jsx(o,{color:"error",startIcon:t.jsx(W,{width:18}),children:"Left Icon"}),t.jsx(o,{color:"secondary",endIcon:t.jsx(y,{width:18}),children:"Right Icon"})]}),Et=()=>t.jsxs(a,{spacing:1,direction:"row",alignItems:"center",justifyContent:"center",children:[t.jsx(o,{size:"small",children:"Small"}),t.jsx(o,{size:"medium",children:"Medium"}),t.jsx(o,{size:"large",children:"Large"})]}),Wt=()=>t.jsxs(a,{spacing:1,direction:"row",justifyContent:"center",children:[t.jsx(d,{title:"Bell",children:t.jsx(f,{variant:"contained",color:"primary","aria-label":"primary-bell",children:t.jsx(u,{width:18})})}),t.jsx(d,{title:"Bell",children:t.jsx(f,{variant:"contained",color:"secondary","aria-label":"secondary-bell",children:t.jsx(u,{width:18})})}),t.jsx(d,{title:"Bell",children:t.jsx(f,{variant:"contained",color:"error","aria-label":"error-bell",children:t.jsx(u,{width:18})})}),t.jsx(d,{title:"Bell",children:t.jsx(f,{variant:"contained",color:"warning","aria-label":"warning-bell",children:t.jsx(u,{width:18})})}),t.jsx(d,{title:"Bell",children:t.jsx(f,{variant:"contained",color:"success","aria-label":"success-bell",children:t.jsx(u,{width:18})})})]}),_t=()=>t.jsxs(a,{spacing:1,direction:"row",justifyContent:"center",children:[t.jsx(d,{title:"Bell",children:t.jsx(f,{variant:"contained","aria-label":"small-bell",children:t.jsx(u,{width:16})})}),t.jsx(d,{title:"Bell",children:t.jsx(f,{variant:"contained",size:"medium","aria-label":"medium-bell",children:t.jsx(u,{width:19})})}),t.jsx(d,{title:"Bell",children:t.jsx(f,{variant:"contained","aria-label":"large-bell",children:t.jsx(u,{width:21})})})]}),Nt=()=>t.jsxs(a,{spacing:1,direction:"row",justifyContent:"center",children:[t.jsx(d,{title:"Send",children:t.jsx(x,{color:"primary","aria-label":"send",children:t.jsx(y,{width:20})})}),t.jsx(d,{title:"Add",children:t.jsx(x,{color:"secondary","aria-label":"plus",children:t.jsx(st,{width:20})})}),t.jsx(x,{disabled:!0,"aria-label":"clipboard",children:t.jsx(ct,{width:20})})]}),Ut=()=>t.jsx(t.Fragment,{children:t.jsxs(a,{spacing:1,direction:{xs:"column",sm:"row"},justifyContent:"center",alignItems:"center",children:[t.jsx(d,{title:"Send",children:t.jsx(x,{color:"primary","aria-label":"send",children:t.jsx(y,{width:20})})}),t.jsx(d,{title:"Send",children:t.jsx(x,{color:"secondary","aria-label":"send",children:t.jsx(y,{width:20})})}),t.jsx(d,{title:"Send",children:t.jsx(x,{color:"warning","aria-label":"send",children:t.jsx(y,{width:20})})}),t.jsx(d,{title:"Send",children:t.jsx(x,{color:"error","aria-label":"send",children:t.jsx(y,{width:20})})}),t.jsx(d,{title:"Send",children:t.jsx(x,{color:"success","aria-label":"send",children:t.jsx(y,{width:20})})})]})}),Vt=()=>t.jsx(t.Fragment,{children:t.jsxs(a,{spacing:1,direction:"row",justifyContent:"center",children:[t.jsx(d,{title:"Bell",children:t.jsx(x,{size:"small",color:"primary","aria-label":"small-bell",children:t.jsx(u,{width:16})})}),t.jsx(d,{title:"Bell",children:t.jsx(x,{size:"medium",color:"secondary","aria-label":"medium-bell",children:t.jsx(u,{width:18})})}),t.jsx(d,{title:"Bell",children:t.jsx(x,{size:"large",color:"warning","aria-label":"large-bell",children:t.jsx(u,{width:20})})})]})}),Kt=()=>t.jsxs(a,{spacing:1,children:[t.jsxs(i,{variant:"outlined","aria-label":"outlined button group",children:[t.jsx(o,{children:"One"}),t.jsx(o,{children:"Two"}),t.jsx(o,{children:"Three"})]}),t.jsxs(i,{variant:"contained",elevation:0,"aria-label":"outlined primary button group",children:[t.jsx(o,{children:"One"}),t.jsx(o,{children:"Two"}),t.jsx(o,{children:"Three"})]}),t.jsxs(i,{variant:"text","aria-label":"text button group",children:[t.jsx(o,{children:"One"}),t.jsx(o,{children:"Two"}),t.jsx(o,{children:"Three"})]})]}),Xt=()=>t.jsxs(a,{spacing:1,justifyContent:"center",children:[t.jsxs(i,{size:"small",variant:"outlined","aria-label":"outlined primary button group",children:[t.jsx(o,{children:"One"}),t.jsx(o,{children:"Two"}),t.jsx(o,{children:"Three"})]}),t.jsxs(i,{variant:"outlined","aria-label":"outlined button group",children:[t.jsx(o,{children:"One"}),t.jsx(o,{children:"Two"}),t.jsx(o,{children:"Three"})]}),t.jsxs(i,{size:"large",variant:"outlined","aria-label":"text button group",children:[t.jsx(o,{children:"One"}),t.jsx(o,{children:"Two"}),t.jsx(o,{children:"Three"})]})]}),Ht=()=>t.jsxs(a,{spacing:1,direction:"row",children:[t.jsxs(i,{orientation:"vertical",variant:"contained","aria-label":"outlined primary button group",children:[t.jsx(o,{children:"One"}),t.jsx(o,{children:"Two"}),t.jsx(o,{children:"Three"})]}),t.jsxs(i,{orientation:"vertical",variant:"outlined","aria-label":"outlined button group",children:[t.jsx(o,{children:"One"}),t.jsx(o,{children:"Two"}),t.jsx(o,{children:"Three"})]}),t.jsxs(i,{orientation:"vertical",variant:"text","aria-label":"text button group",children:[t.jsx(o,{children:"One"}),t.jsx(o,{children:"Two"}),t.jsx(o,{children:"Three"})]})]}),Qt=()=>t.jsxs(a,{spacing:2,direction:{xs:"column",sm:"row",lg:"column"},justifyContent:"center",children:[t.jsxs(a,{spacing:1,direction:{xs:"column",sm:"column",lg:"row"},children:[t.jsxs(i,{variant:"contained","aria-label":"outlined primary button group",children:[t.jsx(o,{children:"One"}),t.jsx(o,{children:"Two"}),t.jsx(o,{children:"Three"})]}),t.jsxs(i,{variant:"contained",color:"secondary","aria-label":"outlined primary button group",children:[t.jsx(o,{children:"One"}),t.jsx(o,{children:"Two"}),t.jsx(o,{children:"Three"})]}),t.jsxs(i,{variant:"contained",color:"error","aria-label":"outlined primary button group",children:[t.jsx(o,{children:"One"}),t.jsx(o,{children:"Two"}),t.jsx(o,{children:"Three"})]}),t.jsxs(i,{color:"success",variant:"contained","aria-label":"outlined primary button group",children:[t.jsx(o,{children:"One"}),t.jsx(o,{children:"Two"}),t.jsx(o,{children:"Three"})]})]}),t.jsxs(a,{spacing:1,direction:{xs:"column",sm:"column",lg:"row"},children:[t.jsxs(i,{variant:"outlined","aria-label":"outlined button group",children:[t.jsx(o,{children:t.jsx(F,{width:18})}),t.jsx(o,{children:t.jsx(L,{width:18})}),t.jsx(o,{children:t.jsx(z,{width:18})})]}),t.jsxs(i,{variant:"outlined",color:"secondary","aria-label":"outlined button group",children:[t.jsx(o,{children:t.jsx(F,{width:18})}),t.jsx(o,{children:t.jsx(L,{width:18})}),t.jsx(o,{children:t.jsx(z,{width:18})})]}),t.jsxs(i,{variant:"outlined",color:"warning","aria-label":"outlined button group",children:[t.jsx(o,{children:t.jsx(F,{width:18})}),t.jsx(o,{children:t.jsx(L,{width:18})}),t.jsx(o,{children:t.jsx(z,{width:18})})]}),t.jsxs(i,{variant:"outlined",color:"error","aria-label":"outlined button group",children:[t.jsx(o,{children:t.jsx(F,{width:18})}),t.jsx(o,{children:t.jsx(L,{width:18})}),t.jsx(o,{children:t.jsx(z,{width:18})})]}),t.jsxs(i,{variant:"outlined",color:"success","aria-label":"outlined button group",children:[t.jsx(o,{children:t.jsx(F,{width:18})}),t.jsx(o,{children:t.jsx(L,{width:18})}),t.jsx(o,{children:t.jsx(z,{width:18})})]})]}),t.jsxs(a,{spacing:1,direction:{xs:"column",sm:"column",lg:"row"},children:[t.jsxs(i,{variant:"text","aria-label":"text button group",children:[t.jsx(o,{children:t.jsx(R,{width:18})}),t.jsx(o,{children:t.jsx(M,{width:18})}),t.jsx(o,{children:t.jsx(O,{width:18})})]}),t.jsxs(i,{color:"secondary",variant:"text","aria-label":"text button group",children:[t.jsx(o,{children:t.jsx(R,{width:18})}),t.jsx(o,{children:t.jsx(M,{width:18})}),t.jsx(o,{children:t.jsx(O,{width:18})})]}),t.jsxs(i,{color:"warning",variant:"text","aria-label":"text button group",children:[t.jsx(o,{children:t.jsx(R,{width:18})}),t.jsx(o,{children:t.jsx(M,{width:18})}),t.jsx(o,{children:t.jsx(O,{width:18})})]}),t.jsxs(i,{color:"error",variant:"text","aria-label":"text button group",children:[t.jsx(o,{children:t.jsx(R,{width:18})}),t.jsx(o,{children:t.jsx(M,{width:18})}),t.jsx(o,{children:t.jsx(O,{width:18})})]}),t.jsxs(i,{color:"success",variant:"text","aria-label":"text button group",children:[t.jsx(o,{children:t.jsx(R,{width:18})}),t.jsx(o,{children:t.jsx(M,{width:18})}),t.jsx(o,{children:t.jsx(O,{width:18})})]})]})]}),Zt=()=>t.jsxs(a,{spacing:1,direction:"column",justifyContent:"center",children:[t.jsxs(i,{variant:"text","aria-label":"text button group",children:[t.jsx(o,{children:"One"}),t.jsx(o,{children:"Two"}),t.jsx(o,{children:"Three"})]}),t.jsxs(i,{color:"secondary",variant:"text","aria-label":"text button group",children:[t.jsx(o,{children:"One"}),t.jsx(o,{children:"Two"}),t.jsx(o,{children:"Three"})]}),t.jsxs(i,{color:"error",variant:"text","aria-label":"text button group",children:[t.jsx(o,{children:"One"}),t.jsx(o,{children:"Two"}),t.jsx(o,{children:"Three"})]})]}),qt=()=>t.jsx(t.Fragment,{children:t.jsx(s,{children:`
import * as React from 'react';
import {  Button, Stack } from '@mui/material';

<Stack spacing={1} direction={{ xs: 'column', sm: 'row' }} justifyContent="center">
    <Button variant="contained" color="primary">
      Primary
    </Button>
    <Button variant="contained" color="secondary">
      Secondary
    </Button>
    <Button disabled>Disabled</Button>
    <Button href="#text-buttons" variant="contained" color="primary">
      Link
    </Button>
</Stack>`})}),Jt=()=>t.jsx(t.Fragment,{children:t.jsx(s,{children:`
import * as React from 'react';
import {  Button, Stack } from '@mui/material';

<Stack spacing={1} direction={{ xs: 'column', sm: 'row' }} justifyContent="center">
    <Button variant="contained" color="primary">
        Primary
    </Button>
    <Button variant="contained" color="secondary">
        Secondary
    </Button>
    <Button variant="contained" color="error">
        Error
    </Button>
    <Button variant="contained" color="warning">
        Warning
    </Button>
    <Button variant="contained" color="success">
        Success
    </Button>
</Stack>`})}),Yt=()=>t.jsx(t.Fragment,{children:t.jsx(s,{children:`
import * as React from 'react';
import { Stack } from '@mui/material';
import { IconTrash } from '@tabler/icons';
import LoadingButton from '@mui/lab/LoadingButton';

<Stack spacing={1} direction={{ xs: 'column', sm: 'row' }} justifyContent="center">
    <LoadingButton loading loadingIndicator="Loading…"
      variant="contained"
      color="error"
      startIcon={<IconTrash width={18} />}
    >
      Left Icon
    </LoadingButton >
    <LoadingButton loading
      variant="contained"
      color="secondary"
      endIcon={<IconTrash width={18} />}
    >
      Right Icon
    </LoadingButton >
</Stack>`})}),to=()=>t.jsx(t.Fragment,{children:t.jsx(s,{children:`
import * as React from 'react';
import { Button, Stack } from '@mui/material';

<Stack spacing={1} direction={{ xs: 'column', sm: 'row' }} alignItems="center" justifyContent="center">
    <Button variant="contained" size="small">
      Small
    </Button>
    <Button variant="contained" size="medium">
      Medium
    </Button>
    <Button variant="contained" size="large">
      Large
    </Button>
</Stack>`})}),oo=()=>t.jsx(t.Fragment,{children:t.jsx(s,{children:`
import * as React from 'react';
import { Button, Stack } from '@mui/material';

<Stack spacing={1} direction={{ xs: 'column', sm: 'row' }} justifyContent="center">
    <Button variant="outlined" color="primary">
      Primary
    </Button>
    <Button variant="outlined" color="secondary">
      Secondary
    </Button>
    <Button variant="outlined" color="error">
      Error
    </Button>
    <Button variant="outlined" color="warning">
      Warning
    </Button>
    <Button variant="outlined" color="success">
      Success
    </Button>
</Stack>`})}),no=()=>t.jsx(t.Fragment,{children:t.jsx(s,{children:`
import * as React from 'react';
import { Button, Stack } from '@mui/material';
import { IconTrash, IconSend } from '@tabler/icons';

<Stack spacing={1} direction={{ xs: 'column', sm: 'row' }} justifyContent="center">
    <Button
        variant="outlined"
        color="error"
        startIcon={<IconTrash width={18} />}
    >
        Left Icon
    </Button>
    <Button
        variant="outlined"
        color="secondary"
        endIcon={<IconSend width={18} />}
    >
        Right Icon
    </Button>
</Stack>`})}),ro=()=>t.jsx(t.Fragment,{children:t.jsx(s,{children:`
import * as React from 'react';
import { Button, Stack } from '@mui/material';

<Stack spacing={1} direction={{ xs: 'column', sm: 'row' }} alignItems="center" justifyContent="center">
    <Button variant="outlined" size="small">
      Small
    </Button>
    <Button variant="outlined" size="medium">
      Medium
    </Button>
    <Button variant="outlined" size="large">
      Large
    </Button>
</Stack>`})}),eo=()=>t.jsx(t.Fragment,{children:t.jsx(s,{children:`
import * as React from 'react';
import { Button, Stack } from '@mui/material';

<Stack spacing={1} direction={{ xs: 'column', sm: 'row' }} justifyContent="center">
    <Button color="primary">Primary</Button>
    <Button color="secondary">Secondary</Button>
    <Button disabled>Disabled</Button>
    <Button href="#text-buttons" color="primary">
      Link
    </Button>
</Stack>`})}),io=()=>t.jsx(t.Fragment,{children:t.jsx(s,{children:`
import * as React from 'react';
import { Button, Stack } from '@mui/material';

<Stack spacing={1} direction={{ xs: 'column', sm: 'row' }} justifyContent="center">
    <Button color="primary">Primary</Button>
    <Button color="secondary">Secondary</Button>
    <Button color="error">Error</Button>
    <Button color="warning">Warning</Button>
    <Button color="success">Success</Button>
</Stack>`})}),ao=()=>t.jsx(t.Fragment,{children:t.jsx(s,{children:`
import * as React from 'react';
import { Button, Stack } from '@mui/material';
import { IconTrash, IconSend } from '@tabler/icons';

<Stack spacing={1} direction="row" justifyContent="center">
    <Button color="error" startIcon={<IconTrash width={18} />}>
      Left Icon
    </Button>
    <Button color="secondary" endIcon={<IconSend width={18} />}>
      Right Icon
    </Button>
</Stack>`})}),lo=()=>t.jsx(t.Fragment,{children:t.jsx(s,{children:`
import * as React from 'react';
import { Button, Stack } from '@mui/material';

<Stack spacing={1} direction="row" alignItems="center" justifyContent="center">
    <Button size="small">Small</Button>
    <Button size="medium">Medium</Button>
    <Button size="large">Large</Button>
</Stack>`})}),so=()=>t.jsx(t.Fragment,{children:t.jsx(s,{children:`
import * as React from 'react';
import { IconButton, Tooltip, Stack } from '@mui/material';
import { IconBell } from '@tabler/icons';

<Stack spacing={1} direction="row" justifyContent="center">
    <Tooltip title="Bell">
      <IconButton color="primary" aria-label="primary-bell">
        <IconBell width={18} />
      </IconButton>
    </Tooltip>
    <Tooltip title="Bell">
      <IconButton color="secondary" aria-label="secondary-bell">
        <IconBell width={18} />
      </IconButton>
    </Tooltip>
    <Tooltip title="Bell">
      <IconButton color="error" aria-label="error-bell">
        <IconBell width={18} />
      </IconButton>
    </Tooltip>
    <Tooltip title="Bell">
      <IconButton color="warning" aria-label="warning-bell">
        <IconBell width={18} />
      </IconButton>
    </Tooltip>
    <Tooltip title="Bell">
      <IconButton color="success" aria-label="success-bell">
        <IconBell width={18} />
      </IconButton>
    </Tooltip>
</Stack>`})}),co=()=>t.jsx(t.Fragment,{children:t.jsx(s,{children:`
import * as React from 'react';
import { IconButton, Tooltip, Stack } from '@mui/material';
import { IconBell } from '@tabler/icons';

<Stack spacing={1} direction="row" justifyContent="center">
    <Tooltip title="Bell">
      <IconButton aria-label="small-bell">
        <IconBell width={16} />
      </IconButton>
    </Tooltip>
    <Tooltip title="Bell">
      <IconButton size="medium" aria-label="medium-bell">
        <IconBell width={19} />
      </IconButton>
    </Tooltip>
    <Tooltip title="Bell">
      <IconButton aria-label="large-bell">
        <IconBell width={21} />
      </IconButton>
    </Tooltip>
</Stack>`})}),uo=()=>t.jsx(t.Fragment,{children:t.jsx(s,{children:`
import * as React from 'react';
import { Fab, Tooltip, Stack } from '@mui/material';
import { IconClipboard, IconPlus, IconSend } from '@tabler/icons';

<Stack spacing={1} direction="row" justifyContent="center">
    <Tooltip title="Send">
      <Fab color="primary" aria-label="send">
        <IconSend width={20} />
      </Fab>
    </Tooltip>
    <Tooltip title="Add">
      <Fab color="secondary" aria-label="plus">
        <IconPlus width={20} />
      </Fab>
    </Tooltip>
    <Fab disabled aria-label="clipboard">
      <IconClipboard width={20} />
    </Fab>
</Stack>`})}),xo=()=>t.jsx(t.Fragment,{children:t.jsx(s,{children:`
import * as React from 'react';
import { Fab, Tooltip, Stack } from '@mui/material';
import { IconSend } from '@tabler/icons';

<Stack spacing={1} direction={{ xs: 'column', sm: 'row' }} justifyContent="center" alignItems="center">
    <Tooltip title="Send">
        <Fab color="primary" aria-label="send">
          <IconSend width={20} />
        </Fab>
    </Tooltip>
    <Tooltip title="Send">
        <Fab color="secondary" aria-label="send">
          <IconSend width={20} />
        </Fab>
    </Tooltip>
    <Tooltip title="Send">
        <Fab color="warning" aria-label="send">
          <IconSend width={20} />
        </Fab>
    </Tooltip>
    <Tooltip title="Send">
        <Fab color="error" aria-label="send">
          <IconSend width={20} />
        </Fab>
    </Tooltip>
    <Tooltip title="Send">
        <Fab color="success" aria-label="send">
          <IconSend width={20} />
        </Fab>
    </Tooltip>
</Stack>`})}),ho=()=>t.jsx(t.Fragment,{children:t.jsx(s,{children:`
import * as React from 'react';
import { Fab, Tooltip, Stack } from '@mui/material';
import { IconSend } from '@tabler/icons';

<Stack spacing={1} direction="row" justifyContent="center">
    <Tooltip title="Bell">
        <Fab size="small" color="primary" aria-label="small-bell">
          <IconBell width={16} />
        </Fab>
    </Tooltip>
    <Tooltip title="Bell">
        <Fab size="medium" color="secondary" aria-label="medium-bell">
          <IconBell width={18} />
        </Fab>
    </Tooltip>
    <Tooltip title="Bell">
        <Fab size="large" color="warning" aria-label="large-bell">
          <IconBell width={20} />
        </Fab>
    </Tooltip>
</Stack>`})}),mo=()=>t.jsx(t.Fragment,{children:t.jsx(s,{children:`
import * as React from 'react';
import {  Button, ButtonGroup, Stack } from '@mui/material';

<Stack spacing={1} >
    <ButtonGroup variant="outlined" aria-label="outlined button group">
        <Button>One</Button>
        <Button>Two</Button>
        <Button>Three</Button>
    </ButtonGroup>
    <ButtonGroup variant="contained" aria-label="outlined primary button group">
        <Button>One</Button>
        <Button>Two</Button>
        <Button>Three</Button>
    </ButtonGroup>
    <ButtonGroup variant="text" aria-label="text button group">
        <Button>One</Button>
        <Button>Two</Button>
        <Button>Three</Button>
    </ButtonGroup>
</Stack>`})}),jo=()=>t.jsx(t.Fragment,{children:t.jsx(s,{children:`
import * as React from 'react';
import {  Button, ButtonGroup, Stack } from '@mui/material';

<Stack spacing={1} justifyContent="center">
    <ButtonGroup size="small" variant="outlined" aria-label="outlined primary button group">
        <Button>One</Button>
        <Button>Two</Button>
        <Button>Three</Button>
    </ButtonGroup>
    <ButtonGroup variant="outlined" aria-label="outlined button group">
        <Button>One</Button>
        <Button>Two</Button>
        <Button>Three</Button>
    </ButtonGroup>
    <ButtonGroup size="large" variant="outlined" aria-label="text button group">
        <Button>One</Button>
        <Button>Two</Button>
        <Button>Three</Button>
    </ButtonGroup>
</Stack>`})}),po=()=>t.jsx(t.Fragment,{children:t.jsx(s,{children:`
import * as React from 'react';
import {  Button, ButtonGroup, Stack } from '@mui/material';

<Stack spacing={1} direction="row">
    <ButtonGroup
      orientation="vertical"
      variant="contained"
      aria-label="outlined primary button group"
    >
      <Button>One</Button>
      <Button>Two</Button>
      <Button>Three</Button>
    </ButtonGroup>

    <ButtonGroup orientation="vertical" variant="outlined" aria-label="outlined button group">
      <Button>One</Button>
      <Button>Two</Button>
      <Button>Three</Button>
    </ButtonGroup>

    <ButtonGroup orientation="vertical" variant="text" aria-label="text button group">
      <Button>One</Button>
      <Button>Two</Button>
      <Button>Three</Button>
    </ButtonGroup>
</Stack>`})}),Bo=()=>t.jsx(t.Fragment,{children:t.jsx(s,{children:`
import * as React from 'react';
import {  Button, ButtonGroup, Stack } from '@mui/material';

<Stack spacing={1} direction="column" justifyContent="center">
    <ButtonGroup variant="text" aria-label="text button group">
      <Button>One</Button>
      <Button>Two</Button>
      <Button>Three</Button>
    </ButtonGroup>
    <ButtonGroup color="secondary" variant="text" aria-label="text button group">
      <Button>One</Button>
      <Button>Two</Button>
      <Button>Three</Button>
    </ButtonGroup>
    <ButtonGroup color="error" variant="text" aria-label="text button group">
      <Button>One</Button>
      <Button>Two</Button>
      <Button>Three</Button>
    </ButtonGroup>
</Stack>`})}),go=()=>t.jsx(t.Fragment,{children:t.jsx(s,{children:`
import * as React from 'react';
import { Button, ButtonGroup, Stack } from '@mui/material';
import { IconAlignCenter, IconAlignLeft, IconAlignRight, IconPlayerPlay, IconPlayerSkipBack, IconPlayerSkipForward } from '@tabler/icons';

<Stack spacing={2} direction={{ xs: 'column', sm: 'row', lg: 'column' }} justifyContent="center">
    <Stack spacing={1} direction={{ xs: 'column', sm: 'column', lg: 'row' }}>
        <ButtonGroup variant="contained" aria-label="outlined primary button group">
          <Button>One</Button>
          <Button>Two</Button>
          <Button>Three</Button>
        </ButtonGroup>
        <ButtonGroup
          variant="contained"
          color="secondary"
          aria-label="outlined primary button group"
        >
          <Button>One</Button>
          <Button>Two</Button>
          <Button>Three</Button>
        </ButtonGroup>
        <ButtonGroup variant="contained" color="error" aria-label="outlined primary button group">
          <Button>One</Button>
          <Button>Two</Button>
          <Button>Three</Button>
        </ButtonGroup>
        <ButtonGroup
          color="success"
          variant="contained"
          aria-label="outlined primary button group"
        >
          <Button>One</Button>
          <Button>Two</Button>
          <Button>Three</Button>
        </ButtonGroup>
    </Stack>
    <Stack spacing={1} direction={{ xs: 'column', sm: 'column', lg: 'row' }}>
        <ButtonGroup variant="outlined" aria-label="outlined button group">
          <Button>
            <IconPlayerSkipBack width={18} />
          </Button>
          <Button>
            <IconPlayerPlay width={18} />
          </Button>
          <Button>
            <IconPlayerSkipForward width={18} />
          </Button>
        </ButtonGroup>
        <ButtonGroup variant="outlined" color="secondary" aria-label="outlined button group">
          <Button>
            <IconPlayerSkipBack width={18} />
          </Button>
          <Button>
            <IconPlayerPlay width={18} />
          </Button>
          <Button>
            <IconPlayerSkipForward width={18} />
          </Button>
        </ButtonGroup>
        <ButtonGroup variant="outlined" color="warning" aria-label="outlined button group">
          <Button>
            <IconPlayerSkipBack width={18} />
          </Button>
          <Button>
            <IconPlayerPlay width={18} />
          </Button>
          <Button>
            <IconPlayerSkipForward width={18} />
          </Button>
        </ButtonGroup>
        <ButtonGroup variant="outlined" color="error" aria-label="outlined button group">
          <Button>
            <IconPlayerSkipBack width={18} />
          </Button>
          <Button>
            <IconPlayerPlay width={18} />
          </Button>
          <Button>
            <IconPlayerSkipForward width={18} />
          </Button>
        </ButtonGroup>
        <ButtonGroup variant="outlined" color="success" aria-label="outlined button group">
          <Button>
            <IconPlayerSkipBack width={18} />
          </Button>
          <Button>
            <IconPlayerPlay width={18} />
          </Button>
          <Button>
            <IconPlayerSkipForward width={18} />
          </Button>
        </ButtonGroup>
      </Stack>
      <Stack spacing={1} direction={{ xs: 'column', sm: 'column', lg: 'row' }}>
        <ButtonGroup variant="text" aria-label="text button group">
          <Button>
            <IconAlignLeft width={18} />
          </Button>
          <Button>
            <IconAlignCenter width={18} />
          </Button>
          <Button>
            <IconAlignRight width={18} />
          </Button>
        </ButtonGroup>
        <ButtonGroup color="secondary" variant="text" aria-label="text button group">
          <Button>
            <IconAlignLeft width={18} />
          </Button>
          <Button>
            <IconAlignCenter width={18} />
          </Button>
          <Button>
            <IconAlignRight width={18} />
          </Button>
        </ButtonGroup>
        <ButtonGroup color="warning" variant="text" aria-label="text button group">
          <Button>
            <IconAlignLeft width={18} />
          </Button>
          <Button>
            <IconAlignCenter width={18} />
          </Button>
          <Button>
            <IconAlignRight width={18} />
          </Button>
        </ButtonGroup>
        <ButtonGroup color="error" variant="text" aria-label="text button group">
          <Button>
            <IconAlignLeft width={18} />
          </Button>
          <Button>
            <IconAlignCenter width={18} />
          </Button>
          <Button>
            <IconAlignRight width={18} />
          </Button>
        </ButtonGroup>
        <ButtonGroup color="success" variant="text" aria-label="text button group">
          <Button>
            <IconAlignLeft width={18} />
          </Button>
          <Button>
            <IconAlignCenter width={18} />
          </Button>
          <Button>
            <IconAlignRight width={18} />
          </Button>
        </ButtonGroup>
    </Stack>
</Stack>`})}),bo=[{to:"/",title:"Home"},{title:"Button"}],rn=()=>t.jsxs(at,{title:"Buttons",description:"this is Buttons page",children:[t.jsx(it,{title:"Button",items:bo}),t.jsxs(e,{container:!0,spacing:3,children:[t.jsx(e,{item:!0,xs:12,children:t.jsx(V,{title:"Buttons",children:t.jsxs(e,{container:!0,spacing:3,children:[t.jsx(e,{item:!0,xs:12,lg:6,display:"flex",alignItems:"stretch",children:t.jsx(l,{title:"Default",codeModel:t.jsx(qt,{}),children:t.jsx(Gt,{})})}),t.jsx(e,{item:!0,xs:12,lg:6,display:"flex",alignItems:"stretch",children:t.jsx(l,{title:"Colors",codeModel:t.jsx(Jt,{}),children:t.jsx(Ft,{})})}),t.jsx(e,{item:!0,xs:12,lg:6,display:"flex",alignItems:"stretch",children:t.jsx(l,{title:"Loading Buttons",codeModel:t.jsx(Yt,{}),children:t.jsx(Lt,{})})}),t.jsx(e,{item:!0,xs:12,lg:6,display:"flex",alignItems:"stretch",children:t.jsx(l,{title:"Sizes",codeModel:t.jsx(to,{}),children:t.jsx(zt,{})})}),t.jsx(e,{item:!0,xs:12,lg:6,display:"flex",alignItems:"stretch",children:t.jsx(l,{title:"Outlined",codeModel:t.jsx(oo,{}),children:t.jsx(Rt,{})})}),t.jsx(e,{item:!0,xs:12,lg:6,display:"flex",alignItems:"stretch",children:t.jsx(l,{title:"Outlined Icon",codeModel:t.jsx(no,{}),children:t.jsx(Mt,{})})}),t.jsx(e,{item:!0,xs:12,lg:6,display:"flex",alignItems:"stretch",children:t.jsx(l,{title:"Outline Size",codeModel:t.jsx(ro,{}),children:t.jsx(Ot,{})})}),t.jsx(e,{item:!0,xs:12,lg:6,display:"flex",alignItems:"stretch",children:t.jsx(l,{title:"Text",codeModel:t.jsx(eo,{}),children:t.jsx($t,{})})}),t.jsx(e,{item:!0,xs:12,lg:6,display:"flex",alignItems:"stretch",children:t.jsx(l,{title:"Text Color",codeModel:t.jsx(io,{}),children:t.jsx(At,{})})}),t.jsx(e,{item:!0,xs:12,lg:6,display:"flex",alignItems:"stretch",children:t.jsx(l,{title:"Text Icon",codeModel:t.jsx(ao,{}),children:t.jsx(Dt,{})})}),t.jsx(e,{item:!0,xs:12,lg:6,display:"flex",alignItems:"stretch",children:t.jsx(l,{title:"Text Sizes",codeModel:t.jsx(lo,{}),children:t.jsx(Et,{})})}),t.jsx(e,{item:!0,xs:12,lg:6,display:"flex",alignItems:"stretch",children:t.jsx(l,{title:"Icon Color",codeModel:t.jsx(so,{}),children:t.jsx(Wt,{})})}),t.jsx(e,{item:!0,xs:12,lg:6,display:"flex",alignItems:"stretch",children:t.jsx(l,{title:"Icon Sizes",codeModel:t.jsx(co,{}),children:t.jsx(_t,{})})}),t.jsx(e,{item:!0,xs:12,lg:6,display:"flex",alignItems:"stretch",children:t.jsx(l,{title:"FAB",codeModel:t.jsx(uo,{}),children:t.jsx(Nt,{})})}),t.jsx(e,{item:!0,xs:12,lg:6,display:"flex",alignItems:"stretch",children:t.jsx(l,{title:"FAB Color",codeModel:t.jsx(xo,{}),children:t.jsx(Ut,{})})}),t.jsx(e,{item:!0,xs:12,lg:6,display:"flex",alignItems:"stretch",children:t.jsx(l,{title:"FAB Size",codeModel:t.jsx(ho,{}),children:t.jsx(Vt,{})})})]})})}),t.jsx(e,{item:!0,xs:12,children:t.jsx(V,{title:"Button Group",children:t.jsxs(e,{container:!0,spacing:3,children:[t.jsx(e,{item:!0,xs:12,lg:6,display:"flex",alignItems:"stretch",children:t.jsx(l,{title:"Default",codeModel:t.jsx(mo,{}),children:t.jsx(Kt,{})})}),t.jsx(e,{item:!0,xs:12,lg:6,display:"flex",alignItems:"stretch",children:t.jsx(l,{title:"Sizes",codeModel:t.jsx(jo,{}),children:t.jsx(Xt,{})})}),t.jsx(e,{item:!0,xs:12,lg:6,display:"flex",alignItems:"stretch",children:t.jsx(l,{title:"Verical",codeModel:t.jsx(po,{}),children:t.jsx(Ht,{})})}),t.jsx(e,{item:!0,xs:12,lg:6,display:"flex",alignItems:"stretch",children:t.jsx(l,{title:"Text",codeModel:t.jsx(Bo,{}),children:t.jsx(Zt,{})})}),t.jsx(e,{item:!0,xs:12,display:"flex",alignItems:"stretch",children:t.jsx(l,{title:"Color",codeModel:t.jsx(go,{}),children:t.jsx(Qt,{})})})]})})})]})]});export{rn as default};
