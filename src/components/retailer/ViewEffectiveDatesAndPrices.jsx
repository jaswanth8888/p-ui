import React, { Component } from 'react'
import {
    InputLabel,
    Select,
    Table,
    TextField,
    Typography
  } from "@material-ui/core";
  import Button from "@material-ui/core/Button";
  import Paper from "@material-ui/core/Paper";
  import TableCell from "@material-ui/core/TableCell";
  import TableContainer from "@material-ui/core/TableContainer";
  import TableHead from "@material-ui/core/TableHead";
  import TableRow from "@material-ui/core/TableRow";
  import { connect } from "react-redux";
  import { Link } from "react-router-dom";
  import { cancelEffectivePrice } from '../../redux/actions/RetailerActions';

  class ViewEffectiveDatesAndPrices extends Component {
    constructor(props) {
        super(props);

        this.state = {
        };
}

    render() {
        return (
          <div className="box-container" style={{ alignItems: "flex-start", marginTop: "150px" }}>
            <form id="productform">
            <TableContainer component={Paper} style={{ width: "1100px", textAlign : "center" }}>
              <Table size="small" aria-label="a dense table">

                <TableHead
                  style={{ backgroundColor: "#673ab7", color: "white" }}
                > 
                  <TableRow>
                  <TableCell style={{ color: "#FFF", width: "250px", textAlign : "center"}}>
                      Product Name
                    </TableCell>
                    <TableCell style={{ color: "#FFF", width: "250px", textAlign : "center"}}>
                    Base Price
                    </TableCell>
                    <TableCell style={{ color: "#FFF", width: "250px", textAlign : "center"}}>
                    Promotions
                    </TableCell>
                  </TableRow>
                </TableHead>
                <tbody>
                    {/* //change reguresd */}
                {this.props.products.map(product => {
                    return(
                        <TableRow key={product.productId}>
                            <TableCell style={{width: "250px", textAlign : "center"}}>
                                <Typography variant="subtitle1" gutterBottom>
                                    {product.productName}
                                </Typography>
                            </TableCell>
                            <TableCell style={{width: "250px", textAlign : "center"}}>
                                <Typography variant="subtitle1" gutterBottom>
                                    {product.productBasePrice}
                                </Typography>
                            </TableCell>   
                            <TableCell style={{width: "250px", textAlign : "center"}}>
                                <Typography variant="subtitle1" gutterBottom>
                                        <Table size="small" aria-label="a dense table">
                                            <TableHead
                                                style={{ backgroundColor: "#673ab7", color: "white" }}
                                            > 
                                            <TableRow>
                                            <TableCell style={{color: "#FFF", width: "250px", textAlign : "center"}}>
                                            Profit Percentage
                                            </TableCell>
                                            <TableCell style={{color: "#FFF", width: "250px", textAlign : "center"}}>
                                            Zone/Cluster
                                            </TableCell>
                                            <TableCell style={{color: "#FFF", width: "250px", textAlign : "center"}}>
                                            Effective price
                                            </TableCell>
                                            <TableCell style={{color: "#FFF", width: "250px", textAlign : "center"}}>
                                            Start Date
                                            </TableCell>
                                            <TableCell style={{color: "#FFF", width: "250px", textAlign : "center"}}>
                                            End Date
                                            </TableCell>
                                            <TableCell style={{color: "#FFF", width: "250px", textAlign : "center"}}>
                                            Promotion Id
                                            </TableCell>
                                            </TableRow>
                                            </TableHead>
                                            <tbody>
                
                                                    {product.promotions.map(promotion => {
                                                        return(
                                                            <TableRow  key={promotion.promotionId}>
                                                                
                                                                <TableCell style={{width: "250px", textAlign : "center"}}>
                                                                    <Typography variant="subtitle1" gutterBottom>
                                                                        {promotion.profitPercentage}
                                                                    </Typography>
                                                                </TableCell>
                                                                <TableCell style={{width: "250px", textAlign : "center"}}>
                                                                    <Typography variant="subtitle1" gutterBottom>
                                                                        {promotion.zoneCluster}
                                                                    </Typography>
                                                                </TableCell>
                                                                <TableCell style={{width: "250px", textAlign : "center"}}>
                                                                    <Typography variant="subtitle1" gutterBottom>
                                                                        {promotion.effectivePrice}
                                                                    </Typography>
                                                                </TableCell>
                                                                <TableCell style={{width: "250px", textAlign : "center"}}>
                                                                <Typography variant="subtitle1" gutterBottom>
                                                                {promotion.startDate}
                                                                </Typography>
                                                                </TableCell>
                                                                <TableCell style={{width: "250px", textAlign : "center"}}>
                                                                <Typography variant="subtitle1" gutterBottom>
                                                                {promotion.endDate}
                                                                </Typography>
                                                                </TableCell>
                                                                <TableCell style={{width: "250px", textAlign : "center"}}>
                                                                <Typography variant="subtitle1" gutterBottom>
                                                                {promotion.promotionId}
                                                                </Typography>
                                                                </TableCell>
                                                                <TableCell style={{width: "250px", textAlign : "center"}}>
                                                                <Typography variant="subtitle1" gutterBottom>
                                                                <Button
                                                                  type="button"
                                                                  halfWidth
                                                                  variant="contained"
                                                                  color="primary"
                                                                  className="{classes.submit}"
                                                                  style={{ marginTop: "75px" , marginBottom: "75px" , justifyContent: "center"}}
                                                                  onClick={this.props.cancelEffectivePrice(product.productName, promotion.promotionId)}>
                                                                  Withdraw
                                                                </Button> 
                                                                </Typography>
                                                                </TableCell>
                                                            </TableRow>
                                                        )
                                                    }
                                                    )
                                                    }
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
    );
  }
}
const stateAsProps = store => ({
    products:store.RetailerReducer.products
})

const actionAsProps = {
  cancelEffectivePrice : cancelEffectivePrice
}
export default connect(stateAsProps, actionAsProps)(ViewEffectiveDatesAndPrices);