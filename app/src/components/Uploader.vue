<template>
  <div class="upload-container">
    <h2> Upload Memes </h2>
    <input id="file-picker" class="hidden" type="file" @change="processFile($event)">
    <label id="btn-choose-file" for="file-picker" class="button btn-info center"> Choose File </label>
    <div id="btn-upload" v-if="file && !uploaded" class="button btn-success center" @click="upload()">
      <div v-show="loading" v-bind:class="{ loading }"/>
      {{ file ? 'Upload' : 'You must Choose a File first' }}
    </div>
    <div v-show="url.length" class="container">
      <input id="url-bar" ref="urlBar" type="text" class="center" :value="url" v-show="url.length">
      <div @click="copyUrl" class="button btn-success center">Copy</div>
    </div>
    <div v-show="error.length" class="btn btn-block btn-error">
      {{ error }}
    </div>
    <div class="center progress-bar" v-if="loading">
      <div class="progress-bar-filled" v-bind:style="{ width: loadingPercent + '%' }"></div>
    </div>
    <hr>
    <h3 v-if="file"> {{ file.name }} </h3>
    <img v-if="preview && file.type.match(/image\/.+/)" class="preview" :src="preview.data">
    <pre v-if="preview && preview.type === 'text'" class="preview">{{ preview.data }}</pre>
  </div>
</template>
<script>

export default {
  data () {
    return {
      file: undefined,
      preview: null,
      url: '',
      loadingPercent: 0,
      loading: false,
      uploaded: true,
      error: ''
    }
  },
  methods: {
    upload () {
      if (!this.file) {
        return
      }
      console.log('uploading', this.file)
      this.loading = true
      this.uploaded = true
      let data = new FormData()
      data.append('file', this.file)
      this.$http.post('https://i.nuuls.com/upload?password=ayylmao', data, { progress: this.updateProgress })
      .then(res => {
        console.log(res)
        this.loading = false
        this.loadingPercent = 0
        if (res.status === 200) {
          this.url = res.body
          return
        }
      }, res => {
        console.log(res)
        this.loading = false
        this.loadingPercent = 0
        if (res.status >= 400 && res.status < 500) {
          this.error = `i.nuuls.com returned status ${res.status}. Try another file`
        } else {
          this.error = 'i.nuuls.com is down, try again later'
        }
      })
      .catch(err => {
        console.error('scuffed server', err)
      })
    },
    updateProgress (ev) {
      console.log(ev)
      this.loadingPercent = ev.loaded / ev.total * 100
    },
    createFile (file, type = 'image') {
      console.log(file)
      this.file = file
      this.uploaded = false
      this.url = ''
      let reader = new FileReader()
      reader.onloadend = () => {
        this.preview = {
          data: reader.result,
          type
        }
      }
      if (type === 'text') {
        reader.readAsText(this.file)
        return
      }
      reader.readAsDataURL(this.file)
    },
    processFile (ev) {
      this.createFile(ev.target.files[0])
    },
    paste (ev) {
      ev.preventDefault()
      console.log(ev)
      console.log(ev.clipboardData.types)
      const data = ev.clipboardData
      if (data.types[0] === 'Files') {
        this.createFile(data.files[0])
        return
      }
      const blob = new Blob([data.getData(data.types[0])], { type: data.types[0] })
      blob.name = 'clipboard.txt'
      this.createFile(blob, 'text')
    },
    drop (ev) {
      ev.preventDefault()
      ev.stopPropagation()
      console.log(ev)
      this.createFile(ev.dataTransfer.files[0])
    },
    dragOver (ev) {
      ev.preventDefault()
    },
    copyUrl () {
      let el = this.$refs.urlBar
      console.log(el)
      el.select()
      try {
        let gotEm = document.execCommand('copy')
        console.log(gotEm)
      } catch (err) {
        console.log(err)
      }
    }
  },
  mounted () {
    document.addEventListener('paste', this.paste)
    document.ondragover = this.dragOver
    document.ondrop = this.drop
  }
}

</script>
<style scoped>
.upload-container {
  min-width: 40%;
  max-width: 40em;
}

.hidden {
  display: none;
}

.button {
  margin-top: 10px;
  margin-bottom: 10px;
}

.preview {
  display: block;
  margin: 0 auto;
  max-width: 70%;
  max-height: 60%;
}

.container {
  display: flex;
  align-items: center;
}

#url-bar {
  padding: 5px;
  color: black;
  width: 90%;
  height: 1.3em;
  margin-right: 10px;
}
</style>
