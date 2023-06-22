<template>
  <div
    class="flex justify-between items-center px-20 py-8 bg-header bg-white bg-opacity-5 relative z-40"
  >
    <div class="text-primary-yellow">MOVIE QUOTES</div>
    <div class="flex justify-between items-center w-80">
      <div class="flex text-primary-yellow">Notify</div>
      <div class="flex justify-center items-center text-white px-3 py-2">
        <div class="mr-2.5">Eng</div>
        <div><IconCaretDown /></div>
      </div>
      <div>
        <button
          @click="handleLogOut"
          class="px-7 py-2 text-white border border-white rounded"
        >
          Log out
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import IconCaretDown from "@/components/icons/IconCaretDown.vue";
import { logoutUser } from "@/services/auth";
import { useRouter } from "vue-router";

const router = useRouter();

const handleLogOut = async () => {
  try {
    const res = await logoutUser();
    if (res.status === 200) {
      router.push({ name: "home" });
    }
  } catch (error) {
    console.log(error);
  }
};
</script>
