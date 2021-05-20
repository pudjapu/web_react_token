import './App.css';

import React from 'react';
// import Leyout from './Componet/layout';

//// URL

import Home from './Componet/home';
import Bisection from './Componet/bisection_method';
import False_position from './Componet/false_position'
import OnePoint from './Componet/one-point_iteration'
import Newton from './Componet/Newton'
import Secant from './Componet/Secant'
import Cramer from './Componet/cramer_rule'
import Polynomial from './Componet/polynomial'
import Gauss_Elimination from './Componet/Gauss_Elimination'
import Gauss_jodan from './Componet/Gauss-Jodan'
import Lu_decomposition from './Componet/lu_decomposition'
import Jacobi_iteration from './Componet/Jacobi_iteration'
import Gauss_seidel from './Componet/Gauss_seidel'
import Conjugates from './Componet/Conjugate_gradient'
import Lagrang from './Componet/lagrange'
import Cubic from './Componet/Cubic_spline'
import Linear from './Componet/Linear_regression'
import Polynomial_regression from './Componet/Polynomial_regression'

import SW from './Componet/swagger'

//// layout

import { Route } from "react-router-dom";
import { HashRouter } from 'react-router-dom';
import { Link } from "react-router-dom";

import { Layout, Menu} from 'antd';
import {
  DesktopOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';

const { Header, Content, Sider } = Layout;
const { SubMenu } = Menu;

class App extends React.Component {

  state = {
    collapsed: true,
    at_cack: <Home/>
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  state = {
    collapsed: false,
  };

  onCollapse = collapsed => {
    this.setState({ collapsed });
  };

  render(){

    const { collapsed } = this.state;

    return(
      <HashRouter>
      <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={this.onCollapse}>
        <div className="logo" />
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
          <Menu.Item key="1" icon={<DesktopOutlined/>} style={{marginTop: '64px'}}><Link to='/'>Home</Link></Menu.Item>
          <SubMenu key="sub1" icon={<UserOutlined />} title="Roots of equation">
            <Menu.Item key="2"><Link to='/Bisection'>Bisection</Link></Menu.Item>
            <Menu.Item key="3"><Link to='/False_position'>False position</Link></Menu.Item>
            <Menu.Item key="4"><Link to='/OnePoint'>One-point iteration</Link></Menu.Item>
            <Menu.Item key="5"><Link to='/Newton'>Newton Raphson</Link></Menu.Item>
            <Menu.Item key="6"><Link to='/Secant'>Secant</Link></Menu.Item>
          </SubMenu>
          <SubMenu key="sub2" icon={<TeamOutlined />} title="Matrix">
            <Menu.Item key="7"><Link to='/cramer_rule'>Cramer</Link></Menu.Item>
            <Menu.Item key="8"><Link to='/Gauss_Elimination'>Gauss Elimination</Link></Menu.Item>
            <Menu.Item key="9"><Link to='/Gauss_jodan'>Gauss Jodan</Link></Menu.Item>
            <Menu.Item key="10"><Link to='/lu_de'>Lu decomposition</Link></Menu.Item>
            <Menu.Item key="11"><Link to='/jacobi_iter'>Jacobi iteration</Link></Menu.Item>
            <Menu.Item key="12"><Link to='/gauss-seidel_iter'>Gauss-seidel iteration</Link></Menu.Item>
            <Menu.Item key="13"><Link to='/conjugate'>Conjugate gradient</Link></Menu.Item>
          </SubMenu>
          <SubMenu key="sub3" icon={<TeamOutlined />} title="Interpolation">
            <Menu.Item key="14"><Link to='/polynomial'>Newton Interpolation</Link></Menu.Item>
            <Menu.Item key="15"><Link to='/lagrang'>Lagrang interpolation</Link></Menu.Item>
            <Menu.Item key="16"><Link to='/Cubic'>Cubic-spline</Link></Menu.Item>
            <Menu.Item key="17"><Link to='/Linear'>Linear regression</Link></Menu.Item>
            <Menu.Item key="18"><Link to='/Polynomial-regression'>Polynomial regression</Link></Menu.Item>
          </SubMenu>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }} />
        <Content style={{ margin: '0 16px' ,marginTop: '20px', textAlign: 'center'}}>
              <Route exact path='/' component={Home}></Route>
              <Route path='/Bisection' component={Bisection}></Route>
              <Route path='/False_position' component={False_position}></Route>
              <Route path='/OnePoint' component={OnePoint}></Route>
              <Route path='/Newton' component={Newton}></Route>
              <Route path='/Secant' component={Secant}></Route>
              <Route path='/cramer_rule' component={Cramer}></Route>
              <Route path='/Gauss_Elimination' component={Gauss_Elimination}></Route>
              <Route path='/Gauss_jodan' component={Gauss_jodan}></Route>
              <Route path='/lu_de' component={Lu_decomposition}></Route>
              <Route path='/jacobi_iter' component={Jacobi_iteration}></Route>
              <Route path='/gauss-seidel_iter' component={Gauss_seidel}></Route>
              <Route path='/conjugate' component={Conjugates}></Route>
              <Route path='/polynomial' component={Polynomial}></Route>
              <Route path='/Cubic' component={Cubic}></Route>
              <Route path='/lagrang' component={Lagrang}></Route>
              <Route path='/Linear' component={Linear}></Route>
              <Route path='/SW' component={SW}></Route>
              <Route path='/Polynomial-regression' component={Polynomial_regression}></Route>
        </Content>
      </Layout>
    </Layout>
    </HashRouter>
    );
  }
  
}

export default App;
