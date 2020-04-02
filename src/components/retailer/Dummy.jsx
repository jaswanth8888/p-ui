import React, { Component } from 'react'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
 
class Dummy extends Component {
 
    state = {
        startDate: new Date()
      };
    
    handleChange = date => {
        console.log(date)
        this.setState({
          startDate: date
        });
      };
 
      
    render() {
        return (
            <div className="box-container"
            style={{ justifyContent: "flex-start", flexDirection: "column" }}>
            <div
                className="product-form-header"
                style={{ width: "80%", margin: "50px", marginBottom: "0px" }}
            >                
                <DatePicker
                    minDate={new Date()}
                    selected={this.state.startDate}
                    //selected={this.state.startDate}
                    onChange={this.handleChange}
                />
 
            </div>
        </div>
        )
    }
}


export default Dummy;