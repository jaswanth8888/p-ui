import React, { Component } from "react";
import { connect } from "react-redux";
import { getZoneList } from "../../redux/actions/RetailerActions";
import { Table } from "@material-ui/core";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { withTranslation } from "react-i18next";

class ViewZones extends Component {
  constructor(props) {
    super(props);
    this.props.getZoneList();
  }

  func = () => {
    console.log("hello");
    console.log(this.props.getZoneList);
  };
  render() {
    const { t, i18n } = this.props;
    return (
      <div className="container">
        <br />
        <br />
        <br />
        <br />
        <TableContainer component={Paper}>
          <Table size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell>{t("zoneList.zoneName")}</TableCell>
                <TableCell>{t("zoneList.numberOfClusters")}</TableCell>
              </TableRow>
            </TableHead>
            <tbody>
              {Object.keys(this.props.zoneList).map(i => {
                return (
                  <TableRow>
                    <TableCell key={i} value={i}>
                      {i}
                    </TableCell>
                    <TableCell>{this.props.zoneList[i]}</TableCell>
                  </TableRow>
                );
              })}
            </tbody>
          </Table>
        </TableContainer>
      </div>
    );
  }
}

const stateAsProps = store => ({
  zoneList: store.RetailerReducer.zoneList
});
const actionAsProps = {
  getZoneList: getZoneList
};
export default connect(
  stateAsProps,
  actionAsProps
)(withTranslation()(ViewZones));
