<template>
  <div id="vas-order-detail">
    <div class="col-12 bg-info text-center text-white">
        <span @click="back()" class="float-left fa-2">
          <i class="fa fa-angle-left fa-2" aria-hidden="true"></i></span>
        <span class="fa-2">租车订单详情</span>
    </div>

    <template v-if="detail !== null">
      <div class="card">
        <div class="card-body py-0">
          <dl class="row">
            <dt class="col-4">询价单号</dt>
            <dd class="col-8">{{detail.orderNo}} {{getStatusDesc(detail.status)}}</dd>

            <dt class="col-4">使用类型</dt>
            <dd class="col-8">{{showUseTypeDesc(detail.useType)}}</dd>

            <dt class="col-4">城市</dt>
            <dd class="col-8">{{detail.cityName}}</dd>

            <dt class="col-4">机场</dt>
            <dd class="col-8">{{detail.airportCode}}</dd>

            <dt class="col-4">航班号</dt>
            <dd class="col-8">{{detail.flightNo}}</dd>

            <dt class="col-4">使用时间</dt>
            <dd class="col-8">{{detail.useTime}}</dd>

            <dt class="col-4">出发地址</dt>
            <dd class="col-8">{{detail.departureAddress}}</dd>

            <dt class="col-4">到达地址</dt>
            <dd class="col-8">{{detail.arrivalAddress}}</dd>

            <dt class="col-4">供应商</dt>
            <dd class="col-8">{{detail.supplierName}}</dd>

            <dt class="col-4">价格</dt>
            <dd class="col-8">{{detail.price}}</dd>

            <dt class="col-4">联系人：</dt>
            <dd class="col-8">{{detail.name}}</dd>

            <dt class="col-4">联系电话：</dt>
            <dd class="col-8">{{detail.mobile}}</dd>

            <dt class="col-4">备注</dt>
            <dd class="col-8">{{detail.remark}}</dd>
          </dl>
        </div>        
        <div class="card-body py-0" v-if="detail.status === 2 || detail.status === 8">
          <dl class="row">
            <dt class="col-4">车牌</dt>
            <dd class="col-8">{{detail.vehicleNo}}</dd>

            <dt class="col-4">品牌</dt>
            <dd class="col-8">{{detail.vehicleTypeBrand}}</dd>

            <dt class="col-4">司机姓名</dt>
            <dd class="col-8">{{detail.driverName}}</dd>

            <dt class="col-4">司机电话</dt>
            <dd class="col-8">{{detail.driverPhone}}</dd>

            <dt class="col-4">司机状态：</dt>
            <dd class="col-8">{{detail.driverStatusDesc}}</dd>

            <dt class="col-4">订单状态：</dt>
            <dd class="col-8">{{detail.supplierOrderStatusDesc}}</dd>

          </dl>
        </div>
        <div class="card-body py-1">
            <div class="d-flex flex-row  justify-content-around" v-if="detail.status === 1">
              <button class="btn btn-danger btn-sm ml-automr-auto" @click.stop="cancelOrder()">取消订单</button>
            </div>
        </div>
      </div>
      <div class="card">
          <div class="card-header small">
              <a href="javascript:void(0)" class="float-right" @click.stop="viewHistory()">查看历史记录</a>
          </div>
          <table class="table table-sm table-striped small">
              <tr>
                  <td>操作员</td>
                  <td>内容</td>
                  <td>时间</td>
              </tr>
              <tr v-for="info in histories">
                  <td>{{info.operator}}</td>
                  <td>{{info.content}}</td>
                  <td>{{info.createTime}}</td>
              </tr>
          </table>
      </div>
    </template>

  </div>
</template>

<script>
  import { searchRentalCarOrder, searchRentalOrderHistory, cancelRentalCarOrder, showOrderStatusDesc, showUseTypeDesc } from '../api/rentalcar.js'

  export default {
    data () {
      return {
        detail: null,
        id: 0,
        histories: []
      }
    },
    mounted: function () {
      this.id = this.$route.params.id
      this.search()
    },
    methods: {
      back: function () {
        this.$router.go(-1)
      },
      showErrMsg: function (msg, msgType) {
        this.$store.dispatch('showAlertMsg', { 'errMsg': msg, 'errMsgType': msgType })
      },
      search: function () {
        searchRentalCarOrder(this.id, v => { this.detail = v })
      },
      getStatusDesc: function (status) {
        return showOrderStatusDesc(status)
      },
      showUseTypeDesc: function (status) {
        return showUseTypeDesc(status)
      },            
      viewHistory: function () {
        searchRentalOrderHistory(this.id, (jsonResult) => { this.histories = jsonResult })
      },
      commonShowMessage: function (jsonResult) {
        if (jsonResult.status !== 'OK') {
          this.showErrMsg('操作失败：' + jsonResult.errmsg, 'danger')
        } else {
          if (jsonResult.desc !== '') {
            this.showErrMsg(jsonResult.desc)
          } else {
            this.showErrMsg('操作成功')
          }
          this.search()
        }
      },
      cancelOrder: function () {
        cancelRentalCarOrder(this.id, v => this.commonShowMessage(v))
      }
    }
  }
  // 530
</script>