import{R as C,j as e}from"./index-1d78c4ac.js";import{B as $}from"./Breadcrumb-4b5ba697.js";import{P as D}from"./PageContainer-51f17055.js";import{P as E}from"./ParentCard-b3c2f72c.js";import{C as w}from"./ChildCard-8626bfcd.js";import{bv as q,bu as B,bt as O,bs as H}from"./index.esm-4ca6571d.js";import{C as y}from"./CustomCheckbox-0154e390.js";import{G as c,P as G}from"./Grid-ba112631.js";import{B as g}from"./Button-6de5bece.js";import{L as P}from"./List-eaf26c6f.js";import{L as b}from"./ListItem-f171abd1.js";import{L as S}from"./ListItemIcon-39000d2a.js";import{L as z}from"./ListItemText-f12ae70f.js";import{S as M}from"./Stack-74791772.js";import{C as F}from"./CardHeader-4375bfdf.js";import{D as N}from"./Divider-32914f08.js";import{C as A}from"./CodeDialog-4128d6b6.js";import"./Box-3b2e6d90.js";import"./Link-5958468e.js";import"./Card-ed0a9074.js";import"./CardContent-97c31a3d.js";import"./SwitchBase-a9247a40.js";import"./useFormControl-9666228d.js";import"./useControlled-05793c79.js";import"./listItemButtonClasses-af8afb72.js";import"./isMuiElement-a2555389.js";import"./listItemTextClasses-76a31095.js";import"./createStack-08af7ebe.js";import"./styled-db48c038.js";import"./useThemeProps-a461f42f.js";import"./dividerClasses-40064371.js";import"./Tooltip-58d28098.js";import"./Popper-880e6f72.js";import"./useId-521a9597.js";import"./Portal-8f313b54.js";import"./createPopper-04c39de4.js";import"./Grow-cf41a8df.js";import"./utils-f13413e5.js";import"./IconButton-6eb83b27.js";import"./DialogContent-aa8a214a.js";import"./Modal-5026ae4f.js";import"./ownerWindow-f1e1d6ee.js";import"./createChainedFunction-0bab83cf.js";import"./DialogTitle-be3ad24b.js";import"./toConsumableArray-d8b147df.js";function x(t,r){return t.filter(n=>r.indexOf(n)===-1)}function T(t,r){return t.filter(n=>r.indexOf(n)!==-1)}const J=()=>{const[t,r]=C.useState([]),[n,h]=C.useState([0,1,2,3]),[o,m]=C.useState([4,5,6,7]),a=T(t,n),d=T(t,o),p=s=>()=>{const i=t.indexOf(s),l=[...t];i===-1?l.push(s):l.splice(i,1),r(l)},u=()=>{m(o.concat(n)),h([])},L=()=>{m(o.concat(a)),h(x(n,a)),r(x(t,a))},v=()=>{h(n.concat(d)),m(x(o,d)),r(x(t,d))},I=()=>{h(n.concat(o)),m([])},k=s=>e.jsx(G,{variant:"outlined",sx:{width:200,height:230,overflow:"auto"},children:e.jsxs(P,{dense:!0,component:"div",role:"list",children:[s.map(i=>{const l=`transfer-list-item-${i}-label`;return e.jsxs(b,{role:"listitem",button:!0,onClick:p(i),children:[e.jsx(S,{children:e.jsx(y,{checked:t.indexOf(i)!==-1,tabIndex:-1,disableRipple:!0,inputProps:{"aria-labelledby":l}})}),e.jsx(z,{id:l,primary:`List item ${i+1}`})]},i)}),e.jsx(b,{})]})});return e.jsxs(c,{container:!0,spacing:2,justifyContent:"center",alignItems:"center",children:[e.jsx(c,{item:!0,children:k(n)}),e.jsx(c,{item:!0,children:e.jsxs(c,{container:!0,direction:"column",alignItems:"center",children:[e.jsx(g,{sx:{my:.5},variant:"outlined",size:"small",onClick:u,disabled:n.length===0,"aria-label":"move all right",children:e.jsx(q,{width:20,height:20})}),e.jsx(g,{sx:{my:.5},variant:"outlined",size:"small",onClick:L,disabled:a.length===0,"aria-label":"move selected right",children:e.jsx(B,{width:20,height:20})}),e.jsx(g,{sx:{my:.5},variant:"outlined",size:"small",onClick:v,disabled:d.length===0,"aria-label":"move selected left",children:e.jsx(O,{width:20,height:20})}),e.jsx(g,{sx:{my:.5},variant:"outlined",size:"small",onClick:I,disabled:o.length===0,"aria-label":"move all left",children:e.jsx(H,{width:20,height:20})})]})}),e.jsx(c,{item:!0,children:k(o)})]})};function f(t,r){return t.filter(n=>r.indexOf(n)===-1)}function j(t,r){return t.filter(n=>r.indexOf(n)!==-1)}function K(t,r){return[...t,...f(r,t)]}const Q=()=>{const[t,r]=C.useState([]),[n,h]=C.useState([0,1,2,3]),[o,m]=C.useState([4,5,6,7]),a=j(t,n),d=j(t,o),p=s=>()=>{const i=t.indexOf(s),l=[...t];i===-1?l.push(s):l.splice(i,1),r(l)},u=s=>j(t,s).length,L=s=>()=>{u(s)===s.length?r(f(t,s)):r(K(t,s))},v=()=>{m(o.concat(a)),h(f(n,a)),r(f(t,a))},I=()=>{h(n.concat(d)),m(f(o,d)),r(f(t,d))},k=(s,i)=>e.jsxs(G,{variant:"outlined",children:[e.jsx(F,{sx:{px:2},avatar:e.jsx(y,{onClick:L(i),checked:u(i)===i.length&&i.length!==0,indeterminate:u(i)!==i.length&&u(i)!==0,disabled:i.length===0,inputProps:{"aria-label":"all items selected"}}),title:s,subheader:`${u(i)}/${i.length} selected`}),e.jsx(N,{}),e.jsxs(P,{sx:{width:200,height:230,overflow:"auto"},dense:!0,component:"div",role:"list",children:[i.map(l=>{const R=`transfer-list-all-item-${l}-label`;return e.jsxs(b,{role:"listitem",button:!0,onClick:p(l),children:[e.jsx(S,{children:e.jsx(y,{checked:t.indexOf(l)!==-1,tabIndex:-1,disableRipple:!0,inputProps:{"aria-labelledby":R}})}),e.jsx(z,{id:R,primary:`List item ${l+1}`})]},l)}),e.jsx(b,{})]})]});return e.jsxs(c,{container:!0,spacing:2,justifyContent:"center",alignItems:"center",children:[e.jsx(c,{item:!0,children:k("Choices",n)}),e.jsx(c,{item:!0,children:e.jsxs(M,{spacing:1,children:[e.jsx(g,{variant:"outlined",size:"small",onClick:v,disabled:a.length===0,"aria-label":"move selected right",children:e.jsx(B,{width:20,height:20})}),e.jsx(g,{variant:"outlined",size:"small",onClick:I,disabled:d.length===0,"aria-label":"move selected left",children:e.jsx(O,{width:20,height:20})})]})}),e.jsx(c,{item:!0,children:k("Chosen",o)})]})},U=()=>e.jsx(e.Fragment,{children:e.jsx(A,{children:`
import React from 'react';
import { useTheme } from '@mui/material/styles';
import { Grid, List, ListItem, ListItemIcon, ListItemText, Button, Paper } from '@mui/material';

import {
  IconChevronRight,
  IconChevronLeft,
  IconChevronsLeft,
  IconChevronsRight,
} from '@tabler/icons';

import CustomCheckbox from '../../forms/theme-elements/CustomCheckbox';

function not(a: readonly number[], b: readonly number[]) {
  return a.filter((value) => b.indexOf(value) === -1);
}

function intersection(a: readonly number[], b: readonly number[]) {
  return a.filter((value) => b.indexOf(value) !== -1);
}

const BasicTransferList = () => {
const [checked, setChecked] = React.useState<readonly number[]>([]);
const [left, setLeft] = React.useState<readonly number[]>([0, 1, 2, 3]);
const [right, setRight] = React.useState<readonly number[]>([4, 5, 6, 7]);

const leftChecked = intersection(checked, left);
const rightChecked = intersection(checked, right);

const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
};

const handleAllRight = () => {
    setRight(right.concat(left));
    setLeft([]);
};

const handleCheckedRight = () => {
    setRight(right.concat(leftChecked));
    setLeft(not(left, leftChecked));
    setChecked(not(checked, leftChecked));
};

const handleCheckedLeft = () => {
    setLeft(left.concat(rightChecked));
    setRight(not(right, rightChecked));
    setChecked(not(checked, rightChecked));
};

const handleAllLeft = () => {
    setLeft(left.concat(right));
    setRight([]);
};
const theme = useTheme();
const borderColor = theme.palette.divider;

const customList = (items: readonly number[]) => (
    <Paper
      variant="outlined"
      sx={{ width: 200, height: 230, overflow: 'auto', border: '1px solid {borderColor}' }}
    >
        <List dense component="div" role="list">
            {items.map((value) => {
                const labelId = 'transfer-list-item-{value}-label';
                return (
                    <ListItem key={value} role="listitem" button onClick={handleToggle(value)}>
                        <ListItemIcon>
                                <CustomCheckbox
                                    tabIndex={-1}
                                    disableRipple
                                    checked={checked.indexOf(value) !== -1}
                                    inputProps={{
                                        'aria-labelledby': labelId,
                                    }}
                        />
                        </ListItemIcon>
                        <ListItemText id={labelId} primary={'List item {value + 1}'} />
                    </ListItem>
                );
            })}
        </List>
    </Paper>
);

return (
    <Grid container spacing={2} justifyContent="center" alignItems="center">
        <Grid item>{customList(left)}</Grid>
            <Grid item>
                <Grid container direction="column" alignItems="center">
                    <Button
                        sx={{ my: 0.5 }}
                        variant="outlined"
                        size="small"
                        onClick={handleAllRight}
                        disabled={left.length === 0}
                        aria-label="move all right"
                    >
                        <IconChevronsRight width={20} height={20} />
                    </Button>
                    <Button
                        sx={{ my: 0.5 }}
                        variant="outlined"
                        size="small"
                        onClick={handleCheckedRight}
                        disabled={leftChecked.length === 0}
                        aria-label="move selected right"
                    >
                        <IconChevronRight width={20} height={20} />
                   </Button>
                    <Button
                        sx={{ my: 0.5 }}
                        variant="outlined"
                        size="small"
                        onClick={handleCheckedLeft}
                        disabled={rightChecked.length === 0}
                        aria-label="move selected left"
                    >
                        <IconChevronLeft width={20} height={20} />
                    </Button>
                    <Button
                        sx={{ my: 0.5 }}
                        variant="outlined"
                        size="small"
                        onClick={handleAllLeft}
                        disabled={right.length === 0}
                        aria-label="move all left"
                    >
                        <IconChevronsLeft width={20} height={20} />
                    </Button>
                </Grid>
            </Grid>
        <Grid item>{customList(right)}</Grid>
    </Grid>
    );
};`})}),V=()=>e.jsx(e.Fragment,{children:e.jsx(A,{children:`
import React from 'react';
import { useTheme } from '@mui/material/styles';
import {
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Button,
  Divider,
  CardHeader,
  Stack,
  Paper,
} from '@mui/material';

import { IconChevronRight, IconChevronLeft } from '@tabler/icons';

import CustomCheckbox from '../../forms/theme-elements/CustomCheckbox';

function not(a: readonly number[], b: readonly number[]) {
  return a.filter((value) => b.indexOf(value) === -1);
}

function intersection(a: readonly number[], b: readonly number[]) {
  return a.filter((value) => b.indexOf(value) !== -1);
}

function union(a: readonly number[], b: readonly number[]) {
  return [...a, ...not(b, a)];
}

const EnhancedTransferList = () => {
  const [checked, setChecked] = React.useState<readonly number[]>([]);
  const [left, setLeft] = React.useState<readonly number[]>([0, 1, 2, 3]);
  const [right, setRight] = React.useState<readonly number[]>([4, 5, 6, 7]);

  const leftChecked = intersection(checked, left);
  const rightChecked = intersection(checked, right);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const numberOfChecked = (items: readonly number[]) => intersection(checked, items).length;

  const handleToggleAll = (items: readonly number[]) => () => {
    if (numberOfChecked(items) === items.length) {
      setChecked(not(checked, items));
    } else {
      setChecked(union(checked, items));
    }
  };

  const handleCheckedRight = () => {
    setRight(right.concat(leftChecked));
    setLeft(not(left, leftChecked));
    setChecked(not(checked, leftChecked));
  };

  const handleCheckedLeft = () => {
    setLeft(left.concat(rightChecked));
    setRight(not(right, rightChecked));
    setChecked(not(checked, rightChecked));
  };

  const theme = useTheme();
  const borderColor = theme.palette.grey[100];

  const customList = (title: React.ReactNode, items: readonly number[]) => (
    <Paper variant="outlined" sx={{ border: '1px solid {borderColor}' }}>
      <CardHeader
        sx={{ px: 2 }}
        avatar={
          <CustomCheckbox
            onClick={handleToggleAll(items)}
            checked={numberOfChecked(items) === items.length && items.length !== 0}
            indeterminate={numberOfChecked(items) !== items.length && numberOfChecked(items) !== 0}
            disabled={items.length === 0}
            inputProps={{
              'aria-label': 'all items selected',
            }}
          />
        }
        title={title}
        subheader={'{numberOfChecked(items)}/{items.length} selected'}
      />
      <Divider />
      <List
        sx={{
          width: 200,
          height: 230,
          overflow: 'auto',
        }}
        dense
        component="div"
        role="list"
      >
        {items.map((value) => {
          const labelId = 'transfer-list-all-item-{value}-label';

          return (
            <ListItem key={value} role="listitem" button onClick={handleToggle(value)}>
              <ListItemIcon>
                <CustomCheckbox
                  checked={checked.indexOf(value) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{
                    'aria-labelledby': labelId,
                  }}
                />
              </ListItemIcon>
              <ListItemText id={labelId} primary={'List item {value + 1}'} />
            </ListItem>
          );
        })}
        <ListItem />
      </List>
    </Paper>
  );

  return (
    <Grid container spacing={2} justifyContent="center" alignItems="center">
      <Grid item>{customList('Choices', left)}</Grid>
      <Grid item>
        <Stack spacing={1}>
          <Button
            variant="outlined"
            size="small"
            onClick={handleCheckedRight}
            disabled={leftChecked.length === 0}
            aria-label="move selected right"
          >
            <IconChevronRight width={20} height={20} />
          </Button>
          <Button
            variant="outlined"
            size="small"
            onClick={handleCheckedLeft}
            disabled={rightChecked.length === 0}
            aria-label="move selected left"
          >
            <IconChevronLeft width={20} height={20} />
          </Button>
        </Stack>
      </Grid>
      <Grid item>{customList('Chosen', right)}</Grid>
    </Grid>
  );
};`})}),W=[{to:"/",title:"Home"},{title:"Transfer List"}],Me=()=>e.jsxs(D,{title:"Transfer List",description:"this is Transfer List page",children:[e.jsx($,{title:"Transfer List",items:W}),e.jsx(E,{title:"Transfer List",children:e.jsxs(c,{container:!0,spacing:3,children:[e.jsx(c,{item:!0,xs:12,display:"flex",alignItems:"stretch",children:e.jsx(w,{title:"Basic",codeModel:e.jsx(U,{}),children:e.jsx(J,{})})}),e.jsx(c,{item:!0,xs:12,display:"flex",alignItems:"stretch",children:e.jsx(w,{title:"Enhanced",codeModel:e.jsx(V,{}),children:e.jsx(Q,{})})})]})})]});export{Me as default};
