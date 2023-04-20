import React, { useCallback, useEffect, useRef } from 'react';
import { Bar, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  LineElement,
} from 'chart.js';
import {
  Box,
  Card,
  Backdrop,
  CircularProgress,
  Typography,
  Snackbar,
} from '@mui/material';
import CardContent from '../components/CardContent';
import { content } from '../utils/fakeData';
import { useDispatch, useSelector } from 'react-redux';
import CustomTable from '../components/CustomTable';
import { fieldName } from '../config/table.config';
import { editable } from '../config/attr-config-editable.config';
import { over } from 'stompjs';
import SockJS from 'sockjs-client';
import { setCountNotifi, setOrderPending } from '../store/Module.action';
import AdmniContainer from '../service/AdminContainer.service';
import { useNavigate } from 'react-router-dom';
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);
function HomePage() {
  const user = localStorage.getItem('USER_KEY');
  const navigate = useNavigate();
  useEffect(() => {
    if (!user) navigate('/login');
  }, []);

  const labels = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
  ];
  const data1 = [100, 200, 300, 400, 900, 700, 600, 200, 800, 100];
  const data2 = [700, 200, 500, 400, 100, 100, 400, 900, 700, 500];
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      subtitle: {
        display: true,
        text: 'Custom Chart Subtitle',
      },
    },
    tooltip: {
      enabled: true,
    },
    interaction: {
      mode: 'nearest',
    },
  };
  const data = {
    labels,
    datasets: [
      {
        label: 'Năm 2021',
        data: data1,
        borderColor: 'rgba(1,227,167,1)',
        backgroundColor: 'rgba(1,227,167,1)',
      },
      // {
      //     label: 'Năm 2022',
      //     data: data2,
      //     borderColor: 'rgba(40,0,128,1)',
      //     backgroundColor: 'rgba(40,0,128,1)',
      // },
    ],
  };
  const dispatch = useDispatch();
  const service = new AdmniContainer();
  const listOrders = useRef([]);
  const [backDrop, setBackDrop] = React.useState(false);

  // const
  const [open, setOpen] = React.useState(false);
  const callAPI = useCallback(async () => {
    setBackDrop(true);
    await service.get('order/order/get').then((res) => {
      // console.log(res);
      listOrders.current = res;
      dispatch(setOrderPending(res));
    });
    setBackDrop(false);
  }, []);
  useEffect(() => {
    // const sockjs = new SockJS('http://192.168.0.102:8080/websocket');
    // let stompjs = over(sockjs);
    // stompjs.connect(
    //   {},
    //   () => {
    //     stompjs.subscribe('/topic/greetings', (payload) => {
    //       const data = JSON.parse(payload.body);
    //       setOpen(true);
    //       dispatch(setOrderPending([data, ...listOrders.current]));
    //       dispatch(setCountNotifi());
    //     });
    //     stompjs.send('/app/hello', {}, 'longtv');
    //   },

    //   (e) => {
    //     console.log(e);
    //   },
    // );

    callAPI();
  }, []);
  return (
    <>
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: 5,
        }}
      >
        {content.map((item, index) => (
          <CardContent data={item} key={index} />
        ))}
      </Box>
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: 5,
        }}
      >
        <Card width={'100%'} sx={{ padding: 5 }}>
          <Box
            sx={{
              width: 200,
              display: 'flex',
              justifyContent: 'space-around',
              alignItems: 'center',
              marginBottom: 2,
            }}
          >
            <Box
              sx={{
                width: 3,
                height: 30,
                background:
                  'linear-gradient(180deg, rgba(1,227,167,1) 0%, rgba(9,9,121,1) 100%, rgba(40,0,128,1) 100%)',
              }}
            />
            <Typography fontFamily={'Roboto Slab'} fontWeight={900}>
              Doanh thu theo tháng
            </Typography>
          </Box>
          <Box width={'100%'} height={'1px'} bgcolor={'rgb(213,219,225)'} />
          <Bar
            options={options}
            data={data}
            style={{ width: 520, height: 800 }}
          />
        </Card>
        <Card width={'100%'} sx={{ padding: 5 }}>
          <Box
            sx={{
              width: 200,
              display: 'flex',
              justifyContent: 'space-around',
              alignItems: 'center',
              marginBottom: 2,
            }}
          >
            <Box
              sx={{
                width: 3,
                height: 30,
                background:
                  'linear-gradient(180deg, rgba(1,227,167,1) 0%, rgba(9,9,121,1) 100%, rgba(40,0,128,1) 100%)',
              }}
            />
            <Typography fontFamily={'Roboto Slab'} fontWeight={900}>
              Thống kê sách thể loại
            </Typography>
          </Box>
          <Box width={'100%'} height={'1px'} bgcolor={'rgb(213,219,225)'} />
          <Line
            options={options}
            data={data}
            style={{ width: 500, height: 500 }}
          />
        </Card>
      </Box>
      <Card width={'100%'} sx={{ padding: 5 }}>
        <Box
          sx={{
            width: 200,
            display: 'flex',
            justifyContent: 'space-around',
            alignItems: 'center',
            marginBottom: 2,
          }}
        >
          <Box
            sx={{
              width: 3,
              height: 30,
              background:
                'linear-gradient(180deg, rgba(1,227,167,1) 0%, rgba(9,9,121,1) 100%, rgba(40,0,128,1) 100%)',
            }}
          />
          <Typography fontFamily={'Roboto Slab'} fontWeight={900}>
            Đơn sách
          </Typography>
        </Box>
        <Box width={'100%'} height={'1px'} bgcolor={'rgb(213,219,225)'} />
        <CustomTable
          config={editable}
          fieldName={fieldName.order}
          type={'orders'}
        />

        <Backdrop sx={{ color: '#fff', zIndex: 100 }} open={backDrop}>
          <CircularProgress color="inherit" />
        </Backdrop>
      </Card>
    </>
  );
}

export default HomePage;
