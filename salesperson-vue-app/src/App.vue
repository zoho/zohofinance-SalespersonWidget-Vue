<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: "App",
  created() {
    // Automatically navigate to the home route ("/") when the component is created
    this.$router.push("/");
  },
};
</script>
<style>
* {
	box-sizing: border-box;
}

#app {
	height: 100%;
}
</style>
