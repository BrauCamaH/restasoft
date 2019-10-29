import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import UserContext from '../../../context/user-context';

import { MainLayout } from '../../layouts';
import axios from 'axios';
export default function withAuth(ComponentToProtect) {
  return class extends Component {
    static contextType = UserContext;
    constructor() {
      super();
      this.state = {
        loading: true,
        redirect: false,
      };
    }
    componentDidMount() {
      axios
        .get('/api/users/checkToken')
        .then(res => {
          if (res.status === 200) {
            this.setState({ loading: false });
            //console.log(res.data.user.userId);
            this.context.setUserId(res.data.user.userId);
          } else {
            const error = new Error(res.error);
            throw error;
          }
        })
        .catch(err => {
          console.error(err);
          this.setState({ loading: false, redirect: true });
        });
    }
    render() {
      const { loading, redirect } = this.state;

      if (redirect) {
        return <Redirect to='/sign-in' />;
      } else {
        if (loading) {
          return <MainLayout></MainLayout>;
        }
      }
      return (
        <React.Fragment>
          <ComponentToProtect {...this.props} />
        </React.Fragment>
      );
    }
  };
}
