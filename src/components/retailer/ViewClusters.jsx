import React, { Component } from "react";
import { connect } from "react-redux";
import { getClusterList } from "../../redux/actions/RetailerActions";
import { Table } from "@material-ui/core";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { withTranslation } from "react-i18next";

class ViewClusters extends Component {
  constructor(props) {
    super(props);

    this.props.getClusterList();
  }

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
                <TableCell>{t("clusterList.clusterName")}</TableCell>
                <TableCell>{t("clusterList.numberOfStores")}</TableCell>
              </TableRow>
            </TableHead>
            <tbody>
              {Object.keys(this.props.clusterList).map(i => {
                return (
                  <TableRow>
                    <TableCell key={i} value={i}>
                      {i}
                    </TableCell>
                    <TableCell>{this.props.clusterList[i]}</TableCell>
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
  clusterList: store.RetailerReducer.clusterList
});
const actionAsProps = {
  getClusterList: getClusterList
};
export default connect(
  stateAsProps,
  actionAsProps
)(withTranslation()(ViewClusters));
