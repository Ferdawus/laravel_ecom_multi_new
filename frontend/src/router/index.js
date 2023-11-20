import { createRouter, createWebHistory } from "vue-router";
import { useAuth } from "@/stores";
import { Index, Shop, SingleProduct, Checkout } from "@/views/pages";
import { UserLogin, UserRegister } from "@/views/auth";
import { SellerApply, SellerPage, SellerStore } from "@/views/pages/seller";
import { MyOrderList, MyProfile, MyWishList } from "@/views/user";
// import { Checkout } from "../views/pages/seller";

const routes = [
  {
    path: "/",
    name: "index.page",
    component: Index,
    meta: { title: "Index" },
  },
  {
    path: "/shop",
    name: "shop.page",
    component: Shop,
    meta: { title: "Shop" },
  },
  {
    path: "/checkout",
    name: "checkout.page",
    component: Checkout,
    meta: { title: "Checkout" },
  },
  {
    path: "/product",
    name: "product.details",
    component: SingleProduct,
    meta: { title: "product" },
  },
  {
    path: "/seller-list",
    name: "seller.page",
    component: SellerPage,
    meta: { title: "Seller" },
  },
  {
    path: "/seller-apply",
    name: "seller.apply",
    component: SellerApply,
    meta: { title: "seller-apply" },
  },
  {
    path: "/seller-store",
    name: "seller.store",
    component: SellerStore,
    meta: { title: "SellerStore" },
  },

  // user routes
  {
    path: "/auth/login",
    name: "user.login",
    component: UserLogin,
    meta: { title: "Login", guest: true },
  },
  {
    path: "/auth/register",
    name: "user.register",
    component: UserRegister,
    meta: { title: "Register", guest: true },
  },
  // user
  {
    path: "/my/profile",
    name: "user.profile",
    component: MyProfile,
    meta: { title: "profile", requiresAuth: true },
  },
  {
    path: "/my/orders",
    name: "user.orders",
    component: MyOrderList,
    meta: { title: "orders", requiresAuth: true },
  },
  {
    path: "/my/wishlist",
    name: "user.wishlist",
    component: MyWishList,
    meta: { title: "wishlist", requiresAuth: true },
  },
];
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});
const DEFAULT_TITLE = "404";
router.beforeEach((to, from, next) => {
  document.title = to.meta.title || DEFAULT_TITLE;
  const loggedIn = useAuth();
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!loggedIn.user.meta) {
      next({ name: "user.login" });
    } else {
      next();
    }
  } else if (to.matched.some((record) => record.meta.guest)) {
    if (loggedIn.user.meta) {
      next({ name: "user.profile" });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
