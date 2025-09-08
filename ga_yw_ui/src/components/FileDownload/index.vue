<template>
  <div class="upload-file">
    <!-- 文件列表 -->
    <transition-group class="upload-file-list el-upload-list el-upload-list--text" name="el-fade-in-linear" tag="ul">
      <li v-for="(file, index) in fileList" :key="file.uid" class="el-upload-list__item ele-upload-list__item-content">
        <span class="el-icon-document" @click="downloadFile(file.ossId)"> {{ getFileName(file.name) }} </span>
      </li>
    </transition-group>
  </div>
</template>

<script setup lang="ts">
import { propTypes } from '@/utils/propTypes';

const props = defineProps({
  modelValue: {
    type: [String, Object, Array],
    default: () => []
  },
  // 数量限制
  limit: propTypes.number.def(5)
});

const { proxy } = getCurrentInstance() as ComponentInternalInstance;
const emit = defineEmits(['update:modelValue']);

const baseUrl = import.meta.env.VITE_APP_BASE_API;

const fileList = ref<any[]>([]);

watch(
  () => props.modelValue,
  async (val) => {
    if (val) {
      let temp = 1;
      // 首先将值转为数组
      let list: any[] = [];
      if (Array.isArray(val)) {
        list = val;
      } else {
        try {
          list = JSON.parse(val).map((oss) => {
            return {
              name: oss.name,
              ossId: oss.id
            };
          });
        } catch (e) {
          list = [];
          list.push({
            name: val,
            ossId: val
          });
        }
      }
      // 然后将数组转为对象数组
      fileList.value = list.map((item) => {
        item = { name: item.name, url: item.url, ossId: item.ossId };
        item.uid = item.uid || new Date().getTime() + temp++;
        return item;
      });
    } else {
      fileList.value = [];
      return [];
    }
  },
  { deep: true, immediate: true }
);


// 获取文件名称
const getFileName = (name: string) => {
  // 如果是url那么取最后的名字 如果不是直接返回
  if (name.lastIndexOf('/') > -1) {
    return name.slice(name.lastIndexOf('/') + 1);
  } else {
    return name;
  }
};

const downloadFile = (ossId: String) => {
  proxy?.$download.oss(ossId);
};

</script>

<style scoped lang="scss">
.upload-file-uploader {
  margin-bottom: 5px;
}

.upload-file-list .el-upload-list__item {
  line-height: 2;
  margin-bottom: 10px;
  position: relative;
}

.upload-file-list .ele-upload-list__item-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #409EFF;
}

.ele-upload-list__item-content-action .el-link {
  margin-right: 10px;
}
</style>
