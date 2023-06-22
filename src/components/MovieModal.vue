<template>
  <div class="fixed inset-0 flex items-center z-10">
    <div
      class="absolute bg-primary-black bg-opacity-30 left-0 right-0 top-0 bottom-0"
    >
      <div
        class="relative mx-auto w-[1000px] shadow-lg rounded-md bg-primary-black flex flex-col justify-center translate-y-32"
        id="modal"
      >
        <slot name="header"></slot>
        <slot name="form"></slot>
      </div>
    </div>
  </div>
</template>
