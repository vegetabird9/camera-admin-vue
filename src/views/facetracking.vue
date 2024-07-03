<template>
  <div class="facetracking-container">
    <div class="top-panel">
      <div class="left-buttons">
        <el-upload
          class="upload-demo"
          action="#"
          :http-request="customUpload"
          :show-file-list="false"
        >
          <el-button slot="trigger" type="primary">上传照片</el-button>
        </el-upload>
        <el-button type="primary" @click="handleSearch" class="search-button">
          开始搜索
        </el-button>
      </div>
      <div class="right-buttons">
        <el-input
          v-model="cameraCountToAdd"
          :step="1"
          style="width: 100px"
          class="camera-count-input"
        ></el-input>
        <span> of {{ filteredCameras.length }} </span>
        <el-button
          type="primary"
          @click="addSelectedCameras"
          class="add-camera-button"
        >
          添加
        </el-button>
        <el-button type="danger" @click="clearAllCameras">清空</el-button>
      </div>
    </div>
    <div class="content-panel">
      <div class="left-panel">
        <div class="image-results">
          <img
            v-if="uploadedImage"
            :src="uploadedImage"
            alt="Uploaded Image"
            class="uploaded-image"
          />
        </div>
      </div>
      <div class="vertical-divider"></div>
      <div class="right-panel">
        <div class="attribute-buttons">
          <el-button
            v-for="attribute in uniqueAttributes"
            :key="attribute"
            :type="
              selectedAttributes.includes(attribute) ? 'primary' : 'default'
            "
            @click="toggleAttribute(attribute)"
            class="attribute-button"
          >
            {{ attribute }}
          </el-button>
        </div>
        <div class="camera-grid">
          <div
            v-for="(camera, index) in cameraList"
            :key="index"
            class="camera-item"
          >
            <video :src="camera.videoSrc" controls class="camera-video"></video>
            <div class="camera-info">
              <p>摄像头名称: {{ camera.name }}</p>
              <p>位置: {{ camera.location }}</p>
              <el-button type="danger" @click="handleRemoveCamera(index)">
                删除
              </el-button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from "vue";
import { ElMessage, ElButton, ElInputNumber } from "element-plus";

