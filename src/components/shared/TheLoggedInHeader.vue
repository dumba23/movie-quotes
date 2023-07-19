<template>
  <div
    class="flex justify-between items-center px-20 sm:px-4 py-8 bg-header bg-white bg-opacity-5 relative"
  >
    <div class="text-primary-yellow sm:hidden">MOVIE QUOTES</div>
    <div class="hidden sm:block"><IconList @click="toggleSidebar" /></div>
    <transition
      appear
      enter-from-class="transform ease-in transition  scale-x-[0] translate-x-[-50%]"
      enter-active-class="transform ease-in duration-500 transition delay-300"
    >
      <div
        v-if="isSidebarOpen"
        ref="sidebarRef"
        class="fixed bg-primary-black left-0 top-0 flex w-3/4 flex-col z-40 bg-gray-700 pt-6 pb-8 h-80"
      >
        <ProfileSidebar
          :username="userStore.user.username"
          :imageUrl="userStore.user.avatar"
        />
        <button
          @click="handleLogOut"
          class="px-7 py-2 ml-6 mr-28 text-white border border-white rounded"
        >
          {{ $t("auth.log_out") }}
        </button>
      </div>
    </transition>
    <div class="flex justify-between items-center w-80 sm:justify-end">
      <div class="flex sm:justify-center relative">
        <IconBell @click="handleToggleDropdown" class="sm:w-5" />
        <span
          v-if="countUnreadNotifications() > 0"
          class="absolute text-white w-5 h-5 flex justify-center items-center rounded-full z-10 bg-primary-orange right-0 translate-x-[25%] translate-y-[-25%]"
          >{{ countUnreadNotifications() }}</span
        >
        <div
          v-if="isDropdownOpen"
          ref="notificationsRef"
          class="absolute max-h-96 overflow-scroll no-scrollbar notifications-dropdown flex flex-col bg-black text-white top-10 w-[36rem] translate-y-16 rounded-xl translate-x-[-44%] p-4 py-8 z-20 sm:w-[23.5rem] sm:translate-x-[-43%] sm:-translate-y-0"
        >
          <div class="flex justify-between items-center mb-5">
            <div class="font-medium text-2xl tooltiptext">
              {{ $t("news.notifications") }}
            </div>
            <div
              @click="handleMarkAllNotificationRead"
              class="underline cursor-pointer text-lg"
            >
              {{ $t("news.mark_all_as_read") }}
            </div>
          </div>
          <QuoteNotificationCard
            ref="notificationCardRef"
            v-for="notification in notificationsStore.notifications"
            :key="notification.id"
            :notification="notification"
          />
        </div>
      </div>
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
      <div class="sm:hidden">
        <button
          @click="handleLogOut"
          class="px-7 py-2 text-white border border-white rounded"
        >
          {{ $t("auth.log_out") }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import IconBell from "@/components/icons/IconBell.vue";
import IconCaretDown from "@/components/icons/IconCaretDown.vue";
import IconList from "@/components/icons/IconList.vue";
import QuoteNotificationCard from "@/components/quotes/QuoteNotificationCard.vue";
import Cookies from "js-cookie";
import { useNotificationsStore } from "@/store/notifications";
import { useUserStore } from "@/store/user";
import { markAllAsRead } from "@/services/notification";
import { switchLanguage } from "@/services/lang";
import { logoutUser } from "@/services/auth";
import { useRouter } from "vue-router";
import { onMounted, ref, watch } from "vue";
import ProfileSidebar from "@/components/profile/ProfileSidebar.vue";
import { onClickOutside } from "@vueuse/core";
import i18n from "@/plugins/i18";
import { setLocale } from "@vee-validate/i18n";

const router = useRouter();
const notificationsStore = useNotificationsStore();
const userStore = useUserStore();
const isDropdownOpen = ref(false);
const notificationsRef = ref(null);
const isSidebarOpen = ref(false);
const sidebarRef = ref(null);
const isLanguageDropdownOpen = ref(false);
const languageRef = ref(null);
const scrollEventInitialized = ref(false);

const notificationCardRef = ref(null);

const toggleLanguageDropdown = () => {
  isLanguageDropdownOpen.value = !isLanguageDropdownOpen.value;
};

const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value;
};

const closeSidebar = () => {
  isSidebarOpen.value = false;
};

onClickOutside(sidebarRef, closeSidebar);

onClickOutside(notificationsRef, () => {
  isDropdownOpen.value = false;
});

onClickOutside(languageRef, () => {
  isLanguageDropdownOpen.value = false;
});

const handleScroll = () => {
  const container = notificationsRef.value;
  const { scrollTop, clientHeight, scrollHeight } = container;
  if (scrollTop + clientHeight >= scrollHeight) {
    notificationsStore.loadMoreNotifications();
  }
};

const handleToggleDropdown = () => {
  if (!isDropdownOpen.value) {
    notificationsStore.markVisibleAsRead();
    notificationsStore.initializeNotificationsData();
  }
  isDropdownOpen.value = !isDropdownOpen.value;
};

const handleMarkAllNotificationRead = async () => {
  try {
    const res = await markAllAsRead();
    if (res.status === 200) {
      notificationsStore.initializeNotificationsData();
    }
  } catch (error) {
    return;
  }
};

const countUnreadNotifications = () => {
  return notificationsStore.notifications.filter(
    (notification) => !notification.read
  ).length;
};

const handleLogOut = async () => {
  try {
    const res = await logoutUser();
    Cookies.remove("XSRF-TOKEN");
    if (res.status === 200) {
      router.push({ name: "home" });
    }
  } catch (error) {
    return;
  }
};

const handleSwitchlanguage = async (lang) => {
  try {
    const res = await switchLanguage(lang);
    if (res.status === 200) {
      i18n.global.locale.value = lang;
      localStorage.setItem("locale", lang);
      setLocale(lang);
    }
  } catch (error) {
    return;
  }
};

watch(
  notificationsRef,
  (newRef) => {
    if (newRef && !scrollEventInitialized.value) {
      newRef.addEventListener("scroll", handleScroll);
      scrollEventInitialized.value = true;
    }
  },
  { immediate: true }
);

onMounted(() => {
  notificationsStore.initializeNotificationsData();
});
</script>

<style scoped>
@media only screen and (min-width: 600px) {
  .tooltiptext {
    z-index: 2;
    color: white;
    border-radius: 10px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }

  .tooltiptext::before {
    content: "";
    position: absolute;
    border: 10px solid;
    border-bottom: solid 50px black;
    border-top: solid 50px transparent;
    border-left: solid 30px transparent;
    border-right: solid 30px transparent;
    transform: translate(146px, -70px);
    z-index: 1;
  }
}
</style>
