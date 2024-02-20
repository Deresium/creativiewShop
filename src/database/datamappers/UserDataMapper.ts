import UserCreationDS from "../../business/models/datastores/UserCreationDS";
import IUserDataGateway from "../gateways/IUserDataGateway";
import UserEntity from "../entities/UserEntity";

export default class UserDataMapper implements IUserDataGateway {
    public async createUser(userCreationDS: UserCreationDS, salted: string): Promise<void> {
        await UserEntity.create({
            email: userCreationDS.getEmail(),
            role: 'USER',
            password: userCreationDS.getPassword(),
            salted: salted,
            access: false,
            name: userCreationDS.getName(),
            firstName: userCreationDS.getFirstName(),
            customerId: userCreationDS.getCustomerId()
        });
    }

}