export default defineComponent({
  name: "FaceTracking",
  components: {
    ElButton,
    ElInputNumber
  },
  setup() {
    const uploadedImage = ref<string | null>(null);
    const cameraList = ref<any[]>([]);
    const availableCameras = ref([
      {
        name: "摄像头1",
        location: "北京朝阳",
        videoSrc: "https://via.placeholder.com/150",
        attribute: "cp-abe1"
      },
      {
        name: "摄像头2",
        location: "上海浦东",
        videoSrc: "https://via.placeholder.com/150",
        attribute: "cp-abe1"
      },
      {
        name: "摄像头3",
        location: "上海浦西",
        videoSrc: "https://via.placeholder.com/150",
        attribute: "cp-abe2"
      },
      {
        name: "摄像头4",
        location: "上海外滩",
        videoSrc: "https://via.placeholder.com/150",
        attribute: "cp-abe3"
      },
      {
        name: "摄像头5",
        location: "上海外滩",
        videoSrc: "https://via.placeholder.com/150",
        attribute: "cp-abe4"
      },
      {
        name: "摄像头6",
        location: "北京朝阳",
        videoSrc: "https://via.placeholder.com/150",
        attribute: "cp-abe1"
      },
      {
        name: "摄像头7",
        location: "上海浦东",
        videoSrc: "https://via.placeholder.com/150",
        attribute: "cp-abe1"
      },
      {
        name: "摄像头8",
        location: "上海浦西",
        videoSrc: "https://via.placeholder.com/150",
        attribute: "cp-abe2"
      },
      {
        name: "摄像头9",
        location: "上海外滩",
        videoSrc: "https://via.placeholder.com/150",
        attribute: "cp-abe3"
      },
      {
        name: "摄像头10",
        location: "上海外滩",
        videoSrc: "https://via.placeholder.com/150",
        attribute: "cp-abe4"
      }
    ]);

    const customUpload = (options: any) => {
      const { file, onSuccess } = options;
      const reader = new FileReader();
      reader.onload = e => {
        uploadedImage.value = e.target.result as string;
        onSuccess("上传成功");
      };
      reader.readAsDataURL(file);
      return Promise.resolve();
    };

    const handleSearch = () => {
      ElMessage.info("搜索功能待开发");
    };

    const selectedAttributes = ref<string[]>([]);
    const cameraCountToAdd = ref<number>(1);

    const uniqueAttributes = computed(() => {
      const attributes = availableCameras.value.map(camera => camera.attribute);
      return Array.from(new Set(attributes));
    });

    const toggleAttribute = (attribute: string) => {
      if (selectedAttributes.value.includes(attribute)) {
        selectedAttributes.value = selectedAttributes.value.filter(
          attr => attr !== attribute
        );
      } else {
        selectedAttributes.value.push(attribute);
      }
    };

    const filteredCameras = computed(() => {
      if (selectedAttributes.value.length === 0) {
        return availableCameras.value;
      }
      return availableCameras.value.filter(camera =>
        selectedAttributes.value.includes(camera.attribute)
      );
    });

    const addSelectedCameras = () => {
      if (cameraList.value.length >= 9 || cameraCountToAdd.value > 9) {
        ElMessage.warning(`最多只能添加9个摄像头`);
        return;
      }

      if (cameraCountToAdd.value > filteredCameras.value.length) {
        ElMessage.warning(`可添加的摄像头数量不足`);
        return;
      }

      const camerasToAdd = filteredCameras.value.slice(
        0,
        cameraCountToAdd.value
      );

      camerasToAdd.forEach(camera => {
        if (!cameraList.value.some(c => c.name === camera.name)) {
          cameraList.value.push(camera);
        } else {
          ElMessage.warning(`要添加的摄像头 ${camera.name} 已经存在`);
        }
      });
    };

    const handleRemoveCamera = (index: number) => {
      cameraList.value.splice(index, 1);
    };

    const clearAllCameras = () => {
      cameraList.value = [];
    };

    return {
      uploadedImage,
      cameraList,
      availableCameras,
      customUpload,
      handleSearch,
      selectedAttributes,
      uniqueAttributes,
      toggleAttribute,
      filteredCameras,
      cameraCountToAdd,
      addSelectedCameras,
      handleRemoveCamera,
      clearAllCameras
    };
  }
});
</script>

<style scoped>
.facetracking-container {
  padding: 20px;
}
/* 顶部按钮区 */
.top-panel {
  display: flex;
  /* justify-content: space-between; */
  align-items: center; /* 添加垂直居中对齐 */
  gap: 170px; /* 设置子元素之间的间距为 10px */
  margin-bottom: 20px;
}

.left-buttons {
  display: flex;
  align-items: center;
}

.right-buttons {
  display: flex;
  align-items: center;
}

.attribute-buttons {
  display: flex;
  flex-wrap: wrap; /* 允许属性按钮换行 */
  gap: 5px; /* 设置属性按钮之间的间距 */
  margin-top: 10px; /* 调整属性按钮与用户输入框之间的间距 */
}

.attribute-button {
  margin-bottom: 5px; /* 调整属性按钮之间的垂直间距 */
}

.upload-demo {
  margin-right: 10px;
}

.search-button {
  margin-right: 10px;
}

.add-camera-button {
  margin-right: 10px;
}

.camera-count-input {
  width: 60px;
  margin-left: 10px;
}

.content-panel {
  display: flex;
  margin-top: 20px;
}

.left-panel {
  width: 30%;
  padding-right: 10px;
  box-sizing: border-box;
}

.image-results {
  margin-bottom: 20px;
}

.uploaded-image {
  width: 100%;
  height: auto;
  border: 1px solid #ccc;
  padding: 10px;
  box-sizing: border-box;
}

.vertical-divider {
  width: 1px;
  background-color: #ccc;
  margin: 0 10px;
  height: 450px;
}

.right-panel {
  width: 70%;
  padding-left: 10px;
  box-sizing: border-box;
}

.camera-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(45%, 1fr));
  gap: 10px;
}

.camera-item {
  border: 1px solid #ccc;
  padding: 10px;
  box-sizing: border-box;
}

.camera-video {
  width: 100%;
  height: auto;
}

.camera-info {
  margin-top: 10px;
}
</style>
