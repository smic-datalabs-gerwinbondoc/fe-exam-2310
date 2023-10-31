import React, { useState, useEffect } from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import SalesData from './salesData';

import { Grid } from '@mui/material';

export default function DatePickerViews() {
    const [selectedDate, setSelectedDate] = React.useState(dayjs());
    const [filteredData, setFilteredData] = useState([]);

    const minDate = dayjs('2009-01-01');
    const maxDate = dayjs('2013-12-31');

    const handleDateChange = (date) => {
        setSelectedDate(date);
        fetchData(date);
    };

    const fetchData = (date) => {
        if (date) {
            const formattedDate = date.format('YYYY-MM'); 
            const apiUrl = `https://exam-cloudrun-r5c7oqswwq-as.a.run.app/api/data/sales/invoices/?date=${formattedDate}`;

            fetch(apiUrl)
                .then(response => response.json())
                .then(data => {
                    console.log("API Response:", data);

                    const filteredData = data.filter(invoice => {
                        const invoiceDate = dayjs(invoice.InvoiceDate);
                        return invoiceDate.isSame(date, 'month');
                    });

                    setFilteredData(filteredData);
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                });
        }
    };

    useEffect(() => {
        fetchData(selectedDate);
    }, [selectedDate]);

    return (
        <Grid container row={'row'} spacing={2} justifyContent={'space-between'}>
            <Grid item>
                {selectedDate && <SalesData selectedDate={selectedDate} filteredData={filteredData} />}
            </Grid>

            <Grid item>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                    label={'Select a Date'}
                    views={['month', 'year']}
                    value={selectedDate}
                    onChange={(newDate) => handleDateChange(newDate)}
                    minDate={minDate}
                    maxDate={maxDate}
                />
            </LocalizationProvider></Grid>
            
            
        </Grid>
    );
}
