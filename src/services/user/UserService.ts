import prismaClient from "../../prisma";
import bcryptjs from "bcryptjs";

interface UserRequest {
    name: string;
    email: string;
    password: string;
}

class UserService {
    async store(data: UserRequest){

        if(!data.name) {
            throw new Error("Adicione seu nome!");
        }

        if(!data.email) {
            throw new Error("Adicione um e-mail!");
        }

        if(!data.password) {
            throw new Error("Adicione sua senha!");
        }

        const existEmail = await prismaClient.user.findFirst({where: {email: data.email}});
        if(existEmail){
            throw new Error('E-mail já existe');
        }

        const salt = bcryptjs.genSaltSync(10);
        const hashPassord = bcryptjs.hashSync(data.password, salt);

        data.password = hashPassord;

        const newUser = await prismaClient.user.create({
            data,
            select: {
                id: true,
                name: true,
                email: true,
            }});

        return newUser;
    }
}

export { UserService };