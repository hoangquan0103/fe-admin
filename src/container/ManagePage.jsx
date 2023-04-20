import {
  Box,
  MenuItem,
  TextField,
  Typography,
  Button,
  IconButton,
  Backdrop,
  Dialog,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CircularProgress from '@mui/material/CircularProgress';
import GridViewIcon from '@mui/icons-material/GridView';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { fieldName } from '../config/table.config';
import { editable } from '../config/attr-config-editable.config';
import CustomTable from '../components/CustomTable';
import { useParams } from 'react-router-dom';
import AdmniContainer from '../service/AdminContainer.service';
import { useDispatch } from 'react-redux';
import { setBooks } from '../store/Module.action';
import { useNavigate } from 'react-router-dom';
import { configString, roleConfig } from '../config/admin.config';
import { ToastContainer, toast } from 'react-toastify';
function ManagePage() {
  const user = localStorage.getItem('USER_KEY');
  const navigate = useNavigate();
  useEffect(() => {
    if (!user) navigate('/login');
  }, []);

  const service = new AdmniContainer();
  const [open, setOpen] = useState();
  const [dataSearch, setDataSearch] = useState({
    id: '',
    name: '',
    author: '',
  });

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setDataSearch({ ...dataSearch, [name]: value });
    // setValue(value);
  };
  const tmp = useRef();
  const dispatch = useDispatch();
  const param = useParams();
  // const roles = roleConfig[param?.id];
  const [value, setValue] = useState();
  const callAPI = useCallback(async () => {
    setOpen(true);
    await service.get('book/get-all').then((res) => {
      dispatch(setBooks(res.data));
      tmp.current = res.data;
    });
    setOpen(false);
  }, []);
  const handleDelete = async (data) => {
    console.log(data);
    await service.delete('book/delete' + '/' + data);
    // .then((res) => toast.success('Đã xóa thành công', toastOption));
    // console.log(rs);
  };
  const handleSearch = () => {
    const newData = tmp.current.filter(
      (item) =>
        (item.name + '')
          .toLocaleLowerCase()
          .includes(dataSearch.name?.toLocaleLowerCase()) &&
        (item.id + '')
          .toLocaleLowerCase()
          .includes(dataSearch.id?.toLocaleLowerCase()) &&
        (item.author + '')
          .toLocaleLowerCase()
          .includes(dataSearch.author?.toLocaleLowerCase()),
    );
    dispatch(setBooks(newData));
  };
  useEffect(() => {
    callAPI();
  }, []);
  return (
    <Box
      sx={{
        paddingTop: 3,
      }}
    >
      <Box
        className="nav"
        sx={{
          width: '100%',
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center',
        }}
      >
        <IconButton>
          <FormatListBulletedIcon color="primary" />
        </IconButton>
        <IconButton>
          <GridViewIcon />
        </IconButton>
        <Button
          startIcon={<AddIcon />}
          disabled={localStorage.getItem('USER_KEY') ? false : true}
          onClick={() => {
            navigate('/add/' + 'book');
          }}
          sx={{
            borderRadius: 5,
            backgroundColor: 'rgba(1,227,167,1)',
            color: 'white',
            paddingInline: 3,
            fontSize: 14,
          }}
        >
          Thêm sách
        </Button>
      </Box>
      <Box
        className="search"
        sx={{
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBlock: 3,
        }}
      >
        <TextField
          sx={{ width: 270 }}
          size="small"
          label="ID"
          name="id"
          onChange={handleChange}
          variant="outlined"
        />
        <TextField
          sx={{ width: 270 }}
          size="small"
          name="name"
          label="Name"
          onChange={handleChange}
          variant="outlined"
        />
        <TextField
          size="small"
          sx={{ width: 270 }}
          label="Author"
          name="author"
          onChange={handleChange}
          variant="outlined"
        ></TextField>
        <Button
          onClick={handleSearch}
          sx={{
            width: 270,
            height: 53,
            color: 'white',
            background:
              'linear-gradient(180deg, rgba(1,227,167,1) 0%, rgba(9,9,121,1) 100%, rgba(40,0,128,1) 100%)',
          }}
        >
          search
        </Button>
      </Box>
      {open === false ? (
        <CustomTable
          config={editable}
          fieldName={fieldName.book}
          type={param?.id}
          handleDelete={handleDelete}
        />
      ) : (
        <></>
      )}
      <Backdrop sx={{ color: '#fff', zIndex: 100 }} open={false}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </Box>
  );
}

export default ManagePage;
