<!-- eslint-disable vue/no-deprecated-router-link-tag-prop -->
<template>
  <nav class="blue darken-3">
    <div class="nav-wrapper">
      <router-link to="/" class="brand-logo">Tasks</router-link>
      <ul class="right hide-on-med-and-down">
				<li>
					<router-link
						tag="li"
						:to="{name: 'create', params: {}}"
						exact
						active-class="active"
					>
						<a href="#">Create</a>
					</router-link>
				</li>
				<li>
					<router-link
						tag="li"
						:to="{name: 'list'}"
						active-class="active"
					>
						<a href="#">List</a>
					</router-link>
				</li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  name: "navbar-component"
};
</script>

<style scoped>
  nav {
    padding: 0 2rem;
  }
</style>
