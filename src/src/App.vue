<script lang="ts" setup>
  import { RouterView, RouterLink } from 'vue-router';
</script>

<template>
  <Suspense>
    <template #default>

      <div>
      <RouterLink to="/">Index</RouterLink>
      <RouterLink to="/about">About</RouterLink>

      <RouterView />
      </div>
    </template>

    <template #fallback>
      Loading...
    </template>
  </Suspense>
</template>
