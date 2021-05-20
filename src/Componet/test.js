import React from 'react';
const axios = require('axios');


let apiUrl = "http://localhost:4040/root"

class test extends React.Component{
    
    state = {
        item: [],
    }

    showData = (e) => {
        console.log(this.state.item)
    };

    async componentDidMount() {
        let response = await fetch(apiUrl);
        let data = await response.json();
        this.setState({item: data[0]})
    }

    render(){
        return(
            <div>
                <button onClick={this.showData}>XD</button>
            </div>
        )
        
    }
}

export default test