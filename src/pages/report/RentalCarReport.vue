<template>
  <div id="rentalCarReport">
    <div class="card">
      <div class="card-header bg-info text-white text-center">
        租车报表
      </div>
      <div class="card-body py-1">
        <form class="form-inline">
          <my-date-picker id="beginDate" v-model="beginDate" placeholder="开始日期"></my-date-picker>
          <my-date-picker id="endDate" v-model="endDate" placeholder="截止日期" ></my-date-picker>

          <button type="button" class="btn btn-primary btn-sm ml-1" @click.stop="searchStats()">查找</button>
        </form>
      </div>
    </div>
    <table class="table table-sm table-striped small">
      <thead>
        <tr>
          <th>订单日期</th>
          <th>联系人</th>
          <th>出行日期</th>
          <th>结束日期</th>
          <th>司机信息</th>
          <th>车型</th>
          <th>车牌号</th>
          <th>路线</th>
          <th class="text-right">金额</th>
        </tr>                        
      </thead>
      <tbody>
        <tr v-for="(info, index) in dataList">
          <td>{{info.createDate}}</td>
          <td>{{info.name}}</td>
          <td>{{info.useTime}}</td>
          <td>{{info.finishedDate}}</td>
          <td>{{info.driverName}}</td>
          <td>{{info.vehicleTypeBrand}}</td>
          <td>{{info.vehicleNo}}</td>
          <td>{{info.departureAddress}}-{{info.arrivalAddress}}</td>
          <td class="text-right">{{info.price}}</td>
        </tr>
        <tr v-if="count > 0">
          <td colspan="8">合计：</td>
          <td class="text-right">{{totalAmount}}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
  import { searchRentalCarReport } from '../../api/report.js'
  import { today } from '../../common/common.js'
  import MyDatePicker from '../../components/my-datepicker.vue'

  export default {
    components: {
      MyDatePicker
    },
    data () {
      return {
        dataList: [],
        beginDate: '',
        endDate: '',

        count: 0,
        totalAmount: 0
      }
    },
    mounted: function () {
      this.endDate = today()
      this.beginDate = this.endDate.substr(0, 8) + '01'
    },
    methods: {
      showLoading: function (loadingText) {
        this.$store.commit('showLoading', { 'loading': true, 'loadingText': loadingText })
      },
      hideLoading: function () {
        this.$store.commit('showLoading', { 'loading': false })
      },      
      searchStats: function () {
        if (this.beginDate === '' || this.endDate === '') return
        this.count = 0
        this.totalAmount = 0

        const params = {
          'beginDate': this.beginDate,
          'endDate': this.endDate
        }

        this.showLoading()

        searchRentalCarReport(params,
          v => {
            this.dataList = v
            for (const info of this.dataList) {
              this.count += 1
              this.totalAmount += info.price
            }
          },
          () => { this.hideLoading() }
        )
      }
    }
  }
</script>