import prismaClient from "../../prisma"
;
interface UserRequest {
    name: string;
    phone: string;
    email: string;
    password: string;

}

class UserService {
    async store(data: UserRequest){

        if(!data.name) {
            throw new Error("Adicione seu nome!");
        }

        if(!data.phone) {
            throw new Error("Adicione seu telefone!");
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