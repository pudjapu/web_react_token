import React from 'react'
import '../css/Gauss_jodan.css'
import {Matrix} from './Source/Matrix'
import {Gauss_jodan} from './Source/Gauss_jodan'

import { Button } from 'antd'
import axios from 'axios'
let apiUrl = "http://localhost:4040"

class Gauss_Elimination extends React.Component{

    state = {
        rows: 2,
        Matrix: [[],[]],
        X: [],
    }

    async gatdata() { // ฟังชั้นเรียก api
        try {

            const data_api = await axios.post(`${apiUrl}/jwt`);
            localStorage.setItem('token', data_api.data["token"]);

            const data = await axios.post(`${apiUrl}/data/matrix/Gauss_Jodan`).then(e => (
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
                
            this.setState({Matrix: data["Matrix"]})

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
        let answer = Gauss_jodan(this.state.Matrix)
        let data = [];
        for(let i =0;i < answer.length;i++){
            data.push(<div key={i}>X{i+1} : {answer[i]}</div>)
        }
        this.setState({X: data})
    }

    render(){
        return(
            <div className='allincompro'>
                <h2>Gauss Jodan</h2>
                <Button className='Button_' type="primary" onClick={this.AddMatrix}>Add row/column</Button>
                <Button className='Button_' type="primary" onClick={this.DelMatrix}>Delete row/column</Button>
                <Button className='Button_' type="primary" onClick={this.Calculate}>Calculate</Button>
                <Button type="primary" onClick={this.getdata_} >Get example</Button>
                <Matrix row={this.state.rows} onChange={this.Input} value={this.state.Matrix}/>
                <div>{this.state.X}</div>

            </div>
            
        )
    }
}

export default Gauss_Elimination