<template>
  <div id="myPassword" class="card">
      <div class="card-header" >
          修改密码
      </div>
      <div class="card-body">
        <form>
          <div class="form-group row">
              <label class="col-3 col-form-label  text-right">当前用户</label>
              <div class="col-9">
                <input type="text" readonly class="form-control-plaintext" :value="username">
              </div>
          </div>
          <div class="form-group row">
              <label class="control-form-label col-3 text-right">当前密码</label>
              <div class="col-9">
                  <input type="password" name="currentPassword" class="form-control" v-model.trim="curPassword" />
              </div>
          </div>
          <div class="form-group row">
              <label class="control-form-label col-3 text-right">新密码</label>
              <div class="col-9">
                  <input type="password" name="newPassword" class="form-control" v-model.trim="newPassword" />
              </div>
          </div>
          <div class="form-group row">                        
              <label class="control-form-label col-3 text-right">确认密码</label>
              <div class="col-9">
                  <input type="password" name="confirmPassword" class="form-control" v-model.trim="confirmPassword" />
              </div>
          </div>
          <div class="form-group row">
            <button id="btnChange" type="button" class="btn btn-primary btn-block col-4 offset-4" :disabled="changing" @click.stop="updatePassword()">修改</button>
          </div>
      </form>
    </div>
  </div>            
</template>

<script>
  import { updatePassword } from '../api/user.js'

  export default {
    data () {
      return {
        curPassword: '',
        newPassword: '',
        confirmPassword: '',
        changing: false
      }
    },
    computed: {
      username () { return this.$store.state.username }
    },
    methods: {
      showErrMsg: function (msg, msgType) {
        this.$store.dispatch('showAlertMsg', { 'errMsg': msg, 'errMsgType': msgType })
      },
      updatePassword: function () {
        if (this.curPassword.length < 3) {
          this.showErrMsg('请输入当前密码, 密码不能少于3位字符')
          return
        }

        if (this.newPassword.length < 3) {
          this.showErrMsg('请输入新密码, 密码不能少于3位字符')
          return
        }

        if (this.newPassword !== this.confirmPassword) {
          this.showErrMsg('新密码和确认密码不一致')
          return
        }

        this.changing = true

        const params = {
          'currentPassword': this.curPassword,
          'newPassword': this.newPassword,
          'confirmPassword': this.confirmPassword
        }

        updatePassword(params, v => {
          if (v.status === 'OK') {
            this.showErrMsg('修改成功', 'success')
            this.reset()
          } else {
            this.showErrMsg(v.errmsg, 'danger')
            this.newPassword = ''
            this.confirmPassword = ''
          }
        }, () => {
          this.changing = false
        })
      },
      reset: function () {
        this.curPassword = ''
        this.newPassword = ''
        this.confirmPassword = ''
      }
    }
  }
</script>