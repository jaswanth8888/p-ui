import { Table } from "@material-ui/core"
import Paper from "@material-ui/core/Paper"
import TableCell from "@material-ui/core/TableCell"
import TableContainer from "@material-ui/core/TableContainer"
import TableHead from "@material-ui/core/TableHead"
import TableRow from "@material-ui/core/TableRow"
import React, { Component } from "react"
import { connect } from "react-redux"
import TablePagination from "@material-ui/core/TablePagination"
import TableBody from "@material-ui/core/TableBody"
import PropTypes from "prop-types"
import { getClusterList } from "../../redux/actions/RetailerActions"

class ViewClusters extends Component {
  constructor(props) {
    super(props)
    const { getClusterList: getClusterListAlt } = this.props
    getClusterListAlt()

    this.state = {
      page: 0,
      setPage: 0,
      rowsPerPage: 10,
      setRowsPerPage: 10,
    }
  }

  handleChangePage = (event, newPage) => {
    this.setState({ page: +newPage })
  }

  handleChangeRowsPerPage = (event) => {
    this.setState({ setPage: 0 }, () => {
      this.setState({ rowsPerPage: +event.target.value })
    })
  }

  render() {
    const { clusterList } = this.props
    const { page, rowsPerPage } = this.state
    const classes = this.props
    const rows = clusterList
    return (
      <div className="box-container-table data-tables">
        <Paper className={classes.root}>
          <TableContainer className={classes.container}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <TableCell>Cluster Name</TableCell>
                  <TableCell>Number of Clusters</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {Object.keys(rows)
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => {
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={row.code}
                      >
                        <TableCell>{row}</TableCell>
                        <TableCell>{rows[row]}</TableCell>
                      </TableRow>
                    )
                  })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={Object.keys(rows).length}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={this.handleChangePage}
            onChangeRowsPerPage={this.handleChangeRowsPerPage}
          />
        </Paper>
      </div>
    )
  }
}

ViewClusters.propTypes = {
  getClusterList: PropTypes.func.isRequired,
  clusterList: PropTypes.shape.isRequired,
}

const stateAsProps = (store) => ({
  clusterList: store.RetailerReducer.clusterList,
})
const actionAsProps = {
  getClusterList,
}
export default connect(stateAsProps, actionAsProps)(ViewClusters)
