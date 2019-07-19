<template>
  <div id="api-config" class="row justify-content-center">
    <div class="col-12 col-lg-5">
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb">
            <li class="breadcrumb-item">
              <router-link to="/">首页</router-link>
            </li>
            <li class="breadcrumb-item active" aria-current="page">API参数设置</li>
          </ol>
        </nav>

        <div class="block">
          <div class="block-body">
          
            <form>
              <div class="form-group">
                <input type="text" readonly class="form-control-plaintext" :value="username">
                <span class="text-muted small">当前用户名</span>
              </div>
              <div class="form-group">
                <input type="input" readonly class="form-control" placeholder="秘钥"  v-model="secretKey">
                <button type="button" class="btn btn-danger btn-small" @click.stop="generateSecretKey()">生成</button>
                <span class="text-muted small">秘钥, 调用接口时必须的</span>
              </div>
              <div class="form-group">
                <input type="input" class="form-control" placeholder="调用接口的IP地址"  v-model="allowedIps">
                <small class="text-muted small">必填，保障接口安全，多个IP用逗号隔开，最多5个IP</small>
              </div>             
              <div class="form-group text-center">
                <button type="button" class="btn btn-outline-dark" @click.stop="saveApiParams()">
                  <i class="far fa-user mr-2"></i>保存                                
                </button>
              </div>
            </form>
          </div>
        </div>
    </div>

    </div>
  </div>            
</template>

<script>
  import { generateSecretKey, getApiParams, saveApiParams } from '../api/user.js'

  export default {
    data () {
      return {
        secretKey: '',
        allowedIps: ''
      }
    },
    computed: {
      username () { return this.$store.state.username }
    },
    mounted: function() {
      this.getApiParams()
    },
    methods: {
      showErrMsg: function (msg, msgType) {
        this.$store.dispatch('showAlertMsg', { 'errMsg': msg, 'errMsgType': msgType })
      },
      generateSecretKey: function () {
      	generateSecretKey( v => {
      		if (v.status == 'OK') {
      			this.secretKey = v.desc
      		}
      	})
      },
      saveApiParams: function () {
        const params = {
          'secretKey': this.secretKey,
          'allowedIps': this.allowedIps
        }

        saveApiParams(params, v => {
          if (v.status === 'OK') {
            this.showErrMsg('保存成功', 'success')
          } else {
            this.showErrMsg('错误: ' + v.errmsg, 'danger')
          }
        })
      },
      getApiParams: function () {
        getApiParams(v => {
          if (v.status !== null) {
          	this.secretKey = v.secretKey
          	this.allowedIps = v.allowedIps
          }
        })
      }
    }
  }
</script>