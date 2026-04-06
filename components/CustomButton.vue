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
    props.size === "large" ? "py-[15px] px-[10px] w-full md:text-lg font-bold tracking-widest" : "py-2 px-10 h-[42px]";
  const primaryClasses = props.color ? "bg-[#006eff]" : "bg-[#4b6b24]";

  return `${baseClasses} ${sizeClasses} ${primaryClasses}`;
});

const handleClick = () => {
  if (props.onClick) {
    props.onClick();
  }
};
</script>
