import React from 'react';
import { Box, Card, Typography, Button } from '@mui/material';
import { EmailVerification } from 'supertokens-auth-react/recipe/emailverification';
import PageContainer from 'src/components/container/PageContainer';
import Logo from 'src/layouts/full/shared/logo/Logo';

const VerifyEmail = () => {
    const [emailSent, setEmailSent] = React.useState(false);

    const sendVerificationEmail = async () => {
        try {
            await EmailVerification.sendVerificationEmail();
            setEmailSent(true);
        } catch (err) {
            console.error("Error sending verification email:", err);
        }
    };

    return (
        <PageContainer title="Verify Email" description="Please verify your email address">
            <Box
                sx={{
                    position: 'relative',
                    '&:before': {
                        content: '""',
                        background: 'radial-gradient(#d2f1df, #d3d7fa, #bad8f4)',
                        backgroundSize: '400% 400%',
                        animation: 'gradient 15s ease infinite',
                        position: 'absolute',
                        height: '100%',
                        width: '100%',
                        opacity: '0.3',
                    },
                }}
            >
                <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    sx={{ minHeight: '100vh' }}
                >
                    <Card sx={{ p: 4, width: '100%', maxWidth: '500px' }}>
                        <Box display="flex" alignItems="center" justifyContent="center" mb={3}>
                            <Logo />
                        </Box>
                        <Typography variant="h4" textAlign="center" gutterBottom>
                            Verify Your Email
                        </Typography>
                        <Typography variant="body1" textAlign="center" color="textSecondary" paragraph>
                            {emailSent
                                ? "We've sent you a verification email. Please check your inbox and follow the instructions."
                                : "Please verify your email address to continue."}
                        </Typography>
                        {!emailSent && (
                            <Button
                                variant="contained"
                                color="primary"
                                fullWidth
                                onClick={sendVerificationEmail}
                                sx={{ mt: 2 }}
                            >
                                Send Verification Email
                            </Button>
                        )}
                        {emailSent && (
                            <Button
                                variant="outlined"
                                color="primary"
                                fullWidth
                                onClick={sendVerificationEmail}
                                sx={{ mt: 2 }}
                            >
                                Resend Verification Email
                            </Button>
                        )}
                    </Card>
                </Box>
            </Box>
        </PageContainer>
    );
};

export default VerifyEmail; 