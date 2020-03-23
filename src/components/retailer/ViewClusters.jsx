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

            <div className="container">
                <Grid
                    container
                    spacing={0}
                    direction="column"
                    alignItems="center"
                    justify="center"
                    style={{ minHeight: "110vh", marginTop: "-200px" }}

                >

                    <Grid item xs={3} style={{
                        borderRadius: "4px",
                        padding: "40px",
                        position: "relative"
                    }}>
                        <TableContainer component={Paper}>
                            <Table size="small" aria-label="a dense table">
                                <TableHead style = {{ backgroundColor : "#C60078"}}>
                                    <TableRow>
                                        <TableCell style={{color:"#FFF"}}>Cluster Name</TableCell>
                                        <TableCell style={{color:"#FFF"}}>Number of Stores</TableCell>
                                    </TableRow>
                                </TableHead>
                                <tbody>
                                    {Object.keys(this.props.clusterList).map((i) => {
                                        return <TableRow>
                                            <TableCell key={i} value={i}>{i}</TableCell>
                                            <TableCell>{this.props.clusterList[i]}</TableCell>
                                        </TableRow>
                                    })}
                                </tbody>
                            </Table>
                        </TableContainer>
                    </Grid>
                </Grid>
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
