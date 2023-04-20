import * as React from 'react';
import { Theme, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import { MenuItem, Typography } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Chip from '@mui/material/Chip';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const names = [
  'Oliver Hansen',
  'Van Henry',
  'April Tucker',
  'Ralph Hubbard',
  'Omar Alexander',
  'Carlos Abbott',
  'Miriam Wagner',
  'Bradley Wilkerson',
  'Virginia Andrews',
  'Kelly Snyder',
];

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function MultipleSelectChip(props) {
  const theme = useTheme();
  const { data, handleChange: onChange, selected } = props;
  const [personName, setPersonName] = React.useState(selected);
  function getStyles(name, personName, theme) {
    return {
      fontWeight:
        personName.indexOf(name) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  }
  const handleChange = (e) => {
    const value = e.target.value;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
    onChange(e);
  };

  React.useEffect(() => {
    setPersonName(selected);
  }, [selected]);

  // console.log(selected);

  return (
    <div>
      <FormControl sx={{ width: '96%', marginLeft: 3 }}>
        <Typography
          fontFamily={'Roboto Slab'}
          fontWeight={900}
          fontSize={'16px'}
          marginLeft={1}
          marginBottom={'5px'}
        >
          Thể loại
        </Typography>
        <Select
          labelId="demo-multiple-chip-label"
          id={props.id}
          multiple
          name="category"
          value={personName}
          onChange={handleChange}
          input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {data.map((item) => (
            <MenuItem
              key={item}
              value={item?.title}
              style={getStyles(item, personName, theme)}
            >
              {item?.title}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
