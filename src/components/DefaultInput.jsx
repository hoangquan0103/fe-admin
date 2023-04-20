import React from "react";
import {
  Typography,
  Checkbox,
  TextField,
  Container,
  Box,
  MenuItem,
  Select,
} from "@mui/material";
import { configString } from "../config/admin.config";
function DefaultInput(props) {
  const {
    id,
    name,
    disabled,
    data,
    dataSelect,
    rows,
    multiline,
    handleChange: onChange,
  } = props;
  const [value, setValue] = React.useState(data);
  const handleChange = (e) => {
    setValue(e.target.value);
    if (e.target.id === "neutered") {
      e.target.checked = false;
    }
    onChange(e);
  };
  return (
    <Box sx={{ paddingInline: 2 }}>
      <Typography
        fontFamily={"Roboto Slab"}
        fontWeight={900}
        fontSize={"16px"}
        marginLeft={1}
        marginBottom={"5px"}
      >
        {name}
      </Typography>
      {!dataSelect ? (
        <TextField
          fullWidth
          variant="outlined"
          size="small"
          type={props?.type}
          id={id}
          multiline={multiline}
          rows={rows}
          disabled={localStorage.getItem("USER_KEY") ? false : true}
          value={!value ? data : value}
          onChange={handleChange}
          placeholder={"Nhập " + (name + "").toLocaleLowerCase()}
          sx={{ padding: "5px" }}
        />
      ) : (
        <Checkbox
          checked={value !== 0 ? true : false}
          onChange={handleChange}
          id={id}
        />
      )}
    </Box>
  );
}

export default DefaultInput;
