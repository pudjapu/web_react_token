import React from 'react';
import { Input } from 'antd';
import { Button } from 'antd';

import { LineChart, Line, CartesianGrid, XAxis, YAxis } from 'recharts';

import { bisection } from './Source/bisection'
import axios from 'axios'
import '../css/bisecton.css';

const apiUrl = "http://localhost:4040"
// let apiUrl = "https://my-json-server.typicode.com/pudjapu/react_wep/root"

class Bisection extends React.Component{
    
    state = {
        Equation: '',
        XL: '',
        XR: '',
        ERROR: '',
        result: '',
        Chart: ''
      };

    async gatdata() { // ฟังชั้นเรียก api
        try {

            // axios.interceptors.request.use(
            //     config => {
            //       const { origin } = new URL(config.url);
            //       const allowedOrigins = [apiUrl];
            //       const token = localStorage.getItem('token');
            //       if (allowedOrigins.includes(origin)) {
            //         config.headers.authorization = `Bearer ${token}`;
            //       }
            //       return config;
            //     },
            //     error => {
            //       return Promise.reject(error);
            //     }
            //   );

            const data_api = await axios.post(`${apiUrl}/jwt`);
            localStorage.setItem('token', data_api.data["token"]);

            const data = await axios.post(`${apiUrl}/data/root/Bisection`).then(res => (
                res.data
            ));

            
            this.setState({Equation: data["eqtion"],XL: data["xl"],XR: data["xr"],ERROR: data["error"]})

          } catch (error) {
            this.setState({result : "Not Sync"})
          }

    }

    getdata_ = (e) => {
        this.gatdata();
    }

    getEquation = (e) => {
        this.setState({
            Equation: e.target.value,
        });
    };

    getXL = (e) => {
        this.setState({
            XL: e.target.value,
        });
    };

    getXR = (e) => {
        this.setState({
            XR: e.target.value,
        });
    };

    getERR= (e) => {
        this.setState({
            ERROR: e.target.value,
        });
    };

    show_value = (e) =>{
        try{
            const Parser = require('expr-eval').Parser;
            let Equation = this.state.Equation;

            var expression = Parser.parse(Equation);

            let data = bisection(this.state.XL,this.state.XR,this.state.ERROR,this.state.Equation);

            let i;
            let arr = [];

            let Chart = [];

            for(i = 0; i < data.length;i++){
                arr.push(<div className='result' key={i}>Iteration {i+1} : {data[i][0]}</div>);
            }

            for(i = parseFloat(this.state.XL)-0.1;i <= parseFloat(this.state.XR)+0.1;i=i+0.1){
                let P_X = expression.evaluate({ x: i })

                Chart.push({fx: P_X,y: 0,x: i.toFixed(2)})
            }

            this.setState({result: arr,Chart: Chart});
        } catch(error) {
            this.setState({result : "No data"})
        }
        
    }

    render(){

        return(
            <div className="allinbisetion" >
                <div className="in_box">
                    <h2>Bisection Method</h2>
                    <div>
                        <span><Input onChange={this.getEquation} className="Input" value={this.state.Equation} /></span>
                        <span className="Calculate_Button"><Button type="primary" onClick={this.show_value} >Calculate</Button></span>
                        <span className="Calculate_Button"><Button type="primary" onClick={this.getdata_} >Get example</Button></span>
                    </div>
                    <div>
                        <span className="Text_Input_2"> XL : </span>
                        <span><Input onChange={this.getXL} className="Input_2" value={this.state.XL}/></span>
                        <span className="Text_Input_2"> XR : </span>
                        <span><Input onChange={this.getXR} className="Input_2"  value={this.state.XR} /></span>
                        <span className="Text_Input_2"> ERROR : </span>
                        <span><Input onChange={this.getERR} className="Input_2" value={this.state.ERROR}/></span>
                    </div>
                    {this.state.result}
                    <div className='Chart'>
                    <LineChart width={1200} height={300} data={this.state.Chart} margin={{ top: 5, right: 20, bottom: 5, left: 400 }}>
                    <Line type="monotone" dataKey="fx" stroke="#FF0000" dot={false}/>
                    <Line type="monotone" dataKey="y" stroke="#0000FF" dot={false}/>
                    <CartesianGrid stroke="#ccc" />
                    <XAxis dataKey="x" />
                    <YAxis />
                    </LineChart>
                </div>
                </div>
            </div>

        );
    }
}
export default Bisection