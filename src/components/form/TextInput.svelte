<script lang="ts">
  import { Node } from 'postcss';
  export let name: string;
  export let error: string;
  export let placeholder: string;
  export let type = 'text';
  export let value = '';

  function typeAction(node: Node) {
    node.type = type;
  }
</script>

<div
  class="after:content-[attr(error)] after:-bottom-5 after:absolute after:font-bold after:text-red-600 relative flex-col flex w-full"
  error={error}>
  <input
    autocomplete
    bind:value
    class="mt-5 bg-black/[.8] border-white border-solid text-white border-2 box-border border-2 rounded-lg p-1 w-4/4 h-12 mt-2"
    name={name}
    placeholder={placeholder}
    use:typeAction
  />
</div>
