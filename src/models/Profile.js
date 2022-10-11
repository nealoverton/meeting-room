class Profile {
    constructor(uid, email, name = "test name", colour = "blue") {
        this.uid = uid;
        this.email = email;
        this.name = name;
        this.colour = colour;
    }
}

export default Profile;