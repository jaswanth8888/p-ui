import React, { Component } from "react"
import { connect } from "react-redux"
import PropTypes from "prop-types"
import { getEffecticePriceChangeProducts } from "../../redux/actions/RetailerActions"

class CancelEffectivePriceChange extends Component {
  constructor(props) {
    super(props)

    this.state = {}

    this.handleChange = this.handleChange.bind(this)
  }

  // eslint-disable-next-line camelcase
  UNSAFE_componentWillMount() {
    const {
      getEffecticePriceChangeProducts: getEffecticePriceChangeProductsAlt,
    } = this.props
    getEffecticePriceChangeProductsAlt()
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

CancelEffectivePriceChange.propTypes = {
  // priceChangeProductsList: PropTypes.arrayOf.isRequired,
  getEffecticePriceChangeProducts: PropTypes.func.isRequired,
}

const stateAsProps = (store) => ({
  priceChangeProductsList: store.RetailerReducer.priceChangeProductsList,
})

const actionAsProps = {
  getEffecticePriceChangeProducts,
}

export default connect(stateAsProps, actionAsProps)(CancelEffectivePriceChange)
