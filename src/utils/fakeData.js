import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import EngineeringOutlinedIcon from '@mui/icons-material/EngineeringOutlined';
import FastfoodOutlinedIcon from '@mui/icons-material/FastfoodOutlined';
import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined';
import TableRestaurantOutlinedIcon from '@mui/icons-material/TableRestaurantOutlined';
import EventNoteOutlinedIcon from '@mui/icons-material/EventNoteOutlined';
import { faker } from '@faker-js/faker';
export const nav = [
  {
    id: 1,
    name: 'Trang chủ',
    url: '/',
    icon: <HomeOutlinedIcon />,
  },
  {
    id: 2,
    name: 'Sách',
    url: '/manage/books',
    icon: <EngineeringOutlinedIcon />,
  },
  {
    id: 3,
    name: 'Thêm sách',
    url: '/add/book',
  },
  {
    id: 7,
    url: '/edit',
    name: 'Chỉnh sửa',
  },
];

export const content = [
  {
    name: 'Sách',
    img: '../../img/enginee.png',
    quantity: 2000,
  },
  {
    name: 'Nhân viên',
    img: '../../img/cooking.png',
    quantity: 2000,
  },
  {
    name: 'Người dùng',
    img: '../../img/table.png',
    quantity: 2000,
  },
  {
    name: 'Tổng doanh thu',
    img: '../../img/income.png',
    quantity: 200000000,
  },
];

export const rows = [
  {
    name: faker.name.findName(),
    id: 1,
    sex: 'Male',
    address: '66 Van Phuc Ha Dong',
    birth: new Date(2001, 7, 20).toDateString(),
    phone: '0335202836',
    email: 'longthan366@gmail.com',
  },
  {
    name: faker.name.findName(),
    id: 2,
    sex: 'Male',
    address: '66 Van Phuc Ha Dong',
    birth: new Date(2001, 7, 20).toDateString(),
    phone: '0335202836',
    email: 'longthan366@gmail.com',
  },
  {
    name: faker.name.findName(),
    id: 3,
    sex: 'Male',
    address: '66 Van Phuc Ha Dong',
    birth: new Date(2001, 7, 20).toDateString(),
    phone: '0335202836',
    email: 'longthan366@gmail.com',
  },
  {
    name: faker.name.findName(),
    id: 4,
    sex: 'Male',
    address: '66 Van Phuc Ha Dong',
    birth: new Date(2001, 7, 20).toDateString(),
    phone: '0335202836',
    email: 'longthan366@gmail.com',
  },
  {
    name: faker.name.findName(),
    id: 5,
    sex: 'Male',
    address: '66 Van Phuc Ha Dong',
    birth: new Date(2001, 7, 20).toDateString(),
    phone: '0335202836',
    email: 'longthan366@gmail.com',
  },
  {
    name: faker.name.findName(),
    id: 6,
    sex: 'Male',
    address: '66 Van Phuc Ha Dong',
    birth: new Date(2001, 7, 20).toDateString(),
    phone: '0335202836',
    email: 'longthan366@gmail.com',
  },
  {
    name: faker.name.findName(),
    id: 7,
    sex: 'Male',
    address: '66 Van Phuc Ha Dong',
    birth: new Date(2001, 7, 20).toDateString(),
    phone: '0335202836',
    email: 'longthan366@gmail.com',
  },
  {
    name: faker.name.findName(),
    id: 8,
    sex: 'Male',
    address: '66 Van Phuc Ha Dong',
    birth: new Date(2001, 7, 20).toDateString(),
    phone: '0335202836',
    email: 'longthan366@gmail.com',
  },
  {
    name: faker.name.findName(),
    id: 9,
    sex: 'Male',
    address: '66 Van Phuc Ha Dong',
    birth: new Date(2001, 7, 20).toDateString(),
    phone: '0335202836',
    email: 'longthan366@gmail.com',
  },
  {
    name: faker.name.findName(),
    id: 10,
    sex: 'Male',
    address: '66 Van Phuc Ha Dong',
    birth: new Date(2001, 7, 20).toDateString(),
    phone: '0335202836',
    email: 'longthan366@gmail.com',
  },
  {
    name: faker.name.findName(),
    id: 11,
    sex: 'Male',
    address: '66 Van Phuc Ha Dong',
    birth: new Date(2001, 7, 20).toDateString(),
    phone: '0335202836',
    email: 'longthan366@gmail.com',
  },
  {
    name: faker.name.findName(),
    id: 12,
    sex: 'Male',
    address: '66 Van Phuc Ha Dong',
    birth: new Date(2001, 7, 20).toDateString(),
    phone: '0335202836',
    email: 'longthan366@gmail.com',
  },
  {
    name: faker.name.findName(),
    id: 13,
    sex: 'Male',
    address: '66 Van Phuc Ha Dong',
    birth: new Date(2001, 7, 20).toDateString(),
    phone: '0335202836',
    email: 'longthan366@gmail.com',
  },
  {
    name: faker.name.findName(),
    id: 14,
    sex: 'Male',
    address: '66 Van Phuc Ha Dong',
    birth: new Date(2001, 7, 20).toDateString(),
    phone: '0335202836',
    email: 'longthan366@gmail.com',
  },
  {
    name: faker.name.findName(),
    id: 15,
    sex: 'Male',
    address: '66 Van Phuc Ha Dong',
    birth: new Date(2001, 7, 20).toDateString(),
    phone: '0335202836',
    email: 'longthan366@gmail.com',
  },
];
