<template>
  <!-- Page Wrapper -->
  <div id="wrapper">
    <SideBar />

    <!-- Content Wrapper -->
    <div id="content-wrapper" class="d-flex flex-column">
      <!-- Main Content -->
      <div id="content">
        <!-- Topbar -->
        <TopBar />
        <!-- End of Topbar -->

        <!-- Begin Page Content -->
        <div class="container-fluid">
          <!-- Page Heading -->
          
        </div>
        <div>
          <AddProduct />
        </div>

      </div>

      <!-- Footer -->
      <FooterAdmin />
      <!-- End of Footer -->
    </div>
    <!-- End of Content Wrapper -->
  </div>
  <!-- End of Page Wrapper -->
</template>

<script>
import SideBar from "@/components/Admin/SideBar.vue";
import TopBar from "@/components/Admin/TopBar.vue";
import FooterAdmin from "@/components/Admin/Footer.vue";
import AddProduct from "@/components/Admin/AddProduct.vue";

export default {
  name: "ProductCustom",
  components: {
    SideBar,
    TopBar,
    FooterAdmin,
    AddProduct,
  },
};
</script>

<style lang="scss" scoped></style>
