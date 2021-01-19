import React, { Component } from 'react'
import './TextWidget.css'

export class TextWidget extends Component {
    render() {
        return (
            <div className="widgetWrap">
                <div className="widgetHeader">
                    <div className="widgetText">
                        <h6 className="widgetTitle">{this.props.title}</h6>
                        <h3 className="widgetValue">{this.props.value}</h3>
                    </div>
                    <div className="widgetIcon">
                        {this.props.icon}
                    </div>
                </div>
                <div className="widgetDescription">
                    <div className="description">{this.props.description}</div>
                </div>
            </div>
        )
    }
}

export default TextWidget