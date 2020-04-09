import { TextField, Typography } from "@material-ui/core"
import Button from "@material-ui/core/Button"
import React, { Component } from "react"
import CheckIcon from "@material-ui/icons/Check"
import ClearIcon from "@material-ui/icons/Clear"
import Alert from "@material-ui/lab/Alert"
import IconButton from "@material-ui/core/IconButton"
import CloseIcon from "@material-ui/icons/Close"
import { connect } from "react-redux"
import {
  getProductDetails,
  postPromotion,
} from "../../redux/actions/RetailerActions"
import ProductDetailsTable from "../utils/ProductDetailsTable"

class DefinePromotionInZone extends Component {
  constructor(props) {
    super(props)

    this.state = {
      promotionDetails: {
        appliedDate: new Date().toISOString().slice(0, 10),
        startDate: "",
        endDate: "",
        promotionPercentage: "",
        zoneName: this.props.zone,
      },
      startDate: "",
      endDate: "",
      promotionPercentage: "",
      levelOption: "zone",
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
    this.props.history.push("/view/promotions/zone")
  }

  handleChangePercentage(e) {
    const percentage = e.target.value
    this.state.promotionPercentage = percentage
    this.state.promotionDetails.promotionPercentage = percentage
  }

  handleChangeStartDate(e) {
    const start = e.target.value
    this.state.startDate = start
    this.state.promotionDetails.startDate = start
  }

  handleChangeEndDate(e) {
    const end = e.target.value
    this.state.endDate = end
    this.state.promotionDetails.endDate = end
  }

  render() {
    return (
      <div className="box-container">
        <div className="joint-form-large-table">
          <div className="store-requirement">
            <h3 className="center-h3">Requirements</h3>
            {this.state.startDate.length == 0 && (
              <div style={{ display: "flex" }}>
                <ClearIcon style={{ paddingRight: "5px", marginTop: "-2px" }} />
                <Typography variant="subtitle2" gutterBottom>
                  Enter a valid Start Date
                </Typography>
              </div>
            )}
            {this.state.startDate.length != 0 && (
              <div style={{ display: "flex", color: "#ffc107" }}>
                <CheckIcon style={{ paddingRight: "5px", marginTop: "-2px" }} />
                <Typography variant="subtitle2" gutterBottom>
                  Enter a valid Start Date
                </Typography>
              </div>
            )}
            {this.state.endDate.length == 0 && (
              <div style={{ display: "flex" }}>
                <ClearIcon style={{ paddingRight: "5px", marginTop: "-2px" }} />
                <Typography variant="subtitle2" gutterBottom>
                  Enter a valid End Date
                </Typography>
              </div>
            )}
            {this.state.endDate.length != 0 && (
              <div style={{ display: "flex", color: "#ffc107" }}>
                <CheckIcon style={{ paddingRight: "5px", marginTop: "-2px" }} />
                <Typography variant="subtitle2" gutterBottom>
                  Enter a valid End Date
                </Typography>
              </div>
            )}
            {this.state.endDate <= this.state.startDate && (
              <div style={{ display: "flex" }}>
                <ClearIcon style={{ paddingRight: "5px", marginTop: "-2px" }} />
                <Typography variant="subtitle2" gutterBottom>
                  End Date has to be greater than Start Date
                </Typography>
              </div>
            )}
            {this.state.endDate > this.state.startDate && (
              <div style={{ display: "flex", color: "#ffc107" }}>
                <CheckIcon style={{ paddingRight: "5px", marginTop: "-2px" }} />
                <Typography variant="subtitle2" gutterBottom>
                  End Date has to be greater than Start Date
                </Typography>
              </div>
            )}
            {this.state.promotionPercentage >= 0 && (
              <div style={{ display: "flex" }}>
                <ClearIcon style={{ paddingRight: "5px", marginTop: "-2px" }} />
                <Typography variant="subtitle2" gutterBottom>
                  Promotion percentage has to be lesser than 0
                </Typography>
              </div>
            )}
            {this.state.promotionPercentage < 0 && (
              <div style={{ display: "flex", color: "#ffc107" }}>
                <CheckIcon style={{ paddingRight: "5px", marginTop: "-2px" }} />
                <Typography variant="subtitle2" gutterBottom>
                  Promotion percentage has to be lesser than 0
                </Typography>
              </div>
            )}
          </div>

          <div className="form-center">
            <div className="flex-grid">
              {this.props.productDetails.assignProduct.length > 0 && (
                <div>
                  <Alert
                    severity="info"
                    action={
                      <IconButton
                        aria-label="close"
                        color="inherit"
                        size="small"
                      >
                        <CloseIcon fontSize="inherit" />
                      </IconButton>
                    }
                  >
                    Product: {this.props.productDetails.productName} already has
                    promotion applied
                  </Alert>
                </div>
              )}
              <Typography className="card-header" variant="h4">
                Apply Percentage Promotion
              </Typography>
              <ProductDetailsTable />
              <br />
              <Typography className="card-header" variant="h6">
                Selected Zone : {this.props.zone}
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
              {/* {this.state.endDate > this.state.startDate &&
                this.state.promotionPercentage !== "" && ( */}
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
                Apply Promotion to Zone
              </Button>
                {/* )} */}
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
  statusCode: store.RetailerReducer.statusCode,
})

const actionAsProps = {
  getProductDetails,
  postPromotion,
}
export default connect(stateAsProps, actionAsProps)(DefinePromotionInZone)
