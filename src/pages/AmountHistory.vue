<template>
  <div id="trans-history">
    <div class="col-12 bg-primary text-center text-white">
        <span @click="back()" class="float-left">
          <i class="fa fa-angle-left" aria-hidden="true"></i>
        </span>
        交易记录(元)
    </div>

    <div class="card">
      <table class="table table-sm table-striped small">
          <tr>
              <th>时间</th>
              <th>订单号</th>
              <th class="text-right">存入</th>
              <th class="text-right">支出</th>
              <th class="text-right">余额</th>
              <th class="d-none d-md-table-cell">备注</th>
          </tr>
          <tbody>
          <tr v-for="info in histories">
              <td>{{info.createTime}}</td>
              <td>{{info.orderNo}}</td>
              <td class="text-right">
                <template v-if="info.credit > 0">{{info.credit/100}}</template>
              </td>
              <td class="text-right">
                <template v-if="info.debt > 0">{{info.debt/100}}</template>
              </td>
              <td class="text-right">{{info.accountBalance/100}}</td>
              <td class="d-none d-md-table-cell">{{info.remark}}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
  import { searchAmountHistory } from '../api/user.js'

  export default {
    data () {
      return {
        histories: []
      }
    },
    mounted: function () {
      this.viewHistory()
    },
    methods: {
      back: function () {
        this.$router.go(-1)
      },
      viewHistory: function () {
        searchAmountHistory(v => { this.histories = v.dataList })
      }
    }
  }
</script>