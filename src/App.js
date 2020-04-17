import React from "react"
import { Provider } from "react-redux"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import FullNavbar from "./components/organisms/FullNavbar"
import VendorLogin from "./components/vendor/VendorLogin"
// eslint-disable-next-line import/no-named-as-default
import Registration from "./components/vendor/Registration"
import Home from "./components/vendor/Home"
import Addproduct from "./components/vendor/AddProduct"
import PrivateRoute from "./components/utils/privateRoute"
import store from "./redux/store"
import SelectProduct from "./components/vendor/SelectProduct"
import EditItemPrice from "./components/vendor/EditItemPrice"

const App = () => {
  const retailerRoutes = [
    "/group",
    "/products/store",
    "/zone",
    "/cluster",
    "/store",
    "/view/zones",
    "/view/clusters",
    "/products/assign",
    "/view/products/daterange",
    "/selectproductname",
    "/addproducts",
    "/selectproduct",
    "/assigntocluster",
    "/assigntozone",
    "/view/assigned/zones",
    "/view/assigned/clusters",
    "/view/products/daterange",
    "/view/effectiveprices",
    "/queryondaterange",
    "/showproducts",
    "/selectproductname",
    "/addpromotion",
    "/cancel/promotion",
    "/cancel/productdetails",
    "/withdraw/zonepromotion",
    "/withdraw/zoneproduct",
    "/withdraw/clusterpromotion",
    "/withdraw/clusterproduct",
    "/applypromotion/zone",
    "/definepromotion/zone",
    "/view/promotions/zone",
    "/applypromotion/cluster",
    "/definepromotion/cluster",
    "/view/promotions/cluster",
    "/editprice",
    "/product/pricechange/canceleffective",
    "/product/pricechange/cancelnoteffective",
  ]
  return (
    <Provider store={store}>
      <div>
        <Router>
          <Switch>
            <Route exact path="/" component={FullNavbar} />
            {retailerRoutes.map((route) => {
              return <PrivateRoute component={FullNavbar} path={route} />
            })}
            <Route exact path="/vendor" component={VendorLogin} />
            <Route exact path="/vendor/reg" component={Registration} />
            <Route exact path="/vendor/home" component={Home} />
            <Route exact path="/vendor/addproduct" component={Addproduct} />
            <Route exact path="/vendor/updateprice" component={SelectProduct} />
            <Route exact path="/vendor/editproduct" component={EditItemPrice} />
          </Switch>
        </Router>
      </div>
    </Provider>
  )
}
export default App
