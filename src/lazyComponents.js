import { lazy } from "react";

// Lazy Load Components
export const ProductCreation = lazy(() => import("./pages/product/ProductCreation"));
export const Product = lazy(() => import("./pages/product/Product"));
