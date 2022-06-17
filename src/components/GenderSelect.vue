<template>
    <div class="d-flex justify-content-center">
        <input @input="e => this.whenChange(e.target, true)" type="checkbox" class="btn-check" id="btn-check" autocomplete="off">
        <label class="btn btn-primary mx-1 button_option" for="btn-check">Dames</label>
        <input @input="e => this.whenChange(e.target, false)" type="checkbox" class="btn-check" id="btn-check2" autocomplete="off">
        <label class="btn btn-primary mx-1 button_option" for="btn-check2">Heren</label>
    </div>
</template>

<script>

export default {
  name: 'TimeRange',
  data() {
    return {
        input1: true,
        input2: true
    }
  },
  methods: {
    whenChange(e, type) {
        if (e.checked) {
            e.parentNode.childNodes[type ? 2 : 0].checked = false;
            (type) ? this.input2 = false : this.input1 = false;
        }
        (type) ? this.input1 = e.checked : this.input2 = e.checked;
        this.emitevent()
    },
    emitevent() {
      this.$emit('updated', {min: this.input1, max: this.input2, changed: !((this.input1 && this.input2) || (!this.input1 && !this.input2))})
    }
  }
}

</script>