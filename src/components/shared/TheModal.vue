<template>
  <div
    id="modal"
    class="absolute top-0 w-screen h-screen backdrop-blur-[3px] z-10"
    ref="target"
  >
    <div
      class="relative top-56 sm:top-0 mx-auto w-[36rem] sm:w-full sm:h-full sm:mx-0 p-5 shadow-lg rounded-md bg-grey-dim flex justify-center"
    >
      <slot></slot>
    </div>
  </div>
</template>
