import React from 'react'
import {Matrix} from './Source/Matrix'
import {Jacobi} from './Source/Jacobi_iteration'

import { Input } from 'antd';

import { Button } from 'antd'

import axios from 'axios'
let apiUrl = "http://localhost:4040"

class Jacobi_iteration extends React.Component{

    state = {
        rows: 2,
        columns: 2,
        Matrix: [[],[]],
        X: [],
        ERROR: ''
    }

    async gatdata() { // ฟังชั้นเรียก api
        try {

            const data_api = await axios.post(`${apiUrl}/jwt`);
            localStorage.setItem('token', data_api.data["token"]);

            const data = await axios.post(`${apiUrl}/data/matrix/Jacobi_iteration`).then(e => (
                e.data
            ))
            
            let row = data["row"];

            if(row > parseInt(this.state.rows)){
                let r = parseInt(this.state.rows);
                for(let i = r;i < row;i++){
                    this.AddMatrix();
                }
            }
            else{
                let r = parseInt(this.state.rows);
                for(let i = r;i > row;i--){
                    this.DelMatrix();
                }
            }
                
            this.setState({Matrix: data["Matrix"],ERROR: data["error"]})

          } catch (error) {
            this.setState({result : "Not Sync"})
          }

    }

    getdata_ = (e) => {
        this.gatdata();
    }

    Input = (e) =>{
        let arr = [];
        let Matrix = this.state.Matrix;
        arr = e.target.name.split(',');
        Matrix[parseInt(arr[0])][parseInt(arr[1])] = e.target.value;
        this.setState({Matrix: Matrix})
    }
    
    AddMatrix = (e) =>{
        let Matrix = this.state.Matrix;
        Matrix.push([]);
        this.setState({Matrix: Matrix})
        this.setState({rows: this.state.rows+1})
    }

    getERR= (e) => {
        this.setState({
            ERROR: e.target.value,
        });
    };

    DelMatrix = (e) =>{
        if(this.state.rows > 2){
            let i;
            this.setState({rows: this.state.rows-1})
            let Matrix = this.state.Matrix;
            Matrix.pop();
            for(i = 0;i < Matrix.length;i++){
                Matrix[i].pop();
            }
            this.setState({Matrix: Matrix})
        }
        
    }

    Calculate = (e) =>{
        let temp = this.state.Matrix;

        // copy array
        let Matrix = [];
        for (let i = 0; i < temp.length; i++)
            Matrix[i] = temp[i].slice();

        let a =[];
        let b = [];
        let x = [];
        let error_ = [];

        for(let i=0;i< Matrix.length;i++){
            b.push(Matrix[i][Matrix.length])
            b[i] = parseFloat(b[i])
            a.push(Matrix[i])
            a[i].pop()
            for(let j = 0;j < Matrix.length;j++){
                a[i][j] = parseFloat(a[i][j])
            }
            x.push(1);
            error_.push(9999);
        }

        let answer = Jacobi(a,b,x,error_,parseFloat(this.state.ERROR))

        this.setState({X: answer})


    }

    render(){
        return(
            <div className='allincompro'>
                <h2>Jacobi iteration</h2>
                <Button className='Button_' type="primary" onClick={this.AddMatrix}>Add row/column</Button>
                <Button className='Button_' type="primary" onClick={this.DelMatrix}>Delete row/column</Button>
                <Button className='Button_' type="primary" onClick={this.Calculate}>Calculate</Button>
                <Button type="primary" onClick={this.getdata_} >Get example</Button>
                <div>
                    <span className="Text_Input_2"> ERROR : </span>
                    <span><Input onChange={this.getERR} className="Input_2" value={this.state.ERROR}/></span>
                </div>
                <Matrix row={this.state.rows} onChange={this.Input} value={this.state.Matrix}/>
                <div>{this.state.X}</div>
            </div>
        );
    }
}

export default Jacobi_iteration