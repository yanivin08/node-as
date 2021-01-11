import React, { Component } from 'react'
import Tables from '../Components/Table/Tables'
import Navbar from '../Components/Navbar/Navbar';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux'
import { getTable } from '.././Actions/tableAction';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import MaterialTable from 'material-table';
import Icon from '@material-ui/core/Icon';
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

    async componentDidMount(){

        const token = document.cookie.split('=')[1];
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
                            ? "loading..."
                            : <MaterialTable
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