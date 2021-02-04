<template>
  <div class="modal fade" :id="nome" tabindex="-1" role="dialog" :aria-labelledby="nome+'Label'" aria-hidden="true">
    <div class="modal-dialog" :class="size" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" :id="nome+'Label'">{{ titulo }}</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <slot name="body"></slot>
        </div>
        <div class="modal-footer">
          <slot name="footer">
            <button type="button" class="btn" data-dismiss="modal">Close</button>
            <button type="button" class="btn btn-success">Save changes</button>
          </slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "modal",
  props: ["nome", "titulo", "size"]
};
</script>