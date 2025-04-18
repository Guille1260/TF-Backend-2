import UserModel from '../models/user.model.js'

class UserDAO {
    getUser = async()=>{
        try {
            let users = await UserModel.find();
        } catch (error) {
            console.log(error);
            return null;
        }
    }
}