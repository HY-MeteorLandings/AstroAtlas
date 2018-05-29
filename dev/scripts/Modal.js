import React from 'react';
import { Popup } from "react-mapbox-gl";

class Modal extends React.Component {
    render() {
        return (
            <div className="box">
                <button onClick={this.props.function}>X</button> 
                <h3 className="name">Name</h3> <p>{this.props.name}</p> 
                <h3>Mass (g)</h3> <p>{this.props.mass}</p>
                <h3>Class</h3> <p>{this.props.class}</p>
                <h3>Lat</h3> <p>{this.props.lat}</p>
                <h3>Long</h3><p>{this.props.long}</p>
            </div>
        )
    }
}

export default Modal;