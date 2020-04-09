import { InputLabel, Typography } from "@material-ui/core"
import Button from "@material-ui/core/Button"
import TextField from "@material-ui/core/TextField"
import CheckIcon from "@material-ui/icons/Check"
import ClearIcon from "@material-ui/icons/Clear"
import Radio from "@material-ui/core/Radio"
import RadioGroup from "@material-ui/core/RadioGroup"
import FormControlLabel from "@material-ui/core/FormControlLabel"
import FormControl from "@material-ui/core/FormControl"
import FormLabel from "@material-ui/core/FormLabel"
import React, { Component } from "react"
import { connect } from "react-redux"
import {
  getPromotionsInRange,
  saveLevelValue,
  saveStartDate,
  saveEndDate,
} from "../../redux/actions/RetailerActions"

class QueryOnDateRange extends Component {
  constructor(props) {
    super(props)
    this.state = {
      startDate: "",
      endDate: "",
      levelOption: "",
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit = (e) => {
    console.log(this.state.levelOption)
    console.log(this.state.startDate)
    console.log(this.state.endDate)
    this.props.saveLevelValue(this.state.levelOption)
    this.props.saveStartDate(this.state.startDate)
    this.props.saveEndDate(this.state.endDate)
    this.props.getPromotionsInRange(this.state.startDate, this.state.endDate, this.state.levelOption)
    this.props.history.push("/view/promotions")
  }

  handleChange(e) {
    const { name, value } = e.target
    this.setState({ [name]: value })
  }

  render() {
    return (
      <div className="box-container">
        <div className="joint-form">
          <div className="validation-half">
            <div className="validations">
              <h3 style={{ textAlign: "center" }}>Requirements</h3>
              {this.state.startDate.length == 0 && (
                <div style={{ display: "flex" }}>
                  <ClearIcon
                    style={{ paddingRight: "5px", marginTop: "-2px" }}
                  />
                  <Typography variant="subtitle2" gutterBottom>
                    Enter a valid Start Date
                  </Typography>
                </div>
              )}
              {this.state.startDate.length != 0 && (
                <div style={{ display: "flex", color: "#ffc107" }}>
                  <CheckIcon
                    style={{ paddingRight: "5px", marginTop: "-2px" }}
                  />
                  <Typography variant="subtitle2" gutterBottom>
                    Enter a valid Start Date
                  </Typography>
                </div>
              )}
              {this.state.endDate.length == 0 && (
                <div style={{ display: "flex" }}>
                  <ClearIcon
                    style={{ paddingRight: "5px", marginTop: "-2px" }}
                  />
                  <Typography variant="subtitle2" gutterBottom>
                    Enter a valid End Date
                  </Typography>
                </div>
              )}
              {this.state.endDate.length != 0 && (
                <div style={{ display: "flex", color: "#ffc107" }}>
                  <CheckIcon
                    style={{ paddingRight: "5px", marginTop: "-2px" }}
                  />
                  <Typography variant="subtitle2" gutterBottom>
                    Enter a valid End Date
                  </Typography>
                </div>
              )}
              {this.state.endDate <= this.state.startDate && (
                <div style={{ display: "flex" }}>
                  <ClearIcon
                    style={{ paddingRight: "5px", marginTop: "-2px" }}
                  />
                  <Typography variant="subtitle2" gutterBottom>
                    End Date has to be greater than Start Date
                  </Typography>
                </div>
              )}
              {this.state.endDate > this.state.startDate && (
                <div style={{ display: "flex", color: "#ffc107" }}>
                  <CheckIcon
                    style={{ paddingRight: "5px", marginTop: "-2px" }}
                  />
                  <Typography variant="subtitle2" gutterBottom>
                    End Date has to be greater than Start Date
                  </Typography>
                </div>
              )}
              {this.state.levelOption === "" && (
                <div style={{ display: "flex" }}>
                  <ClearIcon
                    style={{ paddingRight: "5px", marginTop: "-2px" }}
                  />
                  <Typography variant="subtitle2" gutterBottom>
                    Select level option
                  </Typography>
                </div>
              )}
              {this.state.levelOption !== "" && (
                <div style={{ display: "flex", color: "#ffc107" }}>
                  <CheckIcon
                    style={{ paddingRight: "5px", marginTop: "-2px" }}
                  />
                  <Typography variant="subtitle2" gutterBottom>
                    Select level option
                  </Typography>
                </div>
              )}
            </div>
          </div>
          <div className="form-half">
            <form className="{classes.form}" noValidate>
              <div>
                <div className="help-block">
                  <Typography color="primary" component="h1" variant="h4">
                    Promotions for Products
                  </Typography>
                </div>
              </div>

              <TextField
                id="startDate-query"
                label="Start Date"
                name="startDate"
                fullWidth
                value={this.state.startDate}
                type="date"
                variant="outlined"
                margin="normal"
                autoComplete="startDate"
                required
                onChange={this.handleChange}
                autoFocus
                InputLabelProps={{ shrink: true, required: true }}
              />
              <TextField
                id="endDate-query"
                name="endDate"
                label="End Date"
                fullWidth
                value={this.state.endDate}
                type="date"
                variant="outlined"
                margin="normal"
                autoComplete="endDate"
                required
                onChange={this.handleChange}
                autoFocus
                InputLabelProps={{ shrink: true, required: true }}
              />

              <FormControl>
                <Typography variant="h6">Level Option</Typography>
                <RadioGroup
                  row
                  aria-label="condition"
                  name="levelOption"
                  value={this.state.levelOption}
                  onChange={this.handleChange}
                >
                  <FormControlLabel
                    value="zone"
                    control={<Radio />}
                    label="Zone"
                  />
                  <FormControlLabel
                    value="cluster"
                    control={<Radio />}
                    label="Cluster"
                  />
                </RadioGroup>
              </FormControl>

              {this.state.endDate > this.state.startDate &&
                this.state.levelOption !== "" && (
                  <Button
                    type="button"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className="{classes.submit}"
                    style={{
                      marginTop: "30px",
                      marginBottom: "30px",
                    }}
                    id="query-submit"
                    onClick={this.handleSubmit}
                  >
                    Show Promotions
                  </Button>
                )}
            </form>
          </div>
        </div>
      </div>
    )
  }
}
const stateAsProps = (store) => ({
  products: store.RetailerReducer.products,
})
const actionAsProps = {
  getPromotionsInRange,
  saveLevelValue,
  saveStartDate,
  saveEndDate,
}

export default connect(stateAsProps, actionAsProps)(QueryOnDateRange)
