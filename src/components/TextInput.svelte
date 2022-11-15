<script lang="ts">
  export let value = "";
  export let placeholder = "";
  let timer: any;

  const debounce = (evt: KeyboardEvent) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      const input = evt.target as HTMLInputElement;
      value = input.value;
    }, 500);
  };
</script>

<input
  class="mt-4 bg-black/[.5] border-white border-solid text-white border-2 box-border border-2 rounded-lg p-1 md:w-[50%] w-4/4 lg:w-1/4 h-12 mt-2"
  on:keyup={debounce}
  placeholder={placeholder}
  type="text"
/>
