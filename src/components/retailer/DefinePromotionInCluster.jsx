import { TextField, Typography, Button } from "@material-ui/core"
import React, { Component } from "react"
import CheckIcon from "@material-ui/icons/Check"
import ClearIcon from "@material-ui/icons/Clear"
import { connect } from "react-redux"
import PropTypes from "prop-types"
import { postPromotion } from "../../redux/actions/RetailerActions"
import ProductDetailsTable from "../utils/ProductDetailsTable"
import {
  startdate,
  enddate,
  datecheck,
  promotioncheck,
} from "../utils/constants"

class DefinePromotionInCluster extends Component {
  constructor(props) {
    super(props)
    const { zone, cluster } = this.props

    this.state = {
      promotionDetails: {
        appliedDate: new Date().toISOString().slice(0, 10),
        startDate: "",
        endDate: "",
        promotionPercentage: "",
        zoneName: zone,
        clusterName: cluster,
      },
      levelOption: "cluster",
    }

    this.handleChangePercentage = this.handleChangePercentage.bind(this)
    this.handleChangeStartDate = this.handleChangeStartDate.bind(this)
    this.handleChangeEndDate = this.handleChangeEndDate.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const { postPromotion: postPromotionAlt, productName, history } = this.props
    const { promotionDetails, levelOption } = this.state
    postPromotionAlt(promotionDetails, productName, levelOption)
    history.push("/view/promotions/cluster")
  }

  handleChangePercentage(e) {
    const percentage = e.target.value
    const { promotionDetails } = this.state
    this.setState({
      promotionDetails: {
        ...promotionDetails,
        promotionPercentage: percentage,
      },
    })
  }

  handleChangeStartDate(e) {
    const start = e.target.value
    const { promotionDetails } = this.state
    promotionDetails.startDate = start
    this.setState({
      promotionDetails: {
        ...promotionDetails,
        startDate: start,
      },
    })
  }

  handleChangeEndDate(e) {
    const end = e.target.value
    const { promotionDetails } = this.state
    promotionDetails.endDate = end
    this.setState({
      promotionDetails: {
        ...promotionDetails,
        endDate: end,
      },
    })
  }

  render() {
    const { promotionDetails } = this.state
    const { zone, cluster, assignedPrice } = this.props
    return (
      <div className="box-container">
        <div className="joint-form-large-table">
          <div className="store-requirement">
            <h3 className="center-h3">Requirements</h3>
            {promotionDetails.startDate.length === 0 && (
              <div className="unapproved-text">
                <ClearIcon className="icon-style" />
                <Typography variant="subtitle2" gutterBottom>
                  {startdate}
                </Typography>
              </div>
            )}
            {promotionDetails.startDate.length !== 0 && (
              <div className="approved-text">
                <CheckIcon className="icon-style" />
                <Typography variant="subtitle2" gutterBottom>
                  {startdate}
                </Typography>
              </div>
            )}
            {promotionDetails.endDate.length === 0 && (
              <div className="unapproved-text">
                <ClearIcon className="icon-style" />
                <Typography variant="subtitle2" gutterBottom>
                  {enddate}
                </Typography>
              </div>
            )}
            {promotionDetails.endDate.length !== 0 && (
              <div className="approved-text">
                <CheckIcon className="icon-style" />
                <Typography variant="subtitle2" gutterBottom>
                  {enddate}
                </Typography>
              </div>
            )}
            {promotionDetails.endDate <= promotionDetails.startDate && (
              <div className="unapproved-text">
                <ClearIcon className="icon-style" />
                <Typography variant="subtitle2" gutterBottom>
                  {datecheck}
                </Typography>
              </div>
            )}
            {promotionDetails.endDate > promotionDetails.startDate && (
              <div className="approved-text">
                <CheckIcon className="icon-style" />
                <Typography variant="subtitle2" gutterBottom>
                  {datecheck}
                </Typography>
              </div>
            )}
            {promotionDetails.promotionPercentage >= 0 && (
              <div className="unapproved-text">
                <ClearIcon className="icon-style" />
                <Typography variant="subtitle2" gutterBottom>
                  {promotioncheck}
                </Typography>
              </div>
            )}
            {promotionDetails.promotionPercentage < 0 && (
              <div className="approved-text">
                <CheckIcon className="icon-style" />
                <Typography variant="subtitle2" gutterBottom>
                  {promotioncheck}
                </Typography>
              </div>
            )}
          </div>

          <div className="form-center">
            <div className="flex-grid">
              <Typography className="card-header" variant="h4">
                Apply Percentage Promotion
              </Typography>
              <ProductDetailsTable />
              <Typography className="card-header" variant="h6">
                Selected Cluster : {cluster} - {zone}
              </Typography>

              <TextField
                variant="outlined"
                margin="normal"
                defaultValue="-1"
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
                Actual Price : {assignedPrice}
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
                step="0.01"
                id="endDate-in-range"
                label="End Date"
                InputLabelProps={{ shrink: true, required: true }}
                name="endDate"
                autoComplete="endDate"
                onChange={this.handleChangeEndDate}
                autoFocus
              />
              {promotionDetails.endDate > promotionDetails.startDate &&
                promotionDetails.promotionPercentage < 0 && (
                  <Button
                    halfWidth
                    type="button"
                    variant="contained"
                    color="primary"
                    className="{classes.submit} submit-pad"
                    onClick={this.handleSubmit}
                    id="apply-cluster-percentage"
                  >
                    Apply Promotion to Cluster
                  </Button>
                )}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

DefinePromotionInCluster.propTypes = {
  productName: PropTypes.string.isRequired,
  zone: PropTypes.string.isRequired,
  cluster: PropTypes.string.isRequired,
  postPromotion: PropTypes.func.isRequired,
  history: PropTypes.shape.isRequired,
  assignedPrice: PropTypes.string.isRequired,
}
const stateAsProps = (store) => ({
  productDetails: store.RetailerReducer.productDetails,
  productName: store.RetailerReducer.productName,
  zone: store.RetailerReducer.zone,
  cluster: store.RetailerReducer.cluster,
  assignedPrice: store.RetailerReducer.assignedPrice,
})

const actionAsProps = {
  postPromotion,
}
export default connect(stateAsProps, actionAsProps)(DefinePromotionInCluster)
