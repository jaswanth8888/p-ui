import { TextField, Typography } from "@material-ui/core"
import Button from "@material-ui/core/Button"
import React, { Component } from "react"
import { connect } from "react-redux"
import { getProductDetails, postPromotion } from "../../redux/actions/RetailerActions"
import ProductDetailsTable from "../utils/ProductDetailsTable"

class DefinePromotionInCluster extends Component {
  constructor(props) {
    super(props)

    this.state = {
      promotionDetails: {
        appliedDate: new Date().toISOString().slice(0, 10),
        startDate: "",
        endDate: "",
        promotionPercentage: "",
        zoneName: this.props.zone,
        clusterName: this.props.cluster,
      },
      levelOption: "cluster",
      var: "1",
    }

    this.handleChangePercentage = this.handleChangePercentage.bind(this)
    this.handleChangeStartDate = this.handleChangeStartDate.bind(this)
    this.handleChangeEndDate = this.handleChangeEndDate.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentWillMount() {}

  handleSubmit = (e) => {
    e.preventDefault()
    console.log(this.state.promotionDetails)
    this.props.postPromotion( 
      this.state.promotionDetails,
      this.props.productName,
      this.state.levelOption
    )
    this.props.history.push("/view/promotions/cluster")
  }

  handleChangePercentage(e) {
    const percentage = e.target.value
    this.state.promotionDetails.promotionPercentage = percentage
  }

  handleChangeStartDate(e) {
    const start = e.target.value
    this.state.promotionDetails.startDate = start
  }

  handleChangeEndDate(e) {
    const end = e.target.value
    this.state.promotionDetails.endDate = end
  }

  render() {
    return (
      <div className="box-container">
        <div className="joint-form-large-table">
          <div className="form-center">
            <div className="flex-grid">
              <Typography className="card-header" variant="h4">
                Apply Percentage Promotion
              </Typography>
              <ProductDetailsTable />
              <br />
              <Typography className="card-header" variant="h6">
                Selected Cluster : {this.props.cluster} - {this.props.zone}
              </Typography>

              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth="false"
                type="number"
                step="0.01"
                id="promotionPercentage"
                label="Promotion Percentage"
                name="promotionPercentage"
                autoComplete="promotionPercentage"
                onChange={this.handleChangePercentage}
                autoFocus
              />
              <Typography className="card-header" variant="h6">
                Actual Price : {this.props.productDetails.productBasePrice}
              </Typography>

              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                type="date"
                id="startDate-in-range"
                label="Start Date"
                InputLabelProps={{ shrink: true, required: true }}
                name="startDate"
                autoComplete="startDate"
                onChange={this.handleChangeStartDate}
                autoFocus
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                type="date"
                // defaultValue={new Date().toISOString().slice(0,10)}
                step="0.01"
                id="endDate-in-range"
                label="End Date"
                InputLabelProps={{ shrink: true, required: true }}
                name="endDate"
                autoComplete="endDate"
                onChange={this.handleChangeEndDate}
                autoFocus
              />

              <Button
                halfWidth
                type="button"
                variant="contained"
                color="primary"
                className="{classes.submit}"
                onClick={this.handleSubmit}
                style={{ marginTop: "10px" }}
                id="apply-zone-percentage"
              >
                Apply Promotion to Cluster
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const stateAsProps = (store) => ({
  productDetails: store.RetailerReducer.productDetails,
  productName: store.RetailerReducer.productName,
  zone: store.RetailerReducer.zone,
  cluster: store.RetailerReducer.cluster,
  statusCode: store.RetailerReducer.statusCode,
})

const actionAsProps = {
  getProductDetails,
  postPromotion,
}
export default connect(stateAsProps, actionAsProps)(DefinePromotionInCluster)
