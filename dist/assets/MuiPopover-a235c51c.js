import{R as c,j as o}from"./index-1d78c4ac.js";import{B as u}from"./Breadcrumb-4b5ba697.js";import{P as x}from"./PageContainer-51f17055.js";import{P}from"./ParentCard-b3c2f72c.js";import{C as s}from"./ChildCard-8626bfcd.js";import{B as y}from"./Button-6de5bece.js";import{P as h}from"./Popover-e3ff4288.js";import{B as m,T as n}from"./Box-3b2e6d90.js";import{C as d}from"./CodeDialog-4128d6b6.js";import{G as l}from"./Grid-ba112631.js";import"./index.esm-4ca6571d.js";import"./Link-5958468e.js";import"./Card-ed0a9074.js";import"./CardHeader-4375bfdf.js";import"./Divider-32914f08.js";import"./dividerClasses-40064371.js";import"./CardContent-97c31a3d.js";import"./Modal-5026ae4f.js";import"./useId-521a9597.js";import"./ownerWindow-f1e1d6ee.js";import"./createChainedFunction-0bab83cf.js";import"./utils-f13413e5.js";import"./Portal-8f313b54.js";import"./debounce-517eeb3c.js";import"./Grow-cf41a8df.js";import"./Tooltip-58d28098.js";import"./Popper-880e6f72.js";import"./createPopper-04c39de4.js";import"./useControlled-05793c79.js";import"./IconButton-6eb83b27.js";import"./DialogContent-aa8a214a.js";import"./DialogTitle-be3ad24b.js";import"./toConsumableArray-d8b147df.js";const g=()=>{const[e,r]=c.useState(null),a=v=>{r(v.currentTarget)},i=()=>{r(null)},t=!!e,p=t?"simple-popover":void 0;return o.jsxs(o.Fragment,{children:[o.jsx(y,{"aria-describedby":p,variant:"contained",onClick:a,children:"Open Popover"}),o.jsx(h,{id:p,open:t,anchorEl:e,onClose:i,anchorOrigin:{vertical:"bottom",horizontal:"left"},children:o.jsxs(m,{p:2,children:[o.jsx(n,{variant:"h6",mb:1,children:"Basic Popover"}),o.jsx(n,{color:"textSecondary",children:"The component is built on top of the Modal component."})]})})]})},f=()=>{const[e,r]=c.useState(null),a=p=>{r(p.currentTarget)},i=()=>{r(null)},t=!!e;return o.jsxs(o.Fragment,{children:[o.jsx(n,{"aria-owns":t?"mouse-over-popover":void 0,"aria-haspopup":"true",onMouseEnter:a,onMouseLeave:i,children:"Hover with a Popover."}),o.jsx(h,{id:"mouse-over-popover",sx:{pointerEvents:"none"},open:t,anchorEl:e,anchorOrigin:{vertical:"bottom",horizontal:"left"},transformOrigin:{vertical:"top",horizontal:"left"},onClose:i,disableRestoreFocus:!0,children:o.jsxs(m,{p:2,children:[o.jsx(n,{variant:"h6",mb:1,children:"Hover Popover"}),o.jsx(n,{color:"textSecondary",children:"The component is built on top of the Modal component."})]})})]})},j=()=>o.jsx(o.Fragment,{children:o.jsx(d,{children:`
import * as React from 'react';
import { 
    Popover, 
    Typography, 
    Button, 
    Box 
} from '@mui/material';


const [anchorEl, setAnchorEl] = React.useState(null);

const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
};

const handleClose = () => {
    setAnchorEl(null);
};

const open = Boolean(anchorEl);
const id = open ? 'simple-popover' : undefined;

return (
    <>
        <Button aria-describedby={id} variant="contained" onClick={handleClick}>
            Open Popover
        </Button>
        <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
        }}
        >
            <Box p={2}>
                <Typography variant="h6" mb={1}>
                    Basic Popover
                </Typography>
                <Typography color="textSecondary">
                    The component is built on top of the Modal component.
                </Typography>
            </Box>
        </Popover>
    </>
);`})}),C=()=>o.jsx(o.Fragment,{children:o.jsx(d,{children:`
import * as React from 'react';
import { 
  Popover, 
  Box, 
  Typography 
} from '@mui/material';


const [anchorEl, setAnchorEl] = React.useState(null);

const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
};

const handlePopoverClose = () => {
    setAnchorEl(null);
};

const open = Boolean(anchorEl);

return (
    <>
        <Typography
            aria-owns={open ? 'mouse-over-popover' : undefined}
            aria-haspopup="true"
            onMouseEnter={handlePopoverOpen}
            onMouseLeave={handlePopoverClose}
        >
            Hover with a Popover.
        </Typography>
        <Popover
            id="mouse-over-popover"
            sx={{
                pointerEvents: 'none',
            }}
            open={open}
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
            }}
            onClose={handlePopoverClose}
            disableRestoreFocus
        >
            <Box p={2}>
                <Typography variant="h6" mb={1}>
                    Hover Popover
                </Typography>
                <Typography color="textSecondary">
                    The component is built on top of the Modal component.
                </Typography>
            </Box>
      </Popover>
    </>
);`})}),E=[{to:"/",title:"Home"},{title:"Popover"}],to=()=>o.jsxs(x,{title:"Popover",description:"this is Popover page",children:[o.jsx(u,{title:"Popover",items:E}),o.jsx(P,{title:"Popover",children:o.jsxs(l,{container:!0,spacing:3,children:[o.jsx(l,{item:!0,xs:12,sm:6,display:"flex",alignItems:"stretch",children:o.jsx(s,{title:"Click",codeModel:o.jsx(j,{}),children:o.jsx(g,{})})}),o.jsx(l,{item:!0,xs:12,sm:6,display:"flex",alignItems:"stretch",children:o.jsx(s,{title:"Hover",codeModel:o.jsx(C,{}),children:o.jsx(f,{})})})]})})]});export{to as default};
