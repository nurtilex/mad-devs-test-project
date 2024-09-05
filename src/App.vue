<script setup lang="ts">
import { computed, ref } from 'vue';

import { getDataSource, getColumns } from '@/lib/parse';
import { PROJECTS_LIST } from '@/data';

const current = ref(PROJECTS_LIST[0]);

const columns = computed(() => getColumns(current.value?.data.header));
const dataSource = computed(() => {
  const data = current.value?.data.data;
  const headers = current.value?.data.header;

  return getDataSource(data, headers);
});
</script>

<template>
  <main>
    <div class="dropdown-wrapper">
      <a-dropdown :trigger="['click']">
        <a-button class="dropdown-label" @click.prevent>
          {{ current?.label }}
        </a-button>
        <template #overlay>
          <a-menu>
            <a-menu-item
              v-for="project in PROJECTS_LIST"
              @click="current = project"
              :key="project.id"
              >{{ project.label }}</a-menu-item
            >
          </a-menu>
        </template>
      </a-dropdown>
    </div>
    <a-table
      :dataSource="dataSource"
      :columns="columns"
      :pagination="false"
      :scroll="{ x: 1000 }"
    />
  </main>
</template>

<style lang="scss">
:root {
  font-size: 16px;

  @media screen and (max-width: 1200px) {
    font-size: 14px;
  }

  @media screen and (max-width: 700px) {
    font-size: 10px;
  }
}

body {
  margin: 0;
  box-sizing: border-box;
  background: #a7ddc6;
  width: 100%;
  padding: 5rem 2rem 2rem;

  main {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    min-height: 60vh;
    width: 100%;
    max-width: 1440px;

    .dropdown-wrapper {
      min-width: 100px;
      max-width: 200px;

      .dropdown-label {
        width: 100%;
      }
    }
  }
}
</style>
