import React, { Component } from "react"
import { connect } from "react-redux"
import PropTypes from "prop-types"
import { getNotEffecticePriceChangeProducts } from "../../redux/actions/RetailerActions"

class CancelNotEffectivePriceChange extends Component {
  constructor(props) {
    super(props)

    this.state = {}

    this.handleChange = this.handleChange.bind(this)
  }

  // eslint-disable-next-line camelcase
  UNSAFE_componentWillMount() {
    const {
      getNotEffecticePriceChangeProducts: getNotEffecticePriceChangeProductsAlt,
    } = this.props
    getNotEffecticePriceChangeProductsAlt()
  }

  render() {
    return (
      <div className="box-container">
        <div className="joint-form-large">
          <p>A</p>
        </div>
      </div>
    )
  }
}

CancelNotEffectivePriceChange.propTypes = {
  // priceChangeProductsList: PropTypes.arrayOf.isRequired,
  getNotEffecticePriceChangeProducts: PropTypes.func.isRequired,
}

const stateAsProps = (store) => ({
  priceChangeProductsList: store.RetailerReducer.priceChangeProductsList,
})

const actionAsProps = {
  getNotEffecticePriceChangeProducts,
}

export default connect(
  stateAsProps,
  actionAsProps
)(CancelNotEffectivePriceChange)
