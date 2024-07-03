<template>
  <div class="container">
    <div class="upload-section">
      <input type="file" @change="handleVideoUpload" />
      <video
        v-if="uploadedVideoUrl"
        :src="uploadedVideoUrl"
        controls
        @error="handleVideoError"
      ></video>
    </div>
    <div class="process-section">
      <div class="encrypt-section">
        <el-button type="primary" @click="encryptVideo"
          >加密视频</el-button
        >
        <video
          v-if="encryptedVideoUrl"
          :src="encryptedVideoUrl"
          controls
          @error="handleVideoError"
        ></video>
      </div>
      <div class="vertical-divider"></div>
      <div class="decrypt-section">
        <el-button type="primary" @click="decryptVideo">解密视频</el-button>
        <video
          v-if="decryptedVideoUrl"
          :src="decryptedVideoUrl"
          controls
          @error="handleVideoError"
        ></video>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineComponent, ref } from "vue";
import { ElMessage, ElButton } from "element-plus";

const uploadedVideoUrl = ref(null);
const encryptedVideoUrl = ref(null);
const decryptedVideoUrl = ref(null);

const handleVideoUpload = event => {
  const file = event.target.files[0];
  if (file && file.type.includes("video")) {
    uploadedVideoUrl.value = URL.createObjectURL(file);
  } else {
    ElMessage.error("请上传视频文件");
  }
};

const handleVideoError = () => {
  ElMessage.error("无法加载视频文件，请检查文件格式和浏览器兼容性");
};

const encryptVideo = () => {
  if (!uploadedVideoUrl.value) {
    ElMessage.error("请先上传视频");
    return;
  }
  // 模拟视频加密过程
  encryptedVideoUrl.value = uploadedVideoUrl.value; // 这里应该是加密后的视频URL
  ElMessage.success("视频加密成功");
};

const decryptVideo = () => {
  if (!encryptedVideoUrl.value) {
    ElMessage.error("请先加密视频");
    return;
  }
  // 模拟视频解密过程
  decryptedVideoUrl.value = encryptedVideoUrl.value; // 这里应该是解密后的视频URL
  ElMessage.success("视频解密成功");
};
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.upload-section {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid #ccc;
}

.process-section {
  flex: 2;
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.encrypt-section,
.decrypt-section {
  display: flex;
  flex-direction: column;
  align-items: center;
}

video {
  max-width: 100%;
  max-height: 200px;
  margin-top: 10px;
}
.vertical-divider {
  width: 1px;
  background-color: #ccc;
  margin: 0 10px;
  height: 450px;
}
</style>
