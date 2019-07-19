<template>
  <div class="row col-12 fixed-bottom" v-if="logined && showed">
    <div class="weui-tabbar">
      <router-link to="/orders" class="weui-tabbar__item">
        <div class="weui-tabbar__icon">
          <i class="fa fa-plane fa-2" aria-hidden="true"></i>
        </div>
        <p class="weui-tabbar__label">服务订单</p>
      </router-link>

      <router-link to="/rentalcar/orders" class="weui-tabbar__item">
        <div class="weui-tabbar__icon">
            <i class="fa fa-car fa-2" aria-hidden="true"></i>
        </div>
        <p class="weui-tabbar__label">
            租车订单
        </p>
      </router-link>
      
      <router-link to="/login" class="weui-tabbar__item">
        <div class="weui-tabbar__icon">
          <i class="fa fa-user-circle fa-2" aria-hidden="true"></i>
        </div>                    
        <p class="weui-tabbar__label">我</p>
      </router-link>      
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    showed () { return this.$store.state.bottomTabBarShowed },
    logined () { return this.$store.state.logined }
  }
}
</script>
