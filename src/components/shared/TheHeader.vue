<template>
  <div class="flex justify-between mx-20 pt-8 sm:mx-4">
    <div class="text-primary-yellow">MOVIE QUOTES</div>
    <div class="flex justify-between w-80 sm:w-32">
      <div
        class="flex justify-center items-center text-white px-3 py-2 sm:hidden cursor-pointer"
        @click="toggleLanguageDropdown"
      >
        <div class="mr-2.5 relative">
          {{ i18n.global.locale.value === "en" ? "Eng" : "ქარ" }}
          <div
            v-if="isLanguageDropdownOpen"
            ref="languageRef"
            class="absolute bg-primary-black py-1 px-4 -translate-x-2 translate-y-2"
            @click="
              handleSwitchlanguage(
                i18n.global.locale.value === 'en' ? 'ka' : 'en'
              )
            "
          >
            {{ i18n.global.locale.value === "en" ? "ქარ" : "Eng" }}
          </div>
        </div>
        <div><IconCaretDown /></div>
      </div>
      <div class="flex">
        <button
          @click="handleModalName('register')"
          class="px-7 py-2 bg-primary-red rounded text-white sm:px-2.5 sm:py-0 sm:text-xs sm:h-8"
        >
          {{ $t("sign_up") }}
        </button>
      </div>
      <div>
        <button
          @click="handleModalName('auth')"
          class="px-7 py-2 text-white border border-white rounded sm:px-2.5 sm:py-0 sm:text-xs sm:h-8"
        >
          {{ $t("log_in") }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import IconCaretDown from "@/components/icons/IconCaretDown.vue";
import { usePaginationStore } from "@/store/pagination";
import { switchLanguage } from "@/services/lang";
import { ref } from "vue";
import i18n from "@/plugins/i18";

const paginationStore = usePaginationStore();
const isLanguageDropdownOpen = ref(false);
const languageRef = ref(null);

const toggleLanguageDropdown = () => {
  isLanguageDropdownOpen.value = !isLanguageDropdownOpen.value;
};

const handleSwitchlanguage = async (lang) => {
  try {
    const res = await switchLanguage(lang);
    if (res.status === 200) {
      i18n.global.locale.value = lang;
      localStorage.setItem("locale", lang);
    }
  } catch (error) {
    console.log(error);
  }
};

const handleModalName = (name) => {
  document.documentElement.style.overflow = "hidden";
  paginationStore.updateModalName({ name });
};
</script>
