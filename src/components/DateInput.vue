<template>
    <div class="input-group">
        <input @keydown="e=>this.onBackspace(e.target.parentNode, e.key, 0)" @input="e => this.onInput(e.target.parentNode, 0)" maxlength="2" type="text" class="form-control time_input" placeholder="dd" aria-label="min">
        <span class="input-group-text">:</span>
        <input @keydown="e=>this.onBackspace(e.target.parentNode, e.key, 1)" @input="e => this.onInput(e.target.parentNode, 1)" maxlength="2" type="text" class="form-control time_input" placeholder="mm" aria-label="sec">
        <span class="input-group-text">:</span>
        <input @keydown="e=>this.onBackspace(e.target.parentNode, e.key, 2)" @input="e => this.onInput(e.target.parentNode, 2)" maxlength="4" type="text" class="form-control time_input" placeholder="jjjj" aria-label="milsec">
    </div>
</template>

<script>

export default {
  name: 'TimeInput',
  data() {
    return {
        value: 0
    }
  },
  methods: {
    onInput(parent, index) {
        const children = parent.childNodes;
        const child = children[index*2]
        if (index == 0 && child.value > 31) child.value = 31;
        if (index == 1 && child.value > 12) child.value = 12;
        if (child.value.length >= child.maxLength && index < 2)
        children[(index+1)*2].focus()
        const isvalid = !(isNaN(parseInt(children[0].value)) || isNaN(parseInt(children[2].value)) || isNaN(parseInt(children[4].value)))
        const time = this.toms(children[0].value, children[2].value, children[4].value)
        this.value = (isvalid) ? time : 0;
        this.emitevent();
    },
    onBackspace(parent, key, index) {
        if (key == 'Backspace') {
            const child = parent.childNodes[index*2]
            if (child.value.length <= 0 && index > 0)
            parent.childNodes[(index-1)*2].focus()
        }
    },
    toms(m,s,ms) {
        const d = new Date();
        d.setHours(0,0,0,0);
        d.setDate(m)
        d.setMonth(s)
        d.setFullYear(ms)
        return d.getTime();
    },
    emitevent() {
      this.$emit('changed', {data: this.value, changed: this.value == 0})
    }
  }
}

</script>

<style>

.time_input {
    text-align: right; 
}

</style>