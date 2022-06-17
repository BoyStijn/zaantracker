<template>
    <div class="input-group">
        <input @keydown="e=>this.onBackspace(e.target.parentNode, e.key, 0)" @input="e => this.onInput(e.target.parentNode, 0)" maxlength="2" type="text" class="form-control time_input" placeholder="00" aria-label="min">
        <span class="input-group-text">:</span>
        <input @keydown="e=>this.onBackspace(e.target.parentNode, e.key, 1)" @input="e => this.onInput(e.target.parentNode, 1)" maxlength="2" type="text" class="form-control time_input" placeholder="00" aria-label="sec">
        <span class="input-group-text">:</span>
        <input @keydown="e=>this.onBackspace(e.target.parentNode, e.key, 2)" @input="e => this.onInput(e.target.parentNode, 2)" maxlength="3" type="text" class="form-control time_input" placeholder="000" aria-label="milsec">
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
        if (child.maxLength < 3 && child.value > 60) {
            child.value = 60;
            if (index > 0) children[(index-1)*2].value = isNaN(parseInt(children[(index-1)*2].value)) ? 1 : parseInt(children[(index-1)*2].value) + 1
        }
        if (child.value.length >= child.maxLength && index < 2)
        children[(index+1)*2].focus()
        const time = this.toms(isNaN(parseInt(children[0].value)) ? 0 : children[0].value, isNaN(parseInt(children[2].value)) ? 0 : children[2].value, isNaN(parseInt(children[4].value)) ? 0 : children[4].value)
        this.value = time;
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
        const min = parseInt(m * 60000)
        const sec = parseInt(s * 1000)
        const msi = parseInt(ms);
        const time = (min + sec + msi)
        return time
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