import React, { Component } from 'react'
import { connect } from 'react-redux';
import { getClusterList } from '../../redux/actions/RetailerActions'
import { Avatar, Box, Grid, Table } from '@material-ui/core';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

class ViewClusters extends Component {
    constructor(props) {
        super(props)

        this.props.getClusterList();
    }


    render() {

        return (
            <div className="box-container" style = {{alignItems : "flex-start" , marginTop : "150px"}}>
                <TableContainer component={Paper} style = {{width:"500px"}}>
                    <Table size="small" aria-label="a dense table">
                        <TableHead style={{ backgroundColor: "#673ab7" }}>
                            <TableRow>
                                <TableCell style={{ color: "#FFF", width:"250px", textAlign : "center" }}>Cluster Name</TableCell>
                                <TableCell style={{ color: "#FFF", width:"250px", textAlign : "center"}}>Number of Stores</TableCell>
                            </TableRow>
                        </TableHead>
                        <tbody>
                            {Object.keys(this.props.clusterList).map((i) => {
                                return <TableRow>
                                    <TableCell key={i} value={i} style = {{ textAlign : "center"}}>{i}</TableCell>
                                    <TableCell style = {{ textAlign : "center"}}>{this.props.clusterList[i]}</TableCell>
                                </TableRow>
                            })}
                        </tbody>
                    </Table>
                </TableContainer>
            </div>
        )
    }
}

const stateAsProps = (store) => ({
    clusterList: store.RetailerReducer.clusterList
});
const actionAsProps = {
    getClusterList: getClusterList

}
export default connect(stateAsProps, actionAsProps)(ViewClusters);
