import logo from './logo.svg';
import './App.css';

import { Divider, Grid, Typography, Button, ButtonGroup, Tab, Box, Tabs, Stack } from "@mui/material";

function App() {
  return (
    <Grid container>
      <Grid container sx={{ mt: 3 }} alignItems="center">
                <Grid item direction="row" sx={{ ml: 1 }}>
                    <Typography variant="h5" sx={{ fontWeight: 'medium' }}>Analytics</Typography>
                    <Grid container direction="row">
                        <Typography variant="h6" style={{ display: 'flex', alignItems: 'center', color: '#808080', fontWeight: 'bold' }}>
                            SAMPLE OUTPUT
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>

            <Divider sx={{ my: 3, borderBottom: 2 }} />
    </Grid>
  );
}

export default App;
