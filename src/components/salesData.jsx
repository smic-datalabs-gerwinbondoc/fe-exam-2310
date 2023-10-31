import React, { useState, useEffect } from 'react';

import {Grid, Typography} from '@mui/material';

function SalesData({ selectedDate }) {
    const [uniqueCustomers, setUniqueCustomers] = useState(null);
    const [totalSales, setTotalSales] = useState(null);
    const [totalTransactions, setTotalTransactions] = useState(null);

    useEffect(() => {
        if (selectedDate) {
            const formattedDate = selectedDate.format('YYYY-MM');

            fetch(`https://exam-cloudrun-r5c7oqswwq-as.a.run.app/api/data/sales/invoices/?date=${formattedDate}`)
                .then(response => response.json())
                .then(data => {
                    console.log('Fetched data:', data);

                    const filteredData = data.filter(invoice => invoice.InvoiceDate.includes(formattedDate));
                    const customerIds = Array.from(new Set(filteredData.map(invoice => invoice.CustomerId)));
                    console.log('Unique Customers Array:', customerIds);

                    setUniqueCustomers(customerIds.length);
                    const totalSales = filteredData.reduce((total, invoice) => total + invoice.Total, 0);
                    const totalTransactions = filteredData.length;
                    setTotalSales(totalSales);
                    setTotalTransactions(totalTransactions);
                })
                
                .catch(error => {
                    console.error('Error fetching data:', error);
                });
        }
    }, [selectedDate]);

    return (
        <Grid>
            <Typography variant='h5'>Sales Data</Typography>
            <Typography>Unique Customers: {uniqueCustomers}</Typography>
            <Typography>Total Sales: {totalSales}</Typography>
            <Typography>Total Transactions: {totalTransactions}</Typography>
        </Grid>
    );
}

export default SalesData;
