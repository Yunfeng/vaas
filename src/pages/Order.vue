<template>
	<div id="order" class="row">
    <div class="col-12 bg-info text-center text-white">
        <span class="fa-2">服务订单</span>
    </div>
    <div class="card col-12">
        <form class="form-inline">
          <select class="form-control form-control-sm col-3" v-model.number="scStatus">
            <option value="-1">所有订单</option>
            <option value="0">待处理</option>
            <option value="1">处理中</option>
            <option value="2">已完成</option>
            <option value="4">已取消</option>
          </select>
          <input type="textfield" class="form-control form-control-sm" size="10" placeholder="机场代码" v-model.trim="dport">
          <select class="form-control form-control-sm col-3" v-model.number="scOrderBy">
            <option value="0">起飞日期 升</option>
            <option value="1">起飞日期 降</option>
            <option value="2">订单时间 升</option>
            <option value="4">订单时间 降</option>
          </select>

          <button type="button" class="btn btn-primary mr-2" @click.stop="search()">查找</button>
          <button type="button" class="btn btn-secondary btn-sm mr-2" @click.stop="reset()">重置</button>
          <button type="button" class="btn btn-success ml-auto" @click.stop="newOrder()">新建</button>
          <button type="button" class="btn btn-primary ml-5 d-none d-md-block" @click.stop="importExcel()">导入Excel</button>
        </form>        
    </div>    

    <div class="card col-12 border-0 mt-2">
      <table class="table table-striped table-sm table-hover">
        <thead class="thead-light">
          <tr>
            <th>订单号</th>
            <th>出发机场</th>
            <th>出发日期</th>
            <th>航班号</th>
            <th>状态</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="info in orders" @click="showDetail(info)" :class="changeBgByStatus(info.status)">
            <td>{{info.orderNo}}</td>
            <td>{{info.dport}}</td>
            <td>{{info.ddate}}</td>
            <td>{{info.flightNo}}</td>
            <td>{{showStatusDesc(info.status)}}</td>
            <td><i class="fa fa-angle-right text-warningfa-2" aria-hidden="true"></i></td>
          </tr>
        </tbody>
      </table>
      <div class="card-block">
        <my-pagination :row-count="sc.rowCount" :page-total="sc.pageTotal" :page-no="sc.pageNo" @next-page="nextPage" @prev-page="prevPage" @direct-page="directPage"></my-pagination>
      </div>
    </div>


    <div class="card col-12 mt-1 border-0">
      <div class="card-body">
        已开通机场：
        <template v-for="info in airports">
          <span class="text-success ml-1">{{info.name}}</span>
        </template>
      </div>
    </div>

    <div class="modal" id="modalExcel" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title" id="myModalLabel">上传Excel文件</h4>
                    <button type="button" class="close" data-dismiss="modal">
                        <span aria-hidden="true">&times;</span>
                        <span class="sr-only">Close</span>
                    </button>
                </div>
                <div class="modal-body">
                    <form id = "uploadFileForm" method="post" enctype="multipart/form-data">                      
                      <input type="hidden" name="fileContentType" value="100">
                        <div class="form-group">
                            <label class="control-label">
                                产品类型    
                            </label>
                            <div>
                                <select class="form-control" name="productCode">
                                  <option value="0">请选择产品</option>
                                  <template v-for="info in filteredProducts">
                                    <option :value="info.productCode" :key="info.id">{{info.productName}}</option>
                                  </template>
                                </select>
                            </div>
                        </div>                      
                        <div class="form-group">
                            <label>选择需要上传的文件</label>
                            <input type="file" class="form-control-file" name="upfile" id="inputFileName">
                            <span class="text-muted small">
                              文件名请请使用字母和数字命名，不要有中文或全角字符。
                            </span>
                        </div>   
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default btn-sm" data-dismiss="modal">取消</button>
                    <button type="button" class="btn btn-primary btn-lg ml-2" @click.stop="uploadExcel()" :disabled="uploading">
                      <template v-if="uploading">
                        上传中...
                      </template>
                      <template v-else>
                        开始上传  
                      </template>                      
                    </button>
                </div>
            </div>
        </div>
    </div>    


  </div>
</template>

<script>
import MyPagination from '../components/my-pagination.vue'
import { showOrderStatusDesc } from '../common/common.js'
import { searchOrders } from '../api/order.js'
import { searchAirports } from '../api/admin.js'
import { searchProducts } from '../api/product.js'
import { WEBAPP_NAME } from '../common/common.js'
import { PRODUCT_TYPE_CAR } from '../common/const.js'
import $ from 'jquery'

export default {
  components: {
    MyPagination
  },
  data () {
    return {
      detailShowing: false,
      orders: [],
      airports: [],
      extras: [],
      sc: {
        pageNo: 1,
        pageSize: 10,
        rowCount: 0,
        pageTotal: 0
      },
      scStatus: -1,
      scOrderBy: 4,
      dport: '',
      uploading: false
    }
  },
  computed: {
    filteredProducts: function () {
      return this.extras.filter(function (info) {
        return info.productType !== PRODUCT_TYPE_CAR
      })
    }      
  },
  mounted: function () {
    this.search()
    this.searchAirports()
    this.searchExtraServices()
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
        case 1: return 'bg-success text-white'
        case 4: return 'table-dark'
      }
    },
    search: function () {
      const params = {
        'sc.pageNo': this.sc.pageNo,
        'sc.pageSize': this.sc.pageSize,
        'sc.status': this.scStatus,
        'sc.dport': this.dport,
        'sc.orderBy': this.scOrderBy
      }

      this.showLoading()

      searchOrders(params,
        v => {
          this.orders = v.dataList
          this.sc = v.page
        },
        () => this.hideLoading()
      )
    },
    showDetail: function (orderInfo) {
      this.$router.push('/order/detail/' + orderInfo.id)
    },
    showStatusDesc: function (status) {
      return showOrderStatusDesc(status)
    },
    newOrder: function () {
      this.$router.push('/order/new')
    },
    searchAirports: function () {
      const params = { 'sc.pageNo': 1,
        'sc.pageSize': 500
      }

      searchAirports(params,
        (jsonResult) => {
          this.airports = jsonResult.dataList
        },
        () => {}
      )
    },
    importExcel: function () {
      $('#modalExcel').modal()
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
    },
    searchExtraServices: function () {
      const params = {
        'sc.pageNo': 1,
        'sc.pageSize': 500
      }

      searchProducts(params,
        (jsonResult) => {
          this.extras = jsonResult.dataList
        }
      )
    },
    uploadExcel: function () {
      const filename = $('#inputFileName').val()
      if (filename.length === 0) {
        this.showErrMsg('请选择需要导入的EXCEL文件')
        return
      }

      this.uploading = true
      const self = this

      // showLoading();
      var formData = new window.FormData($('#uploadFileForm')[0])
      $.ajax({
        url: WEBAPP_NAME + '/upload/excel',
        type: 'POST',
        data: formData,
        timeout: 30000,
        cache: false,
        contentType: false,
        processData: false,
        success: function (jsonResult) {
          console.log(jsonResult)
          if (jsonResult.status !== 'OK') {
            self.showErrMsg('错误:' + jsonResult.errmsg, 'danger')
          } else {
            self.showErrMsg('上传成功, ' + jsonResult.desc)
            $('#inputFileName').val('')
            $('#modalExcel').modal('hide')
            self.search()
          }
        },
        complete: function () {
          self.uploading = false
        }
      })
    },
    reset: function () {
      this.scStatus = -1
      this.scOrderBy = 4
      this.dport = ''
    }
  }
}
</script>
