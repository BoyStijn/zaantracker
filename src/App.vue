<template>
  <nav class="navbar navbar-expand-md navbar-dark fixed-top bg-dark text-white justify-content-between px-2" style="-webkit-app-region: drag;">
    <div class="d-flex justify-content-start">
      <p class="mb-0">ZvDeZaan SwimTracker</p>
      <div class="mx-1 titlebar-container">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" class="bi bi-list collapsed" viewBox="0 0 16 16" type="button" data-bs-toggle="collapse" data-bs-target="#sidebarMenu" aria-controls="sidebarMenu" aria-expanded="false" aria-label="Toggle navigation">
          <path class="button-circle" d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2z"/>
          <path class="button-cross" fill-rule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"/>
        </svg>
      </div>
    </div>
    <div class="d-flex justify-content-end" v-if="isinBrowser">
      <div class="mx-1 titlebar-container">
        <svg @click="this.minimizewin()" xmlns="http://www.w3.org/2000/svg" width="16" height="16" class="bi bi-dash-circle-fill" viewBox="0 0 16 16">
          <circle class="button-circle" cx="8" cy="8" r="8"/>
          <path class="button-cross" d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z"/>
        </svg>
      </div>
      <div class="mx-1 titlebar-container">
        <svg @click="this.maximizewin()" xmlns="http://www.w3.org/2000/svg" width="16" height="16" class="bi bi-plus-circle-fill" viewBox="0 0 16 16">
          <circle class="button-circle" cx="8" cy="8" r="8"/>
          <path class="button-cross" fill-rule="evenodd" d="M3.646 9.146a.5.5 0 0 1 .708 0L8 12.793l3.646-3.647a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 0-.708zm0-2.292a.5.5 0 0 0 .708 0L8 3.207l3.646 3.647a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 0 0 0 .708z"/>
          
        </svg>
      </div>
      <div class="mx-1 titlebar-container">
        <svg @click="this.closewin()" xmlns="http://www.w3.org/2000/svg" width="16" height="16" class="bi bi-x-circle-fill" viewBox="0 0 16 16">
          <circle class="close-circle" cx="8" cy="8" r="8"/>
          <path class="button-cross" d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
        </svg>
      </div>
    </div>
  </nav>
  <router-view/>
</template>

<script>


export default {
  name: 'winbar',
  data() {
    return {
      status: "normal",
      isinBrowser: true
    }
  },
  methods: {
    closewin() {
      window.ipcRenderer.send("closeWin")
    },
    maximizewin() {
      window.ipcRenderer.send("maxWin")
    },
    minimizewin() {
      window.ipcRenderer.send("minWin")
    }
  },
  mounted() {
    this.isinBrowser = !(window.ipcRenderer == null || window.ipcRenderer == undefined);
  }
}

</script>

<style>

::-webkit-scrollbar {
    width: 10px;
    height: 10px;
}
::-webkit-scrollbar-corner {
    background: rgba(0,0,0,0);
}
::-webkit-scrollbar-thumb {
    background-color: #ccc;
    border-radius: 6px;
    border: 4px solid rgba(0,0,0,0);
    background-clip: content-box;
    min-width: 10px;
    min-height: 10px;
}
::-webkit-scrollbar-track {
    background-color: rgba(0,0,0,0);
}
.titlebar-container {
  -webkit-app-region: no-drag;
}

.titlebar-container:hover .close-circle {
  fill: red;
}

.titlebar-container:hover .button-circle {
  fill: currentColor;
}

.titlebar-container:hover .button-cross {
  fill: black;
  stroke: black;
}

.button-cross {
  fill: currentColor;
  stroke: currentColor;
}

.close-circle {
  fill: var(--bs-dark);
}

.button-circle {
  fill: var(--bs-dark);
}

.nav-pills .nav-link:hover {
  background-color: var(--bs-gray-800);
}

.nav-pills .nav-link.active:hover {
	background-color: #1c55ab;
}


