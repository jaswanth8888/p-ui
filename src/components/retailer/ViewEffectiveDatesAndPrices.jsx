/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React, { Component } from "react"
import { Table, Typography } from "@material-ui/core"
import Button from "@material-ui/core/Button"
import Paper from "@material-ui/core/Paper"
import TableCell from "@material-ui/core/TableCell"
import TableContainer from "@material-ui/core/TableContainer"
import TableHead from "@material-ui/core/TableHead"
import TableRow from "@material-ui/core/TableRow"
import { connect } from "react-redux"
import { cancelEffectivePrice } from "../../redux/actions/RetailerActions"

class ViewEffectiveDatesAndPrices extends Component {
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
          <form className="productform">
            <TableContainer
              component={Paper}
              style={{ textAlign: "center", width: "80vw" }}
            >
              <Table aria-label="a dense table">
                <TableHead style={{ color: "white" }}>
                  <TableRow>
                    <TableCell
                      style={{
                        color: "#FFF",

                        textAlign: "center",
                      }}
                    >
                      Product Name
                    </TableCell>
                    <TableCell
                      style={{
                        color: "#FFF",

                        textAlign: "center",
                      }}
                    >
                      Base Price
                    </TableCell>
                    <TableCell
                      style={{
                        color: "#FFF",

                        textAlign: "center",
                      }}
                    >
                      Promotions
                    </TableCell>
                  </TableRow>
                </TableHead>
                <tbody>
                  {/* //change reguresd */}
                  {this.props.products.map((product) => {
                    return (
                      <TableRow key={product.productId}>
                        <TableCell style={{ textAlign: "center" }}>
                          <Typography variant="subtitle1" gutterBottom>
                            {product.productName}
                          </Typography>
                        </TableCell>
                        <TableCell style={{ textAlign: "center" }}>
                          <Typography variant="subtitle1" gutterBottom>
                            {product.productBasePrice}
                          </Typography>
                        </TableCell>
                        <TableCell style={{ textAlign: "center" }}>
                          <Typography variant="subtitle1" gutterBottom>
                            <Table size="small" aria-label="a dense table">
                              <TableHead
                                style={{
                                  color: "white",
                                }}
                              >
                                <TableRow>
                                  <TableCell
                                    style={{
                                      color: "#FFF",

                                      textAlign: "center",
                                    }}
                                  >
                                    Profit Percentage
                                  </TableCell>
                                  <TableCell
                                    style={{
                                      color: "#FFF",

                                      textAlign: "center",
                                    }}
                                  >
                                    Zone/Cluster
                                  </TableCell>
                                  <TableCell
                                    style={{
                                      color: "#FFF",

                                      textAlign: "center",
                                    }}
                                  >
                                    Effective price
                                  </TableCell>
                                  <TableCell
                                    style={{
                                      color: "#FFF",

                                      textAlign: "center",
                                    }}
                                  >
                                    Start Date
                                  </TableCell>
                                  <TableCell
                                    style={{
                                      color: "#FFF",

                                      textAlign: "center",
                                    }}
                                  >
                                    End Date
                                  </TableCell>
                                  <TableCell
                                    style={{
                                      color: "#FFF",

                                      textAlign: "center",
                                    }}
                                  >
                                    Promotion Id
                                  </TableCell>
                                </TableRow>
                              </TableHead>
                              <tbody>
                                {product.promotions.map((promotion) => {
                                  return (
                                    <TableRow key={promotion.promotionId}>
                                      <TableCell
                                        style={{
                                          textAlign: "center",
                                        }}
                                      >
                                        <Typography
                                          variant="subtitle1"
                                          gutterBottom
                                        >
                                          {promotion.profitPercentage}
                                        </Typography>
                                      </TableCell>
                                      <TableCell
                                        style={{
                                          textAlign: "center",
                                        }}
                                      >
                                        <Typography
                                          variant="subtitle1"
                                          gutterBottom
                                        >
                                          {promotion.zoneCluster}
                                        </Typography>
                                      </TableCell>
                                      <TableCell
                                        style={{
                                          textAlign: "center",
                                        }}
                                      >
                                        <Typography
                                          variant="subtitle1"
                                          gutterBottom
                                        >
                                          {promotion.effectivePrice}
                                        </Typography>
                                      </TableCell>
                                      <TableCell
                                        style={{
                                          textAlign: "center",
                                        }}
                                      >
                                        <Typography
                                          variant="subtitle1"
                                          gutterBottom
                                        >
                                          {promotion.startDate}
                                        </Typography>
                                      </TableCell>
                                      <TableCell
                                        style={{
                                          textAlign: "center",
                                        }}
                                      >
                                        <Typography
                                          variant="subtitle1"
                                          gutterBottom
                                        >
                                          {promotion.endDate}
                                        </Typography>
                                      </TableCell>
                                      <TableCell
                                        style={{
                                          textAlign: "center",
                                        }}
                                      >
                                        <Typography
                                          variant="subtitle1"
                                          gutterBottom
                                        >
                                          {promotion.promotionId}
                                        </Typography>
                                      </TableCell>
                                      <TableCell
                                        style={{
                                          textAlign: "center",
                                        }}
                                      >
                                        <Typography
                                          variant="subtitle1"
                                          gutterBottom
                                        >
                                          <Button
                                            type="button"
                                            halfWidth
                                            variant="contained"
                                            color="primary"
                                            className="{classes.submit}"
                                            style={{
                                              justifyContent: "center",
                                            }}
                                            onClick={this.props.cancelEffectivePrice(
                                              product.productName,
                                              promotion.promotionId
                                            )}
                                          >
                                            Withdraw
                                          </Button>
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
          </form>
        </div>
      </div>
    )
  }
}
const stateAsProps = (store) => ({
  products: store.RetailerReducer.products,
})

const actionAsProps = {
  cancelEffectivePrice,
}
export default connect(stateAsProps, actionAsProps)(ViewEffectiveDatesAndPrices)
