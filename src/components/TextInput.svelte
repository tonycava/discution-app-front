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

<span class="font-medium h-8 text-2xl leading-9 flex justify-start text-2xl mt-10">Username :</span>
<input
  class="bg-white border-black border-solid border-2 box-border border-2 rounded-lg p-1 md:w-[50%] w-4/4 lg:w-1/4 h-12 mt-2"
  on:keyup={debounce}
  placeholder={placeholder}
  type="text"
/>
