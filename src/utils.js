
const isAuthenticated = () => {
	const index = Number(localStorage.getItem("authenticated"))
	if(index){
		return JSON.parse(localStorage.getItem("users"))[index]
	}
	return null;
}

const setAuthenticated = index => localStorage.setItem("authenticated", index)
const removeAuthenticated = () => localStorage.removeItem("authenticated")

export {
	isAuthenticated,
	setAuthenticated,
	removeAuthenticated
}
