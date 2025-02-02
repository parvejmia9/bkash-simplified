import { User } from "../models/user.models";

export async function getBalance(userId: number) {
    try {
        const user = await User.findByPk(userId);
        return user?.balance;
    } catch (error) {
        return null;
    }
}

export async function getUserFromNumber(nmbr: string) {
  try {
    const user = await User.findOne({ where: { phoneNumber: nmbr } });
    return user;
  } catch (error) {
    return null;
  }

}