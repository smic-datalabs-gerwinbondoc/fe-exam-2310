import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';

const ArtistSales = () => {
  const [artistSales, setArtistSales] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch('https://exam-cloudrun-r5c7oqswwq-as.a.run.app/api/data/sales/invoice_items/')
      .then((response) => response.json())
      .then((invoiceItems) => {
        fetch('https://exam-cloudrun-r5c7oqswwq-as.a.run.app/api/data/sales/albums/')
          .then((response) => response.json())
          .then((albums) => {
            fetch('https://exam-cloudrun-r5c7oqswwq-as.a.run.app/api/data/sales/tracks/')
              .then((response) => response.json())
              .then((tracks) => {
                const artistNameMap = albums.reduce((map, album) => {
                  map[album.ArtistId] = album.Title;
                  return map;
                }, {});

                const artistSalesData = invoiceItems.reduce((sales, item) => {
                  const track = tracks.find((t) => t.TrackId === item.TrackId);
                  if (track) {
                    const artistName = artistNameMap[track.AlbumId];
                    if (artistName) {
                      if (!sales[artistName]) {
                        sales[artistName] = 0;
                      }
                      sales[artistName] += item.Quantity * item.UnitPrice;
                    }
                  }
                  return sales;
                }, {});

                setArtistSales(artistSalesData);
                setIsLoading(false);
              })
              .catch((error) => {
                console.error('Error fetching tracks:', error);
                setIsLoading(false);
              });
          })
          .catch((error) => {
            console.error('Error fetching albums:', error);
            setIsLoading(false);
          });
      })
      .catch((error) => {
        console.error('Error fetching invoice items:', error);
        setIsLoading(false);
      });
  }, []);

  const columns = [
    {
      name: 'Artist',
      selector: 'artist',
      sortable: true,
    },
    {
      name: 'Total Sales',
      selector: 'totalSales',
      sortable: true,
    },
  ];

  const data = Object.entries(artistSales).map(([artist, totalSales]) => ({
    artist,
    totalSales: `$${totalSales.toFixed(2)}`,
  }));

  return (
    <div>
      <h1>Total Sales by Artist</h1>
      {isLoading ? (
        <p>Loading data...</p>
      ) : (
        <DataTable columns={columns} data={data} pagination highlightOnHover />
      )}
    </div>
  );
};

export default ArtistSales;
