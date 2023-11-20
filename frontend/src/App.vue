<script setup>
import {
  HeaderPart,
  NavBer,
  CardSideBar,
  MobileMenu,
  NewsLatter,
  Footer,
} from "@/components";
</script>
<template>
  <div>
    <div class="backdrop"></div>
    <a class="backtop fas fa-arrow-up" href="#"></a>
    <HeaderPart />

    <NavBer />
    <CardSideBar />
    <MobileMenu />
    <!-- content change -->
    <router-view></router-view>
    <NewsLatter />
    <Footer />
  </div>
</template>

<style></style>
