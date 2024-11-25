import{j as e,P as y,R as u}from"./index-1d78c4ac.js";import{P as C}from"./ParentCard-b3c2f72c.js";import{C as t}from"./ChildCard-8626bfcd.js";import{B as V}from"./Breadcrumb-4b5ba697.js";import{P as T}from"./PageContainer-51f17055.js";import{C as R}from"./CustomRangeSlider-8c3c99f2.js";import{C as p}from"./CustomSlider-0693626c.js";import{bm as x,bd as c}from"./index.esm-4ca6571d.js";import{C as l}from"./CodeDialog-4128d6b6.js";import{G as r}from"./Grid-ba112631.js";import{B as o,T as h}from"./Box-3b2e6d90.js";import{S as a,a as w}from"./Slider-5d7a41b3.js";import{S as M}from"./Stack-4b2e722b.js";import"./Card-ed0a9074.js";import"./CardHeader-4375bfdf.js";import"./Divider-32914f08.js";import"./dividerClasses-40064371.js";import"./CardContent-97c31a3d.js";import"./Link-5958468e.js";import"./Tooltip-58d28098.js";import"./Popper-880e6f72.js";import"./useId-521a9597.js";import"./Portal-8f313b54.js";import"./createPopper-04c39de4.js";import"./useControlled-05793c79.js";import"./Grow-cf41a8df.js";import"./utils-f13413e5.js";import"./IconButton-6eb83b27.js";import"./DialogContent-aa8a214a.js";import"./Modal-5026ae4f.js";import"./ownerWindow-f1e1d6ee.js";import"./createChainedFunction-0bab83cf.js";import"./DialogTitle-be3ad24b.js";import"./toConsumableArray-d8b147df.js";import"./visuallyHidden-fa9934b5.js";import"./createStack-08af7ebe.js";import"./styled-db48c038.js";import"./useThemeProps-a461f42f.js";const k=()=>e.jsx(e.Fragment,{children:e.jsx(l,{children:`
import * as React from 'react';
import { styled } from '@mui/material/styles';
import { Slider } from '@mui/material';

const CustomSlider = styled(Slider)(({ theme }) => ({
  '& .MuiSlider-rail': {
    height: '9px',
    borderRadius: '9px',
    opacity: '1',
    backgroundColor: theme.palette.grey[200],
  },
  '& .MuiSlider-thumb': {
    borderRadius: '50%',
    backgroundColor: () => theme.palette.secondary.main,
    width: '23px',
    height: '23px',
  },
  '& .MuiSlider-track': {
    height: '9px',
    borderRadius: '9px',
  },
}));

<CustomSlider defaultValue={[30]}  />
`})}),I=()=>e.jsx(e.Fragment,{children:e.jsx(l,{children:`
import * as React from 'react';
import { styled } from '@mui/material/styles';
import { Slider } from '@mui/material';
import { IconVolume, IconVolume2 } from '@tabler/icons';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const CustomSlider = styled(Slider)(({ theme }) => ({
  '& .MuiSlider-rail': {
    height: '9px',
    borderRadius: '9px',
    opacity: '1',
    backgroundColor: theme.palette.grey[200],
  },
  '& .MuiSlider-thumb': {
    borderRadius: '50%',
    backgroundColor: () => theme.palette.secondary.main,
    width: '23px',
    height: '23px',
  },
  '& .MuiSlider-track': {
    height: '9px',
    borderRadius: '9px',
  },
}));

<CustomSlider defaultValue={30} aria-label="volume slider" />
<Box display="flex" alignItems="center">
    <Typography>
        <IconVolume2 width={20} />
    </Typography>
    <Box ml="auto">
        <Typography>
            <IconVolume width={20} />
        </Typography>
    </Box>
</Box>
`})}),v=()=>e.jsx(e.Fragment,{children:e.jsx(l,{children:`
import * as React from 'react';
import { styled } from '@mui/material/styles';
import { IconVolume, IconVolume2 } from '@tabler/icons';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { SliderValueLabelProps } from '@mui/material/Slider';
import {SliderThumb} from '@mui/material/Slider';

const CustomSlider = styled(Slider)(({ theme }) => ({
  '& .MuiSlider-rail': {
    height: '9px',
    borderRadius: '9px',
    opacity: '1',
    backgroundColor: theme.palette.grey[200],
  },
  '& .MuiSlider-thumb': {
    borderRadius: '50%',
    backgroundColor: () => theme.palette.secondary.main,
    width: '23px',
    height: '23px',
  },
  '& .MuiSlider-track': {
    height: '9px',
    borderRadius: '9px',
  },
}));

function AirbnbThumbComponent(props: SliderValueLabelProps) {
  const { children, ...other } = props;

  return (
    <SliderThumb {...other}>
      {children}
      <Box
        sx={{
          height: 9,
          width: '2px',
          backgroundColor: '#fff',
        }}
      />
      <Box
        sx={{
          height: '14px',
          width: '2px',
          backgroundColor: '#fff',
          ml: '2px',
        }}
      />
      <Box
        sx={{
          height: 9,
          width: '2px',
          backgroundColor: '#fff',
          ml: '2px',
        }}
      />
    </SliderThumb>
  );
}

<CustomRangeSlider
    slots={{ thumb: AirbnbThumbComponent }}
    getAriaLabel={(index) => (index === 0 ? 'Minimum price' : 'Maximum price')}
    defaultValue={[20, 40]}
/>
`})}),B=()=>e.jsx(e.Fragment,{children:e.jsx(l,{children:`
import * as React from 'react';
import { Slider } from '@mui/material';

<Slider defaultValue={30}  />
`})}),D=()=>e.jsx(e.Fragment,{children:e.jsx(l,{children:`
import * as React from 'react';
import { Slider } from '@mui/material';

<Slider disabled defaultValue={30}  />
`})}),g=()=>e.jsx(e.Fragment,{children:e.jsx(l,{children:`
import * as React from 'react';
import { Slider } from '@mui/material';

  const [value, setValue] = React.useState(30);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const [value2, setValue2] = React.useState([20, 37]);
  const handleChange2 = (event2, newValue2) => {
    setValue2(newValue2);
  };

<Slider
    aria-label="Temperature"
    defaultValue={30}
    getAriaValueText={valuetext}
    valueLabelDisplay="auto"
    step={10}
    marks
    min={10}
    max={110}
/>
`})}),A=[{to:"/",title:"Home"},{title:"Slider"}],L=i=>`${i}°C`;function P(i){return`${i}°C`}const f=i=>{const{children:s,...m}=i;return e.jsxs(w,{...m,children:[s,e.jsx(o,{sx:{height:9,width:"2px",backgroundColor:"#fff"}}),e.jsx(o,{sx:{height:"14px",width:"2px",backgroundColor:"#fff",ml:"2px"}}),e.jsx(o,{sx:{height:9,width:"2px",backgroundColor:"#fff",ml:"2px"}})]})};f.propTypes={children:y.node};const Se=()=>{const[i,s]=u.useState(30),m=(d,n)=>{s(n)},[b,j]=u.useState([20,37]),S=(d,n)=>{j(n)};return e.jsxs(T,{title:"Slider",description:"this is Slider page",children:[e.jsx(V,{title:"Slider",items:A}),e.jsx(C,{title:"Slider",children:e.jsxs(r,{container:!0,spacing:3,children:[e.jsx(r,{item:!0,xs:12,lg:4,sm:6,display:"flex",alignItems:"stretch",children:e.jsx(t,{title:"Custom",codeModel:e.jsx(k,{}),children:e.jsx(p,{defaultValue:30,"aria-label":"slider"})})}),e.jsx(r,{item:!0,xs:12,lg:4,sm:6,display:"flex",alignItems:"stretch",children:e.jsxs(t,{title:"Volume",codeModel:e.jsx(I,{}),children:[e.jsx(p,{defaultValue:30,"aria-label":"slider"}),e.jsxs(o,{display:"flex",alignItems:"center",children:[e.jsx(h,{children:e.jsx(x,{width:20})}),e.jsx(o,{ml:"auto",children:e.jsx(h,{children:e.jsx(c,{width:20})})})]})]})}),e.jsx(r,{item:!0,xs:12,lg:4,sm:6,display:"flex",alignItems:"stretch",children:e.jsx(t,{title:"Range",codeModel:e.jsx(v,{}),children:e.jsx(R,{components:{Thumb:f},getAriaLabel:d=>d===0?"Minimum price":"Maximum price",defaultValue:[20,40]})})}),e.jsx(r,{item:!0,xs:12,lg:4,sm:6,display:"flex",alignItems:"stretch",children:e.jsx(t,{title:"Default",codeModel:e.jsx(B,{}),children:e.jsx(a,{defaultValue:30,"aria-label":"slider"})})}),e.jsx(r,{item:!0,xs:12,lg:4,sm:6,display:"flex",alignItems:"stretch",children:e.jsx(t,{title:"Disabled",codeModel:e.jsx(D,{}),children:e.jsx(a,{disabled:!0,defaultValue:30,"aria-label":"slider"})})}),e.jsx(r,{item:!0,xs:12,lg:4,sm:6,display:"flex",alignItems:"stretch",children:e.jsx(t,{title:"Volume",children:e.jsxs(M,{direction:"row",spacing:1,children:[e.jsx(x,{width:20}),e.jsx(a,{"aria-label":"Volume",value:i,onChange:m}),e.jsx(c,{width:20})]})})}),e.jsx(r,{item:!0,xs:12,lg:4,sm:6,display:"flex",alignItems:"stretch",children:e.jsx(t,{title:"Discrete",codeModel:e.jsx(g,{}),children:e.jsx(a,{"aria-label":"Temperature",defaultValue:30,getAriaValueText:L,valueLabelDisplay:"auto",step:10,marks:!0,min:10,max:110})})}),e.jsx(r,{item:!0,xs:12,lg:4,sm:6,display:"flex",alignItems:"stretch",children:e.jsx(t,{title:"Range Default",codeModel:e.jsx(g,{}),children:e.jsx(a,{getAriaLabel:()=>"Temperature range",value:b,onChange:S,valueLabelDisplay:"auto",getAriaValueText:P})})})]})})]})};export{Se as default};
