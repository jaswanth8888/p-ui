import { Table } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getZoneList } from '../../redux/actions/RetailerActions.js';

class ViewZones extends Component {
    constructor(props) {
        super(props)
        this.props.getZoneList();
    }


    render() {

        return (

            <div className="box-container" style={{ alignItems: "flex-start", marginTop: "150px" }}>
                <TableContainer component={Paper} style={{ width: "500px", textAlign : "center" }}>
                    <Table  aria-label="a dense table">
                        <TableHead style={{ backgroundColor: "#673ab7" }}>
                            <TableRow>
                                <TableCell style={{ color: "#FFF", width: "250px" , textAlign : "center"}}>Zone Name</TableCell>
                                <TableCell style={{ color: "#FFF", width: "250px", textAlign : "center" }}>Number of Stores</TableCell>
                            </TableRow>
                        </TableHead>
                        <tbody>
                            {Object.keys(this.props.zoneList).map((i) => {
                                return <TableRow>
                                    <TableCell key={i} value={i} style = {{ textAlign : "center"}}>{i}</TableCell>
                                    <TableCell style = {{ textAlign : "center"}}>{this.props.zoneList[i]}</TableCell>
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
    zoneList: store.RetailerReducer.zoneList
});
const actionAsProps = {
    getZoneList: getZoneList

}
export default connect(stateAsProps, actionAsProps)(ViewZones);
