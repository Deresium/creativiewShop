import UserCreationDS from "../../business/models/datastores/UserCreationDS";
import IUserDataGateway from "../gateways/IUserDataGateway";
import UserEntity from "../entities/UserEntity";
import PasswordHashDS from "../../business/models/datastores/PasswordHashDS";

export default class UserDataMapper implements IUserDataGateway {
    public async createUser(userCreationDS: UserCreationDS, hashPassword: PasswordHashDS): Promise<void> {
        await UserEntity.create({
            email: userCreationDS.getEmail(),
            role: 'USER',
            password: hashPassword.getHashedPassword(),
            salted: hashPassword.getSalt(),
            access: false,
            name: userCreationDS.getName(),
            firstName: userCreationDS.getFirstName(),
            customerId: userCreationDS.getCustomerId()
        });
    }

    public async findUserByEmailAndCustomer(email: string, customerId: number): Promise<UserEntity> {
        return await UserEntity.findOne({
            where: {
                email: email,
                customerId: customerId
            }
        })
    }

    public async findActiveUserOnEmail(email: string, customerId: number): Promise<UserEntity> {
        return await UserEntity.findOne({
            where: {
                email: email,
                customerId: customerId,
                access: true
            }
        })
    }

    public async findUserById(userId: bigint): Promise<UserEntity> {
        return await UserEntity.findByPk(userId);
    }
}