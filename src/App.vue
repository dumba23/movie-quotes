<script setup>
import { onBeforeMount } from "vue";
import { RouterView, useRoute } from "vue-router";
import { switchLanguage } from "@/services/lang";
import { setLocale } from "@vee-validate/i18n";
import i18n from "@/plugins/i18";

const router = useRoute();

onBeforeMount(async () => {
  const locale = localStorage.getItem("locale");
  i18n.global.locale.value = locale;
  setLocale(locale);
  await switchLanguage(locale);
});
</script>

<template>
  <div
    class="min-h-screen"
    :class="router.path === '/' ? 'bg-primary-home' : 'bg-primary-profile'"
  >
    <RouterView />
  </div>
</template>
