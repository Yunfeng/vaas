<template>
	<div id="order" class="row">
    <div class="col-12 bg-info text-center text-white">
        <span class="fa-2">租车订单</span>
    </div>
    <div class="card col-12">
        <form class="form-inline">
          <select class="form-control form-control-sm col-3" v-model.number="status">
            <option value="-1">所有订单</option>
            <option value="1">待处理</option>
            <option value="2">处理中</option>
            <option value="4">已取消</option>
            <option value="8">已完成</option>
          </select>
          <input type="textfield" class="form-control form-control-sm" size="10" placeholder="订单号" v-model.trim="orderNo">
          <input type="textfield" class="form-control form-control-sm" size="10" placeholder="联系人" v-model.trim="linkman">
          <input type="textfield" class="form-control form-control-sm" size="10" placeholder="手机号" v-model.trim="mobile">
          <my-date-picker id="ddate" v-model="ddate" class="form-control form-control-sm" placeholder="用车日期"></my-date-picker>
          <button type="button" class="btn btn-primary mr-2" @click.stop="search()">查找</button>
          <button type="button" class="btn btn-secondary btn-sm ml-2" @click.stop="reset()">重置</button>
          <router-link class="btn btn-success ml-auto" to="/rentalcar">询价</router-link>
        </form>        
    </div>    

    <div class="card col-12 mt-2">
      <table class="table table-striped table-sm table-hover">
        <thead class="thead-light">
          <tr>
            <th>订单号</th>
            <th>类型</th>
            <th>地点</th>
            <th>用车时间</th>
            <th>状态</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="info in orders" @click="showDetail(info)" :class="changeBgByStatus(info.status)">
            <td>{{info.orderNo}}</td>
            <td>{{showUseTypeDesc(info.useType)}}</td>
            <td>
              起点：{{info.departureAddress}} <br />
              终点: {{info.arrivalAddress}}
            </td>
            <td>{{info.useTime}}</td>
            <td>{{showStatusDesc(info.status)}}</td>
            <td><i class="fa fa-angle-right text-warningfa-2" aria-hidden="true"></i></td>
          </tr>
        </tbody>
      </table>
      <div class="card-block">
        <my-pagination :row-count="sc.rowCount" :page-total="sc.pageTotal" :page-no="sc.pageNo" @next-page="nextPage" @prev-page="prevPage" @direct-page="directPage"></my-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import MyPagination from '../components/my-pagination.vue'
import MyDatePicker from '../components/my-datepicker.vue'

import { searchRentalCarOrders, showOrderStatusDesc, showUseTypeDesc } from '../api/rentalcar.js'
import $ from 'jquery'

export default {
  components: {
    MyPagination,
    MyDatePicker
  },
  data () {
    return {
      detailShowing: false,
      orders: [],
      sc: {
        pageNo: 1,
        pageSize: 10,
        rowCount: 0,
        pageTotal: 0
      },
      status: -1,
      orderNo: '',
      mobile: '',
      ddate: '',
      linkman: ''
    }
  },
  mounted: function () {
    this.search()
  },
  methods: {
    back: function () {
      this.$router.go(-1)
    },
    showLoading: function (loadingText) {
      this.$store.commit('showLoading', { 'loading': true, 'loadingText': loadingText })
    },
    hideLoading: function () {
      this.$store.commit('showLoading', { 'loading': false })
    },
    showErrMsg: function (msg, msgType) {
      this.$store.dispatch('showAlertMsg', { 'errMsg': msg, 'errMsgType': msgType })
    },
    changeBgByStatus: function (orderStatus) {
      switch (orderStatus) {
        case 0: return 'text-muted'
        case 1: return 'bg-success text-white'
        case 4: return 'table-dark'
      }
    },
    search: function () {
      const params = {
        'sc.pageNo': this.sc.pageNo,
        'sc.pageSize': this.sc.pageSize,
        'sc.status': this.status,
        'sc.orderNo': this.orderNo,
        'sc.mobile': this.mobile,
        'sc.ddate': this.ddate,
        'sc.name': this.linkman
      }

      this.showLoading()

      searchRentalCarOrders(params,
        v => {
          this.orders = v.dataList
          this.sc = v.page
        },
        () => this.hideLoading()
      )
    },
    reset: function () {
      this.status = -1
      this.orderNo = ''
      this.mobile = ''
      this.ddate = ''
      this.linkman = ''
    },
    showDetail: function (orderInfo) {
      this.$router.push('/rentalcar/orders/' + orderInfo.id)
    },
    showStatusDesc: function (status) {
      return showOrderStatusDesc(status)
    },
    showUseTypeDesc: function (status) {
      return showUseTypeDesc(status)
    },
    prevPage: function () {
      this.sc.pageNo = this.sc.pageNo - 1
      if (this.sc.pageNo < 1) this.sc.pageNo = 1
      this.search()
    },
    nextPage: function () {
      this.sc.pageNo = this.sc.pageNo + 1
      this.search()
    },
    directPage: function (pageNo) {
      this.sc.pageNo = pageNo
      this.search()
    }
  }
}
</script>
