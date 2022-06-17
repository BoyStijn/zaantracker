<template>
    <main class="w-100">
        <SwimSidebar state="3"/>
        <div class="d-flex w-100 flex-column p-3 text-white bg-dark" style="overflow-x:auto;">
            <div style="padding-top: 0.5rem; padding-bottom: 0.5rem;">
                &nbsp;
            </div>
            <div class="modal fade" id="exampleModalCenteredScrollable" tabindex="-1" aria-labelledby="exampleModalCenteredScrollableTitle" style="display: none;" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                    <div class="modal-content bg-dark">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalCenteredScrollableTitle">Filters</h5>
                        <button type="button" class="btn text-white" data-bs-dismiss="modal" aria-label="Close">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" stroke="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16">
                                <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/>
                            </svg>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="mb-3">
                            <label for="exampleFormControlInput1" class="form-label">Naam:</label>
                            <input @input="e => updateFilter('Naam', {changed: e.target.value.length > 0, name: e.target.value})" type="text" class="form-control" id="exampleFormControlInput1">
                        </div>
                        <div class="mb-3">
                        <label class="text-white" for="slider2">Leeftijd:</label>
                        <MultiSlide @changed="e => updateFilter('Leeftijd', e)" :min="0" :max="100" :step="1" id="slider2"/>
                        </div>
                        <div class="mb-3">
                            <label class="text-white" for="genderbutton">Dames / Heren:</label>
                            <GenderSelect @updated="e => updateFilter('Geslacht', e)"/>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
            <div class="d-flex">
                <button type="button" class="btn btn-primary m-1 me-3" data-bs-toggle="modal" data-bs-target="#exampleModalCenteredScrollable">
                    Filters <span class="badge bg-secondary">{{Object.keys(this.filters).length}}</span>
                </button>
                <div class="border-end me-2"></div>
                <div class="align-items-center d-flex">
                    <span v-for="(value, key) in filters" class="badge m-1 rounded-pill bg-primary">{{this.filterFormat(key, value)}}</span>
                </div>
            </div>
            <div>
                <table class="table table-dark table-hover text-center">
                    <thead>
                        <tr>
                        <th scope="col">Naam</th>
                        <th scope="col">Leeftijd</th>
                        <th scope="col">D/H</th>
                        <th scope="col">KNZB</th>
                        <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        <SwimEntry v-for="(item, index) in filtered_table" :key="index" :data="item" />
                    </tbody>
                </table>
            </div> 
        </div>
    </main>
</template>

<script>
import SwimSidebar from '../components/SideBar.vue'
import MultiSlide from '../components/MultiSlide.vue'
import GenderSelect from '../components/GenderSelect.vue'
import SwimEntry from '../components/SwimEntry.vue'

const year = new Date().getFullYear();

export default {
  name: 'HomeView',
  data() {
    return {
        filters: {},
        testdata: [
            ['Kim Boer', 2006, 'Dames', 201200000],
            ['Kim Boer', 2006, 'Dames', 201200000],
            ['Kim Boer', 2006, 'Dames', 201200000],
            ['Jan Henk', 2004, 'Heren', 201200001]
        ]
    }
  },
  components: {
      SwimSidebar,
      MultiSlide,
      GenderSelect,
      SwimEntry
  },
  methods: {
      updateFilter(name, value) {
          if (!value.changed) {
              delete this.filters[name]
              return;
          }
          this.filters[name] = value;
      },
      filterFormat(key, value) {
          let fstring = ''
          switch(key) {
                case 'Naam':
                    fstring = key + ": (" + value.name + ")"
                    break;
                case 'Geslacht':
                    fstring = key + ": (";
                    if (value.min) fstring += "Dames";
                    if (value.min && value.max) fstring += ", ";
                    if (value.max) fstring += "Heren";
                    fstring += ")"
                    break;
                case 'Leeftijd':
                    fstring = key + ": (" + value.min + " -> " + value.max + ")"
                    break;
          };
          return fstring;
      }
  },
  computed: {
      filtered_table() {
          const size = Object.keys(this.filters).length;
          if (size < 1) return this.testdata
          let filterdata = this.testdata;
          for (const key in this.filters) {
              const filterrange = this.filters[key];
              switch(key) {
                  case 'Naam':
                      const names = filterrange.name.toLowerCase().split(",");
                      if (filterrange.name.length > 0)
                      filterdata = filterdata.filter( v => {
                          let found = false
                          names.forEach(name => {
                            if (v[0].toLowerCase().includes(name.trim())) {
                                found = true;
                            }
                          })
                          return found;
                      })
                      break;
                  case 'Geslacht':
                      filterdata = filterdata.filter( v => ((v[2] == 'Dames' && filterrange.min) || (v[2] == 'Heren' && filterrange.max)))
                      break;
                  case 'Leeftijd':
                      filterdata = filterdata.filter( v => ( year - v[1] >= filterrange.min && year -  v[1] <= filterrange.max))
                      break;
              };
          }
          return filterdata;
      }
  }
}
</script>

<style>

.btn-check:checked + .button_option {
    background-color: var(--bs-secondary);
    border-color: var(--bs-secondary);
}

</style>