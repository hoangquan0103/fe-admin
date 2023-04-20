import React, { Component } from 'react';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
axios.defaults.withCredentials = true;
class AdminContainer extends Component {
  constructor(props) {
    super(props);
    // const url = 'https://open-years-clean-123-16-75-187.loca.lt/api/';
    const url = 'http://localhost:8080/api/';
    // const url = 'http://192.168.1.6:8080/api/';
    this.apiUrl = url;
    this.axiosJwt = axios.create();
    this.axiosJwtSave = axios.create();
    this.axiosJwt.interceptors.request.use(
      async (config) => {
        let date = new Date();
        const decodedToken = jwt_decode(localStorage.getItem('USER_KEY'));

        if (decodedToken.exp < date.getTime() / 1000) {
          const data = await this.refreshToken();
          // console.log(data);
          this.state = {
            token: data.data.access_token,
          };
          config.headers['Authorization'] =
            'Bearer ' + data?.data?.access_token;
        } else {
          config.headers['Authorization'] =
            'Bearer ' + localStorage.getItem('USER_KEY');
          // console.log('Bearer ' + localStorage.getItem('USER_KEY'));
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      },
    );
  }

  async get(url) {
    const rs = await this.axiosJwt.get(this.apiUrl + url);

    return rs.data;
  }

  async update(url, data) {
    const rs = await this.axiosJwt.put(this.apiUrl + url + '/update', data);
    return rs;
  }

  async getById(url) {
    const rs = await axios.get(this.apiUrl + url);
    return rs.data;
  }

  async delete(url, data) {
    const rs = await this.axiosJwt.delete(this.apiUrl + url, data);
    return rs;
  }

  async create(url, data) {
    const rs = await this.axiosJwt.post(this.apiUrl + url, data, {
      headers: {
        Accept: 'application/json ,text/plain, */*',
        'Content-Type': 'multipart/form-data',
      },
    });
    return rs.data;
  }

  async getAllCategory() {
    const rs = await axios.get(this.apiUrl + 'category/get');
    return rs.data;
  }

  async refreshToken() {
    const data = await this.axiosJwt.post(this.apiUrl + 'refresh');
    return data;
  }
}
export default AdminContainer;
