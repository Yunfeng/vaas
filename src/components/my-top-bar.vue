<template>  
 <nav class="navbar navbar-dark navbar-expand-lg topnav-menu" v-if="printMode === 0">
  <template v-if="logined">
    <div class="collapse navbar-collapse">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item">
            <router-link to="/my/page" class="nav-link">
              <i class="mdi mdi-speedometer mr-1"></i>工作台
            </router-link>
        </li>

        <li class="nav-item dropdown active" v-for="info in menus">
          <a class="nav-link dropdown-toggle arrow-none" href="javascript: void(0);" role="button" data-toggle="dropdown">
            {{info.caption}} <div class="arrow-down"></div>
          </a>
          <div class="dropdown-menu">
            <template v-for="sub in info.submenus">
              <template v-if="sub.to === ''">
                <div class="dropdown-divider"></div>
              </template>
              <template v-else>
                <router-link :to="sub.to" class="dropdown-item">{{sub.caption}}</router-link>
              </template>
            </template>
          </div>
        </li>

      </ul>

      <span class="nav navbar-nav navbar-right" id="loginBar">
        <template v-if="logined">
          <a :href="`http://flights.ctrip.com/?AllianceID=23642&sid=` + sid + `&ouid=&app=0301C00`" target="_blank" class="buk-nav-item text-white mr-2">机票预订</a>
          <a :href="`http://hotels.ctrip.com/?AllianceID=23642&sid=` + sid + `&ouid=&app=0301C00`" target="_blank" class="buk-nav-item text-white mr-2">酒店预订</a>
          <router-link to="/recharge" class="buk-nav-item text-warning">充值</router-link>
        </template>
      </span>
    </div>
  </template>  
</nav>
  
</template>


<script>
export default {
  computed: {
    logined () { return this.$store.state.logined },
    username () { return this.$store.state.username },
    sid () {
      return this.$store.state.sid
    },
    menus () { return this.$store.getters.authorizedMenus },
    printMode () { return this.$store.state.printMode }
  }
}
</script>
