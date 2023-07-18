<template>
  <div
    class="w-[100vw] h-[100vh] space-y-4 flex justify-center items-center flex-col"
  >
    <img src="@/assets/images/404.png" />
    <div class="font-bold text-white text-4xl sm:text-2xl">
      {{ $t("errors.whoops") }}!
    </div>
    <div class="font-medium text-white text-xl sm:text-base">
      {{ $t("errors.we_cant_see_the_page_you_are_looking_for") }}
    </div>
    <RouterLink
      to="/"
      class="py-2.5 px-4 sm:py-1.5 rounded translate-y-7 bg-primary-red text-white flex justify-center items-center"
    >
      {{ $t("erros.return_home") }}
    </RouterLink>
  </div>
</template>

<script setup>
import { RouterLink } from "vue-router";
</script>
