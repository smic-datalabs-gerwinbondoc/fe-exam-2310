import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';
import axios from 'axios';

function EchartsComponent() {
    const chartRef = useRef(null);
    let myChart = null;

    useEffect(() => {
        myChart = echarts.init(chartRef.current);

        // Fetch data from the API
        axios.get('https://exam-cloudrun-r5c7oqswwq-as.a.run.app/api/data/sales/tracks/')
            .then(response => {
                const tracks = response.data;
                const genreCounts = {};

                // Count the tracks for each genre
                tracks.forEach(track => {
                    const genre = track.GenreId;
                    if (genreCounts[genre]) {
                        genreCounts[genre]++;
                    } else {
                        genreCounts[genre] = 1;
                    }
                });

                // Prepare data for ECharts
                const genreData = Object.keys(genreCounts).map(genreId => ({
                    value: genreCounts[genreId],
                    name: genreId, // You might want to map genre IDs to genre names
                }));

                const option = {
                    tooltip: {
                        trigger: 'item',
                    },
                    series: [
                        {
                            name: 'Genre Distribution',
                            type: 'pie',
                            radius: '75%',
                            data: genreData,
                            emphasis: {
                                itemStyle: {
                                    shadowBlur: 10,
                                    shadowOffsetX: 0,
                                    shadowColor: 'rgba(0, 0, 0, 0.5)',
                                },
                            },
                            label: {
                                show: false, // Hide labels
                            },
                        },
                    ],
                };

                myChart.setOption(option);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });

        // Clean up the chart when the component unmounts
        return () => {
            myChart.dispose();
        };
    }, []);

    return (
        <div ref={chartRef} style={{ width: '100%', height: '400px' }}></div>
    );
}

export default EchartsComponent;
