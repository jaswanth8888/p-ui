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
import { getZoneList } from "../../redux/actions/RetailerActions"

class ViewZones extends Component {
  constructor(props) {
    super(props)
    const { getZoneList: getZoneListAlt } = this.props
    getZoneListAlt()

    this.state = {
      page: 0,
      rowsPerPage: 10,
    }
  }

  handleChangePage = (event, newPage) => {
    this.setState({ page: +newPage })
    console.log(`fired handlechangepage ${this.setState.page}`)
  }

  handleChangeRowsPerPage = (event) => {
    this.setState({ rowsPerPage: +event.target.value })
  }

  render() {
    const { zoneList } = this.props
    const { page, rowsPerPage } = this.state
    const classes = this.props
    const rows = zoneList
    return (
      <div className="box-container-table data-tables">
        <Paper className={classes.root}>
          <TableContainer className={classes.container}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <TableCell>Zone Name</TableCell>
                  <TableCell>Number of Zones</TableCell>
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
ViewZones.propTypes = {
  getZoneList: PropTypes.func.isRequired,
  zoneList: PropTypes.shape.isRequired,
}
const stateAsProps = (store) => ({
  zoneList: store.RetailerReducer.zoneList,
})
const actionAsProps = {
  getZoneList,
}
export default connect(stateAsProps, actionAsProps)(ViewZones)
