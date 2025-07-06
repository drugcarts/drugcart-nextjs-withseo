"use client"
import React from 'react'
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid2';
import { Button, Typography } from '@mui/material';

const CardItem = styled(Paper)(({ theme }) => ({
    background: 'linear-gradient(to right bottom, #141727, #3a416f)',
    ...theme.typography.body2,
    padding: theme.spacing(4),
    borderRadius: 12,
    color: theme.palette.text.secondary,
    cursor: 'pointer',
    ...theme.applyStyles('dark', {
        backgroundColor: '#1A2027',
    }),
}));

function UserCard() {
    return (
        <Grid container mt={2} mb={8} spacing={2}>
            <Grid size={{ xs: 12, sm: 5, md: 3, lg: 3, xl: 3 }}>
                <CardItem elevation={3}>
                    <Box sx={{ display: 'flex' }}>
                        <Typography
                            variant="body1"
                            fontFamily={"Poppins"}
                            fontWeight={"bold"}
                            fontSize={22}
                            color='#fff'
                            textAlign={"center"}
                            sx={{ flexGrow: 1 }}
                        >
                            Admin infoway
                        </Typography>
                    </Box>
                    <Typography variant="body1" mt={0.5} fontFamily={"Poppins"} textAlign={"center"} color='#fff' fontSize={18}>(contract)</Typography>
                </CardItem>
            </Grid>
            <Grid size={{ xs: 12, sm: 5, md: 3, lg: 3, xl: 3 }}>
                <CardItem elevation={3}>
                    <Box sx={{ display: 'flex' }}>
                        <Typography
                            variant="body1"
                            fontFamily={"Poppins"}
                            fontWeight={"bold"}
                            fontSize={22}
                            color='#fff'
                            textAlign={"center"}
                            sx={{ flexGrow: 1 }}
                        >
                            Mukesh
                        </Typography>
                    </Box>
                    <Typography variant="body1" mt={0.5} fontFamily={"Poppins"} textAlign={"center"} color='#fff' fontSize={16}>(salary)</Typography>
                </CardItem>
            </Grid>
            <Grid size={{ xs: 12, sm: 5, md: 3, lg: 3, xl: 3 }}>
                <CardItem elevation={3}>
                    <Box sx={{ display: 'flex' }}>
                        <Typography
                            variant="body1"
                            fontFamily={"Poppins"}
                            fontWeight={"bold"}
                            fontSize={22}
                            color='#fff'
                            textAlign={"center"}
                            sx={{ flexGrow: 1 }}
                        >
                            Kishore
                        </Typography>
                    </Box>
                    <Typography variant="body1" mt={0.5} fontFamily={"Poppins"} textAlign={"center"} color='#fff' fontSize={18}>(salary)</Typography>
                </CardItem>
            </Grid>
            <Grid size={{ xs: 12, sm: 5, md: 3, lg: 3, xl: 3 }}>
                <CardItem elevation={3}>
                    <Box sx={{ display: 'flex' }}>
                        <Typography
                            variant="body1"
                            fontFamily={"Poppins"}
                            fontWeight={"bold"}
                            fontSize={22}
                            color='#fff'
                            textAlign={"center"}
                            sx={{ flexGrow: 1 }}
                        >
                            Ramani
                        </Typography>
                    </Box>
                    <Typography variant="body1" mt={0.5} fontFamily={"Poppins"} textAlign={"center"} color='#fff' fontSize={18}>(contract)</Typography>
                </CardItem>
            </Grid>
            <Grid size={{ xs: 12, sm: 5, md: 3, lg: 3, xl: 3 }}>
                <CardItem elevation={3}>
                    <Box sx={{ display: 'flex' }}>
                        <Typography
                            variant="body1"
                            fontFamily={"Poppins"}
                            fontWeight={"bold"}
                            fontSize={22}
                            color='#fff'
                            textAlign={"center"}
                            sx={{ flexGrow: 1 }}
                        >
                            Mahalakshmi
                        </Typography>
                    </Box>
                    <Typography variant="body1" mt={0.5} fontFamily={"Poppins"} textAlign={"center"} color='#fff' fontSize={18}>(contract)</Typography>
                </CardItem>
            </Grid>
            <Grid size={{ xs: 12, sm: 5, md: 3, lg: 3, xl: 3 }}>
                <CardItem elevation={3}>
                    <Box sx={{ display: 'flex' }}>
                        <Typography
                            variant="body1"
                            fontFamily={"Poppins"}
                            fontWeight={"bold"}
                            fontSize={22}
                            color='#fff'
                            textAlign={"center"}
                            sx={{ flexGrow: 1 }}
                        >
                            Pavithra
                        </Typography>
                    </Box>
                    <Typography variant="body1" mt={0.5} fontFamily={"Poppins"} textAlign={"center"} color='#fff' fontSize={18}>(contract)</Typography>
                </CardItem>
            </Grid>
            <Grid size={{ xs: 12, sm: 5, md: 3, lg: 3, xl: 3 }}>
                <CardItem elevation={3}>
                    <Box sx={{ display: 'flex' }}>
                        <Typography
                            variant="body1"
                            fontFamily={"Poppins"}
                            fontWeight={"bold"}
                            fontSize={22}
                            color='#fff'
                            textAlign={"center"}
                            sx={{ flexGrow: 1 }}
                        >
                            Meher
                        </Typography>
                    </Box>
                    <Typography variant="body1" mt={0.5} fontFamily={"Poppins"} textAlign={"center"} color='#fff' fontSize={18}>(salary)</Typography>
                </CardItem>
            </Grid>
            <Grid size={{ xs: 12, sm: 5, md: 3, lg: 3, xl: 3 }}>
                <CardItem elevation={3}>
                    <Box sx={{ display: 'flex' }}>
                        <Typography
                            variant="body1"
                            fontFamily={"Poppins"}
                            fontWeight={"bold"}
                            fontSize={22}
                            color='#fff'
                            textAlign={"center"}
                            sx={{ flexGrow: 1 }}
                        >
                            Priyanka
                        </Typography>
                    </Box>
                    <Typography variant="body1" mt={0.5} fontFamily={"Poppins"} textAlign={"center"} color='#fff' fontSize={18}>(salary)</Typography>
                </CardItem>
            </Grid>
        </Grid>
    )
}

export default UserCard