<template>
  <div class="dashboard-container">
    <component :is="currentRole" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import adminDashboard from './admin'
import editorDashboard from './editor'

export default {
  name: 'Dashboard',
  components: { adminDashboard, editorDashboard },
  data() {
    return {
      // currentRole: 'adminDashboard'
    }
  },
  computed: {
    ...mapGetters([
      'roles'
    ]),
    currentRole() {
      for (const i of this.roles) {
        if (i === 'admin') return 'adminDashboard'
        if (i === 'userAdmin') return 'adminDashboard'
        if (i === 'activityFlow') return 'adminDashboard'
        // if (i === 'root') return 'adminDashboard'
      }
      return 'editorDashboard'
    }
  },
  created() {
    // console.log(this.roles)
  }
}
</script>
