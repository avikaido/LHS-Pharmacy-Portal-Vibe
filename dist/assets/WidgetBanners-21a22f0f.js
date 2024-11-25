import{j as r,u as p}from"./index-1d78c4ac.js";import{B as l}from"./Breadcrumb-4b5ba697.js";import{P as d}from"./PageContainer-51f17055.js";import{W as x}from"./WelcomeCard-a66adfad.js";import{i as c}from"./login-bg-b21c00aa.js";import{P as a}from"./ParentCard-b3c2f72c.js";import{C as i}from"./CodeDialog-4128d6b6.js";import{C as h}from"./Card-ed0a9074.js";import{C as s}from"./CardContent-97c31a3d.js";import{G as t}from"./Grid-ba112631.js";import{B as o,T as e}from"./Box-3b2e6d90.js";import{B as n}from"./Button-6de5bece.js";import{s as g}from"./gold-83b6594d.js";import{B as y}from"./Badge-cb787faa.js";import{A as u}from"./Avatar-49c7f2db.js";import{S as j}from"./Stack-74791772.js";import{M as C}from"./maintenance-cde3de75.js";import{s as B}from"./empty-shopping-cart-84e91aad.js";import"./index.esm-4ca6571d.js";import"./Link-5958468e.js";import"./Divider-32914f08.js";import"./dividerClasses-40064371.js";import"./CardHeader-4375bfdf.js";import"./Tooltip-58d28098.js";import"./Popper-880e6f72.js";import"./useId-521a9597.js";import"./Portal-8f313b54.js";import"./createPopper-04c39de4.js";import"./useControlled-05793c79.js";import"./Grow-cf41a8df.js";import"./utils-f13413e5.js";import"./IconButton-6eb83b27.js";import"./DialogContent-aa8a214a.js";import"./Modal-5026ae4f.js";import"./ownerWindow-f1e1d6ee.js";import"./createChainedFunction-0bab83cf.js";import"./DialogTitle-be3ad24b.js";import"./toConsumableArray-d8b147df.js";import"./usePreviousProps-39045d8b.js";import"./useSlot-a49cf6b5.js";import"./createStack-08af7ebe.js";import"./styled-db48c038.js";import"./useThemeProps-a461f42f.js";const f=()=>r.jsx(r.Fragment,{children:r.jsx(i,{children:`
import { Card, CardContent, Typography, Button, Box, Grid } from '@mui/material';
import Image from 'next/image';

const Banner1 = () => {
  return (
    <Card
      elevation={0}
      sx={{
        backgroundColor: (theme) => theme.palette.secondary.light,
        py: 0,
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      <CardContent sx={{ p: '30px' }}>
        <Grid container spacing={3} justifyContent="space-between">
          <Grid item sm={6} display="flex" alignItems="center">
            <Box
              sx={{
                textAlign: {
                  xs: 'center',
                  sm: 'left',
                },
              }}
            >
              <Typography variant="h5">Track your every Transaction Easily</Typography>
              <Typography variant="subtitle1" color="textSecondary" my={2}>
                Track and record your every income and expence easily to control your balance
              </Typography>
              <Button variant="contained" color="secondary">
                Download
              </Button>
            </Box>
          </Grid>
          <Grid item sm={4}>
            <Box mb="-150px">
              <Image src={"/images/backgrounds/track-bg.png"} alt={"trackBg"} height={195} width={168} />
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default Banner1;
`})}),v=()=>r.jsx(a,{title:"Transection",codeModel:r.jsx(f,{}),children:r.jsx(h,{elevation:0,sx:{backgroundColor:m=>m.palette.secondary.light,py:0,overflow:"hidden",position:"relative"},children:r.jsx(s,{sx:{p:"30px"},children:r.jsxs(t,{container:!0,spacing:3,justifyContent:"space-between",children:[r.jsx(t,{item:!0,sm:6,display:"flex",alignItems:"center",children:r.jsxs(o,{sx:{textAlign:{xs:"center",sm:"left"}},children:[r.jsx(e,{variant:"h5",children:"Track your every Transaction Easily"}),r.jsx(e,{variant:"subtitle1",color:"textSecondary",my:2,children:"Track and record your every income and expence easily to control your balance"}),r.jsx(n,{variant:"contained",color:"secondary",children:"Download"})]})}),r.jsx(t,{item:!0,sm:4,children:r.jsx(o,{mb:"-90px",children:r.jsx("img",{src:c,alt:c})})})]})})})}),b=()=>r.jsx(r.Fragment,{children:r.jsx(i,{children:`
import { CardContent, Typography, Button, Card } from '@mui/material';
import { Box } from '@mui/system';
import Image from 'next/image';

const Banner2 = () => {
  return (
    <Card>
      <CardContent sx={{ p: '30px' }}>
        <Typography variant="subtitle1" textAlign="center" mb={2} textTransform="uppercase" color="textSecondary">
          Level Up
        </Typography>
        <Box textAlign="center">
          <Image src={"/images/backgrounds/gold.png"} width={150} height={150} alt="star" style={{ width: '150px'}} />

          <Typography variant="h5">You reach all Notifications</Typography>
          <Typography variant="subtitle1" color="textSecondary" mt={1} mb={2}>Congratulations,<br/> Tap to continue next task.</Typography>

          <Button color="primary" variant="contained" size="large">
            Yes, Got it!
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default Banner2;
`})}),T=()=>r.jsx(a,{title:"Notification",codeModel:r.jsx(b,{}),children:r.jsxs(s,{sx:{p:"30px"},children:[r.jsx(e,{variant:"subtitle1",textAlign:"center",mb:2,textTransform:"uppercase",color:"textSecondary",children:"Level Up"}),r.jsxs(o,{textAlign:"center",children:[r.jsx("img",{src:g,alt:"star",width:150}),r.jsx(e,{variant:"h5",children:"You reach all Notifications"}),r.jsxs(e,{variant:"subtitle1",color:"textSecondary",mt:1,mb:2,children:["Congratulations,",r.jsx("br",{})," Tap to continue next task."]}),r.jsx(n,{color:"primary",variant:"contained",size:"large",children:"Yes, Got it!"})]})]})}),w=()=>r.jsx(r.Fragment,{children:r.jsx(i,{children:`
import { CardContent, Typography, Button, Avatar, Badge, Card } from '@mui/material';
import { Box, Stack } from '@mui/system';

const Banner3 = () => {
  return (
    <Card>
      <CardContent sx={{ p: '30px' }}>
        <Typography variant="h5" textAlign="center" mb={3}>
          Mutual Friend Revealed
        </Typography>
        <Box textAlign="center">
          <Badge badgeContent={1} color="error" overlap="circular">
            <Avatar src={"/images/profile/user-1.jpg"} alt="userBg" sx={{ width: 140, height: 140 }} />
          </Badge>

          <Typography variant="h5" mt={3}>
            Tommoie Henderson
          </Typography>
          <Typography variant="subtitle1" color="textSecondary" mt={1} mb={2}>
            Accept the request and <br/> type a message
          </Typography>

          <Stack direction="row" spacing={2} justifyContent="center">
            <Button color="primary" variant="contained" size="large">
              Accept
            </Button>
            <Button color="error" variant="outlined" size="large">
              Remove
            </Button>
          </Stack>
        </Box>
      </CardContent>
    </Card>
  );
};

export default Banner3;

`})}),A=()=>r.jsx(a,{title:"Friend Card",codeModel:r.jsx(w,{}),children:r.jsxs(s,{sx:{p:"30px"},children:[r.jsx(e,{variant:"h5",textAlign:"center",mb:3,children:"Mutual Friend Revealed"}),r.jsxs(o,{textAlign:"center",children:[r.jsx(y,{badgeContent:1,color:"error",overlap:"circular",children:r.jsx(u,{src:p,alt:"userBg",sx:{width:140,height:140}})}),r.jsx(e,{variant:"h5",mt:3,children:"Tommoie Henderson"}),r.jsxs(e,{variant:"subtitle1",color:"textSecondary",mt:1,mb:2,children:["Accept the request and ",r.jsx("br",{})," type a message"]}),r.jsxs(j,{direction:"row",spacing:2,justifyContent:"center",children:[r.jsx(n,{color:"primary",variant:"contained",size:"large",children:"Accept"}),r.jsx(n,{color:"error",variant:"outlined",size:"large",children:"Remove"})]})]})]})}),k=()=>r.jsx(r.Fragment,{children:r.jsx(i,{children:`
import { CardContent, Typography, Button, Card } from '@mui/material';
import { Box } from '@mui/system';
import Image from 'next/image';

const Banner4 = () => {
  return (
    <Card>
      <CardContent sx={{ p: '30px' }}>
        <Box textAlign="center">
          <Image src={"/images/backgrounds/maintenance2.svg"} width={200} height={200} alt="star" style={{ width: '200px' }} />

          <Typography variant="h5" mt={3}>Oops something went wrong!</Typography>
          <Typography variant="subtitle1" color="textSecondary" mt={1} mb={2}>
            Trying again to bypasses these<br /> temporary error.
          </Typography>

          <Button color="error" variant="contained" size="large">
            Retry
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default Banner4;
`})}),S=()=>r.jsx(a,{title:"Error",codeModel:r.jsx(k,{}),children:r.jsx(s,{sx:{p:"30px"},children:r.jsxs(o,{textAlign:"center",children:[r.jsx("img",{src:C,alt:"star",width:200}),r.jsx(e,{variant:"h5",mt:3,children:"Oops something went wrong!"}),r.jsxs(e,{variant:"subtitle1",color:"textSecondary",mt:1,mb:2,children:["Trying again to bypasses these",r.jsx("br",{})," temporary error."]}),r.jsx(n,{color:"error",variant:"contained",size:"large",children:"Retry"})]})})}),G=()=>r.jsx(r.Fragment,{children:r.jsx(i,{children:`
import { CardContent, Typography, Button, Card } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import Image from 'next/image';

const Banner5 = () => {
  return (
    <Card>
      <CardContent sx={{ p: '30px' }}>
        <Box textAlign="center">
          <Image src={"/images/products/empty-shopping-cart.svg"} width={200} height={200} alt="star" style={{ width: '200px' }} />

          <Typography variant="h5" mt={3}>Oop, Your cart is empty!</Typography>
          <Typography variant="subtitle1" color="textSecondary" mt={1} mb={2}>
            Get back to shopping and get<br /> rewards from it.
          </Typography>

          <Button color="primary" variant="contained" size="large">
            Go for shopping!
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default Banner5;
`})}),I=()=>r.jsx(a,{title:"Empty Cart",codeModel:r.jsx(G,{}),children:r.jsx(s,{sx:{p:"30px"},children:r.jsxs(o,{textAlign:"center",children:[r.jsx("img",{src:B,alt:"star",width:200}),r.jsx(e,{variant:"h5",mt:3,children:"Oop, Your cart is empty!"}),r.jsxs(e,{variant:"subtitle1",color:"textSecondary",mt:1,mb:2,children:["Get back to shopping and get",r.jsx("br",{})," rewards from it."]}),r.jsx(n,{color:"primary",variant:"contained",size:"large",children:"Go for shopping!"})]})})}),z=[{to:"/",title:"Home"},{title:"Banner"}],fr=()=>r.jsxs(d,{title:"Banner",description:"this is Banner page",children:[r.jsx(l,{title:"Banner",items:z}),r.jsxs(t,{container:!0,spacing:3,children:[r.jsx(t,{item:!0,xs:12,lg:8,children:r.jsxs(t,{container:!0,spacing:3,children:[r.jsx(t,{item:!0,xs:12,children:r.jsx(x,{})}),r.jsx(t,{item:!0,xs:12,children:r.jsx(v,{})}),r.jsx(t,{item:!0,xs:12,sm:6,children:r.jsx(S,{})}),r.jsx(t,{item:!0,xs:12,sm:6,children:r.jsx(I,{})})]})}),r.jsx(t,{item:!0,xs:12,lg:4,children:r.jsxs(t,{container:!0,spacing:3,children:[r.jsx(t,{item:!0,xs:12,children:r.jsx(T,{})}),r.jsx(t,{item:!0,xs:12,children:r.jsx(A,{})})]})})]})]});export{fr as default};
