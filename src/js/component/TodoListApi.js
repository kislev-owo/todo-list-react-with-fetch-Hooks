import React, { useState, useEffect } from "react";
export function TodoListApi(props) {
	const [newTask, setNewTask] = useState("");
	const [tasksList, setTasksList] = useState([]);

	async function handleSubmit() {
		if (event.key == "Enter") {
			if (newTask !== "") {
				var newTasks = [
					...tasksList,
					{
						label: newTask,
						done: false
					}
				];
				let response = await fetch(
					"https://assets.breatheco.de/apis/fake/todos/user/kislev-owo",
					{
						method: "PUT",
						body: JSON.stringify(newTasks),
						headers: {
							"Content-Type": "application/json"
						}
					}
				);
				if (!response.ok) {
					throw Error(response.statusText);
				}
				response = await fetch(
					"https://assets.breatheco.de/apis/fake/todos/user/kislev-owo"
				);
				if (!response.ok) {
					throw Error(response.statusText);
				}
				let todolist = await response.json();
				setTasksList(todolist);
				setNewTask("");
			} else {
				alert("escribe un texto,please!");
			}
		}
	}

	async function handleDelete(index) {
		const newTaskWords = tasksList.filter((newTask, i) => {
			return index != i;
		});
		// setTasksList(newTaskWords);

		let response = await fetch(
			"https://assets.breatheco.de/apis/fake/todos/user/kislev-owo",
			{
				method: "PUT",
				body: JSON.stringify(newTaskWords),
				headers: {
					"Content-Type": "application/json"
				}
			}
		);
		if (!response.ok) {
			throw Error(response.statusText);
		}
		response = await fetch(
			"https://assets.breatheco.de/apis/fake/todos/user/kislev-owo"
		);
		if (!response.ok) {
			throw Error(response.statusText);
		}
		let todolist = await response.json();
		setTasksList(todolist);
	}

	useEffect(() => {
		fetch("https://assets.breatheco.de/apis/fake/todos/user/kislev-owo")
			.then(response => {
				if (!response.ok) {
					throw Error(response.statusText);
				}
				return response.json();
			})
			.then(todolist => setTasksList(todolist))
			.catch(error => console.log(error));
	}, []);

	return (
		<div className="container w-75 mt-5">
			<h2 className="font-weight-light text-danger">{"todos"}</h2>
			<div className="col-8 container">
				<input
					type="text"
					placeholder="What needs to be done?"
					className="form-control no-border"
					//cuando hay un cambio en el input el evento actualiza el valor del estado newTask con el valor actual del momento
					onChange={e => setNewTask(e.target.value)}
					//value = newTask si se le da a enter la linea se borra automatico
					value={newTask}
					//sino esta vacio, la palabra se agrega al precionar enter y si esta vacio pues te alerta
					onKeyPress={handleSubmit}
				/>
				<ul>
					{tasksList.map((newTask, index) => {
						return (
							<div key={index} className="form-control no-border">
								<li onClick={event => handleDelete(index)}>
									{newTask.label}
								</li>
							</div>
						);
					})}
					<div>
						<small>{tasksList.length + " task(s) left"}</small>
					</div>
				</ul>
			</div>
		</div>
	);
}
