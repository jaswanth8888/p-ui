import { InputLabel, Select, TextField, Typography } from "@material-ui/core"
import Button from "@material-ui/core/Button"
import FormControl from "@material-ui/core/FormControl"
import React, { Component } from "react"
import { connect } from "react-redux"
import PropTypes from "prop-types"
import { getZones, assignToZone } from "../../redux/actions/RetailerActions"
import ProductDetails from "../utils/ProductDetails"
import Message from "../utils/Message"

class AssignToZone extends Component {
  constructor(props) {
    super(props)

    this.state = {
      zoneName: "",
      zoneDetails: {},
    }

    this.handleChangeZoneName = this.handleChangeZoneName.bind(this)
    this.handleChangeProfitPecentage = this.handleChangeProfitPecentage.bind(
      this
    )
    this.handleChangeQuantity = this.handleChangeQuantity.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    const { getZones: getZonesAlt } = this.props
    getZonesAlt()
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const { assignToZone: assignToZoneAlt, productName } = this.props
    const { zoneDetails, zoneName } = this.state
    assignToZoneAlt(zoneDetails, zoneName, productName)
  }

  handleChangeZoneName(e) {
    this.setState({ zoneName: e.target.value })
  }

  handleChangeQuantity(e) {
    const dquantity = e.target.value
    const { zoneDetails } = this.state
    zoneDetails.quantityAssigned = dquantity
    this.setState({ zoneDetails })
  }

  handleChangeProfitPecentage(e) {
    const dpercentage = e.target.value
    const { zoneDetails } = this.state
    zoneDetails.profitPercentage = dpercentage
    this.setState({ zoneDetails })
  }

  render() {
    const { statusCode, history, zones } = this.props
    const { zoneDetails } = this.state
    return (
      <null>
        {statusCode === 200 ? (
          history.push("/view/assigned/zones")
        ) : (
          <div className="box-container">
            <div className="joint-form-large">
              <ProductDetails />
              <div className="product-form-body">
                <Typography className="card-header" variant="h4">
                  Assign to Zone
                </Typography>
                <form className="{classes.form}" noValidate>
                  <FormControl variant="outlined" fullWidth>
                    <InputLabel htmlFor="outlined-age-native-simple">
                      Enter Zone
                    </InputLabel>
                    <Select
                      fullWidth
                      native
                      onChange={this.handleChangeZoneName}
                      label="Enter zone"
                      inputProps={{
                        name: "zone",
                        id: "zone",
                      }}
                    >
                      <option aria-label="None" value="" />
                      {zones.map((zoneVal) => {
                        return <option value={zoneVal}>{zoneVal}</option>
                      })}
                    </Select>
                  </FormControl>

                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="zoneQuantity"
                    label="zoneQuantity"
                    name="zoneQuantity"
                    type="number"
                    onChange={this.handleChangeQuantity}
                    value={zoneDetails.quantityAssigned}
                    autoFocus
                  />

                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="zoneProfitPercentage"
                    label="zoneProfitPercentage"
                    name="zoneProfitPercentage"
                    type="number"
                    onChange={this.handleChangeProfitPecentage}
                    value={zoneDetails.profitPercentage}
                    autoFocus
                  />

                  <Button
                    fullWidth
                    type="button"
                    variant="contained"
                    color="primary"
                    className="{classes.submit} submit-pad"
                    onClick={this.handleSubmit}
                    id="assign-zone-submit"
                  >
                    Save
                  </Button>
                </form>
              </div>
            </div>
            <Message />
          </div>
        )}
      </null>
    )
  }
}

AssignToZone.propTypes = {
  productName: PropTypes.string.isRequired,
  statusCode: PropTypes.number.isRequired,
  zones: PropTypes.arrayOf.isRequired,
  getZones: PropTypes.func.isRequired,
  assignToZone: PropTypes.func.isRequired,
  history: PropTypes.shape.isRequired,
}

const stateAsProps = (store) => ({
  zones: store.RetailerReducer.zones,
  productName: store.RetailerReducer.productName,
  statusCode: store.RetailerReducer.statusCode,
})

const actionAsProps = {
  getZones,
  assignToZone,
}

export default connect(stateAsProps, actionAsProps)(AssignToZone)
