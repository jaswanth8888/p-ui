import React, { Component } from "react"
import connect from "react-redux/es/connect/connect"
import PropTypes from "prop-types"
import { Paper, Table } from "@material-ui/core"
import TableCell from "@material-ui/core/TableCell"
import TableContainer from "@material-ui/core/TableContainer"
import TableHead from "@material-ui/core/TableHead"
import TableRow from "@material-ui/core/TableRow"
import { priceChangeProductDetailsTable } from "./constants"

class PriceChangeProductDetailsTable extends Component {
  constructor(props) {
    super(props)

    this.state = {}
  }

  render() {
    const { priceChangeProductsList } = this.props

    return (
      <div className="box-container">
        <div className="joint-form-large">
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  {priceChangeProductDetailsTable.map((tcell) => (
                    <TableCell>{tcell}</TableCell>
                  ))}
                  <TableCell />
                </TableRow>
              </TableHead>
              <tbody>
                <TableRow>
                  <TableCell>{priceChangeProductsList.ProductId}</TableCell>
                  <TableCell>{priceChangeProductsList.productName}</TableCell>
                  <TableCell>{priceChangeProductsList.StartDate}</TableCell>
                  <TableCell>{priceChangeProductsList.EndDate}</TableCell>
                </TableRow>
              </tbody>
            </Table>
          </TableContainer>
        </div>
      </div>
    )
  }
}

PriceChangeProductDetailsTable.propTypes = {
  priceChangeProductsList: PropTypes.arrayOf.isRequired,
}

const stateAsProps = (store) => ({
  priceChangeProductsList: store.RetailerReducer.priceChangeProductsList,
})
const actionsAsProps = {}
export default connect(
  stateAsProps,
  actionsAsProps
)(PriceChangeProductDetailsTable)
