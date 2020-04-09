import { Table, Typography } from "@material-ui/core"
import Paper from "@material-ui/core/Paper"
import TableCell from "@material-ui/core/TableCell"
import TableContainer from "@material-ui/core/TableContainer"
import TableHead from "@material-ui/core/TableHead"
import TableRow from "@material-ui/core/TableRow"
import React, { Component } from "react"
import { connect } from "react-redux"

class ViewPromotions extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <div
        className="box-container"
        style={{ alignItems: "flex-start", marginTop: "150px" }}
      >
        <div className="center-body">
          <TableContainer component={Paper}>
            <Table aria-label="a dense table" style={{ width: "80vw" }}>
              <TableHead style={{ color: "white" }}>
                <TableRow>
                  <TableCell style={{ color: "White" }}>Product</TableCell>
                  <TableCell style={{ color: "White" }}>Vendor Name</TableCell>
                  <TableCell style={{ color: "White" }}>Base Price</TableCell>
                  <TableCell style={{ color: "White" }}>
                    Effective Price
                  </TableCell>
                  <TableCell style={{ color: "White" }}>Quantity</TableCell>
                  <TableCell style={{ color: "White" }}>Category</TableCell>
                  <TableCell style={{ color: "White" }}>Promotions</TableCell>
                </TableRow>
              </TableHead>
              <tbody>
                {this.props.promotions.map((product) => {
                  return (
                    <TableRow>
                      <TableCell>
                        <Typography variant="subtitle1" gutterBottom>
                          {product.productName}
                        </Typography>
                        <a
                          target="_blank"
                          rel="noopener noreferrer"
                          href={product.image}
                        >
                          <img
                            className="thumbnail"
                            src={product.image}
                            alt="none"
                          />
                        </a>
                      </TableCell>
                      <TableCell>
                        <Typography variant="subtitle1" gutterBottom>
                          {product.vendorName}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="subtitle1" gutterBottom>
                          {product.vendorPrice}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="subtitle1" gutterBottom>
                          {product.effectivePrice}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="subtitle1" gutterBottom>
                          Initial : {product.initialQty}
                        </Typography>
                        <Typography variant="subtitle1" gutterBottom>
                          Remaining : {product.remainingQty}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="subtitle1" gutterBottom>
                          {product.category}
                        </Typography>
                      </TableCell>

                      <TableCell>
                        <Typography variant="subtitle1" gutterBottom>
                          <Table size="small" aria-label="a dense table">
                            <TableHead
                              style={{
                                color: "white",
                              }}
                            >
                              <TableRow>
                                <TableCell style={{ color: "White" }}>
                                  Promotion Percentage
                                </TableCell>
                                <TableCell style={{ color: "White" }}>
                                  Selling Price
                                </TableCell>
                                <TableCell style={{ color: "White" }}>
                                  Start Date
                                </TableCell>
                                <TableCell style={{ color: "White" }}>
                                  End Date
                                </TableCell>
                                <TableCell style={{ color: "White" }}>
                                  Level Applied
                                </TableCell>
                              </TableRow>
                            </TableHead>
                            <tbody>
                              {product.list.map((promotion) => {
                                return (
                                  <TableRow key={promotion.promotionId}>
                                    <TableCell>
                                      <Typography
                                        variant="subtitle1"
                                        gutterBottom
                                      >
                                        {promotion.promotionPercentage}
                                      </Typography>
                                    </TableCell>
                                    <TableCell>
                                      <Typography
                                        variant="subtitle1"
                                        gutterBottom
                                      >
                                        {promotion.promotionSellingPrice}
                                      </Typography>
                                    </TableCell>
                                    <TableCell>
                                      <Typography
                                        variant="subtitle1"
                                        gutterBottom
                                      >
                                        {promotion.startDate.slice(0, 10)}
                                      </Typography>
                                    </TableCell>
                                    <TableCell>
                                      <Typography
                                        variant="subtitle1"
                                        gutterBottom
                                      >
                                        {promotion.endDate.slice(0, 10)}
                                      </Typography>
                                    </TableCell>
                                    <TableCell>
                                      <Typography
                                        variant="subtitle1"
                                        gutterBottom
                                      >
                                        {this.props.levelOption}
                                      </Typography>
                                      <Typography
                                        variant="subtitle1"
                                        gutterBottom
                                      >
                                        {promotion.zoneCluster}
                                      </Typography>
                                    </TableCell>
                                  </TableRow>
                                )
                              })}
                            </tbody>
                          </Table>
                        </Typography>
                      </TableCell>
                    </TableRow>
                  )
                })}
              </tbody>
            </Table>
          </TableContainer>
        </div>
      </div>
    )
  }
}
const stateAsProps = (store) => ({
  promotions: store.RetailerReducer.promotions,
  levelOption: store.RetailerReducer.levelOption,
})
export default connect(stateAsProps, null)(ViewPromotions)
