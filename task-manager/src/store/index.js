import { createStore } from "vuex";

export default createStore({
  state: {
		tasks: JSON.parse(localStorage.getItem("tasks") || "[]").map((task) => {
			if (new Date(task.dueDate) < new Date() && task.status !== "completed") {
				task.status = "overdue";
			}
			return task;
		})
	},
  getters: {
		getTasks(state) {
			return state.tasks;
		},
		getTaskById: (state) => (id) => state.tasks.find((task) => task.id === id)			
	},
  mutations: {
		CREATE_TASK(state, payload) {
			state.tasks.push(payload);
			localStorage.setItem("tasks", JSON.stringify(state.tasks));
		},
		
		UPDATE_TASK(state, { id, description, dueDate }) {
			// копия текущих тасков
			const tasks = state.tasks.concat();
			const idx = tasks.findIndex((task) => task.id === id);
			const updatedTask = tasks[idx];
			// проверяем duedate при апдейте таска
			const status = new Date(dueDate) > new Date() ? "active" : "overdue";
			// обновляем поля таска: но только те, которые изменились
			tasks[idx] = {
				...updatedTask, 
				description, 
				dueDate, 
				status
			};
			state.tasks = tasks;
			localStorage.setItem("tasks", JSON.stringify(state.tasks));
		},
		
		COMPLETE_TASK(state, id) {
			const idx = state.tasks.findIndex((task) => task.id === id);
			state.tasks[idx].status = "completed";
			localStorage.setItem("tasks", JSON.stringify(state.tasks));
		}
	},
  actions: {
		createTask(state, payload) {
			state.commit("CREATE_TASK", payload);
		},
		updateTask({ commit }, payload) {
			commit("UPDATE_TASK", payload);
		},
		completeTask({ commit }, payload) {
			commit("COMPLETE_TASK", payload);
		}
	},
  modules: {},
});
