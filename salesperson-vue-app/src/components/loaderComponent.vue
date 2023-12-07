<template>
    <div class="loading">
		<div class="load-circle1"></div>
		<div class="load-circle2"></div>
		<div class="load-circle3"></div>
		<div class="load-circle4"></div>
		<div class="load-circle5"></div>
	</div>
</template>
<style scoped>
.loading {
	text-align: center;
    position: relative;
    top: 190px;
}
.load-circle1,
.load-circle2,
.load-circle3,
.load-circle4,
.load-circle5 {
  width: 8px;
  height: 8px;
  background: grey;
  display: inline-block;
  border-radius: 20px;
	animation: loader 1.5s infinite;
	margin-right: 3px;
}
@keyframes loader {
  from {
    opacity: 1;
    scale: 1;
  }
  to {
    opacity: 0.25;
    scale: 0.3;
  }
}
.load-circle2 {
  animation-delay: 0.25s;
}
.load-circle3 {
  animation-delay: 0.5s;
}
.load-circle4 {
  animation-delay: 0.75s;
}
.load-circle5 {
  animation-delay: 1s;
}

</style>