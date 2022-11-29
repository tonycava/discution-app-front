<script lang="ts">
  export let value = "";
  export let placeholder = "";
  export let error = "";
  let timer: number;

  const debounce = (evt: KeyboardEvent) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      const input = evt.target as HTMLInputElement;
      value = input.value;
    }, 500);
  };
</script>

<div
  class="after:content-[attr(error)] after:-bottom-6 after:absolute after:font-bold after:text-red-600 relative flex-col flex w-full"
  error={error}>
  <input
    class="mt-4 bg-black/[.8] border-white border-solid text-white border-2 box-border border-2 rounded-lg p-1 w-4/4 h-12 mt-2"
    on:keyup={debounce}
    placeholder={placeholder}
    type="text"
  />
</div>
