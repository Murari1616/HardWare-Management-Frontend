import { lazy } from "react";

// Lazy Load Components
export const ProductCreation = lazy(() => import("./pages/product/ProductCreation"));
export const Product = lazy(() => import("./pages/product/Product"));
export const RentCreation = lazy(() => import("./pages/rent/RentCreation"));
export const RentList = lazy(() => import("./pages/rent/RentList"));
export const OrderHistory = lazy(() => import("./pages/customer/OrderHistory"));
export const RulesPage = lazy(() => import("./pages/customer/RulesPage"));
export const Login = lazy(() => import("./pages/auth/Login"));
export const Register = lazy(() => import("./pages/auth/Register"));
export const RentSuccess = lazy(() => import("./pages/rent/RentSuccess"));
