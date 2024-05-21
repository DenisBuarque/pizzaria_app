import { Request, Response } from "express";
import { UserService } from "../../services/user/UserService";

class UserController {

    async create(req: Request, res: Response) {

        const {name, email, password } = req.body;

        const data = {
            name, 
            email,
            password
        }
        const userService = new UserService();
        const user = await userService.store(data);

        return res.status(200).json({ user });
    }
}

export { UserController };