.selector {
    position: relative;
    padding: 20px;
    width: 400px;
    color: #7e7e7e;
}

.selector ul {
    position: relative;
    display: block;
    overflow: auto;
    min-width: 138px;
    max-height: 200px;
    background: #fff;
    list-style: none;
    white-space: inherit;
    padding-right: 17px;
    width: calc(100% + 17px)
}

.selector li {
    position: relative;
    padding: 3px 20px 3px 25px;
    cursor: pointer
}

.selector li:before {
    position: absolute;
    top: 50%;
    left: 0;
    top: 4px;
    display: inline-block;
    margin-right: 9px;
    width: 17px;
    height: 17px;
    background-color: #f4f4f4;
    border: 1px solid #d5d5d5;
    content: ""
}

.selector li[data-selected="1"]:before {
    border: 1px solid #d7d7d7;
    background-color: #fff
}

.selector li[data-selected="1"]:after {
    position: absolute;
    top: 50%;
    left: 3px;
    top: 11px;
    display: inline-block;
    width: 4px;
    height: 10px;
    border-right: 2px solid;
    border-bottom: 2px solid;
    background: none;
    color: #39c9a9;
    content: "";
    -webkit-transform: rotate(40deg) translateY(-50%);
    transform: rotate(40deg) translateY(-50%)
}

.selector li:hover {
    color: #aaa
}

.selector li .total {
    position: absolute;
    right: 0;
    color: #d7d7d7
}

.selector .price-slider {
    text-align: center;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;
    -webkit-box-pack: justify;
    -ms-flex-pack: justify;
    justify-content: space-between;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    position: relative;
    padding-top: 17px
}

@media (min-width: 768px) {
    .selector .price-slider {
        padding-top:8px
    }
}

.selector .price-slider:before {
    position: absolute;
    top: 50%;
    left: 0;
    margin-top: 0;
    color: #39c9a9;
    content: attr(data-currency);
    -webkit-transform: translateY(-50%);
    transform: translateY(-50%)
}

.selector #slider-range {
    width: 90%;
    margin-bottom: 30px;
    border: none;
    background: #e2f7f2;
    height: 3px;
    margin-left: 8px;
    margin-right: 8px
}

@media (min-width: 768px) {
     .selector #slider-range {
        width:100%
    }
}

.selector .ui-slider-handle {
    border-radius: 50%;
    background-color: #39c9a9;
    border: none;
    top: -14px;
    width: 28px;
    height: 28px;
    outline: none
}

@media (min-width: 768px) {
    .selector .ui-slider-handle {
        top:-7px;
        width: 16px;
        height: 16px
    }
}

.selector .ui-slider-range {
    background-color: #d7d7d7
}

.selector .slider-price {
    position: relative;
    display: inline-block;
    padding: 5px 40px;
    width: 40%;
    background-color: #e2f7f2;
    line-height: 28px;
    text-align: center
}

.selector .slider-price:before {
    position: absolute;
    top: 50%;
    left: 13px;
    margin-top: 0;
    color: #39c9a9;
    content: attr(data-currency);
    -webkit-transform: translateY(-50%);
    transform: translateY(-50%)
}

.selector .show-all {
    position: relative;
    padding-left: 25px;
    color: #39c9a9;
    cursor: pointer;
    line-height: 28px
}

.selector .show-all:after, .selector .show-all:before {
    content: "";
    position: absolute;
    top: 50%;
    left: 4px;
    margin-top: -1px;
    color: #39c9a9;
    width: 10px;
    border-bottom: 1px solid
}

.selector .show-all:after {
    -webkit-transform: rotate(90deg);
    transform: rotate(90deg)
}

.selector.open ul {
    max-height: none
}

.selector.open .show-all:after {
    display: none
}


* {
    -webkit-box-sizing: border-box;
    -ms-box-sizing: border-box;
    box-sizing: border-box;
}

</style>
