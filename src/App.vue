<template>
  <div id="app" class="wrapper">
    <div class="content-page">
      <div class="content">

      <!-- Navbar-->
      <nav class="navbar navbar-expand-lg navbar-sticky navbar-airy navbar-light bg-white bg-fixed-white" v-if="logined">
        <div class="container-fluid">  
          <!-- Navbar Header  -->
          <router-link to="/" class="navbar-brand text-primary"><i class="fas fa-home"></i></router-link>


          <button type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation" class="navbar-toggler navbar-toggler-right"><i class="fa fa-bars"></i></button>
          <!-- Navbar Collapse -->
          <div id="navbarCollapse" class="collapse navbar-collapse">
            <ul class="navbar-nav mx-auto">              
              <li class="nav-item">
                <router-link to="/order/new" class="nav-link">机场服务</router-link>
              </li>
              <li class="nav-item">
                <router-link to="/rentalcar" class="nav-link">租车</router-link>
              </li>
              <li class="nav-item dropdown">
                <a id="navbarDropdownMenuLink" class="nav-link" href="#" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  订单
                  <i class="fa fa-angle-down"></i>
                </a>
                <ul class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                  <li>
                    <router-link to="/orders" class="dropdown-item">服务订单</router-link>
                  </li>
                  <li>
                    <router-link to="/rentalcar/orders" class="dropdown-item">租车订单</router-link>
                  </li>
                </ul>
              </li>
              <li class="nav-item dropdown">
                <a id="navbarDropdownReportLink" class="nav-link" href="#" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  报表<i class="fa fa-angle-down"></i>
                </a>
                <ul class="dropdown-menu" aria-labelledby="navbarDropdownReportLink" >
                  <li>
                    <router-link to="/report/vas" class="dropdown-item">服务报表</router-link>
                  </li>
                  <li>
                    <router-link to="/report/rentalcar" class="dropdown-item">租车报表</router-link>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <!-- /Navbar -->



        <my-loading></my-loading>
        <top-tips></top-tips>


        <div class="px-2">
          <transition name="fade">
            <keep-alive>
              <router-view v-if="$route.meta.keepAlive"></router-view>
            </keep-alive>
          </transition>
          <transition  name="fade" mode="out-in" :duration="{ enter: 50, leave: 300 }">
            <router-view v-if="!$route.meta.keepAlive"></router-view>
          </transition>
        </div>


        <div style="margin-bottom: 5rem"></div>

        <bottom-bar> </bottom-bar>
      </div>
    </div>
  </div>
</template>

<script>
  import TopTips from './components/my-top-tips.vue'	
  import MyLoading from './components/my-loading.vue'
  import BottomBar from './components/my-tabbar.vue'

  export default {
    components: {
      TopTips,
      MyLoading,
      BottomBar
    },
    computed: {
      workMode ()  { return this.$store.state.workMode },
      logined () { return this.$store.state.logined },
      username () { return this.$store.state.username }
    },
    mounted: function () {
      // console.log('mounted: ' + this.logined)
      if (!this.logined) {
        this.$store.dispatch('init', () => {})
      }
    }
  }
</script>