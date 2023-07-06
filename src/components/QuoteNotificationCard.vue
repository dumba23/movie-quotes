<template>
  <div
    class="flex justify-between border border-secondary-grey border-opacity-50 mb-2 p-2"
  >
    <div class="flex">
      <img
        :src="notification.sender.avatar"
        alt="avatar"
        class="h-10 w-10 rounded-full mr-4"
        :class="notification.read === 0 && 'border-2 border-primary-success'"
      />
      <div class="flex flex-col">
        <div>{{ notification.sender.username }}</div>
        <div class="flex items-center">
          <template v-if="notification.type === 'comment'">
            <IconQuote class="h-4 w-4 mr-2" />
          </template>
          <template v-else>
            <IconPinkHeart class="h-4 w-4 mr-2" />
          </template>
          <p>{{ notification.message }}</p>
        </div>
      </div>
    </div>
    <div class="flex flex-col items-end">
      <div>{{ dayjs(String(notification.created_at)).fromNow() }}</div>
      <div v-if="notification.read === 0" class="text-primary-success">New</div>
    </div>
  </div>
</template>

<script setup>
import IconPinkHeart from "@/components/icons/IconPinkHeart.vue";
import IconQuote from "@/components/icons/IconQuote.vue";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/en";

dayjs.extend(relativeTime);
dayjs.locale("en");

defineProps({
  notification: { required: true, type: Object, default: () => {} },
});
</script>
