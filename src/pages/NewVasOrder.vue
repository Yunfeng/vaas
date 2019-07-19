<template>
	<div id="newVasOrder" >
    <div class="col-12 bg-info text-center text-white">
        <span @click="back()" class="float-left fa-2">
          <i class="fa fa-angle-left fa-2" aria-hidden="true"></i></span>
        <span class="fa-2">新建订单</span>
    </div>    

    <div class="card">
      <div class="card-body py-1 bg-info text-white">
        航班信息
        <a href="javascript:void(0);" @click.stop="addFlt()" class="btn btn-warning">增加</a>
        <a href="javascript:void(0);" @click.stop="importPnr()" class="btn btn-primary float-right">编码导入</a>
      </div>  
        <table class="table table-sm mb-0">
          <thead>
            <tr>
              <th>航班号</th>
              <th>日期</th>
              <th>出发机场</th>
              <th>到达机场</th>
              <th>起飞时间</th>
              <th>到达时间</th>
              <th>舱位</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
              <tr  v-for="(info, index) in flights">
                <td>
                  <input type="text" class="form-control" maxlength="10" placeholder="航班号" v-model.trim="info.flight.flightNo" /></td>
                <td>
                  <input type="text" class="form-control" maxlength="15" placeholder="示例：2017-01-09" v-model.trim="info.flight.departureDate" /></td>
                <td>
                  <input type="text" class="form-control" maxlength="3" placeholder="出发机场" v-model.trim="info.flight.departureAirport" size="10" />
                </td>
                <td>
                  <input type="text" class="form-control" maxlength="3" placeholder="到达机场" v-model.trim="info.flight.arrivalAirport" size="10" />
                </td>
                <td>
                  <input type="text" class="form-control" placeholder="示例：1800"  v-model.trim="info.flight.departureTime" size="10" /></td>
                <td>
                  <input type="text" class="form-control" placeholder="示例：2100"  v-model.trim="info.flight.arrivalTime" size="10" /></td>
                <td>
                  <input type="text" class="form-control" maxlength="2" placeholder="舱位" v-model.trim="info.flight.subclass" /></td>
                <td>
                  <a href="javascript:void(0)" @click.stop="deleteFlt(index)"  class="btn btn-sm btn-danger">删除</a>
                </td>                
              </tr>
          </tbody>
        </table>
      <div class="card-body py-1 bg-info text-white">
        乘机人信息
        <a href="javascript:void(0);" @click.stop="addPsg()" class="btn btn-warning">增加</a>
      </div>                  
      <table class="table table-sm">
        <thead>
        <tr>
            <th>姓名</th>
            <th>证件号</th>
            <th>证件类型</th>
            <th></th>
        </tr>
        </thead>
        <tbody>
          <template v-for="(info, index) in passengers">
            <tr>
              <td>
                <input type="text" class="form-control" placeholder="乘机人" v-model.trim="info.name"/>
              </td>
              <td>
                  <input type="text" class="form-control" placeholder="证件号" v-model.trim="info.idNo" />
              </td>
              <td>
                  <select class="form-control" v-model.number="info.idType">
                    <option value="1">身份证</option>
                    <option value="2">护照</option>
                    <option value="99">其它</option>
                  </select>
              </td>
              <td>
                <a href="javascript:void(0)" @click.stop="deletePsg(index)"  class="btn btn-sm btn-danger float-right">删除</a>
              </td>
            </tr>
          </template>
        </tbody>
      </table>
      <div class="card-footer">        
        <span>
          
        </span>
      </div>
    </div>
    <div class="card">
      <div class="card-body">
        <div class="form-group">
          <label>
              服务项目    
          </label>
            <select class="form-control" v-model="productCode">
              <option value="">请选择服务项目</option>
              <option :value="info.productCode" v-for="info in filteredProducts">{{info.productName}}</option>
            </select>
        </div>
        <div class="form-group">
            <label>数量</label>
            <input type="text" class="form-control" v-model.number="count" readonly="">
        </div>
        <div class="form-group">
            <label>联系人</label>
            <input type="text" class="form-control" v-model.number="linkMan">
        </div>
        <div class="form-group">
            <label>联系电话</label>
            <input type="text" class="form-control" v-model.number="linkPhone">
        </div>
        <div class="form-group">
            <label>备注</label>
            <input type="text" class="form-control" v-model.number="remark">
        </div>
      </div>
    </div>
    <div class="card">
        <div class="card-footer">        
          <button type="button" class="btn btn-primary" @click.stop.prevent="createVasOrder(0)">创建</button>  
          <button type="button" class="btn btn-primary ml-2" @click.stop.prevent="createVasOrder(1)">创建并继续</button>  
        </div>
    </div>

    <modal-pnr-content ref="modalPnrContent"></modal-pnr-content>
  </div>
</template>

