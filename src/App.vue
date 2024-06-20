<script setup lang="ts">
import { unsafeWindow } from '$';
import { onMounted, ref, computed } from 'vue';
import Dropdown from "./components/fandom/dropdown.vue";

const ORIGIN_PREFIX = '/zh/wiki/';
const TARGET_PREFIX = 'https://zh.minecraft.wiki';

const page = ref<string>();

const target = computed<string>(() => {
  let path = '';
  if (page.value !== undefined) {
    path = `/w/${page.value}`;
  }
  return `${TARGET_PREFIX}${path}`;
});

function parsePage() {
  const url = new URL(unsafeWindow.location.href);
  const path = url.pathname;
  console.info(`当前路径：`, path);
  page.value = path.substring(ORIGIN_PREFIX.length);
  console.info(`当前页面：`, page.value);
}

onMounted(() => {
  console.info("App已挂载");
  parsePage();
  unsafeWindow.onkeydown = (event) => {
    console.info('按下按键：', event);
    if (event.key === 'n') {
      location.href = target.value;
    }
  };
});
</script>

<template>
  <!-- 左侧工具栏 -->
  <Teleport to=".page-side-tools">
    <a class="page-side-tool" :href="target" aria-label="前往新Wiki" data-wds-tooltip="前往新Wiki"
      data-wds-tooltip-position="right">
      新
    </a>
  </Teleport>
  <!-- 置顶导航条（自动隐藏） -->
  <Teleport to="header.fandom-community-header > nav.fandom-community-header__local-navigation > ul.wds-tabs">
    <Dropdown title="新Wiki">
      <li>
        <a :href="TARGET_PREFIX">首页</a>
      </li>
      <li>
        <a :href="target">当前页面</a>
      </li>
    </Dropdown>
  </Teleport>
  <!-- 页面导航条 -->
  <Teleport to="div.fandom-sticky-header > nav.fandom-community-header__local-navigation > ul.wds-tabs">
    <Dropdown title="新Wiki">
      <li>
        <a :href="TARGET_PREFIX">首页</a>
      </li>
      <li>
        <a :href="target">当前页面</a>
      </li>
    </Dropdown>
  </Teleport>
</template>