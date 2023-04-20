import React, { useEffect, useState } from 'react';
import { Card, Box, Button, IconButton } from '@mui/material';
import DefaultInput from '../components/DefaultInput';
import MultipleSelectChip from '../components/MultipleSelect';
import { Backdrop, Dialog, Typography } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';
import AdminContainer from '../service/AdminContainer.service';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import CircularProgress from '@mui/material/CircularProgress';
import { useNavigate, useParams } from 'react-router-dom';
import { configDate } from '../config/admin.config';
function AddPageV2() {
  const param = useParams();
  console.log(param);
  const navigate = useNavigate();
  const [imgPrev, setImgPrev] = useState();
  const [files, setFiles] = useState();
  const service = new AdminContainer();
  const [categories, setCategories] = useState([]);
  const [open, setOpen] = useState(false);
  const [dt, setDt] = useState({ categories: [] });
  const [dialog, setDialog] = useState(false);
  const [rsApi, setRsApi] = useState();
  const [obj, setObj] = useState({});
  const [categorySelected, setCategorySelected] = useState([]);
  const handleChange = (e) => {
    const name = e.target.id;
    const value = e.target.value;
    if (e.target.name === 'category') {
      setDt({
        ...dt,
        ['categories']: [
          ...dt['categories'],
          { ['title']: value[value.length - 1] },
        ],
      });
    } else {
      setDt({ ...dt, [name]: value });
    }
  };

  const callAPI = React.useCallback(async () => {
    if (param['id'] && param['id'] != 'book') {
      await service.getById('book/get' + '/' + param['id']).then((res) => {
        setObj(res.data);
        const tt = Object.keys(res.data);
        convertData(tt, res.data);
        setImgPrev(res.data?.imgUrl);
      });
    }
    setOpen(true);
    await service.getAllCategory().then((res) => {
      setCategories(res);
    });
    setOpen(false);
  }, []);

  useEffect(() => {
    callAPI();
  }, []);

  const convertData = (data, obj) => {
    let t = {};
    let temp = [];
    data.map((key) => {
      t = { ...t, [key]: obj[key] };
      if (key === 'categories') {
        obj[key].map((category) => {
          temp.push(category?.title);
          console.log(category);
        });
      }
    });
    setCategorySelected(temp);
    setDt(t);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!files && !imgPrev) {
      setRsApi({ data: 'Vui lòng chọn ảnh', errorCode: '400' });
      setDialog(true);
      return;
    } else if (
      files?.type !== 'image/jpeg' &&
      files?.type != 'image/png' &&
      !imgPrev
    ) {
      setRsApi({ data: 'File ảnh không hợp lệ!!', errorCode: '400' });
      setDialog(true);
      return;
    }
    setOpen(true);
    if (param['id'] && param['id'] != 'book') {
      var formData = new FormData();

      dt.publishDate = dt.publishedDate;

      const { publishedDate, updateAt, ...rest } = dt;

      dt.categories.map((category) => {
        delete category.publishedDate;
      });

      const json = JSON.stringify(rest);
      formData.append('file', files);
      formData.append('data', json);

      service
        .update('book', formData)
        .then((res) => {
          setRsApi(res.data);
          setOpen(false);
          setDialog(true);
          return res.data?.errorCode;
        })
        .then((code) => {
          if (code != '404')
            setTimeout(() => {
              navigate('/manage/books');
            }, 2000);
        });
    } else {
      var formData = new FormData();
      const json = JSON.stringify(dt);
      formData.append('file', files);
      formData.append('data', json);
      await service
        .create('book/save', formData)
        .then((res) => {
          // console.log(res);
          setRsApi(res);
          setOpen(false);
          setDialog(true);
          return res.data?.errorCode;
        })
        .then((code) => {
          if (code != '404')
            setTimeout(() => {
              navigate('/manage/books');
            }, 2000);
        });
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    onDrop: (acceptedFiles) => {
      const objectUrl = URL.createObjectURL(acceptedFiles[0]);
      setFiles(acceptedFiles[0]);
      setImgPrev(objectUrl);
    },
  });

  return (
    <Card
      sx={{
        width: '100%',
        height: 'auto',
        marginTop: 5,
        borderWidth: 1,
        borderStyle: 'solid',
        borderRadius: 2,
        borderColor: 'rgb(213,219,225)',
        paddingInline: 2,
        paddingBlock: 3,
      }}
    >
      <form>
        <Box sx={{ width: '100%', display: 'flex' }}>
          <Box sx={{ width: '65%' }}>
            <DefaultInput
              id={'name'}
              name={'Tên sách'}
              disabled={true}
              data={dt?.name}
              handleChange={handleChange}
            />
            <DefaultInput
              id={'author'}
              name={'Tác giả'}
              disabled={true}
              data={dt?.author}
              handleChange={handleChange}
            />
            <DefaultInput
              id={'company'}
              name={'Nhà xuất bản'}
              disabled={true}
              data={dt?.company}
              handleChange={handleChange}
            />
            <DefaultInput
              id={'pageCount'}
              name={'Số trang'}
              type={'number'}
              disabled={true}
              data={dt?.pageCount}
              handleChange={handleChange}
            />
            <DefaultInput
              id={'price'}
              name={'Giá tiền'}
              type={'number'}
              disabled={true}
              data={dt?.price}
              handleChange={handleChange}
            />
          </Box>
          <Box
            sx={{
              width: '28%',
              borderStyle: 'dashed',
              borderRadius: 5,
              borderColor: '#3333',
              padding: 5,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              marginLeft: 6,
            }}
          >
            {imgPrev ? (
              <Box
                sx={{
                  width: '100%',
                  position: 'relative',
                }}
              >
                <Box
                  sx={{
                    borderRadius: 3,
                    overflow: 'hidden',
                    width: '100%',
                    maxHeight: 250,
                    marginRight: 3,
                  }}
                >
                  <img
                    width={'100%'}
                    src={imgPrev}
                    alt={'img'}
                    style={{ objectFit: 'cover', objectPosition: 'center' }}
                  />
                </Box>

                <IconButton
                  sx={{
                    width: '15%',
                    position: 'absolute',
                    top: -15,
                    right: -15,
                  }}
                  onClick={() => {
                    setImgPrev();
                  }}
                >
                  {localStorage.getItem('USER_KEY') ? (
                    <HighlightOffOutlinedIcon sx={{ color: 'black' }} />
                  ) : (
                    <></>
                  )}
                </IconButton>
              </Box>
            ) : (
              <IconButton
                variant="outline"
                sx={{ width: '100%', height: '100%', padding: 10 }}
                {...getRootProps({ className: 'dropzone' })}
              >
                <input
                  hidden
                  {...getRootProps({ className: 'dropzone' })}
                  required
                />
                <CloudUploadIcon sx={{ width: '100%', height: '100%' }} />
              </IconButton>
            )}
          </Box>
        </Box>
        <Box>
          <DefaultInput
            id={'description'}
            name={'Mô tả'}
            disabled={true}
            multiline={true}
            rows={5}
            data={dt?.description}
            handleChange={handleChange}
          />
          <MultipleSelectChip
            id={'categories'}
            data={categories}
            selected={categorySelected}
            handleChange={handleChange}
          />
          <DefaultInput
            id={'publishDate'}
            name={'Ngày xuất bản'}
            disabled={true}
            data={dt?.publishedDate}
            handleChange={handleChange}
            type={'date'}
          />
        </Box>
        {localStorage.getItem('USER_KEY') ? (
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              paddingInline: '35%',
              justifyContent: 'space-around',
              marginTop: 6,
            }}
          >
            <Button
              onClick={handleSubmit}
              // type={"submit"}
              sx={{
                paddingInline: 3,
                backgroundColor: 'rgba(1,227,167,1)',
                color: 'white',
              }}
            >
              Submit
            </Button>
            <Button
              sx={{
                backgroundColor: 'rgba(40,0,128,1)',
                paddingInline: 3,
                color: 'white',
              }}
            >
              Cancel
            </Button>
          </Box>
        ) : (
          <></>
        )}
      </form>
      <Backdrop sx={{ color: '#fff', zIndex: 100 }} open={open}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Dialog
        open={dialog}
        onClose={() => {
          setDialog(false);
          console.log(rsApi);
          if (rsApi?.errorCode == '200') {
            navigate('/manage/books');
          }
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
            {rsApi?.data}
          </Typography>
          <Typography textAlign={'center'}>
            {rsApi?.errorCode === '200' ? (
              <CheckCircleOutlineIcon
                sx={{
                  color: 'green',
                  fontSize: 200,
                }}
              />
            ) : (
              <ErrorOutlineIcon
                sx={{
                  color: 'red',
                  fontSize: 200,
                }}
              />
            )}
          </Typography>
        </Box>
      </Dialog>
    </Card>
  );
}

export default AddPageV2;
