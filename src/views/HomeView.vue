<template>
    <main>
        <SwimSidebar state="0"/>
        <div>
            <div style="padding-top: 0.5rem; padding-bottom: 0.5rem;">
                &nbsp;
            </div>
            <h1 class="text-white fs-1 fw-bolder">Fijne Vaderdag :D</h1>
        </div>
    </main>
</template>

<script>
// @ is an alias to /src
import SwimSidebar from '../components/SideBar.vue'
import MultiSlide from '../components/MultiSlide.vue'

export default {
  name: 'HomeView',
  data() {
    return {
        value: [25, 50]
    }
  },
  components: {
      SwimSidebar,
      MultiSlide
  },
  methods: {
      inputgot(e) {
          console.log(e);
      }
  }
}
</script>

<style src="@vueform/slider/themes/default.css"></style>
