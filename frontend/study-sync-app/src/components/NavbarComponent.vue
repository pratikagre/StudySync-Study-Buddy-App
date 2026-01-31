<template>
  <v-app-bar color="white" elevation="0" class="modern-navbar">
    <v-container>
      <v-row align="center" no-gutters>
        <v-col class="d-flex align-center">
          <v-icon class="logo-icon mr-2">mdi-school</v-icon>
          <v-toolbar-title class="title" @click="$router.push('/')">
            StudySync
          </v-toolbar-title>
        </v-col>

        <v-col class="d-none d-md-flex justify-end align-center">
          <v-btn text to="/" class="nav-btn">
            <v-icon class="nav-icon">mdi-home</v-icon> Home
          </v-btn>

          <v-menu v-if="isAuthenticated" open-on-hover>
            <template v-slot:activator="{ props }">
              <v-btn text v-bind="props" class="nav-btn">
                <v-icon class="nav-icon">mdi-tools</v-icon> Tools
                <v-icon>mdi-chevron-down</v-icon>
              </v-btn>
            </template>

            <v-list>
              <v-list-item to="/materials">Study Materials</v-list-item>
              <v-list-item to="/quizzes">Quizzes</v-list-item>
              <v-list-item to="/progress">Progress</v-list-item>
              <v-list-item to="/goals">Goals</v-list-item>
              <v-list-item to="/planner">Planner</v-list-item>
            </v-list>
          </v-menu>

          <v-btn text to="/resources" class="nav-btn">
            <v-icon class="nav-icon">mdi-link</v-icon> Resources
          </v-btn>

          <v-btn v-if="isAuthenticated" text to="/profile" class="nav-btn">
            <v-icon class="nav-icon">mdi-account</v-icon> Profile
          </v-btn>

          <v-btn v-if="!isAuthenticated" text to="/login" class="nav-btn">
            Login
          </v-btn>

          <v-btn
            v-if="isAuthenticated"
            text
            class="nav-btn"
            style="color:red"
            @click="handleLogout"
          >
            Logout
          </v-btn>
        </v-col>

        <v-col class="d-flex d-md-none justify-end">
          <v-app-bar-nav-icon @click="drawer = !drawer" />
        </v-col>
      </v-row>
    </v-container>
  </v-app-bar>

  <v-navigation-drawer v-model="drawer" temporary>
    <v-list>
      <v-list-item to="/">Home</v-list-item>
      <v-list-item v-if="isAuthenticated" to="/materials">Study Materials</v-list-item>
      <v-list-item v-if="isAuthenticated" to="/planner">Planner</v-list-item>
      <v-list-item to="/resources">Resources</v-list-item>

      <v-list-item v-if="!isAuthenticated" to="/login">Login</v-list-item>

      <v-list-item v-if="isAuthenticated" @click="handleLogout" style="color:red">
        Logout
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  data() {
    return {
      drawer: false,
    };
  },

  computed: {
    ...mapGetters(["isAuthenticated"]),
  },

  methods: {
    ...mapActions(["logout"]),

    handleLogout() {
      localStorage.clear();
      this.logout();
      this.$router.push("/login");
    },
  },
};
</script>

<style scoped>
.title {
  font-family: Poppins;
  cursor: pointer;
}

.logo-icon {
  color: #6366f1;
  font-size: 28px;
}

.nav-btn {
  text-transform: none;
  margin: 0 5px;
}

.nav-icon {
  margin-right: 6px;
}
</style>
