export class UserDto {
	constructor(model) {
		this.email = model.email
		this.firstname = model.firstname
		this.lastname = model.lastname
		this.avatar = model.avatar
		this.id = model._id
		this.isActivated = model.isActivated
	}
}
