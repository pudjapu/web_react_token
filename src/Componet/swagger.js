import React from 'react';

import SwaggerUI from 'swagger-ui-react'
import 'swagger-ui-react/swagger-ui.css'
import { data } from './Source/swagger'

class swagger extends React.Component{
    render(){
        return(
            <div><SwaggerUI spec={data} /></div>
        );
    }
}
export default swagger