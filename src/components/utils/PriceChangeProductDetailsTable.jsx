import React, { Component } from "react"
import connect from "react-redux/es/connect/connect"
import PropTypes from "prop-types"
import { Paper, Table } from "@material-ui/core"
import TableCell from "@material-ui/core/TableCell"
import TableContainer from "@material-ui/core/TableContainer"
import TableHead from "@material-ui/core/TableHead"
import TableRow from "@material-ui/core/TableRow"
import Button from "@material-ui/core/Button"
import { priceChangeProductDetailsTable } from "./constants"

class PriceChangeProductDetailsTable extends Component {
  constructor(props) {
    super(props)

    this.state = {}
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit = (e) => {
    e.preventDefault()
  }

  render() {
    const { priceChangeProductsList } = this.props

    return (
      <div className="flex-grid">
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
              {priceChangeProductsList.map((product) => (
                <TableRow>
                  <TableCell>{product.productName}</TableCell>
                  <TableCell>{product.startDate.substr(0, 10)}</TableCell>
                  <TableCell>{product.endDate.substr(0, 10)}</TableCell>
                  <TableCell>
                    <Button
                      fullWidth
                      type="button"
                      variant="contained"
                      color="primary"
                      className="{classes.submit} submit-pad"
                      onClick={this.handleSubmit}
                      id="assign-cluster-submit"
                    >
                      Cancel Price Change
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </tbody>
          </Table>
        </TableContainer>
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
