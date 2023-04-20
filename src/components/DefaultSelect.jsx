import React from 'react'
import { FormControl, InputLabel, Select, MenuItem, Container, Typography } from '@mui/material'
function DefaultSelect(props) {
    const { dt, label, name, handleChange: onChange } = props;
    const [data, setData] = React.useState();
    console.log("..............");
    const handleChange = (e) => {
        onChange(e)
        setData(e.target.value);
    }
    return (
        <FormControl variant="standard" sx={{ marginRight: 3, paddingLeft: 4 }} fullWidth>
            <Typography fontFamily={'Roboto Slab'} fontWeight={900} id="data">{label}</Typography>
            <Select
                value={data}
                variant='outlined'
                size='small'
                onChange={handleChange}
                name={name}
                sx={{ fontFamily: 'Roboto Slab' }}
            >
                {dt.map((item, index) => (
                    <MenuItem
                        value={item}
                        key={index}
                        sx={{
                            fontFamily: 'Roboto Slab'
                        }}>
                        {item}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    )
}

export default DefaultSelect