<script lang="ts" setup>
defineEmits<{ click: [] }>();

import Button from "@/components/Button.vue";
</script>

<template>
  <Button @click="$emit('click')">
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path class="background" d="M 17.5,6.5 H 6.5 v 11 h 11 z" fill="none" />
      <path d="m 14,9 v 1 H 10 V 9 Z" fill="black" />
      <path d="m 14,14 v 1 h -4 v -1 z" fill="black" />
      <path d="m 15,14 h -1 v -4 h 1 z" fill="black" />
      <path d="M 10,14 H 9 v -4 h 1 z" fill="black" />
      <path d="m 6.5,5.5 v 1 h 11 v -1 z" fill="black" />
      <path d="m 18.5,6.5 h -1 v 11 h 1 z" fill="black" />
      <path d="m 6.5,17.5 v 1 h 11 v -1 z" fill="black" />
      <path d="m 5.5,17.5 h 1 v -11 h -1 z" fill="black" />
    </svg>
  </Button>
</template>
