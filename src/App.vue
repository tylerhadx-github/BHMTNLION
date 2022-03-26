<template>
  <div id="app">
    <v-app>
                  <v-app-bar app
                       dense
                       absolute
                       shrink-on-scroll
                       color="blue"
                       height="50px">
                <v-toolbar-title style="position:absolute; top: 5px;" class="pt-0">
                    Black Hills Mountain Lion Scouting Tool
                </v-toolbar-title>
                <v-spacer></v-spacer>
            </v-app-bar>
            <v-main>
        <Map />
        </v-main>
        </v-app>

  </div>
</template>

<script>
import Map from './components/Map.vue'

export default {
  name: 'App',
  components: {
    Map
  }
}
</script>

<style>
</style>
