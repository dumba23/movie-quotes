<template>
  <TheHeader />
  <div class="flex flex-col justify-center items-center mt-72">
    <div class="text-primary-yellow">
      <div class="flex flex-col items-center text-6xl mb-6 sm:text-2xl">
        <span class="sm:font-bold">{{ $t("landing.find_any_quote_in") }} </span>
        <span class="sm:font-bold">{{
          $t("landing.millions_of_movie_lines")
        }}</span>
      </div>
    </div>
    <div class="sm:mt-2">
      <button
        class="bg-primary-red px-4 py-2 rounded text-white mb-40"
        @click="handleModalName('register')"
      >
        {{ $t("landing.get_started") }}
      </button>
    </div>
    <RegistrationModal v-if="paginationStore.modalName == 'register'" />
    <MailConfirmModal v-else-if="paginationStore.modalName == 'confirm'" />
    <VerifyModal v-else-if="paginationStore.modalName == 'verify'" />
    <LoginModal v-else-if="paginationStore.modalName == 'auth'" />
    <RecoveryMailSendModal
      v-else-if="paginationStore.modalName == 'recovery_mail_send'"
    />
    <RecoverySentModal
      v-else-if="paginationStore.modalName == 'recovery_mail_sent'"
    />
    <PasswordChangeView
      v-else-if="paginationStore.modalName == 'change_password'"
    />
    <LinkExpiredModal v-else-if="paginationStore.modalName == 'link_expired'" />
    <SuccessModal v-else-if="paginationStore.modalName == 'success'" />
    <div class="h-full w-full">
      <div
        class="min-h-screen interstellar min-w-screen sm:max-h-96 sm:bg-cover sm:bg-top sm:min-h-parallax-small justify-center items-center bg-para1 bg-fixed bg-no-repeat bg-cover"
      >
        <div
          class="bg-top-gradient absolute right-0 w-screen sm:min-h-[300px]"
        ></div>
        <div
          class="bg-left-gradient absolute right-0 w-screen min-h-screen sm:min-h-[300px]"
        ></div>
        <div
          class="flex justify-center translate-x-[-25rem] translate-y-[30rem] sm:translate-x-0 sm:translate-y-4 items-center"
        >
          <div
            class="w-[53px] bg-white h-[2px] mr-8 mb-28 sm:mr-2 sm:ml-7 sm:mb-0 sm:translate-y-[-2.3rem]"
          ></div>
          <div class="flex flex-col">
            <div
              class="text-5xl text-white w-[700px] sm:text-sm sm:max-w-[330px] mb-8"
            >
              <p class="font-bold tracking-wider">
                “{{ $t("landing.you_have_to_leave_something") }} <br />
                {{ $t("landing.behind_to_go_forward") }}”
              </p>
            </div>
            <div
              class="w-[700px] sm:max-w-[330px] text-3xl sm:text-sm text-primary-grey font-bold"
            >
              {{ $t("landing.interstellar") }}, 2014
            </div>
          </div>
        </div>
      </div>

      <div
        class="min-h-screen min-w-screen flex justify-center sm:bg-cover sm:min-h-parallax-small items-center bg-para2 bg-fixed bg-no-repeat bg-cover"
      >
        <div
          class="bg-top-gradient absolute right-0 w-screen min-h-screen sm:min-h-[300px]"
        ></div>
        <div
          class="bg-left-gradient absolute right-0 w-screen min-h-screen sm:min-h-[300px]"
        ></div>
        <div class="flex translate-x-[-18rem] sm:-translate-x-5 items-center">
          <div
            class="w-[53px] bg-white h-[2px] mr-8 mb-40 sm:mb-20 sm:mr-2 sm:ml-14 sm:w-[10px]"
          ></div>
          <div class="flex flex-col">
            <div class="w-[900px] sm:max-w-[330px] mb-6">
              <p
                class="text-5xl text-white sm:text-sm font-bold tracking-wider"
              >
                "{{ $t("landing.i_think_we_just_gonna_have") }} <br />
                {{ $t("landing.to_be_secretly_in_love_with_each_other") }}
                <br />
                {{ $t("landing.and_leave_it_that") }}"
              </p>
            </div>
            <div
              class="w-[700px] sm:max-w-[330px] text-3xl sm:text-sm text-primary-grey font-bold"
            >
              {{ $t("landing.the_royal_tenenbaums") }},2001
            </div>
          </div>
        </div>
      </div>

      <div
        class="min-h-screen min-w-screen flex justify-center sm:bg-cover sm:min-h-parallax-small items-center bg-para3 bg-fixed bg-no-repeat bg-cover"
      >
        <div
          class="bg-top-gradient absolute right-0 w-screen min-h-screen sm:min-h-[300px]"
        ></div>
        <div
          class="bg-left-gradient absolute right-0 w-screen min-h-screen sm:min-h-[300px]"
        ></div>
        <div class="flex translate-x-[-18rem] sm:-translate-x-6 items-center">
          <div
            class="w-[53px] bg-white h-[2px] mr-8 mb-40 sm:mb-20 sm:mr-2 sm:ml-14 sm:w-[10px]"
          ></div>
          <div class="flex flex-col">
            <div class="w-[900px] sm:max-w-[330px] mb-6">
              <p
                class="text-5xl text-white sm:text-sm font-bold tracking-wider"
              >
                "{{ $t("landing.i_think_we_just_gonna_have") }} <br />
                {{ $t("landing.to_be_secretly_in_love_with_each_other") }}
                <br />
                {{ $t("landing.and_leave_it_that") }}"
              </p>
            </div>
            <div
              class="w-[700px] sm:max-w-[330px] text-3xl sm:text-sm text-primary-grey font-bold"
            >
              {{ $t("landing.the_royal_tenenbaums") }},2001
            </div>
          </div>
        </div>
      </div>
    </div>
    <footer class="w-full bg-gradient-to-t px-8 py-4">
      <span class="text-primary-yellow font-medium text-lg sm:text-xs"
        >© 2022 {{ $t("landing.footer_message") }}</span
      >
    </footer>
  </div>
</template>

<script setup>
import TheHeader from "@/components/shared/TheHeader.vue";
import MailConfirmModal from "@/components/auth/MailConfirmModal.vue";
import RegistrationModal from "@/components/auth/RegistrationModal.vue";
import VerifyModal from "@/components/auth/VerifyModal.vue";
import LoginModal from "@/components/auth/LoginModal.vue";
import RecoveryMailSendModal from "@/components/auth/RecoveryMailSendModal.vue";
import PasswordChangeView from "@/views/PasswordChangeView.vue";
import RecoverySentModal from "@/components/auth/RecoverySentModal.vue";
import SuccessModal from "@/components/auth/SuccessModal.vue";
import LinkExpiredModal from "@/components/auth/LinkExpiredModal.vue";
import { usePaginationStore } from "@/store/pagination";
import { useRoute, useRouter } from "vue-router";
import { onMounted } from "vue";
import { checkTokenIsValid } from "@/services/recovery";

const route = useRoute();
const router = useRouter();
const paginationStore = usePaginationStore();

const handleModalName = (name) => {
  document.documentElement.style.overflow = "hidden";
  paginationStore.updateModalName({ name });
};

onMounted(() => {
  const { verified, reset_password, token } = route.query;
  if (verified) {
    handleModalName("verify");
  }

  if (reset_password && token) {
    checkTokenIsValid(token)
      .then((res) => {
        if (res.status === 200) {
          handleModalName("change_password");
        }
      })
      .catch(() => {
        handleModalName("link_expired");
        router.replace({ query: null });
      });
  }
});
</script>
