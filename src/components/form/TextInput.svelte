<script lang="ts">
  export let value = "";
  export let name = "";
  export let placeholder = "";
  export let error = "";
</script>

<div
  class="after:content-[attr(error)] after:-bottom-5 after:absolute after:font-bold after:text-red-600 relative flex-col flex w-full"
  error={error}>
  <input
    bind:value
    class="mt-5 bg-black/[.8] border-white border-solid text-white border-2 box-border border-2 rounded-lg p-1 w-4/4 h-12 mt-2"
    name={name}
    placeholder={placeholder}
    type="text"
  />
</div>
