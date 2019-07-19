<template>
  <div id="vas-order-detail">
    <div class="col-12 bg-info text-center text-white">
        <span @click="back()" class="float-left fa-2">
          <i class="fa fa-angle-left fa-2" aria-hidden="true"></i></span>
        <span class="fa-2">订单详情</span>
    </div>

    <template v-if="detail !== null">
      <div class="card">
        <table class="table table-sm table-striped table-hover small mb-1">
          <thead>
            <tr>
              <th>订单号</th>
              <th class="text-right">价格</th>
              <th class="text-right">折扣</th>
              <th class="text-right">数量</th>
              <th class="text-right">总额</th>
              <th>状态</th>
            </tr>                        
          </thead>
          <tbody>
              <tr>
                <td>{{detail.orderNo}}</td>
                <td class="text-right">{{detail.price}}</td>
                <td class="text-right">{{detail.discount}}</td>
                <td class="text-right">{{detail.count}}</td>
                <td class="text-right">{{detail.total}}</td>
                <td>{{getStatusDesc(detail.status)}}</td>
              </tr>          
          </tbody>
        </table>
        <table class="table table-sm table-striped table-hover small">
          <thead>
            <tr>
              <th>外部订单号</th>
              <th>产品</th>
            </tr>                        
          </thead>
          <tbody>
              <tr>
                <td>{{detail.externalOrderNo}}</td>
                <td>{{detail.productName}}</td>
              </tr>          
          </tbody>
        </table>
        <div class="card-body">
          联系人：{{detail.linkMan}}
          <br />
          联系电话：{{detail.linkPhone}}
          <br />
          备注: {{detail.remark}}
        </div>
        <div class="card-body py-1">
            <div class="d-flex flex-row  justify-content-around" v-if="detail.status === 0">
              <button class="btn btn-danger btn-sm ml-automr-auto" @click.stop="cancelOrder()">取消订单</button>
            </div>
        </div>
        <div class="card-body bg-info text-white py-0">乘客信息</div>
      
        <table class="table table-striped table-hover table-sm small">
            <thead>
                <tr>
                    <th>姓名</th>
                    <th>证件号</th>
                    <th>联系电话</th>
                    <th>座位</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(info, index) in detail.passengers">   
                    <td >
                        {{info.name}}
                    </td>                             
                    <td>{{info.idNo}}</td>
                    <td>{{info.mobile}}</td>
                    <td>{{info.seatNo}}</td>
                </tr>                               
            </tbody>
        </table>
        <div class="card-body bg-info text-white py-0">航班信息</div>    
        <table class="table table-striped table-hover table-sm small">
          <thead>
            <tr>
              <th>出发</th>
              <th>到达</th>
              <th>出发日期</th>
              <th>航班号</th>
              <th>出发时间</th>
              <th>到达时间</th>
              <th>舱位</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(info, index) in detail.flights">   
              <td>
                <span class="text-success">{{info.flight.departureAirport}}</span>
                  {{info.flight.departureAirportName}} 
                  {{info.flight.departureTerminal}} 
                  
              </td>                             
              <td>
                <span class="text-success">{{info.flight.arrivalAirport}}</span>
                  {{info.flight.arrivalAirportName}}
                  {{info.flight.arrivalTerminal}}                  
              </td>
              <td>{{info.flight.departureDate}}</td>
              <td>{{info.flight.flightNo}}</td>
              <td>{{info.flight.departureTime}}</td>
              <td>{{info.flight.arrivalTime}}</td>
              <td>{{info.flight.subclass}}</td>
            </tr>                               
          </tbody>
        </table>
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

    <my-modal-prompt ref="modalPrompt">
      <span slot="title">{{modalTitle}}</span>
    </my-modal-prompt>

  </div>
</template>

<script>
  import { searchVasOrderDetail, searchVasOrderHistory } from '../api/vas.js'
  import { cancelVasOrder } from '../api/vas.js'
  import { showOrderStatusDesc, showPayType } from '../common/common.js'
  import MyModalPrompt from '../components/my-modal-prompt.vue'

  export default {
    components: {
      MyModalPrompt
    },
    data () {
      return {
        detail: null,
        id: 0,
        histories: [],

        remark: '',
        psgId: 0,
        psgName: '',
        psgIdNo: '',
        psgRemark: '',

        modalTitle: ''
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
        searchVasOrderDetail(this.id, v => { this.detail = v })
      },
      getStatusDesc: function (status) {
        return showOrderStatusDesc(status)
      },
      getPayTypeDesc: function (payType) {
        return showPayType(payType)
      },
      cancelOrder: function () {
        this.modalTitle = '请输入取消订单的理由：'
        const promise = this.$refs.modalPrompt.modal()
        promise.then((remark) => {
          // 点击确定按钮的回调处理
          if (remark === '') {
            this.showErrMsg('请填写取消订单的理由')
            return
          }
          this.doCancelOrder(remark)
        }).catch((r) => {
          // 点击取消按钮的回调处理
          // console.log('catch: ' + r)
        })
      },
      doCancelOrder: function (remark) {
        const params = {
          'remark': remark
        }
        cancelVasOrder(this.id, params, v => this.commonShowMessage(v))
      },
      viewHistory: function () {
        searchVasOrderHistory(this.id, (jsonResult) => { this.histories = jsonResult })
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
      }
    }
  }
  // 530
</script>