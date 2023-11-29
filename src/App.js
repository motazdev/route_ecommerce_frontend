import Register from "./pages/Auth/Register.jsx";
import Home from "./pages/Home.jsx";
import { Routes, Route } from "react-router-dom";
import SentConfirmEmail from "./pages/Auth/SentConfirmEmail.jsx";
import Profile from "./pages/Profile.jsx";
import Login from "./pages/Auth/Login.jsx";
import PresistLogin from "./utils/PresistLogin.js";
import RequireAuth from "./utils/RequireAuth.jsx";
import { Layout } from "./components/layout/Layout.jsx";
import { Category } from "./pages/Category.jsx";
import { ProductView } from "./pages/ProductView.jsx";
import { CartView } from "./pages/CartView.jsx";
import { Offers } from "./pages/Offers.jsx";
import { ProfileLayout } from "./components/layout/ProfileLayout.jsx";
import { ForgetPassword } from "./pages/Auth/ForgetPassword.jsx";
import { ResetPassword } from "./pages/Auth/ResetPassword.jsx";
import { Returns } from "./pages/Returns.jsx";
import { OrderSuccess } from "./pages/Order/OrderSuccess.jsx";
import { OrderCancel } from "./pages/Order/OrderCancel.jsx";
import { UserOrders } from "./pages/UserOrders.jsx";
import { PageNotFound } from "./pages/PageNotFound.jsx";
import { About } from "./pages/About.jsx";
import { Contact } from "./pages/Contact.jsx";
import { Terms } from "./pages/Terms.jsx";

function App() {
  return (
    <>
      <Routes>
        <Route path="*" element={<PageNotFound />} />
        {/* Public */}
        <Route element={<PresistLogin />}>
          <Route element={<Layout />}>
            <Route exact path="/" element={<Home />} />
            <Route
              exact
              path="/category/:categorySlug"
              element={<Category />}
            />
            <Route exact path="/pview/:productSlug" element={<ProductView />} />
            <Route exact path="/offers" element={<Offers />} />
            <Route exact path="/order/success" element={<OrderSuccess />} />
            <Route exact path="/order/cancel" element={<OrderCancel />} />
            <Route exact path="/about" element={<About />} />
            <Route exact path="/contact" element={<Contact />} />
            <Route exact path="/terms" element={<Terms />} />
          </Route>
          {/* Routes That don't need layout */}
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/confirm-email" element={<SentConfirmEmail />} />
          <Route exact path="/forgetpassword" element={<ForgetPassword />} />
          <Route exact path="/resetpassword" element={<ResetPassword />} />
        </Route>

        {/* Protected */}
        <Route element={<PresistLogin />}>
          <Route element={<RequireAuth />}>
            <Route element={<ProfileLayout />}>
              <Route exact path="/profile" element={<Profile />} />
              <Route exact path="/returns" element={<Returns />} />
              <Route exact path="/orders" element={<UserOrders />} />
            </Route>
            <Route element={<Layout />}>
              <Route exact path="/cart" element={<CartView />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
