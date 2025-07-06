import React, { useState } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Select,
    MenuItem,
    Typography,
    Box,
    Paper,
    InputLabel,
    useMediaQuery,
    Grid2,
} from "@mui/material";

const users = [
    "admin infoway",
    "mukesh",
    "dilima",
    "Meher",
    "Abirami",
    "kamali",
    "Raghavi",
];

const ProductCalendar = () => {
    const matches = useMediaQuery('(min-width:600px)');
    const [month, setMonth] = useState(1);
    const [year, setYear] = useState(2025);

    const daysInMonth = new Date(year, month, 0).getDate();

    const rowText = {
        color: '#fff',
        fontFamily: "Poppins",
    }

    return (
        <Box sx={{ p: 4 }}>
            <Typography variant="h4" fontFamily={"Poppins"} fontWeight="bold" align="center" gutterBottom>
                User Month Report | {year} - {month.toString().padStart(2, "0")}
            </Typography>

            <Box sx={{ display: 'flex', justifyContent: "center" }}>
                <Grid2 container>
                    <Grid2 size={{ sx: 12, md: 12, sm: 5 }}>
                        <InputLabel
                            id="input"
                            sx={{ mt: 1, mb: 0.5, fontWeight: 600, fontFamily: "Poppins", color: "#000", fontSize: 18 }}>
                            Month:
                        </InputLabel>
                        <Select
                            size="small"
                            value={month}
                            onChange={(e) => setMonth(e.target.value)}
                            sx={{ width: 100 }}
                        >
                            {[...Array(12).keys()].map((m) => (
                                <MenuItem key={m + 1} value={m + 1}>
                                    {m + 1}
                                </MenuItem>
                            ))}
                        </Select>
                    </Grid2>
                </Grid2>

                <Grid2 size={{ sx: 12, md: 12, sm: 5 }} marginLeft={2}>
                    <InputLabel
                        id="input"
                        sx={{ mt: 1, mb: 0.5, fontWeight: 600, fontFamily: "Poppins", color: "#000", fontSize: 18 }}>
                        Year:
                    </InputLabel>
                    <Select
                        size="small"
                        value={year}
                        onChange={(e) => setYear(e.target.value)}
                        sx={{ width: 120 }}
                    >
                        {[2025, 2026, 2027].map((y) => (
                            <MenuItem key={y} value={y}>
                                {y}
                            </MenuItem>
                        ))}
                    </Select>
                </Grid2>
            </Box>

            <TableContainer component={Paper} sx={{marginTop: 2}}>
                <Table>
                    <TableHead sx={{ backgroundColor: '#7d5e69' }}>
                        <TableRow>
                            <TableCell style={rowText}>Date</TableCell>
                            {matches ? <>
                                {[...Array(daysInMonth).keys()].map((d) => (
                                    <TableCell key={d + 1} align="center" style={rowText}>
                                        {d + 1}
                                    </TableCell>
                                ))}
                            </>
                                :
                                null}

                            <TableCell align="center" sx={{ backgroundColor: '#7d5e69', color: "#fff" }}>Total</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map((user) => (
                            <TableRow key={user}>
                                <TableCell sx={{ backgroundColor: '#7d5e69', color: "#fff" }}>{user}</TableCell>
                                {matches ? <>
                                    {[...Array(daysInMonth).keys()].map((d) => (
                                        <TableCell key={d + 1} align="center">
                                            0
                                        </TableCell>
                                    ))}
                                </> : null}


                                <TableCell align="center">10</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};

export default ProductCalendar;
