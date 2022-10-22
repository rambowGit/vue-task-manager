<!-- eslint-disable vuejs-accessibility/form-control-has-label -->
<!-- eslint-disable vuejs-accessibility/label-has-for -->
<template>
	<div class="row">
		<div v-if="task" class="col s6 offset-s3">
			<h1>{{task.title}}</h1>
			<form @submit.prevent="submitHandler">
				<div class="chips" ref="chips"></div>
				<div class="input-field">
					<textarea style="min-height: 180px;" v-model="description" id="description" class="materialize-textarea" data-length="120"></textarea>            
					<label for="description">						
						Description
					</label>
					<span class="character-counter" style="float: right; font-size: 12px;">{{description.length}}/2048</span>
				</div>
				<input type="text" ref="datepicker" />
				<button class="btn" style="margin-right: 1rem;" type="submit">Update</button>				
				<button class="btn blue" type="button" @click="completeTask">Complete task</button>				
			</form>
		</div>
		<p v-else>Task not found</p>
	</div>
	
</template>
<script>
export default {
	name: "task-page",
	computed: {
		task() {
			return this.$store.getters.getTaskById(this.$route.params.id);
		}
	},
	data() {
		return {
			description: "",
			chips: null,
			dueDate: null,
		};
	},
	methods: {
		submitHandler() {
			// запись в store
			const updatedTask = {
				id: this.task.id,
				description: this.description,
				dueDate: this.dueDate.date 
			};
			this.$store.dispatch("updateTask", updatedTask);
			this.$router.push("/list");
		},
		
		completeTask() {
			this.$store.dispatch("completeTask", this.task.id);
			this.$router.push("/list");
		}
	},	
	mounted() {		
		this.description = this.task.description;
		this.chips = M.Chips.init(this.$refs.chips, {
			placeholder: "Task tags",
			data: this.task.tags
		});
		this.dueDate = M.Datepicker.init(this.$refs.datepicker, {
			format: "dd.mm.yyyy",
			// autoClose: true,
			defaultDate: new Date(this.task.dueDate),
			setDefaultDate: true
		});
		setTimeout(() => {
			M.updateTextFields();
		}, 0);		
	},
	unmounted() {
		if (this.dueDate?.destroy) {
			this.dueDate.destroy();
		}
		if (this.chips?.destroy) {
			this.chips.destroy();
		}
	},	
};
</script>
<style>

</style>
