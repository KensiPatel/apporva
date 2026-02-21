import bcrypt from "bcrypt";
import { updateUserById } from "../db/repositories/user_repository";

export async function updateProfile(
  userId: number,
  data: {
    fullName?: string;
    password?: string;
  }
) {
  const updateData: {
    fullName?: string;
    password?: string;
  } = {};

  if (data.fullName) {
    updateData.fullName = data.fullName;
  }

  if (data.password) {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    updateData.password = hashedPassword;
  }

  await updateUserById(userId, updateData);
}
