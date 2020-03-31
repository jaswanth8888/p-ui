import {
  InputLabel,
  Select,
  Table,
  TextField,
  Typography
} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Paper from "@material-ui/core/Paper";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import React, { Component } from "react";
import { connect } from "react-redux";

import "./AddProducts.css";
import "./Table.css";
import ProductDetails from "../utils/ProductDetails";

import "./StoreForm.css";

class AssignToZone extends Component {
  constructor(props) {
    super(props);

    this.state = {

    };

  }

  render() {
    return (
      <div className="box-container store-form">
        <div className="joint-form" style={{ width: "850px" }}>
          <Typography
            color="primary"
            component="h1"
            variant="h4"
            style=
            {{
              fontFamily: "font-family: 'Open Sans', sans-serif;",
              position: "absolute",
              top: "210px",
              left: "40px"
            }}>
            Assign to Zone
        </Typography>
          <div className="store-requirement">
            <h3 style={{ textAlign: "center" }}>Requirements</h3>
          </div>
        </div>

      </div>
    );
  }
}

const stateAsProps = store => ({

});

const actionAsProps = {

};

export default connect(stateAsProps, actionAsProps)(AssignToZone);
