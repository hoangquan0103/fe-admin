import React, { useEffect, useState } from 'react';
import {
  Card,
  Table,
  Box,
  MenuItem,
  Dialog,
  TableContainer,
  TableHead,
  Typography,
  TableRow,
  TableCell,
  TableBody,
  Button,
  IconButton,
  TablePagination,
} from '@mui/material';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import {
  configOrderPending,
  configString,
  isImage,
  configFieldName,
  configCategories,
} from '../config/admin.config';
function CustomTableV2(props) {
  const { config, fieldName, type, handleDelete } = props;
  const [sort, setSort] = useState(false);
  const [id, setId] = useState();
  const [page, setPage] = useState(0);
  const [dialog, setDialog] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  console.log(props);
  // const [tmp, setTmp] = useState(useSelector(state => state));

  const temp = useSelector((state) => state);
  console.log(temp);
  const rows =
    temp['list' + (type + '').charAt(0).toLocaleUpperCase() + type.slice(1)];
  let t = [];
  const [data, setData] = useState([]);
  useEffect(() => {
    setData(rows.slice(rowsPerPage * page, rowsPerPage * (page + 1)));
  }, [rows]);
  const navigate = useNavigate();
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    setData(rows.slice(rowsPerPage * newPage, rowsPerPage * (newPage + 1)));
  };

  const handleChangeRowsPerPage = (event) => {
    const newRowPerPage = parseInt(event.target.value, 10);
    setRowsPerPage(newRowPerPage);
    setData(rows.slice(newRowPerPage * page, newRowPerPage * (page + 1)));
    setPage(0);
  };
  const handleSort = (e) => {
    const name = e.currentTarget.id;
    const temp = !sort
      ? rows
          .slice(rowsPerPage * page, rowsPerPage * (page + 1))
          .sort((a, b) => (a[name] + '').localeCompare(b[name]))
      : rows
          .slice(rowsPerPage * page, rowsPerPage * (page + 1))
          .sort((a, b) => (b[name] + '').localeCompare(a[name]));
    setData(temp);
    setSort(!sort);
  };
  const handleEdit = (e) => {
    navigate('/edit/' + 'book' + '/' + e.currentTarget.id);
  };
  const handleSubmit = () => {
    const newData = data.filter((item) => item.id != id);
    setData(newData);
    //call api here
    handleDelete(id);
    setDialog(false);
  };
  const tmp = data.length > 0 ? data : t;
  console.log(type, 'sdgsajh');
  // configOrderPending(tmp[0])
  return (
    <>
      <TableContainer>
        <Table>
          <TableHead sx={{ backgroundColor: 'rgb(239,239,239)' }}>
            <TableRow>
              <TableCell>
                <Typography fontFamily={'Roboto Slab'} fontWeight={900}>
                  STT
                </Typography>
              </TableCell>
              {fieldName.map((item, index) => (
                <TableCell key={index}>
                  <Box display={'flex'}>
                    <Typography fontFamily={'Roboto Slab'} fontWeight={900}>
                      {item}
                    </Typography>
                    <Button
                      sx={{ maxWidth: 5 }}
                      id={(item + '').toLowerCase()}
                      onClick={handleSort}
                      startIcon={
                        <CompareArrowsIcon
                          sx={{ transform: 'rotate(90deg)' }}
                        />
                      }
                    ></Button>
                  </Box>
                </TableCell>
              ))}

              <TableCell>
                <Box display={'flex'}>
                  <Typography fontFamily={'Roboto Slab'} fontWeight={900}>
                    Acion
                  </Typography>
                </Box>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody sx={{ overflowY: 'auto' }}>
            {data.map((item, index) => {
              console.log(item);
              return (
                <TableRow
                  key={index}
                  id={item._id}
                  className={item._id}
                  sx={{ cursor: 'pointer' }}
                >
                  <TableCell>{index + 1}</TableCell>
                  {fieldName.map((it, index) => (
                    <TableCell key={index} onClick={handleEdit} id={item.id}>
                      {!isImage(item[configFieldName(it + '')]) ? (
                        <Typography
                          fontFamily={'Roboto Slab'}
                          fontWeight={900}
                          whiteSpace="pre-wrap"
                        >
                          {typeof item[configFieldName(it + '')] !== 'object'
                            ? configString(item[configFieldName(it + '')])
                            : configCategories(item[configFieldName(it + '')])}
                        </Typography>
                      ) : (
                        <Box>
                          <img
                            src={item[configFieldName(it + '')]}
                            width={50}
                          />
                        </Box>
                      )}
                    </TableCell>
                  ))}

                  <TableCell>
                    <Box display={'flex'}>
                      <IconButton
                        disabled={!config.btnEdit}
                        onClick={handleEdit}
                        id={item.id}
                        sx={{
                          width: 40,
                          height: 40,
                          backgroundColor: 'rgb(47,223,132)',
                          color: 'white',
                          marginInline: 1,
                        }}
                      >
                        {type == 'orders' ? (
                          <CheckCircleIcon sx={{ fontSize: 15 }} />
                        ) : (
                          <EditOutlinedIcon sx={{ fontSize: 15 }} />
                        )}
                      </IconButton>
                      <IconButton
                        disabled={!config.btnDelete}
                        onClick={(e) => {
                          console.log(e.currentTarget.id);
                          setId(e.currentTarget.id);
                          setDialog(true);
                        }}
                        id={item.id}
                        sx={{
                          width: 40,
                          height: 40,
                          backgroundColor: 'rgb(255,19,0)',
                          color: 'white',
                        }}
                      >
                        <DeleteOutlineOutlinedIcon sx={{ fontSize: 15 }} />
                      </IconButton>
                    </Box>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        count={rows.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPageOptions={[5, 10, 15, 20, 25]}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <Dialog
        open={dialog}
        onClose={() => {
          setDialog(false);
        }}
      >
        <Box
          sx={{
            width: 500,
            backgroundColor: 'white',
            padding: 5,
          }}
        >
          <Typography
            fontFamily={'Roboto Slab'}
            fontSize={20}
            textAlign={'center'}
            textTransform={'uppercase'}
            paddingBottom={5}
            paragraph
          >
            Bạn có chắc chắn muốn xóa trường này ?
          </Typography>
          <Typography textAlign={'center'}>
            <ErrorOutlineIcon
              sx={{
                color: 'red',
                fontSize: 200,
              }}
            />
          </Typography>
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              paddingInline: '20%',
              justifyContent: 'space-around',
              marginTop: 5,
            }}
          >
            <Button
              onClick={handleSubmit}
              sx={{
                paddingInline: 4,
                backgroundColor: 'rgba(1,227,167,1)',
                color: 'white',
              }}
            >
              Yes
            </Button>
            <Button
              onClick={() => {
                setDialog(false);
              }}
              sx={{
                backgroundColor: 'rgba(40,0,128,1)',
                paddingInline: 3,
                color: 'white',
              }}
            >
              Cancel
            </Button>
          </Box>
        </Box>
      </Dialog>
    </>
  );
}

export default React.memo(CustomTableV2);
