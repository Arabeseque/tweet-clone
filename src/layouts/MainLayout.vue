<template>
  <q-layout view="lHr lpR fFf">

    <q-header bordered class="bg-white text-black">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />

        <q-toolbar-title class="text-weight-bold gt-md">
          {{$route.name}}
        </q-toolbar-title>
        <q-icon name="fa-solid fa-dove" size="sm" class="q-pa-md header-icon lt-md" color="primary"/>
      </q-toolbar>
    </q-header>

    <q-drawer show-if-above v-model="leftDrawerOpen" side="left" :width="283" bordered>
      <q-icon name="fa-solid fa-dove" size="lg" class="q-pa-md" color="primary"/>
      <q-list>
      <q-item clickable v-ripple to="/" exact>
        <q-item-section avatar>
          <q-icon name="fa-solid fa-house" />
        </q-item-section>

        <q-item-section class="text-h6">home</q-item-section>
      </q-item>
      <q-item clickable v-ripple to="/about" exact>
        <q-item-section avatar>
          <q-icon  name="fa-solid fa-circle-question" />

        </q-item-section>

        <q-item-section class="text-h6">About</q-item-section>
      </q-item>

    </q-list>
    </q-drawer>

    <q-drawer show-if-above v-model="rightDrawerOpen" side="right" bordered>
      <q-input color="primary"  label="Search Twitter" outlined rounded class="q-pa-md" dense >
        <template v-slot:prepend>
          <q-icon name="search" />
        </template>
      </q-input>
      <q-list bordered padding separator >
        <q-item class="q-pa-md">
          <q-item-section>
            <q-item-label overline class="text-grey">Education</q-item-label>
            <q-item-label class="text-weight-bold">Something amazing happened!</q-item-label>
            <q-item-label caption>Secondary line text. Lorem ipsum dolor sit amet, consectetur adipiscit elit.</q-item-label>
          </q-item-section>
          <q-item-section side top>
            <q-item-label caption>5 min ago</q-item-label>
          </q-item-section>
        </q-item>
        <q-item class="q-pa-md">
          <q-item-section>
            <q-item-label overline class="text-grey">Education</q-item-label>
            <q-item-label class="text-weight-bold">Something amazing happened!</q-item-label>
            <q-item-label caption>Secondary line text. Lorem ipsum dolor sit amet, consectetur adipiscit elit.</q-item-label>
          </q-item-section>
          <q-item-section side top>
            <q-item-label caption>5 min ago</q-item-label>
          </q-item-section>
        </q-item>
        <q-item class="q-pa-md">
          <q-item-section>
            <q-item-label overline class="text-grey">Education</q-item-label>
            <q-item-label class="text-weight-bold">Something amazing happened!</q-item-label>
            <q-item-label caption>Secondary line text. Lorem ipsum dolor sit amet, consectetur adipiscit elit.</q-item-label>
          </q-item-section>
          <q-item-section side top>
            <q-item-label caption>5 min ago</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

  </q-layout>
</template>

<script>
import { ref } from 'vue'

export default {
  setup () {
    const leftDrawerOpen = ref(false)
    const rightDrawerOpen = ref(false)

    return {
      leftDrawerOpen,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      },

      rightDrawerOpen,
      toggleRightDrawer () {
        rightDrawerOpen.value = !rightDrawerOpen.value
      }
    }
  }
}
</script>

<style lang="sass">
.header-icon
  position: absolute
  left: 50%
  bottom: 0
  transform: translateX(-50%)
</style>
