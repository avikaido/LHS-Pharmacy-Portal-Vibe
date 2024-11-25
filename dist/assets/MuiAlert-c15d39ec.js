import{j as e,R as h}from"./index-1d78c4ac.js";import{q as d}from"./index.esm-4ca6571d.js";import{B as m}from"./Breadcrumb-4b5ba697.js";import{P as u}from"./PageContainer-51f17055.js";import{P as p}from"./ParentCard-b3c2f72c.js";import{C as r}from"./ChildCard-8626bfcd.js";import{C as l}from"./CodeDialog-4128d6b6.js";import{G as i}from"./Grid-ba112631.js";import{S as s}from"./Stack-74791772.js";import{A as t}from"./Alert-eeacdfc1.js";import{A as n}from"./AlertTitle-58348274.js";import{B as c}from"./Button-6de5bece.js";import{C as x}from"./Collapse-0e35f2a4.js";import{I as f}from"./IconButton-6eb83b27.js";import"./Box-3b2e6d90.js";import"./Link-5958468e.js";import"./Card-ed0a9074.js";import"./CardHeader-4375bfdf.js";import"./Divider-32914f08.js";import"./dividerClasses-40064371.js";import"./CardContent-97c31a3d.js";import"./Tooltip-58d28098.js";import"./Popper-880e6f72.js";import"./useId-521a9597.js";import"./Portal-8f313b54.js";import"./createPopper-04c39de4.js";import"./useControlled-05793c79.js";import"./Grow-cf41a8df.js";import"./utils-f13413e5.js";import"./DialogContent-aa8a214a.js";import"./Modal-5026ae4f.js";import"./ownerWindow-f1e1d6ee.js";import"./createChainedFunction-0bab83cf.js";import"./DialogTitle-be3ad24b.js";import"./toConsumableArray-d8b147df.js";import"./createStack-08af7ebe.js";import"./styled-db48c038.js";import"./useThemeProps-a461f42f.js";import"./useSlot-a49cf6b5.js";import"./Close-feb8b2ff.js";const j=()=>e.jsx(e.Fragment,{children:e.jsx(l,{children:`
import * as React from 'react';
import {
  Grid,
  Stack,
  Button,
  IconButton,
  Collapse,
  Alert,
  AlertTitle,
} from "@mui/material";

<Stack spacing={1}>
    <Alert variant="filled" severity="error">
        This is an error alert — check it out!
    </Alert>
    <Alert variant="filled" severity="warning">
        This is a warning alert — check it out!
    </Alert>
    <Alert variant="filled" severity="info">
        This is an info alert — check it out!
    </Alert>
    <Alert variant="filled" severity="success">
        This is a success alert — check it out!
    </Alert>
</Stack>`})}),v=()=>e.jsx(e.Fragment,{children:e.jsx(l,{children:`
import * as React from 'react';
import {
  Grid,
  Stack,
  Button,
  IconButton,
  Collapse,
  Alert,
  AlertTitle,
} from "@mui/material";

<Stack spacing={1}>
    <Alert variant="outlined" severity="error">
        This is an error alert — check it out!
    </Alert>
    <Alert variant="outlined" severity="warning">
        This is a warning alert — check it out!
    </Alert>
    <Alert variant="outlined" severity="info">
        This is an info alert — check it out!
    </Alert>
    <Alert variant="outlined" severity="success">
        This is a success alert — check it out!
    </Alert>
</Stack>`})}),A=()=>e.jsx(e.Fragment,{children:e.jsx(l,{children:`
import * as React from 'react';
import {
  Grid,
  Stack,
  Button,
  IconButton,
  Collapse,
  Alert,
  AlertTitle,
} from "@mui/material";

<Stack spacing={1}>
    <Alert variant="filled" severity="error">
        <AlertTitle>Error</AlertTitle>
        This is an error alert — <strong>check it out!</strong>
    </Alert>
    <Alert variant="filled" severity="warning">
        <AlertTitle>Warning</AlertTitle>
        This is a warning alert — <strong>check it out!</strong>
    </Alert>
    <Alert variant="filled" severity="info">
        <AlertTitle>Info</AlertTitle>
        This is an info alert — <strong>check it out!</strong>
    </Alert>
    <Alert variant="filled" severity="success">
        <AlertTitle>Success</AlertTitle>
        This is a success alert — <strong>check it out!</strong>
    </Alert>
</Stack>`})}),g=()=>e.jsx(e.Fragment,{children:e.jsx(l,{children:`
import * as React from 'react';
import {
  Grid,
  Stack,
  Button,
  IconButton,
  Collapse,
  Alert,
  AlertTitle,
} from "@mui/material";

<Stack spacing={1}>
    <Alert variant="filled" severity="warning">
        This is a success alert — check it out!
    </Alert>
    <Alert
        variant="filled"
        severity="info"
        action={
            <Button color="inherit" size="small">
                UNDO
            </Button>
        }
    >
        This is a success alert — check it out!
    </Alert>
</Stack>`})}),k=()=>e.jsx(e.Fragment,{children:e.jsx(l,{children:`
import * as React from 'react';
import {
  Grid,
  Stack,
  Button,
  IconButton,
  Collapse,
  Alert,
  AlertTitle,
} from "@mui/material";

<Stack spacing={1}>
    <Collapse in={open}>
        <Alert
            variant="filled"
            severity="info"
            sx={{ mb: 1 }}
            action={
                <IconButton
                    aria-label="close"
                    color="inherit"
                    size="small"
                    onClick={() => {
                        setOpen(false);
                    }}
                >
                    <IconX width={20} />
                </IconButton>
            }
        >
            Close me!
        </Alert>
    </Collapse>
</Stack>
<Button
    disabled={open}
    variant="contained"
    onClick={() => {
        setOpen(true);
    }}
>
    Re-open
</Button>`})}),T=[{to:"/",title:"Home"},{title:"Alert"}],ce=()=>{const[o,a]=h.useState(!0);return e.jsxs(u,{title:"Alert",description:"this is Alert page",children:[e.jsx(m,{title:"Alert",items:T}),e.jsx(p,{title:"Alert",children:e.jsxs(i,{container:!0,spacing:3,children:[e.jsx(i,{item:!0,xs:12,display:"flex",alignItems:"stretch",children:e.jsx(r,{title:"Basic",children:e.jsxs(s,{spacing:1,children:[e.jsx(t,{severity:"error",icon:!1,children:"This is an error alert — check it out!"}),e.jsx(t,{severity:"warning",icon:!1,children:"This is a warning alert — check it out!"}),e.jsx(t,{severity:"info",icon:!1,children:"This is an info alert — check it out!"}),e.jsx(t,{severity:"success",icon:!1,children:"This is a success alert — check it out!"})]})})}),e.jsx(i,{item:!0,xs:12,display:"flex",alignItems:"stretch",children:e.jsx(r,{title:"Filled",codeModel:e.jsx(j,{}),children:e.jsxs(s,{spacing:1,children:[e.jsx(t,{variant:"filled",onClose:()=>{},severity:"error",children:"This is an error alert — check it out!"}),e.jsx(t,{variant:"filled",onClose:()=>{},severity:"warning",children:"This is a warning alert — check it out!"}),e.jsx(t,{variant:"filled",onClose:()=>{},severity:"info",children:"This is an info alert — check it out!"}),e.jsx(t,{variant:"filled",onClose:()=>{},severity:"success",children:"This is a success alert — check it out!"})]})})}),e.jsx(i,{item:!0,xs:12,display:"flex",alignItems:"stretch",children:e.jsx(r,{title:"Outlined",codeModel:e.jsx(v,{}),children:e.jsxs(s,{spacing:1,children:[e.jsx(t,{variant:"outlined",onClose:()=>{},severity:"error",children:"This is an error alert — check it out!"}),e.jsx(t,{variant:"outlined",onClose:()=>{},severity:"warning",children:"This is a warning alert — check it out!"}),e.jsx(t,{variant:"outlined",onClose:()=>{},severity:"info",children:"This is an info alert — check it out!"}),e.jsx(t,{variant:"outlined",onClose:()=>{},severity:"success",children:"This is a success alert — check it out!"})]})})}),e.jsx(i,{item:!0,xs:12,display:"flex",alignItems:"stretch",children:e.jsx(r,{title:"Description",codeModel:e.jsx(A,{}),children:e.jsxs(s,{spacing:1,children:[e.jsxs(t,{severity:"error",children:[e.jsx(n,{children:"Error"}),"This is an error alert — ",e.jsx("strong",{children:"check it out!"})]}),e.jsxs(t,{severity:"warning",children:[e.jsx(n,{children:"Warning"}),"This is a warning alert — ",e.jsx("strong",{children:"check it out!"})]}),e.jsxs(t,{severity:"info",children:[e.jsx(n,{children:"Info"}),"This is an info alert — ",e.jsx("strong",{children:"check it out!"})]}),e.jsxs(t,{severity:"success",children:[e.jsx(n,{children:"Success"}),"This is a success alert — ",e.jsx("strong",{children:"check it out!"})]})]})})}),e.jsx(i,{item:!0,xs:12,display:"flex",alignItems:"stretch",children:e.jsx(r,{title:"Action",codeModel:e.jsx(g,{}),children:e.jsxs(s,{spacing:1,children:[e.jsx(t,{variant:"filled",severity:"warning",onClose:()=>{},children:"This is a success alert — check it out!"}),e.jsx(t,{variant:"filled",severity:"info",action:e.jsx(c,{color:"inherit",size:"small",children:"UNDO"}),children:"This is a success alert — check it out!"})]})})}),e.jsx(i,{item:!0,xs:12,display:"flex",alignItems:"stretch",children:e.jsxs(r,{title:"Transition",codeModel:e.jsx(k,{}),children:[e.jsx(s,{spacing:1,children:e.jsx(x,{in:o,children:e.jsx(t,{variant:"filled",severity:"info",sx:{mb:1},action:e.jsx(f,{"aria-label":"close",color:"inherit",size:"small",onClick:()=>{a(!1)},children:e.jsx(d,{width:20})}),children:"Close me!"})})}),e.jsx(c,{disabled:o,variant:"contained",onClick:()=>{a(!0)},children:"Re-open"})]})})]})})]})};export{ce as default};
