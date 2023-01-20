<script lang="ts">
  import { Node } from 'postcss';
  export let name: string;
  export let error: string;
  export let placeholder: string;
  export let type: 'text' | 'password' = 'text';
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
    autofocus
    bind:value
    class="bg-black/80 text-white border-[1px] box-border rounded-lg p-1 w-4/4 h-12"
    name={name}
    placeholder={placeholder}
    use:typeAction
  />
</div>
