import './css/scoring.css'
import DenseTable from '../muiComponents/DenseTable'
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { useState } from 'react';

export default function Scoring () {

    const coinTypes = [
        {
            "type": "Flying Eagle Cent (1856-58)",
            "pointValue": "100pts"
        },
        {
            "type": "Indian Head Cent (1859-1909)",
            "pointValue": "50pts"
        },
        {
            "type": "Wheat Cent (1909-1939)",
            "pointValue": "10pts"
        },
        {
            "type": "Whet Cent (1940-1958)",
            "pointValue": "5pts"
        },
        {
            "type": "Key Dates",
            "pointValue": "400pts"
        },
        {
            "type": "Semi Key Dates",
            "pointValue": "250pts"
        },
        {
            "type": "Lincoln Bicentennial",
            "pointValue": "1pts"
        },
        {
            "type": "Proof Cents",
            "pointValue": "10pts"
        },
        {
            "type": "Wheat Cent Doubled Die",
            "pointValue": "300pts"
        },
        {
            "type": "Lincoln Cent Doubled Die",
            "pointValue": "100pts"
        },
        {
            "type": "Shield Cent Doubled Die",
            "pointValue": "50pts"
        }
    ]

    const uniqueCoins = []

    return (
        <>
    <div className='scoring-container'>
        <div className="scoring-title-box">
            <h1 className="scoring-title">Scoring</h1>
        </div>
        {/* <div className="grid-container">
            <Grid container spacing={2}>
                <Grid item xs={2}>
                    
                </Grid>
                <Grid item xs={2}>
                    
                </Grid>
            </Grid>
        </div> */}
        
        <div className="scoreboard-container">
            <div className="scoreboard">
                <DenseTable coinScores={coinTypes}/>
            </div>
            {/* <div className="scoreboard">
                <DenseTable coinScores={uniqueCoins}/>
            </div> */}
        </div>
    </div>
            </>
            
    )
}