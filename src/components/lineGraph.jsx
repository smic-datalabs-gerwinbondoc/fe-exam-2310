import React, { useEffect } from 'react';
import * as echarts from 'echarts';

const LineChart = () => {
    useEffect(() => {
        async function fetchSalesData() {
            try {
                const response = await fetch('https://exam-cloudrun-r5c7oqswwq-as.a.run.app/api/data/sales/tracks/');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return await response.json();
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }

        async function fetchData() {
            const salesData = await fetchSalesData();
            if (salesData) {
                const genreData = {};

                // Initialize genre data with zero sales
                salesData.forEach((track) => {
                    if (!genreData[track.GenreId]) {
                        genreData[track.GenreId] = {
                            name: track.GenreId || 'Unknown Genre', // Replace with the appropriate genre field
                            totalSales: 0,
                        };
                    }

                    // Increment the total sales for each genre
                    genreData[track.GenreId].totalSales += 1;
                });

                const legendData = Object.values(genreData).map((genre) => genre.name);
                const seriesData = Object.values(genreData).map((genre) => genre.totalSales);

                const option = {
                    tooltip: {
                        trigger: 'axis',
                    },
                    legend: {
                        data: legendData,
                    },
                    xAxis: {
                        data: legendData, // Display genre names on the x-axis (supposed to be Months)
                    },
                    yAxis: {},
                    series: [
                        {
                            name: 'Total Tracks Sold',
                            type: 'line',
                            data: seriesData, // must be genres
                        },
                    ],
                };

                const chart = echarts.init(document.getElementById('line-chart'));
                chart.setOption(option);
            }
        }

        fetchData();

        return () => {
            const chart = echarts.getInstanceByDom(document.getElementById('line-chart'));
            if (chart) {
                chart.dispose();
            }
        };
    }, []);

    return (
        <div id="line-chart" style={{ height: '400px' }}>
            {/* The line chart will be rendered here */}
        </div>
    );
};

export default LineChart;
