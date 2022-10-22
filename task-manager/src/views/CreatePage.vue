<!-- eslint-disable vuejs-accessibility/form-control-has-label -->
<!-- eslint-disable vuejs-accessibility/label-has-for -->
<template>
  <div class="row">
    <div class="col s6 offset-s3">
			<h1>Create task</h1>
			<form @submit.prevent="submitHandler">
				<div class="input-field">
					<input v-model="title" id="title" type="text" class="validate" required />
          <label for="title">
						Title
					</label>
        </div>
				<div class="chips" ref="chips"></div>
				<div class="input-field">
					<textarea v-model="description" id="description" class="materialize-textarea" data-length="120"></textarea>            
					<label for="description">
						Description
					</label>
					<span class="character-counter" style="float: right; font-size: 12px;">{{description.length}}/2048</span>
        </div>
				<input type="text" ref="datepicker" />
				<button class="btn" type="submit">Create task</button>				
			</form>
				
		</div>
  </div>
</template>

<script>
import { v4 as uuidv4 } from "uuid";

export default {
	name: "create-page",
	computed: {
		newId() {
			return uuidv4();
		}		
	},
	data() {
		return {
			description: "",
			title: "",
			chips: null,
			dueDate: null,
		};
	},
	methods: {
		submitHandler() {
			const task = {
				title: this.title,
				description: this.description,
				id: this.newId,
				status: "active",
				tags: this.chips.chipsData,
				dueDate: this.dueDate.date 
			};
			// запись в store
			this.$store.dispatch("createTask", task);
			this.$router.push("/list");
		}
	},	
	mounted() {		
		this.chips = M.Chips.init(this.$refs.chips, {
			placeholder: "Task tags"
		});
		this.dueDate = M.Datepicker.init(this.$refs.datepicker, {
			format: "dd.mm.yyyy",
			// autoClose: true,
			defaultDate: new Date(),
			setDefaultDate: true
		});
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
<style scoped>
	
</style>
