import { Table } from "@material-ui/core"
import Paper from "@material-ui/core/Paper"
import TableCell from "@material-ui/core/TableCell"
import TableContainer from "@material-ui/core/TableContainer"
import TableHead from "@material-ui/core/TableHead"
import TableRow from "@material-ui/core/TableRow"
import React, { Component } from "react"
import { connect } from "react-redux"
import { getClusterList } from "../../redux/actions/RetailerActions"

class ViewClusters extends Component {
  constructor(props) {
    super(props)
    this.props.getClusterList()
  }

  componentWillMount() {
    this.props.history.push("/view/clusters")
  }

  render() {
    return (
      <div className="box-container-table">
        <TableContainer component={Paper}>
          <Table aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell>Cluster Name</TableCell>
                <TableCell>Number of Stores</TableCell>
              </TableRow>
            </TableHead>
            <tbody>
              {Object.keys(this.props.clusterList).map((i) => {
                return (
                  <TableRow>
                    <TableCell key={i} value={i}>
                      {i}
                    </TableCell>
                    <TableCell>{this.props.clusterList[i]}</TableCell>
                  </TableRow>
                )
              })}
            </tbody>
          </Table>
        </TableContainer>
      </div>
    )
  }
}

const stateAsProps = (store) => ({
  clusterList: store.RetailerReducer.clusterList,
})
const actionAsProps = {
  getClusterList,
}
export default connect(stateAsProps, actionAsProps)(ViewClusters)
