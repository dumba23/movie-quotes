<template>
  <div
    id="modal"
    class="absolute top-0 w-screen h-screen backdrop-blur-[3px] z-10"
    ref="target"
  >
    <div
      class="relative top-56 mx-auto w-[36rem] p-5 shadow-lg rounded-md bg-grey-dim flex justify-center"
    >
      <slot></slot>
    </div>
  </div>
</template>
