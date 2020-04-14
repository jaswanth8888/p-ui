import { Table, Typography } from "@material-ui/core"
import Paper from "@material-ui/core/Paper"
import TableCell from "@material-ui/core/TableCell"
import TableContainer from "@material-ui/core/TableContainer"
import TableHead from "@material-ui/core/TableHead"
import TableRow from "@material-ui/core/TableRow"
import React, { Component } from "react"
import { connect } from "react-redux"
import PropTypes from "prop-types"
import {
  getProductDetails,
  resetStatusCode,
} from "../../redux/actions/RetailerActions"
import ProductDetails from "../utils/ProductDetails"

class ViewAssignedClusters extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    const { productDetails, resetStatusCode: resetStatusCodeAlt } = this.props
    const zoneData = productDetails.assignProduct // Swap with the actual prop while integrating: this.props.productDetails.assignProduct

    const tableRowElm = (zone) => {
      if (zone.cluster !== null && Array.isArray(zone.cluster)) {
        return zone.cluster.map((cluster) => (
          <TableRow>
            <TableCell>
              {zone.price > 0 ? (
                <Typography variant="subtitle1" gutterBottom>
                  {cluster.clusterName}
                  
                  <Typography variant="subtitle1" gutterBottom>
                    {zone.zoneName}
                  </Typography>
                </Typography>
              ) : (
                <Typography variant="subtitle1" gutterBottom>
                  {cluster.clusterName}
                  <Typography variant="subtitle1" gutterBottom>
                    {zone.zoneName}
                  </Typography>
                </Typography>
              )}
            </TableCell>
            <TableCell>
              <Typography variant="subtitle1" gutterBottom>
                {cluster.quantityAssigned}
              </Typography>
            </TableCell>
            <TableCell>
              <Typography variant="subtitle1" gutterBottom>
                {cluster.profitPercentage}
              </Typography>
            </TableCell>
            <TableCell>
              <Typography variant="subtitle1" gutterBottom>
                {cluster.price}
              </Typography>
            </TableCell>
          </TableRow>
        ))
      }
    }

    return (
      <div className="box-container-start">
        {resetStatusCodeAlt()}
        <div className="">
          <ProductDetails />
        </div>
        <TableContainer component={Paper}>
          <Table aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell>Cluster Name</TableCell>
                <TableCell>Quantity Assigned</TableCell>
                <TableCell>Profit Percentage</TableCell>
                <TableCell>Price</TableCell>
              </TableRow>
            </TableHead>
            <tbody>{zoneData.map((zone) => tableRowElm(zone))}</tbody>
          </Table>
        </TableContainer>
      </div>
    )
  }
}

ViewAssignedClusters.propTypes = {
  resetStatusCode: PropTypes.func.isRequired,
  productDetails: PropTypes.shape.isRequired,
}

const actionAsProps = {
  getProductDetails,
  resetStatusCode,
}

export default connect(null, actionAsProps)(ViewAssignedClusters)
