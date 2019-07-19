<template>
  <div id="register" class="row">
    <div class="card col-12 px-0">
      <div class="card-header text-center">
        租车
      </div>
    </div>
    <div class="card col-12" v-if="step === 0">
      <div class="card-body">
        <form>
          <div class="form-group row mb-1">
            <label class="col-sm-2 col-form-label pb-0">类型</label>
            <div class="col-sm-10">              
              <div class="form-check form-check-inline">
                <input class="form-check-input" type="radio" name="useTypeRadioOptions" id="useTypeRadio1" value="1" v-model.number="useType">
                <label class="form-check-label">接机</label>
              </div>
              <div class="form-check form-check-inline">
                <input class="form-check-input" type="radio" name="useTypeRadioOptions" id="useTypeRadio2" value="2" v-model.number="useType">
                <label class="form-check-label">送机</label>
              </div>
            </div>
          </div>
          <div class="form-group row mb-1">
            <label class="col-sm-2 col-form-label pb-0">
                城市    
            </label>
            <div class="col-sm-10">
              <select class="form-control" v-model.number="cityId">
                <template v-for="info in cityInfos">
                  <option :value="info.id">{{info.name}}</option>
                </template>                                                                 
              </select>
            </div>
          </div>
          <div class="form-group row mb-1" v-if="useType === 2">
            <label class="col-sm-2 col-form-label pb-0 text-danger">
              出发    
            </label>
            <div class="col-sm-10">
              <input type="input" class="form-control" placeholder="出发地点"  v-model="departure">
              <span class="text-muted small">出发地详细地址</span>
            </div>
          </div>          
          <div class="form-group row mb-1">
            <label class="col-sm-2 col-form-label pb-0">
              机场    
            </label>
            <div class="col-sm-10">
              <input type="input" class="form-control" placeholder="机场三字代码"  v-model="airportCode">
              <span class="text-muted small">机场代码，比如：PVG</span>
            </div>
          </div>
          <div class="form-group row mb-1">
            <label class="col-sm-2 col-form-label pb-0">
              航站楼
            </label>
            <div class="col-sm-10">
              <input type="input" class="form-control" placeholder=""  v-model="terminalNo">
              <span class="text-muted small">机场航站楼，若无可空</span>
            </div>
          </div>
          <div class="form-group row mb-1">
            <label class="col-sm-2 col-form-label pb-0">
              航班号
            </label>
            <div class="col-sm-10">
              <input type="input" class="form-control" placeholder=""  v-model="flightNo">
            </div>
          </div>

          <div class="form-group row mb-1" v-if="useType === 1">
            <label class="col-sm-2 col-form-label pb-0 text-success">
              到达    
            </label>
            <div class="col-sm-10">
              <input type="input" class="form-control" placeholder="送达地点"  v-model="arrival">
              <span class="text-muted small">目的地详细地址</span>
            </div>
          </div>
          <div class="form-group row mb-1">
            <label class="col-sm-2 col-form-label pb-0">
              日期    
            </label>
            <div class="col-sm-10">
              <input type="input" class="form-control" placeholder="格式: 2019-12-31"  v-model="useDate">
              <span class="text-muted small">使用日期, 例如：2019-12-31</span>
            </div>
          </div>
          <div class="form-group row mb-1">
            <label class="col-sm-2 col-form-label pb-0">
              时间    
            </label>
            <div class="col-sm-10">
              <input type="input" class="form-control" placeholder="格式: 15:35"  v-model="useTime">
              <span class="text-muted small">使用时间，例如：18:30</span>
            </div>
          </div>
        </form>
      </div>
      <div class="card-footer">
        <button class="btn btn-success btn-block" type="button" @click.stop="queryPrice()">询价</button>
      </div>
    </div>
    <div class="card col-12" v-if="step === 1">
      <div class="card-body py-0">
        <dl class="row">
          <dt class="col-4">询价单号</dt>
          <dd class="col-8">{{orderInfo.orderNo}}</dd>

          <dt class="col-4">使用类型</dt>
          <dd class="col-8">{{showUseTypeDesc(orderInfo.useType)}}</dd>

          <dt class="col-4">城市</dt>
          <dd class="col-8">{{orderInfo.cityName}}</dd>

          <dt class="col-4">机场</dt>
          <dd class="col-8">{{orderInfo.airportCode}}</dd>

          <dt class="col-4">航班号</dt>
          <dd class="col-8">{{orderInfo.flightNo}}</dd>

          <dt class="col-4">使用时间</dt>
          <dd class="col-8">{{orderInfo.useTime}}</dd>

          <dt class="col-4">出发地址</dt>
          <dd class="col-8">{{orderInfo.departureAddress}}</dd>

          <dt class="col-4">到达地址</dt>
          <dd class="col-8">{{orderInfo.arrivalAddress}}</dd>
        </dl>
      </div>
      <div class="card-body bg-info text-white py-0">
        询价结果
      </div>
      <ul class="list-group">
        <li class="list-group-item"  v-for="(priceInfo, index) in orderInfo.prices">
          <div class="form-check">
            <input class="form-check-input" type="radio" :value="priceInfo.vehicleTypeId" v-model.number="vehicleTypeId">
            <label class="form-check-label">
              {{priceInfo.supplierName}} - {{priceInfo.vehicleTypeName}} - {{priceInfo.price}}元
            </label>
          </div>
        </li>
      </ul>
      <div class="card-body py-1">

        <div class="form-group row mb-1">
          <label class="col-sm-2 col-form-label">
            联系电话    
          </label>
          <div class="col-sm-10">
            <input type="input" class="form-control" v-model="linkPhone">
          </div>
        </div>
        <div class="form-group row mb-1">
          <label class="col-sm-2 col-form-label">
            联系人    
          </label>
          <div class="col-sm-10">
            <input type="input" class="form-control" v-model="linkMan">
          </div>
        </div>
        <div class="form-group row mb-1">
          <label class="col-sm-2 col-form-label">
            备注    
          </label>
          <div class="col-sm-10">
            <input type="input" class="form-control" v-model="remark">
          </div>
        </div>
        
      </div>
      <div class="card-footer" v-if="step === 1">
        <button class="btn btn-success btn-block" type="button" @click.stop="saveOrder()">保存</button>

        <button class="btn btn-danger btn-block mt-3" type="button" @click.stop="cancelQuery()">取消</button>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'
