
const isAuthenticated = () => {
	const index = localStorage.getItem("authenticated")
	if(!index)	return null;

	console.log(index);
	const user = JSON.parse(localStorage.getItem("users"))[index]
	return user
}

const setAuthenticated = index => localStorage.setItem("authenticated", index)
const removeAuthenticated = () => localStorage.removeItem("authenticated")
const getAllMonies = () => JSON.parse(localStorage.getItem("users"))[localStorage.getItem("authenticated")]
const updateUser = (user) => {

	console.log(user)

	const users = JSON.parse(localStorage.getItem("users"))
	const index = localStorage.getItem("authenticated")
	users.splice(index, 0, user)

	localStorage.setItem("users", JSON.stringify(users))
}

export {
	isAuthenticated,
	setAuthenticated,
	removeAuthenticated,
	getAllMonies,
	updateUser
}
