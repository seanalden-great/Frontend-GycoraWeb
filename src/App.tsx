import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/user/Home";
import { CartProvider } from "./context/CartContext";
import UserLogin from "./pages/user/auth/UserLogin";
import UserRegister from "./pages/user/auth/UserRegister";
import PublicCatalog from "./pages/user/products/PublicCatalog";
import ProductDetail from "./pages/user/products/ProductDetail";
import ContactUs from "./pages/user/ContactUs";
import UserProfile from "./pages/user/UserProfile";
import PrivacyPolicy from "./pages/user/legal/PrivacyPolicy";
// import CheckoutPage from "./pages/user/CheckoutPage";
import AdminLayout from "./pages/admin/AdminLayout";
import AdminCategories from "./pages/admin/AdminCategories";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminProducts from "./pages/admin/AdminProducts";
import AddProduct from "./pages/admin/AddProduct";
import EditProduct from "./pages/admin/EditProduct";
import AdminProductDetail from "./pages/admin/AdminProductDetail";
import AdminUsersList from "./pages/admin/AdminUserList";
import OrderPage from "./pages/user/OrderPage";
import RequestReturn from "./pages/user/RequestReturn";
import RefundPolicy from "./pages/user/RefundPolicy";
import ShippingPolicy from "./pages/user/ShippingPolicy";
import HelpCenter from "./pages/user/HelpCenter";
import TermsOfService from "./pages/user/TermsOfService";
import FAQPage from "./pages/user/FAQPage";
import CartPage from "./pages/user/CartPage";
import PaymentPage from "./pages/user/PaymentPage";
import AdminProductStock from "./pages/admin/AdminProductStock";
import TrackingPage from "./pages/user/TrackingPage";
import TransactionPage from "./pages/admin/TransactionPage";
import TransactionDetailPage from "./pages/admin/TransactionDetailPage";
import SalesReportPage from "./pages/admin/SalesReportPage";
import PaymentSuccessPage from "./pages/user/PaymentSuccessPage";

function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const isAdminArea = location.pathname.startsWith("/admin");
  const isAuthPage =
    location.pathname === "/login" || location.pathname === "/register";

  // Jika ini area admin, LayoutWrapper murni me-return children tanpa Header/Footer publik
  if (isAdminArea) return <>{children}</>;

  const shouldShowHeaderFooter = !isAuthPage;

  return (
    <div className="flex flex-col min-h-screen font-sans text-gray-900 bg-white">
      {shouldShowHeaderFooter && <Header />}
      <main className="flex flex-col flex-1">{children}</main>
      {shouldShowHeaderFooter && <Footer />}
    </div>
  );
}

export default function App() {
  return (
    <CartProvider>
      <Router>
        <LayoutWrapper>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<UserLogin />} />{" "}
            {/* <-- Tambahkan ini */}
            <Route path="/register" element={<UserRegister />} />{" "}
            {/* <-- Tambahkan ini */}
            <Route path="/profile" element={<UserProfile />} />
            {/* Rute Produk */}
            <Route path="/products" element={<PublicCatalog />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/orders" element={<OrderPage />} />
            <Route path="/legal/privacy" element={<PrivacyPolicy />} />
            <Route path="/returns/request" element={<RequestReturn />} />
            <Route path="/policies/refund" element={<RefundPolicy />} />
            <Route path="/policies/shipping" element={<ShippingPolicy />} />
            <Route path="/help-center" element={<HelpCenter />} />
            <Route path="/legal/terms" element={<TermsOfService />} />
            <Route path="/faq" element={<FAQPage />} />
            <Route path="/cart" element={<CartPage />} />
            {/* <Route path="/checkout" element={<CheckoutPage />} /> */}
            <Route path="/checkout" element={<PaymentPage />} />
            <Route path="/payment-success" element={<PaymentSuccessPage />} />
            <Route path="/tracking/:id" element={<TrackingPage />} />
            {/* Tambahkan Route lainnya (profile, checkout, dll) di sini nanti */}

            
            {/* --- RUTE KHUSUS ADMIN --- */}
            {/* Semua rute admin dibungkus manual menggunakan element AdminLayout */}
            <Route
              path="/admin/categories"
              element={
                <AdminLayout>
                  <AdminCategories />
                </AdminLayout>
              }
            />
            {/* --- RUTE KHUSUS ADMIN --- */}
            <Route
              path="/admin/login"
              element={
                <AdminLayout>
                  <AdminLogin />
                </AdminLayout>
              }
            />
            <Route
              path="/admin/dashboard"
              element={
                <AdminLayout>
                  <AdminDashboard />
                </AdminLayout>
              }
            />
            <Route
              path="/admin/products"
              element={
                <AdminLayout>
                  <AdminProducts />
                </AdminLayout>
              }
            />
            <Route
              path="/admin/products/create"
              element={
                <AdminLayout>
                  <AddProduct />
                </AdminLayout>
              }
            />
            <Route
              path="/admin/products/:id/edit"
              element={
                <AdminLayout>
                  <EditProduct />
                </AdminLayout>
              }
            />
            <Route
              path="/admin/products/:id"
              element={
                <AdminLayout>
                  <AdminProductDetail />
                </AdminLayout>
              }
            />
            <Route
              path="/admin/stocks"
              element={
                <AdminLayout>
                  <AdminProductStock />
                </AdminLayout>
              }
            />
            <Route
              path="/admin/transactions"
              element={
                <AdminLayout>
                  <TransactionPage />
                </AdminLayout>
              }
            />
            <Route
              path="/admin/transactions/:id"
              element={
                <AdminLayout>
                  <TransactionDetailPage />
                </AdminLayout>
              }
            />
            <Route
              path="/admin/users"
              element={
                <AdminLayout>
                  <AdminUsersList />
                </AdminLayout>
              }
            />
            <Route
              path="/admin/sales-report"
              element={
                <AdminLayout>
                  <SalesReportPage />
                </AdminLayout>
              }
            />
            {/* Contoh untuk nanti jika ingin menambah Dashboard/Login Admin:
            <Route path="/admin/login" element={<AdminLayout><AdminLogin /></AdminLayout>} />
            <Route path="/admin/dashboard" element={<AdminLayout><AdminDashboard /></AdminLayout>} />
            */}
          </Routes>
        </LayoutWrapper>
      </Router>
    </CartProvider>
  );
}
