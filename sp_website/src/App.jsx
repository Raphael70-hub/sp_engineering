import './App.css'
import Home from "./pages/Home.jsx";
import { Routes, Route } from "react-router-dom";
import Products from "./pages/Products.jsx";
import ProductDetail from "./pages/ProductDetail.jsx";
import Services from "./pages/Services.jsx";
import AboutUs from "./pages/AboutUs.jsx";
import CartPage from "./pages/CartPage.jsx";
import CheckoutPage from "./pages/CheckoutPage.jsx";
import OrderConfirmation from "./pages/OrderConfirmation.jsx";
import ContactPage from "./pages/ContactPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import OrderHistory from "./pages/OrderHistory.jsx";
import OrderDetail from "./pages/OrderDetail.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import ReviewsPage from "./pages/ReviewsPage.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";
import AdminProducts from "./pages/AdminProducts.jsx";
import AdminOrders from "./pages/AdminOrders.jsx";
import AdminOrderDetail from "./pages/AdminOrderDetail.jsx";
import AdminProductDetail from "./pages/AdminProductDetail.jsx";
import AdminUsers from "./pages/AdminUsers.jsx";
import AdminPayments from "./pages/AdminPayments.jsx";
import AdminCategory from "./pages/AdminCategory.jsx";
import AdminPaymentDetail from "./pages/AdminPaymentDetail.jsx";
import AdminRentals from "./pages/AdminRentals.jsx";
import AdminRentalDetail from "./pages/AdminRentalDetail.jsx";
import CheckoutRentalPage from "./pages/CheckoutRentalPage.jsx";
import CheckoutProductsPage from "./pages/CheckoutProductsPage.jsx";
import RentalHistory from "./pages/RentalHistory.jsx";
import RentalDetail from "./pages/RentalDetail.jsx";
import VerifyEmail from "./pages/VerifyEmail.jsx";
import { Toaster } from "react-hot-toast";
import PrivateRoute from "./components/PrivateRoute.jsx";
import AdminRoute from "./components/AdminRoute.jsx";
import ForgotPasswordPage from "./pages/ForgotPasswordPage.jsx";
import ResetPasswordPage from "./pages/ResetPasswordPage.jsx";

function App() {

  return (
      <>
              <Toaster position="top-right" toastOptions={{ duration: 3000 }} />
              <Routes>
                      {/* Public Routes */}
                      <Route path="/" element={<Home />} />
                      <Route path="/products" element={<Products />} />
                      <Route path="/product/:id" element={<ProductDetail />} />
                      <Route path="/services" element={<Services />} />
                      <Route path="/about" element={<AboutUs />} />
                      <Route path="/contact" element={<ContactPage />} />
                      <Route path="/login" element={<LoginPage />} />
                      <Route path="/register" element={<RegisterPage />} />
                      <Route path="/verify/:token" element={<VerifyEmail />} />
                  <Route path="/forgot-password" element={<ForgotPasswordPage />} />
                  <Route path="/reset-password/:token" element={<ResetPasswordPage />} />

                      {/* Protected Routes (logged in users only) */}
                      <Route
                          path="/cart"
                          element={
                                  <PrivateRoute>
                                          <CartPage />
                                  </PrivateRoute>
                          }
                      />
                      <Route
                          path="/checkout/products"
                          element={
                                  <PrivateRoute>
                                          <CheckoutProductsPage />
                                  </PrivateRoute>
                          }
                      />
                      <Route
                          path="/checkout/rental"
                          element={
                                  <PrivateRoute>
                                          <CheckoutRentalPage />
                                  </PrivateRoute>
                          }
                      />
                      <Route
                          path="/order-confirmation"
                          element={
                                  <PrivateRoute>
                                          <OrderConfirmation />
                                  </PrivateRoute>
                          }
                      />
                      <Route
                          path="/orders"
                          element={
                                  <PrivateRoute>
                                          <OrderHistory />
                                  </PrivateRoute>
                          }
                      />
                      <Route
                          path="/orders/:id"
                          element={
                                  <PrivateRoute>
                                          <OrderDetail />
                                  </PrivateRoute>
                          }
                      />
                      <Route
                          path="/rentals"
                          element={
                                  <PrivateRoute>
                                          <RentalHistory />
                                  </PrivateRoute>
                          }
                      />
                      <Route
                          path="/rentals/:id"
                          element={
                                  <PrivateRoute>
                                          <RentalDetail />
                                  </PrivateRoute>
                          }
                      />
                      <Route
                          path="/profile"
                          element={
                                  <PrivateRoute>
                                          <ProfilePage />
                                  </PrivateRoute>
                          }
                      />
                      <Route
                          path="/reviews"
                          element={
                                  <PrivateRoute>
                                          <ReviewsPage />
                                  </PrivateRoute>
                          }
                      />

                      {/* Admin Routes */}
                      <Route
                          path="/admin/dashboard"
                          element={
                                  <AdminRoute>
                                          <AdminDashboard />
                                  </AdminRoute>
                          }
                      />
                      <Route
                          path="/admin/products"
                          element={
                                  <AdminRoute>
                                          <AdminProducts />
                                  </AdminRoute>
                          }
                      />
                      <Route
                          path="/admin/products/:id"
                          element={
                                  <AdminRoute>
                                          <AdminProductDetail />
                                  </AdminRoute>
                          }
                      />
                      <Route
                          path="/admin/categories"
                          element={
                                  <AdminRoute>
                                          <AdminCategory />
                                  </AdminRoute>
                          }
                      />
                      <Route
                          path="/admin/orders"
                          element={
                                  <AdminRoute>
                                          <AdminOrders />
                                  </AdminRoute>
                          }
                      />
                      <Route
                          path="/admin/orders/:id"
                          element={
                                  <AdminRoute>
                                          <AdminOrderDetail />
                                  </AdminRoute>
                          }
                      />
                      <Route
                          path="/admin/users"
                          element={
                                  <AdminRoute>
                                          <AdminUsers />
                                  </AdminRoute>
                          }
                      />
                      <Route
                          path="/admin/payments"
                          element={
                                  <AdminRoute>
                                          <AdminPayments />
                                  </AdminRoute>
                          }
                      />
                      <Route
                          path="/admin/payments/:id"
                          element={
                                  <AdminRoute>
                                          <AdminPaymentDetail />
                                  </AdminRoute>
                          }
                      />
                      <Route
                          path="/admin/rentals"
                          element={
                                  <AdminRoute>
                                          <AdminRentals />
                                  </AdminRoute>
                          }
                      />
                      <Route
                          path="/admin/rentals/:id"
                          element={
                                  <AdminRoute>
                                          <AdminRentalDetail />
                                  </AdminRoute>
                          }
                      />
              </Routes>
      </>

  )
}

export default App
