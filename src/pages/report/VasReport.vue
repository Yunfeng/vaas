<template>
  <div id="rentalCarReport">
    <div class="card">
      <div class="card-header bg-info text-white text-center">
        机场服务报表
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
          <th>航班日期</th>
          <th>行程</th>
          <th>服务类型</th>
          <th class="text-right">金额</th>
          <th class="text-right">备注</th>
        </tr>                        
      </thead>
      <tbody>
        <tr v-for="(info, index) in dataList">
          <td>{{info.createDate}}</td>
          <td>{{info.linkMan}}</td>
          <td>{{info.ddate}}</td>
          <td>{{info.routeDetail}}</td>
          <td>{{info.productName}}</td>
          <td class="text-right">{{info.total}}</td>
          <td>{{info.remark}}</td>
        </tr>
        <tr v-if="count > 0">
          <td colspan="5">合计：</td>
          <td class="text-right">{{totalAmount}}</td>
          <td class="text-right"></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
  import { searchVasReport } from '../../api/report.js'
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

        searchVasReport(params,
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