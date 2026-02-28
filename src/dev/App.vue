<template>
  <div>
    <ThemeTestDemo />
    <ProductClassification />
    <RiskEvaluation />
    <RecordRecognition />
  </div>
</template>

<script setup lang="ts">
/**
 * 尚未集成路由系统，请通过组件引入方式进行预览
 */
import ThemeTestDemo from '@/dev/views/ThemeTestDemo.vue';
// import KvcCardDemo from '@/dev/views/DemoKvcCard.vue';
// import ComposableShowcase from '@/dev/views/composables/ComposableShowcase.vue';
// import KvvOrder from '@/build/components/KvvOrder.vue';
import { ProductClassification } from '@/build/components';
import { RiskEvaluation } from '@/build/components';
import { RecordRecognition } from '@/build/components';
</script>