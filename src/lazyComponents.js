import { lazy } from "react";

// Lazy Load Components
export const ProductCreation = lazy(() => import("./pages/product/ProductCreation"));
export const Product = lazy(() => import("./pages/product/Product"));
export const RentCreation = lazy(() => import("./pages/rent/RentCreation"));
export const RentList = lazy(() => import("./pages/rent/RentList"));
