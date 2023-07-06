<template>
  <div class="py-4 flex px-4">
    <img
      :src="comment.user.avatar"
      alt="avatar"
      class="w-10 h-10 rounded-full object-cover"
    />
    <div class="border-b border-secondary-grey w-full ml-4 pb-4">
      <div>{{ comment.user.username }}</div>
      <div>{{ comment.content }}</div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  comment: { required: true, type: Object, default: () => {} },
});
</script>
