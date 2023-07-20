<template>
  <div
    class="flex justify-between border border-secondary-grey border-opacity-50 mb-2 p-2 cursor-pointer"
  >
    <div class="flex flex-col">
      <div class="flex">
        <img
          :src="
            notification.sender.avatar.includes('http')
              ? notification.sender.avatar
              : apiUrl + '/storage/' + notification.sender.avatar
          "
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
      <div class="hidden sm:flex space-x-6 ml-1 mt-1 flex-row">
        <div v-if="notification.read === 0" class="text-primary-success">
          {{ $t("news.new") }}
        </div>
        <div v-else class="w-8"></div>
        <div>{{ dayjs(String(notification.created_at)).fromNow() }}</div>
      </div>
    </div>
    <div class="sm:hidden flex flex-col items-end">
      <div>{{ dayjs(String(notification.created_at)).fromNow() }}</div>
      <div v-if="notification.read === 0" class="text-primary-success">
        {{ $t("news.new") }}
      </div>
    </div>
  </div>
</template>

<script setup>
import IconPinkHeart from "@/components/icons/IconPinkHeart.vue";
import IconQuote from "@/components/icons/IconQuote.vue";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/en";
import i18n from "@/plugins/i18";

const apiUrl = import.meta.env.VITE_API_BASE_URL;

defineProps({
  notification: { required: true, type: Object, default: () => {} },
});

dayjs.extend(relativeTime);
dayjs.locale(i18n.global.locale.value);
</script>
