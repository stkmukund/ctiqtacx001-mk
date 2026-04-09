<template>
  <button :disabled="disabled" :class="computedClasses">
    <slot>{{ placeholder }}</slot>
  </button>
</template>

<script setup>

const props = defineProps({
  placeholder: {
    type: String,
    default: "Click Me",
  },
  color: {
    type: Boolean,
    default: true,
  },
  size: {
    type: String,
    default: "medium",
  },
  disabled: {
    type: Boolean,
    default: false,
  }
});

const computedClasses = computed(() => {
  const baseClasses = "text-white rounded-md";
  const sizeClasses =
    props.size === "large" ? "w-full md:text-2xl tracking-widest p-3 text-lg font-bold mt-3" : "py-2 px-10  h-14 w-full font-bold text-xl";
  const primaryClasses = props.color ? "bg-[#000] hover:bg-[#4b6b24]" : "bg-[#4b6b24]";

  return `${baseClasses} ${sizeClasses} ${primaryClasses}`;
});

const handleClick = () => {
  if (props.onClick) {
    props.onClick();
  }
};
</script>
