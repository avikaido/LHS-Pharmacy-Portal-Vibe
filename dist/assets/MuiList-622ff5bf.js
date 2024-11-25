import{j as e,R as p}from"./index-1d78c4ac.js";import{B}from"./Breadcrumb-4b5ba697.js";import{P as w}from"./PageContainer-51f17055.js";import{P as y}from"./ParentCard-b3c2f72c.js";import{C as x}from"./ChildCard-8626bfcd.js";import{by as b,bz as C,al as v,a6 as S,a2 as T,Y as P,am as O,aE as A,bA as M,be as F,bB as D,bC as R}from"./index.esm-4ca6571d.js";import{P as I,G as h}from"./Grid-ba112631.js";import{L as l}from"./List-eaf26c6f.js";import{L as d}from"./ListItem-f171abd1.js";import{L as n}from"./ListItemButton-6f09015a.js";import{L as o}from"./ListItemIcon-39000d2a.js";import{L as i}from"./ListItemText-f12ae70f.js";import{D as f}from"./Divider-32914f08.js";import{L as k}from"./ListSubheader-fed1a18d.js";import{C as E}from"./Collapse-0e35f2a4.js";import{L as u}from"./ListItemAvatar-b4e2696d.js";import{A as j}from"./Avatar-49c7f2db.js";import{C as J}from"./CustomCheckbox-0154e390.js";import{I as N}from"./IconButton-6eb83b27.js";import{C as g}from"./CustomSwitch-dd9f44e8.js";import{C as L}from"./CodeDialog-4128d6b6.js";import"./Box-3b2e6d90.js";import"./Link-5958468e.js";import"./Card-ed0a9074.js";import"./CardHeader-4375bfdf.js";import"./CardContent-97c31a3d.js";import"./listItemButtonClasses-af8afb72.js";import"./isMuiElement-a2555389.js";import"./listItemTextClasses-76a31095.js";import"./dividerClasses-40064371.js";import"./utils-f13413e5.js";import"./useSlot-a49cf6b5.js";import"./SwitchBase-a9247a40.js";import"./useFormControl-9666228d.js";import"./useControlled-05793c79.js";import"./Switch-77494226.js";import"./Tooltip-58d28098.js";import"./Popper-880e6f72.js";import"./useId-521a9597.js";import"./Portal-8f313b54.js";import"./createPopper-04c39de4.js";import"./Grow-cf41a8df.js";import"./DialogContent-aa8a214a.js";import"./Modal-5026ae4f.js";import"./ownerWindow-f1e1d6ee.js";import"./createChainedFunction-0bab83cf.js";import"./DialogTitle-be3ad24b.js";import"./toConsumableArray-d8b147df.js";const W=()=>e.jsx(e.Fragment,{children:e.jsxs(I,{variant:"outlined",children:[e.jsxs(l,{children:[e.jsx(d,{disablePadding:!0,children:e.jsxs(n,{children:[e.jsx(o,{children:e.jsx(b,{width:20,height:20})}),e.jsx(i,{primary:"Inbox"})]})}),e.jsx(d,{disablePadding:!0,children:e.jsxs(n,{children:[e.jsx(o,{children:e.jsx(C,{width:20,height:20})}),e.jsx(i,{primary:"Drafts"})]})})]}),e.jsx(f,{}),e.jsxs(l,{children:[e.jsx(d,{disablePadding:!0,children:e.jsx(n,{children:e.jsx(i,{primary:"Trash"})})}),e.jsx(d,{disablePadding:!0,children:e.jsx(n,{component:"a",href:"#simple-list",children:e.jsx(i,{primary:"Spam"})})})]})]})}),U=()=>{const[s,c]=p.useState(!0),r=()=>{c(!s)};return e.jsx(e.Fragment,{children:e.jsx(I,{variant:"outlined",children:e.jsxs(l,{component:"nav","aria-labelledby":"nested-list-subheader",subheader:e.jsx(k,{component:"div",id:"nested-list-subheader",children:"Nested List Items"}),children:[e.jsxs(n,{children:[e.jsx(o,{children:e.jsx(v,{width:20,height:20})}),e.jsx(i,{primary:"Sent mail"})]}),e.jsxs(n,{children:[e.jsx(o,{children:e.jsx(C,{width:20,height:20})}),e.jsx(i,{primary:"Drafts"})]}),e.jsxs(n,{onClick:r,children:[e.jsx(o,{children:e.jsx(b,{width:20,height:20})}),e.jsx(i,{primary:"Inbox"}),s?e.jsx(S,{}):e.jsx(T,{})]}),e.jsx(E,{in:s,timeout:"auto",unmountOnExit:!0,children:e.jsx(l,{component:"div",disablePadding:!0,children:e.jsxs(n,{sx:{pl:4},children:[e.jsx(o,{children:e.jsx(P,{width:20,height:20})}),e.jsx(i,{primary:"Starred"})]})})})]})})})},V=()=>e.jsx(e.Fragment,{children:e.jsx(I,{variant:"outlined",children:e.jsxs(l,{children:[e.jsxs(d,{children:[e.jsx(u,{children:e.jsx(j,{children:e.jsx(O,{width:20,height:20})})}),e.jsx(i,{primary:"Photos",secondary:"Jan 9, 2014"})]}),e.jsxs(d,{children:[e.jsx(u,{children:e.jsx(j,{children:e.jsx(A,{width:20,height:20})})}),e.jsx(i,{primary:"Work",secondary:"Jan 7, 2014"})]}),e.jsxs(d,{children:[e.jsx(u,{children:e.jsx(j,{children:e.jsx(M,{width:20,height:20})})}),e.jsx(i,{primary:"Vacation",secondary:"July 20, 2014"})]})]})})}),q=()=>{const[s,c]=p.useState(1),r=(t,a)=>{c(a)};return e.jsx(e.Fragment,{children:e.jsxs(I,{variant:"outlined",children:[e.jsxs(l,{component:"nav","aria-label":"main mailbox folders",children:[e.jsxs(n,{selected:s===0,onClick:t=>r(t,0),children:[e.jsx(o,{children:e.jsx(b,{width:20,height:20})}),e.jsx(i,{primary:"Inbox"})]}),e.jsxs(n,{selected:s===1,onClick:t=>r(t,1),children:[e.jsx(o,{children:e.jsx(C,{width:20,height:20})}),e.jsx(i,{primary:"Drafts"})]})]}),e.jsx(f,{}),e.jsxs(l,{component:"nav","aria-label":"secondary mailbox folder",children:[e.jsx(n,{selected:s===2,onClick:t=>r(t,2),children:e.jsx(i,{primary:"Trash"})}),e.jsx(n,{selected:s===3,onClick:t=>r(t,3),children:e.jsx(i,{primary:"Spam"})})]})]})})},G=()=>{const[s,c]=p.useState([0]),r=t=>()=>{const a=s.indexOf(t),m=[...s];a===-1?m.push(t):m.splice(a,1),c(m)};return e.jsx(e.Fragment,{children:e.jsx(I,{variant:"outlined",children:e.jsx(l,{children:[0,1,2,3].map(t=>{const a=`checkbox-list-label-${t}`;return e.jsx(d,{secondaryAction:e.jsx(N,{edge:"end","aria-label":"comments",children:e.jsx(F,{width:20,height:20})}),disablePadding:!0,children:e.jsxs(n,{role:void 0,onClick:r(t),dense:!0,children:[e.jsx(o,{children:e.jsx(J,{edge:"start",checked:s.indexOf(t)!==-1,tabIndex:-1,disableRipple:!0,inputProps:{"aria-labelledby":a}})}),e.jsx(i,{id:a,primary:`Line item ${t+1}`})]})},t)})})})})},H=()=>{const[s,c]=p.useState(["wifi"]),r=t=>()=>{const a=s.indexOf(t),m=[...s];a===-1?m.push(t):m.splice(a,1),c(m)};return e.jsx(e.Fragment,{children:e.jsx(I,{variant:"outlined",children:e.jsxs(l,{subheader:e.jsx(k,{children:"Settings"}),children:[e.jsxs(d,{children:[e.jsx(o,{children:e.jsx(D,{width:20,height:20})}),e.jsx(i,{id:"switch-list-label-wifi",primary:"Wi-Fi"}),e.jsx(g,{edge:"end",onChange:r("wifi"),checked:s.indexOf("wifi")!==-1,inputProps:{"aria-labelledby":"switch-list-label-wifi"}})]}),e.jsxs(d,{children:[e.jsx(o,{children:e.jsx(R,{width:20,height:20})}),e.jsx(i,{id:"switch-list-label-bluetooth",primary:"Bluetooth"}),e.jsx(g,{edge:"end",onChange:r("bluetooth"),checked:s.indexOf("bluetooth")!==-1,inputProps:{"aria-labelledby":"switch-list-label-bluetooth"}})]})]})})})},$=()=>e.jsx(e.Fragment,{children:e.jsx(L,{children:`
import BlankCard from '../../shared/BlankCard';
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider
} from '@mui/material';

import { IconInbox, IconMailOpened } from '@tabler/icons';

<BlankCard>
    <List>
        <ListItem disablePadding>
            <ListItemButton>
                <ListItemIcon>
                    <IconInbox width={20} height={20} />
                </ListItemIcon>
                <ListItemText primary="Inbox" />
            </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
            <ListItemButton>
                <ListItemIcon>
                    <IconMailOpened width={20} height={20} />
                </ListItemIcon>
                <ListItemText primary="Drafts" />
            </ListItemButton>
        </ListItem>
    </List>
    <Divider />
    <List>
        <ListItem disablePadding>
            <ListItemButton>
              <ListItemText primary="Trash" />
            </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
            <ListItemButton component="a" href="#simple-list">
              <ListItemText primary="Spam" />
            </ListItemButton>
        </ListItem>
    </List>
</BlankCard>`})}),z=()=>e.jsx(e.Fragment,{children:e.jsx(L,{children:`
import {
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  Collapse,
} from '@mui/material';
import BlankCard from '../../shared/BlankCard';

import {
  IconInbox,
  IconMailOpened,
  IconSend,
  IconChevronDown,
  IconChevronUp,
  IconStar,
} from '@tabler/icons';

const [open, setOpen] = React.useState(true);

const handleClick = () => {
    setOpen(!open);
};

<BlankCard>
    <List
    component="nav"
    aria-labelledby="nested-list-subheader"
    subheader={
        <ListSubheader component="div" id="nested-list-subheader">
              Nested List Items
        </ListSubheader>
          }
    >
        <ListItemButton>
            <ListItemIcon>
              <IconSend width={20} height={20} />
            </ListItemIcon>
            <ListItemText primary="Sent mail" />
        </ListItemButton>
        <ListItemButton>
            <ListItemIcon>
              <IconMailOpened width={20} height={20} />
            </ListItemIcon>
            <ListItemText primary="Drafts" />
        </ListItemButton>
        <ListItemButton onClick={handleClick}>
            <ListItemIcon>
              <IconInbox width={20} height={20} />
            </ListItemIcon>
            <ListItemText primary="Inbox" />
            {open ? <IconChevronUp /> : <IconChevronDown />}
        </ListItemButton>
        <Collapse in={open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton sx={{ pl: 4 }}>
                <ListItemIcon>
                  <IconStar width={20} height={20} />
                </ListItemIcon>
                <ListItemText primary="Starred" />
              </ListItemButton>
            </List>
        </Collapse>
    </List>
</BlankCard>`})}),Y=()=>e.jsx(e.Fragment,{children:e.jsx(L,{children:`
import { 
List, 
ListItem, 
ListItemText, 
ListItemAvatar, 
Avatar 
} from '@mui/material';
import BlankCard from '../../shared/BlankCard';

import { 
IconPhoto, 
IconBriefcase, 
IconBeach 
} from '@tabler/icons';

<BlankCard>
    <List>
        <ListItem>
            <ListItemAvatar>
              <Avatar>
                <IconPhoto width={20} height={20} />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Photos" secondary="Jan 9, 2014" />
        </ListItem>
        <ListItem>
            <ListItemAvatar>
              <Avatar>
                <IconBriefcase width={20} height={20} />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Work" secondary="Jan 7, 2014" />
        </ListItem>
        <ListItem>
            <ListItemAvatar>
              <Avatar>
                <IconBeach width={20} height={20} />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Vacation" secondary="July 20, 2014" />
        </ListItem>
    </List>
</BlankCard>`})}),K=()=>e.jsx(e.Fragment,{children:e.jsx(L,{children:`
import { 
List, 
ListItemText, 
ListItemButton, 
Divider, 
ListItemIcon 
} from '@mui/material';
import BlankCard from '../../shared/BlankCard';

import { 
IconInbox, 
IconMailOpened 
} from '@tabler/icons';

const [selectedIndex, setSelectedIndex] = React.useState(1);

const handleListItemClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: number,
) => {
    setSelectedIndex(index);
};

<BlankCard>
    <List component="nav" aria-label="main mailbox folders">
        <ListItemButton
            selected={selectedIndex === 0}
            onClick={(event) => handleListItemClick(event, 0)}
        >
            <ListItemIcon>
              <IconInbox width={20} height={20} />
            </ListItemIcon>
            <ListItemText primary="Inbox" />
        </ListItemButton>
        <ListItemButton
            selected={selectedIndex === 1}
            onClick={(event) => handleListItemClick(event, 1)}
        >
            <ListItemIcon>
              <IconMailOpened width={20} height={20} />
            </ListItemIcon>
            <ListItemText primary="Drafts" />
        </ListItemButton>
    </List>
    <Divider />
    <List component="nav" aria-label="secondary mailbox folder">
        <ListItemButton
            selected={selectedIndex === 2}
            onClick={(event) => handleListItemClick(event, 2)}
        >
            <ListItemText primary="Trash" />
        </ListItemButton>
        <ListItemButton
            selected={selectedIndex === 3}
            onClick={(event) => handleListItemClick(event, 3)}
        >
            <ListItemText primary="Spam" />
        </ListItemButton>
    </List>
</BlankCard>`})}),Q=()=>e.jsx(e.Fragment,{children:e.jsx(L,{children:`
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
  Checkbox,
} from '@mui/material';

import { IconMessage } from '@tabler/icons';
import BlankCard from '../../shared/BlankCard';

const [checked, setChecked] = React.useState([0]);

const handleToggle = (valueNestedListCode) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
};

<BlankCard>
    <List>
        {[0, 1, 2, 3].map((value) => {
            const labelId = 'checkbox-list-label-{value}';

            return (
                <ListItem
                    key={value}
                    secondaryAction={
                        <IconButton edge="end" aria-label="comments">
                            <IconMessage width={20} height={20} />
                        </IconButton>
                    }
                    disablePadding
                >
                    <ListItemButton role={undefined} onClick={handleToggle(value)} dense>
                        <ListItemIcon>
                            <Checkbox
                                checked={checked.indexOf(value) !== -1}
                                tabIndex={-1}
                                disableRipple
                                inputProps={{ 'aria-labelledby': labelId }}
                                edge="start"
                            />
                        </ListItemIcon>
                        <ListItemText id={labelId} primary={'Line item {value + 1}'} />
                    </ListItemButton>
                </ListItem>
            );
        })}
    </List>
</BlankCard > `})}),X=()=>e.jsx(e.Fragment,{children:e.jsx(L,{children:`
  import { 
  List, 
  ListItem, 
  ListItemIcon, 
  ListItemText, 
  ListSubheader 
} from '@mui/material';
import BlankCard from '../../shared/BlankCard';

import { 
  IconWifi, 
  IconBluetooth 
} from '@tabler/icons';

import CustomSwitch from '../../forms/theme-elements/CustomSwitch';

const [checked, setChecked] = React.useState(['wifi']);

const handleToggle = (value: string) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
};

<BlankCard>
    <List subheader={<ListSubheader>Settings</ListSubheader>}>
        <ListItem>
            <ListItemIcon>
              <IconWifi width={20} height={20} />
            </ListItemIcon>
            <ListItemText id="switch-list-label-wifi" primary="Wi-Fi" />
            <CustomSwitch
              edge="end"
              onChange={handleToggle('wifi')}
              checked={checked.indexOf('wifi') !== -1}
              inputProps={{
                'aria-labelledby': 'switch-list-label-wifi',
              }}
            />
        </ListItem>
        <ListItem>
            <ListItemIcon>
              <IconBluetooth width={20} height={20} />
            </ListItemIcon>
            <ListItemText id="switch-list-label-bluetooth" primary="Bluetooth" />
            <CustomSwitch
              edge="end"
              onChange={handleToggle('bluetooth')}
              checked={checked.indexOf('bluetooth') !== -1}
              inputProps={{
                'aria-labelledby': 'switch-list-label-bluetooth',
              }}
            />
        </ListItem>
    </List>
</BlankCard>`})}),Z=[{to:"/",title:"Home"},{title:"List"}],ze=()=>e.jsxs(w,{title:"List",description:"this is List page",children:[e.jsx(B,{title:"List",items:Z}),e.jsx(y,{title:"List",children:e.jsxs(h,{container:!0,spacing:3,children:[e.jsx(h,{item:!0,xs:12,sm:6,display:"flex",alignItems:"stretch",children:e.jsx(x,{title:"Simple",codeModel:e.jsx($,{}),children:e.jsx(W,{})})}),e.jsx(h,{item:!0,xs:12,sm:6,display:"flex",alignItems:"stretch",children:e.jsx(x,{title:"Nested",codeModel:e.jsx(z,{}),children:e.jsx(U,{})})}),e.jsx(h,{item:!0,xs:12,sm:6,display:"flex",alignItems:"stretch",children:e.jsx(x,{title:"Folder",codeModel:e.jsx(Y,{}),children:e.jsx(V,{})})}),e.jsx(h,{item:!0,xs:12,sm:6,display:"flex",alignItems:"stretch",children:e.jsx(x,{title:"Selected",codeModel:e.jsx(K,{}),children:e.jsx(q,{})})}),e.jsx(h,{item:!0,xs:12,sm:6,display:"flex",alignItems:"stretch",children:e.jsx(x,{title:"Controls",codeModel:e.jsx(Q,{}),children:e.jsx(G,{})})}),e.jsx(h,{item:!0,xs:12,sm:6,display:"flex",alignItems:"stretch",children:e.jsx(x,{title:"Switch",codeModel:e.jsx(X,{}),children:e.jsx(H,{})})})]})})]});export{ze as default};
