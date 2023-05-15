<template>
  <TheHeader />
  <div class="flex flex-col justify-center items-center mt-72">
    <div class="text-primary-yellow">
      <div class="flex flex-col items-center text-6xl mb-6">
        <span>Find any quote in </span>
        <span>millions of movie lines</span>
      </div>
    </div>
    <div>
      <button class="bg-primary-red px-4 py-2 rounded text-white mb-40">
        Get Started
      </button>
    </div>
    <div id="1" ref="first" @click="onClick(first)" class="relative">
      <div class="flex absolute top-[341px] left-[170px] items-center">
        <div class="w-[53px] bg-white h-[2px] mr-8 mb-28"></div>
        <div class="flex flex-col">
          <div class="text-5xl text-white w-[700px] mb-8">
            <p>
              “You have to leave somethig <br />
              behind to go forward”
            </p>
          </div>
          <div class="w-[700px] text-3xl text-primary-grey font-bold">
            Interstellar, 2014
          </div>
        </div>
      </div>
      <img
        src="@/assets/images/interstellar.png"
        alt="interstellar"
        class="h-full"
      />
    </div>
    <div id="2" ref="second" @click="onClick(second)">
      <div class="flex absolute top-[2204px] left-[170px] items-center">
        <div class="w-[53px] bg-white h-[2px] mr-8 mb-52"></div>
        <div class="flex flex-col">
          <div class="w-[900px] mb-6">
            <p class="text-[50px] text-white font-bold">
              I think we’re just gonna have <br />
              to be secretly in love with earch other <br />
              and leave it that
            </p>
          </div>
          <div class="w-[700px] text-3xl text-primary-grey font-bold">
            The Royal Tenenbaums,2001
          </div>
        </div>
      </div>
      <img
        src="@/assets/images/tenenbaums.png"
        alt="tenenbaums"
        class="h-full"
      />
    </div>
    <div id="3" ref="third" @click="onClick(third)">
      <div class="flex absolute top-[3504px] left-[170px] items-center">
        <div class="w-[53px] bg-white h-[2px] mr-8 mb-52"></div>
        <div class="flex flex-col">
          <div class="w-[900px] mb-6">
            <p class="text-[50px] text-white font-bold">
              I think we’re just gonna have <br />
              to be secretly in love with earch other <br />
              and leave it that
            </p>
          </div>
          <div class="w-[700px] text-3xl text-primary-grey font-bold">
            The Royal Tenenbaums,2001
          </div>
        </div>
      </div>
      <img src="@/assets/images/tenenbaums2.png" alt="tenenbaums" />
    </div>
  </div>
</template>

<script setup>
import TheHeader from "@/components/shared/TheHeader.vue";
import { ref } from "vue";

const first = ref(null);
const second = ref(null);
const third = ref(null);

const onClick = (ref) => {
  const { y } = ref.getBoundingClientRect();

  if (y > 0) {
    ref.scrollIntoView({ behavior: "smooth" });
  } else {
    document
      .getElementById(Number(ref.id) + 1)
      .scrollIntoView({ behavior: "smooth" });
  }
};
</script>
