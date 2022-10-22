<!-- eslint-disable vuejs-accessibility/label-has-for -->
<!-- eslint-disable vue/no-deprecated-router-link-tag-prop -->
<template>
	<h1>Lists</h1>
	
	<div class="row">
		<div class="input-field col s6">
			<select ref="selectFilter" v-model="filterValue">
				<option value="" disabled selected>Choose your option</option>
				<option value="active">Active</option>
				<option value="overdue">Overdue</option>
				<option value="completed">Completed</option>
			</select>
			<label>Status Select</label>
		</div>
	</div>

	<div v-if="filterValue">
		<button class="btn btn-small red" @click="filterValue = null">Clear filter</button>
		<hr/>
	</div>
	
	<table v-if="tasks.length">
		<thead>
			<tr>
				<th>#</th>
				<th>Title</th>
				<th>Due date</th>
				<th>Description</th>
				<th>Status</th>
				<th>Open</th>
			</tr>
		</thead>
		<tbody>
			<tr v-for="(task, indx) in filteredTasks" :key="task.id" :class="{ completed: task.status === 'completed'}">
				<td>{{indx+1}}</td>
				<td>{{task.title}}</td>
				<td>{{ new Date(task.dueDate).toLocaleDateString("ru-Ru") }}</td>
				<td class="td-fix--witdth">
					<div class="text">{{task.description}}</div>
				</td>
				<td>{{task.status}}</td>
				<td>
					<router-link
						tag="button" class="btn btn-small"
						:to="'/task/' + task.id"
					>
						Open
					</router-link>
				</td>
			</tr>
		</tbody>
	
	</table>
	<p v-else>No tasks</p>
</template>
<script>
export default {
	name: "list-page",
	data() {
		return {
			filter: null,
			filterValue: null
		};
	},
	computed: {
		tasks() {
			return this.$store.getters.getTasks;
		},
		filteredTasks() {
			return this.tasks.filter((task) => {
				if (!this.filterValue) {
					return true;
				}
				return task.status === this.filterValue;
			});
		}
	},
	mounted() {
		this.filter = M.FormSelect.init(this.$refs.selectFilter, {});
	},
	unmounted() {
		if (this.filter?.destroy) {
			this.filter.destroy();
		}
	}
};
</script>
<style scoped>
.text {
	white-space: nowrap;
	text-overflow: ellipsis;
	overflow: hidden;
}
.td-fix--witdth {
	max-width: 400px;
}

.completed {
	background-color: rgba(240, 83, 83, 0.644);
}

</style>
