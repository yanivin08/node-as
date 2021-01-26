import React, { Component } from 'react'
import Navbar from '../Components/Navbar/Navbar';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux'
import { getTable } from '.././Actions/tableAction';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import MaterialTable from 'material-table';
import { BeatLoader } from 'react-spinners';
import { TextField } from '@material-ui/core';
export class Data extends Component {

    state = {
        columns : [
            {
                title: "Order ID",
                field: "order",
                editable: 'never'
            },
            {
                title: "Vendor Name",
                field: "vendor.name",
                editable: 'never'
            },
            {
                title: "Appointment Start",
                field: "appt_start",
                type: 'datetime',
            },
            {
                title: "Appointment End",
                field: "appt_end",
                type: 'datetime',
            },
            {
                title: "Appointment Type",
                field: "appt_type",
                editable: 'never'
            },
            {
                title: "Status",
                field: "status",
                lookup: { 
                            "New Appointment": 'New Appointment', 
                            "Set Appointment": 'Set Appointment', 
                            "Confirm Appointment": "Confirm Appointment", 
                            "Complete Appointment": "Complete Appointment",
                            "Cancelled Appointment": "Cancelled Appointment"
                        }
            },
            {
                title: "Date Extracted",
                field: "date_extracted",
                editable: 'never'
            }
        ],
        data : [],
        nameError: {
            error: true,
            lablel: 'err',
            helperText: 'Required date',
            validateInput: false
        }
    }

    handleClose(arr){
        this.setState({nameError: arr})
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.data){
            this.setState({data: nextProps.data});
        }
    }

    updateState(arrs,arr,field){
        let url = "", data = {};
        const token = this.getCookie("a") + "." + this.getCookie("dt")  ;

        if(field === "status"){
            url = "/appointment/status"
            data = { order: arr.order, status: arr.status }
        }else{
            url = "/appointment/date"
            data = { order: arr.order, appt_start: arr.appt_start, appt_end: arr.appt_end }
        }

        if(!this.state.message){
            fetch(url, {
                method: 'POST',
                headers: {
                    'Accept':'application/json',
                    'Content-Type': 'application/json',
                    'x-auth-token': token
                },
                body: JSON.stringify(data)
            })
            .then(() => {
                this.setState({data: arrs})
            })
            .catch((err) => {
                console.log(err);
            })
        }
        
    }

    getCookie = (cname) => {
        let name = cname + "=";
        let decodedCookie = decodeURIComponent(document.cookie);
        let ca = decodedCookie.split(';');
        for(let i = 0; i <ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === ' ') {
            c = c.substring(1);
            }
            if (c.indexOf(name) === 0) {
            return c.substring(name.length, c.length);
            }
        }
        return "";
    }

    async componentDidMount(){
        const token = this.getCookie("a") + "." + this.getCookie("dt")  ;
        await this.props.getTable(token);
    }

    render() {
        
        if(this.props.error){
            return <Redirect to={{
                pathname: "/login",
                state: { message: this.props.message }
              }}/>
        }else{
            return (
                <div>
                    <Navbar/>
                    <div className='data'>
                        {this.props.loading
                            ? <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}><BeatLoader loading/></div>
                            : <MaterialTable
                                style={{minHeight: '725px'}}
                                title="Appointment Data" 
                                data={this.state.data}
                                columns={this.state.columns}
                                options={{
                                    filtering: false,
                                    exportButton: true,
                                    exportAllData: true,
                                    pageSize: 10 
                                }}
                                cellEditable={
                                    this.getCookie('val') >= 2 ?
                                    {
                                        onCellEditApproved: (newValue, oldValue, rowData, columnDef) => {
                                        return new Promise((resolve, reject) => {
                                            
                                            console.log(newValue)
                                            console.log(oldValue)
                                            console.log(rowData)
                                            console.log(columnDef)

                                            if(!newValue){
                                                reject()
                                                return;
                                            }

                                            setTimeout(resolve, 1000);
                                        });
                                        }
                                    }
                                    : false
                                }

                            />}
                    </div>
                </div>
            )
        }
    }
}

Data.propTypes = {
    getTable: PropTypes.func.isRequired
}

function mapDispatchToProps(dispatch) {
    return {
        getTable: bindActionCreators(getTable, dispatch)
    }
}

const mapStateToProps = (state) => ({
    loading: state.table.loading,
    error: state.table.error,
    data: state.table.data,
    message: state.table.message
})

export default connect(mapStateToProps, mapDispatchToProps )(Data);