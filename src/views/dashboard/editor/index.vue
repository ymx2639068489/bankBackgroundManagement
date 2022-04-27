<template>
  <div class="dashboard-editor-container">
    <div class="clearfix" style="margin-bottom: 100px">
      <pan-thumb :image="avatar" style="float: left">
        Your roles:
        <span v-for="item in roles" :key="item" class="pan-info-roles" style="color: rgb(0,0,0);">{{ item }}</span>
      </pan-thumb>
      <div class="info-container">
        <span class="display_name" style="color: rgb(0,0,0);">{{ name }}</span>
        <span style="font-size:20px;padding-top:20px;display:inline-block;">Editor's Dashboard</span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import PanThumb from '@/components/PanThumb'
import waves from '@/directive/waves/index.js' // 水波纹指令
export default {
  name: 'DashboardEditor',
  components: {
    PanThumb
  },
  directives: {
    waves
  },
  data() {
    return {
      emptyGif: 'https://wpimg.wallstcn.com/0e03b7da-db9e-4819-ba10-9016ddfdaed3',
      userInfo: {}
    }
  },
  computed: {
    ...mapGetters([
      'name',
      'avatar',
      'roles'
    ])
  },
  created() {
    this.$store.dispatch('user/getInfo').then(res => {
      this.userInfo = res
    })
  },
  methods: {
    getUserInfo() {
      this.$store.dispatch('user/getInfo').then(res => {
        this.name = res.data.name
        this.avatar = res.data.avatar
        this.roles = res.data.roles
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .emptyGif {
    display: block;
    width: 45%;
    margin: 0 auto;
  }

  .dashboard-editor-container {
    // background-color: rgb(240,242,245);
    color: rgb(0,0,0);
    // background: url('http://150.158.102.62:8888/header1.webp');
    min-height: calc(100vh - 84px);
    padding: 50px 60px 0px;
    .pan-info-roles {
      font-size: 12px;
      font-weight: 700;
      color: #000;
      display: block;
    }
    .info-container {
      position: relative;
      margin-left: 190px;
      height: 150px;
      line-height: 200px;
      .display_name {
        font-size: 48px;
        line-height: 48px;
        color: #212121;
        position: absolute;
        top: 25px;
      }
    }
  }
</style>
