<template>
    <div class="row m-2">
        <div class="col"><TimeInput @changed="e => this.whenChange(e, true)"/></div>
        <div class="col"><TimeInput @changed="e => this.whenChange(e, false)"/></div>
    </div>
</template>

<script>
import TimeInput from './TimeInput.vue';

export default {
  name: 'TimeRange',
  data() {
    return {
        input1: 0,
        input2: 0
    }
  },
  components: {
      TimeInput
  },
  methods: {
    whenChange(e, type) {
        (type) ? this.input1 = e.data : this.input2 = e.data;
        this.emitevent()
    },
    emitevent() {
        const min = Math.min(this.input1, this.input2);
        const max = Math.max(this.input1, this.input2);
      this.$emit('updated', {min: min, max: max, changed: (this.input1 != 0 || this.input2 != 0)})
    }
  }
}

</script>