<script>
  import { PRODUCT_TYPE_CAR } from '../common/const.js'
  import { createVasOrder } from '../api/vas.js'
  import { searchProducts } from '../api/product.js'
  import { processPnrDetail } from '../api/user.js'

  import MyDatePicker from '../components/my-datepicker.vue'
  import ModalPnrContent from '../components/my-modal-pnr-content.vue'

  export default {
    components: {
      MyDatePicker,
      ModalPnrContent
    },
    data () {
      return {
        customerId: 0,

        extras: [],
        passengers: [],
        flights: [],

        productCode: '',
        productName: '',
        remark: '',
        linkMan: '',
        linkPhone: ''
      }
    },
    mounted: function () {
      this.searchExtraServices()
    },
    watch: {
      count: function () {
        this.calc()
      },
      price: function () {
        this.calc()
      },
      discount: function () {
        this.calc()
      },
      cost: function () {
        this.calc()
      },
      productCode: function (newVal) {
        this.setExtraInfo(newVal)
        this.calc()
      }
    },
    computed: {
      count: function () {
        return this.passengers.length
      },
      filteredProducts: function () {
        return this.extras.filter(function (info) {
          return info.productType !== PRODUCT_TYPE_CAR
        })
      }
    },
    methods: {
      back: function () {
        this.$router.go(-1)
      },
      showErrMsg: function (msg, msgType) {
        this.$store.dispatch('showAlertMsg', { 'errMsg': msg, 'errMsgType': msgType })
      },
      createVasOrder: function (next) {
        var params = {
          'productCode': this.productCode,
          'productName': this.productName,
          'count': this.count,
          'remark': this.remark,
          'linkMan': this.linkMan,
          'linkPhone': this.linkPhone,
          'passengers': this.passengers,
          'flights': this.flights
        }

        var jsonParams = JSON.stringify(params)

        createVasOrder(jsonParams,
          (jsonResult) => {
            if (jsonResult.status !== 'OK') {
              this.showErrMsg(jsonResult.errmsg, 'danger')
            } else {
              this.showErrMsg('保存成功')
              if (next === 0) {
                this.$router.replace('/orders')
              } else if (next === 1) {
                this.reset()
              }
            }
          }
        )
      },
      calc: function () {
        this.total = this.count * (this.price - this.discount)
      },
      addPsg: function () {
        this.passengers.push({ 'name': '', 'idNo': '', 'idType': '', ffpNo: '', mobile: '' })
      },
      addFlt: function () {
        this.flights.push({
          'flight': {
            'flightNo': '',
            'ddate': '',
            'subclass': '',
            'dport': '',
            'dterm': '',
            'aport': '',
            'aterm': '',
            'dtime': '',
            'atime': ''
          }
        })
      },
      deletePsg: function (index) {
        this.passengers.splice(index, 1)
      },
      deleteFlt: function (index) {
        this.flights.splice(index, 1)
      },
      reset: function () {
        // body...
        // this.customerId = 0
        this.productCode = ''
        this.productName = ''
        this.price = 0
        this.discount = 0
        this.cost = 0
        this.remark = ''
        this.linkMan = ''
        this.linkPhone = ''
        // this.payType = 8
        this.total = 0
      },
      setExtraInfo: function (newCode) {
        this.productName = ''
        this.price = 0
        this.discount = 0
        for (let i = 0; i < this.extras.length; i++) {
          const info = this.extras[i]
          if (info.productCode === newCode) {
            this.productName = info.productName
            this.price = info.price
            this.discount = info.discount
            this.cost = info.cost
          }
        }
      },
      searchExtraServices: function () {
        const params = {
          'sc.pageNo': 1,
          'sc.pageSize': 50
        }

        searchProducts(params,
          (jsonResult) => {
            this.extras = jsonResult.dataList
          }
        )
      },
      importPnr: function () {
        this.$refs.modalPnrContent.modal().then((info) => {
          this.processPnrDetail(info.pnrContent)
        }).catch((ex) => {})
      },
      processPnrDetail: function (pnrDetail) {
        if (pnrDetail.length === 0) {
          this.showErrMsg('编码内容不能为空')
          return
        }
        const params = { 'pnrDetail': pnrDetail }

        processPnrDetail(params,
          v => {
            this.passengers.splice(0)
            this.flights.splice(0)

            for (const psg of v.passengers) {
              this.passengers.push({ 'name': psg.psgName, 'idNo': psg.idNo, 'idType': psg.idType })
            }

            for (const flt of v.flights) {
              console.log(flt)
              this.flights.push({
                'flight': {
                  'flightNo': flt.flight.flightNo,
                  'departureDate': flt.flight.departureDate,
                  'subclass': flt.flight.subclass,
                  'departureAirport': flt.flight.departureAirport,
                  'arrivalAirport': flt.flight.arrivalAirport,
                  'departureTime': flt.flight.departureTime,
                  'arrivalTime': flt.flight.arrivalTime
                }
              })
            }
          }
        )
      }
    }
  }

</script>