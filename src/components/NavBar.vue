<template>
  <v-navigation-drawer class="bg-teal-darken-2" theme="dark" permanent>
    <v-list>
      <v-list-item prepend-icon="mdi-view-dashboard" title="Dashboard" link to="/"></v-list-item>
      <v-list-item prepend-icon="mdi-book-search" title="Search" link to="/search"></v-list-item>
      <v-list-item prepend-icon="mdi-book-heart" title="Wish List" link to="/wish"></v-list-item>
      <v-list-item prepend-icon="mdi-book-check" title="Done List" link to="/done"></v-list-item>
    </v-list>

    <template v-slot:append>
      <v-list>
        <v-list-item prepend-icon="mdi-account" title="Account"></v-list-item>
      </v-list>
      <div class="pa-2">
        <v-btn block>Logout</v-btn>
      </div>
    </template>
  </v-navigation-drawer>
</template>
