<template>
  <div
    class="w-[100vw] h-[100vh] space-y-4 flex justify-center items-center flex-col"
  >
    <img src="@/assets/images/403.png" class="w-96 h-76 sm:w-60" />
    <div class="font-bold text-white text-4xl sm:text-2xl">
      {{ $t("you_shall_not_pass") }}!
    </div>
    <div class="font-medium text-white text-xl sm:text-center sm:text-base">
      {{ $t("sorry_you_dont_have_permission") }} <br class="hidden sm:block" />
      {{ $t("to_access_this_page") }}
    </div>
    <RouterLink
      to="/"
      class="py-2.5 px-4 sm:py-1.5 rounded translate-y-7 bg-primary-red text-white flex justify-center items-center"
    >
      {{ $t("return_home") }}
    </RouterLink>
  </div>
</template>

<script setup>
import { RouterLink } from "vue-router";
</script>
