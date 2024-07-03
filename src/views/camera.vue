<template>
  <div>
    <!-- 查询和添加摄像头功能 -->
    <el-form :inline="true" :model="searchForm" class="demo-form-inline">
      <el-form-item label="摄像头位置">
        <el-input v-model="searchForm.location" placeholder="省市区"></el-input>
      </el-form-item>
      <el-form-item label="摄像头属性">
        <el-input v-model="searchForm.attribute" placeholder="属性"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleSearch">查询</el-button>
      </el-form-item>
    </el-form>

    <el-form :model="addForm" class="demo-form-inline">
      <el-form-item label="摄像头IP">
        <el-input v-model="addForm.ip" placeholder="输入IP"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleAdd">添加摄像头</el-button>
      </el-form-item>
    </el-form>

    <!-- 摄像头表格 -->
    <el-table :data="filteredCameraList" style="width: 100%">
      <el-table-column prop="name" label="摄像头ID" width="180"/>
      <el-table-column prop="location" label="位置" width="180"/>
      <el-table-column prop="attribute" label="属性" width="180"/>
      <el-table-column prop="status" label="是否工作中" width="180">
        <template #default="scope">
          <el-tag :type="scope.row.status ? 'success' : 'danger'">
            {{ scope.row.status ? '是' : '否' }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="180">
        <template #default="scope">
          <el-button @click="handleView(scope.row)" type="text">查看</el-button>
          <el-button @click="handleDelete(scope.row)" type="text">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue';
import { ElMessage } from 'element-plus';

export default defineComponent({
  name: 'Camera',
  setup() {
    const searchForm = ref({
      location: '',
      attribute: ''
    });

    const addForm = ref({
      ip: ''
    });

    const cameraList = ref([
      // 示例数据
      { name: '摄像头1', location: '北京朝阳', attribute: 'cp-abe1', status: true },
      { name: '摄像头2', location: '上海浦东', attribute: 'cp-abe2', status: false },
    ]);

    const handleSearch = () => {
      // 查询逻辑，可以根据searchForm.location和searchForm.attribute进行过滤
      console.log('查询摄像头', searchForm.value);
    };

    const handleAdd = () => {
      // 添加摄像头逻辑，可以根据addForm.ip添加新的摄像头
      if (addForm.value.ip) {
        cameraList.value.push({
          name: `摄像头${cameraList.value.length + 1}`,
          location: '未知',
          attribute: '未知',
          status: true,
        });
        ElMessage.success('添加成功');
      } else {
        ElMessage.error('请输入IP');
      }
    };

    const handleView = (row) => {
      // 查看摄像头逻辑
      console.log('查看摄像头', row);
    };

    const handleDelete = (row) => {
      // 删除摄像头逻辑
      const index = cameraList.value.indexOf(row);
      if (index !== -1) {
        cameraList.value.splice(index, 1);
        ElMessage.success('删除成功');
      }
    };

    const filteredCameraList = computed(() => {
      const { location, attribute } = searchForm.value;
      return cameraList.value.filter(camera => {
        const matchesLocation = location ? camera.location.includes(location) : true;
        const matchesAttribute = attribute ? camera.attribute.includes(attribute) : true;
        return matchesLocation && matchesAttribute;
      });
    });

    return {
      searchForm,
      addForm,
      cameraList,
      handleSearch,
      handleAdd,
      handleView,
      handleDelete,
      filteredCameraList,
    };
  }
});
</script>

<style scoped>
.demo-form-inline {
  margin-bottom: 20px;
}
</style>
