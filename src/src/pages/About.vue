<script lang="ts" setup>
  import { useHttp } from '../composables/useHttp';
  import { onMounted } from 'vue';

  const fetch = useHttp('https://api.auto.test/job-ride/aaaaaaaa-bbbb-cccc-dddd-000000000010/compound', {});
  const fetch2 = useHttp('https://api.auto.test/job-ride/aaaaaaaa-bbbb-cccc-dddd-000000000011/compound', {});

  onMounted(async () => {
    setTimeout(() => {
      fetch.execute();

      setTimeout(() => {
        fetch2.execute();
      }, 2000);
    }, 500);
  })

</script>

<template>
  Test<br>
  First call: {{ fetch.isFinished.value ? 'finished' : 'pending' }}<br>
  Second call: {{ fetch2.isFinished.value ? 'finished' : 'pending' }}
</template>
