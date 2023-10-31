import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import EchartsComponent from './components/pieChart';
import SampleDataTable from './components/dataTable';
import LineChart from './components/lineGraph';
import SalesData from './components/salesData';
import DatePickerViews from './components/dateFilter';

import { Grid, Typography } from '@mui/material';

function App() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const apiUrl = 'https://exam-cloudrun-r5c7oqswwq-as.a.run.app/api/data/sales/albums/';
        fetch(apiUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                console.log('API Response:', data); // Log the response
                setData(data);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
                setLoading(false);
            });
    }, []);

    return (
        <Grid>
            <Typography variant='h5'>Exam API Data</Typography>
            <Grid container direction={'row'}>
                <Grid item>

                </Grid>
                <Grid item>
                    <DatePickerViews />
                </Grid>
            </Grid>
            <Grid container direction={'row'} spacing={2}>
                <Grid item xs={4}>
                    <EchartsComponent />
                </Grid>
                <Grid item xs={8}>
                    <LineChart />
                </Grid>
            </Grid>
            <Grid>
                <LineChart />
            </Grid>
            <Grid>
                <SampleDataTable />
            </Grid>

        </Grid>
    );
}

export default App;
