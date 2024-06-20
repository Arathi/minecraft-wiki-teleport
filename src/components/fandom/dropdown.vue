<script setup lang="ts">
const props = defineProps<{
  title: string;
}>();
</script>

<template>
  <li class="wds-dropdown">
    <div class="wds-tabs__tab-label wds-dropdown__toggle first-level-item">
      <a href="#">
        {{ title }}
      </a>
      <svg class="wds-icon wds-icon-tiny wds-dropdown__toggle-chevron">
        <use xlink:href="#wds-icons-dropdown-tiny"></use>
      </svg>
    </div>
    <div class="wds-is-not-scrollable wds-dropdown__content">
      <ul class="wds-list wds-is-linked">
        <slot></slot>
      </ul>
    </div>
  </li>
</template>