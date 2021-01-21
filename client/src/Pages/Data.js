import React, { Component } from 'react'
import Navbar from '../Components/Navbar/Navbar';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux'
import { getTable } from '.././Actions/tableAction';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import MaterialTable from 'material-table';
import { BeatLoader } from 'react-spinners';
export class Data extends Component {

    state = {
        columns : [
            {
                title: "Order ID",
                field: "order"
            },
            {
                title: "Vendor Name",
                field: "vendor.name"
            },
            {
                title: "Appointment Start",
                field: "appt_start"
            },
            {
                title: "Appointment End",
                field: "appt_end"
            },
            {
                title: "Appointment Type",
                field: "appt_type"
            },
            {
                title: "Status",
                field: "status"
            },
            {
                title: "Date Extracted",
                field: "date_extracted"
            }
        ]
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
                                data={this.props.data}
                                columns={this.state.columns}
                                options={{
                                    filtering: false,
                                    exportButton: true,
                                    exportAllData: true,
                                    pageSize: 10 
                                }}   
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