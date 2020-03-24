import React, { Component } from "react";
import { connect } from "react-redux";
import { getZoneList } from "../../redux/actions/RetailerActions";
import { Avatar, Box, Grid, Table } from "@material-ui/core";
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

  render() {
    const { t, i18n } = this.props;

    return (
      <div
        className="box-container"
        style={{ alignItems: "flex-start", marginTop: "150px" }}
      >
        <TableContainer
          component={Paper}
          style={{ width: "500px", textAlign: "center" }}
        >
          <Table size="small" aria-label="a dense table">
            <TableHead style={{ backgroundColor: "#673ab7" }}>
              <TableRow>
                <TableCell
                  style={{
                    color: "#FFF",
                    width: "250px",
                    textAlign: "center"
                  }}
                >
                  {t("zoneList.zoneName")}
                </TableCell>
                <TableCell
                  style={{
                    color: "#FFF",
                    width: "250px",
                    textAlign: "center"
                  }}
                >
                  {t("zoneList.numberOfClusters")}
                </TableCell>
              </TableRow>
            </TableHead>
            <tbody>
              {Object.keys(this.props.zoneList).map(i => {
                return (
                  <TableRow>
                    <TableCell
                      key={i}
                      value={i}
                      style={{ textAlign: "center" }}
                    >
                      {i}
                    </TableCell>
                    <TableCell style={{ textAlign: "center" }}>
                      {this.props.zoneList[i]}
                    </TableCell>
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
