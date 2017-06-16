<template>
  <div>
    <Uploader class="center"/>
  </div>
</template>

<script>
import Uploader from './Uploader'

export default {
  name: 'hello',
  data () {
    return {
    }
  },
  components: {
    Uploader
  }
}
</script>

<style scoped>
div {
  width: 100%;
}
</style>
