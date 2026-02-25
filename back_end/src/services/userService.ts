import bcrypt from "bcrypt";
import { updateUserById } from "../db/repositories/user_repository";

export async function updateProfile(
  userId: number,
  data: {
    fullName?: string;
    email?: string;
    password?: string;
  }
): Promise<boolean> {
  const updateData: {
    fullName?: string;
    email?: string;
    password?: string;
  } = {};

  if (data.fullName) {
    updateData.fullName = data.fullName;
  }

  if (data.email) {
    updateData.email = data.email;
  }

  if (data.password) {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    updateData.password = hashedPassword;
  }

  if (Object.keys(updateData).length === 0) {
    throw new Error("No fields provided for update");
  }

  return await updateUserById(userId, updateData);
}