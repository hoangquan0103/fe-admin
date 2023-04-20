import { Card, Typography, Box } from '@mui/material'
import {configNumber} from '../config/admin.config'
import React from 'react'

function CardContent(props) {
    const {data} = props;
    return (
        <Card
            sx={{
                width: 270,
                height: 120,
                display: 'flex',
                justifyContent: 'space-evenly',
                alignItems: 'center',
                borderRadius: 3,
                borderWidth: 1,
                borderStyle: 'solid',
                borderColor: 'rgb(213,219,225)',
                padding: 2,
            }}>
            <Box>
                <Typography fontFamily={'Roboto Slab'} paddingBottom={2}>{data?.name}</Typography>
                <Typography fontFamily={'Roboto Slab'} fontWeight={900}>{configNumber(data?.quantity)}</Typography>
            </Box>
            <Box>
                <img src={data?.img} width={130} />
            </Box>
        </Card>
    )
}

export default CardContent