import { queryRentalCarPrice, submitRentalCarOrder, showUseTypeDesc } from '../api/rentalcar.js'
import { searchCityInfos } from '../api/basic-data.js'

export default {
  data () {
    return {
      step: 0,

      useType: 1,
      departure: '',
      arrival: '',
      airportCode: '',
      terminalNo: '',
      flightNo: '',
      cityId: 2,
      useDate: '',
      useTime: '',
      vehicleTypeId: 0,
      linkPhone: '',
      linkMan: '',
      remark: '',

      orderInfo: null,

      cityInfos: []
    }
  },
  computed: {
    logined () { return this.$store.state.logined }
  },
  mounted: function () {
    this.searchCityInfos()
    // this.initData()
    this.reset()
  },
  methods: {
    showLoading: function (loadingText) {
      this.$store.commit('showLoading', { 'loading': true, 'loadingText': loadingText })
    },
    hideLoading: function () {
      this.$store.commit('showLoading', { 'loading': false })
    },
    initData: function () {
      this.useType = 1
      this.departure = '静安寺'
      this.arrival = '虹桥机场T2'
      this.airportCode = 'PVG'
      this.terminalNo = 'T2'
      this.flightNo ='MU1234'
      this.cityId = 2
      this.useDate = '2019-06-20'
      this.useTime = '15:35'
      this.vehicleTypeId = 0
      this.linkPhone = ''
      this.linkMan = ''
      this.remark = ''
    },
    queryPrice: function () {
	    const params = {
        'useType': this.useType,
        'cityId': this.cityId,
        'airportCode': this.airportCode,
        'terminalNo': this.terminalNo,
        'flightNo': this.flightNo,
        'departure': this.departure,
        'arrival': this.arrival,
        'useDate': this.useDate,
        'useTime': this.useTime
      }

      this.showLoading('询价中...')
      queryRentalCarPrice(params, v => {
        if (v.errorCode >= 0) {
          this.step = 1
          this.orderInfo = v
        } else {
          this.showErrMsg(v.errorCode + ' ' + v.errorMessage, 'danger')
        }
      }, () => this.hideLoading())
    },
    saveOrder: function () {
      if (this.vehicleTypeId === 0) {
        this.showErrMsg('请选择车型')
        return
      }

      if (this.linkPhone.length < 8) {
        this.showErrMsg('请输入联系电话')
        return
      }

      let supplierId, price
      for(let priceInfo of this.orderInfo.prices) {
        console.log(this.vehicleTypeId)
        console.log(priceInfo.vehicleTypeId)
        console.log(priceInfo)
        if (priceInfo.vehicleTypeId == this.vehicleTypeId) {
          supplierId = priceInfo.supplierId
          price = priceInfo.price
          break;
        }
      }

      console.log(supplierId)
      console.log(price)

      const params = {
        'orderNo': this.orderInfo.orderNo,
        'vehicleTypeId': this.vehicleTypeId,
        'supplierId': supplierId,
        'price': price,
        'linkPhone': this.linkPhone,
        'linkMan': this.linkMan,
        'remark': this.remark
      }
      submitRentalCarOrder(params, v => {
        if (v.status === 'OK') {
          this.showErrMsg('订单保存成功')
          this.reset()
          this.$router.push('/rentalcar/orders/' + v.returnCode)
        } else {
          this.showErrMsg(v.errorCode + ' ' + v.errorMessage, 'danger')
        }
      })
    },
    showErrMsg: function (msg, msgType) {
      this.$store.dispatch('showAlertMsg', { 'errMsg': msg, 'errMsgType': msgType })
    },
    searchCityInfos: function () {
      const params = {
        'sc.pageNo': 1,
        'sc.pageSize': 1000
      }

      searchCityInfos(params, v => {
        this.cityInfos = v.dataList
      })
    },
    cancelQuery: function () {
      this.step = 0
      this.reset()
    },
    reset: function () {
      this.orderInfo = null

      this.useType = 1
      this.departure = ''
      this.arrival = ''
      this.airportCode = ''
      this.flightNo = ''
      this.terminalNo = ''
      this.cityId = 2
      this.useDate = ''
      this.useTime = ''
      this.vehicleTypeId = 0
      this.linkPhone = ''
      this.linkMan = ''
      this.remark = ''
    },
    showUseTypeDesc: function (status) {
      return showUseTypeDesc(status)
    }            
  }
}

</script>
