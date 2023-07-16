<template>
  <div class="py-4 flex px-4">
    <img
      :src="
        comment.user.avatar.includes('http')
          ? comment.user.avatar
          : apiUrl + '/storage/' + comment.user.avatar
      "
      alt="avatar"
      class="w-10 h-10 rounded-full object-cover"
    />
    <div class="border-b border-secondary-grey w-full ml-4 pb-4 sm:text-base">
      <div>{{ comment.user.username }}</div>
      <div>{{ comment.content }}</div>
    </div>
  </div>
</template>

<script setup>
const apiUrl = import.meta.env.VITE_API_BASE_URL;

defineProps({
  comment: { required: true, type: Object, default: () => {} },
});
</script>
