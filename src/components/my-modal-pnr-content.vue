<template>
  <div class="modal" :id="id" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
            <h6 class="modal-title">
              <slot name="title">
                编码内容
              </slot>
            </h6>
            <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>                                                                
        </div>
        <div class="modal-body">
          <form role="form" class="form-horizontal">
            <div class="form-group row">
              <div class="col-12">
                <label class="small">编码内容：</label>
                <textarea class="form-control" rows="5" v-model="content"></textarea>
              </div>
            </div>
          </form>
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-default" @click.stop="cancel()">取消</button>
            <button type="button" class="btn btn-primary" @click.stop="ok()">确定</button>
        </div>
      </div>
    </div>                    
  </div>
</template>


<script>
import $ from 'jquery'

export default {
  props: {
    id: {
      type: String,
      default: 'modalPrompt'
    }
  },
  data () {
    return {
      resolve: '',
      reject: '',
      promise: '', // 保存promise对象

      content: ''
    }
  },
  methods: {
    ok: function () {
      $(this.$el).modal('hide')

      this.resolve({
        'pnrContent': this.content
      })
    },
    cancel: function () {
      $(this.$el).modal('hide')
      this.reject(null)
    },
    modal: function () {
      this.content = ''

      $(this.$el).modal()

      this.promise = new Promise((resolve, reject) => {
        this.resolve = resolve
        this.reject = reject
      })
      return this.promise // 返回promise对象,给父级组件调用
    }
  }
}
</script>
