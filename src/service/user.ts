import prisma from "@/database/mariadb/index";
import bcrypt from "bcryptjs";

class UserService {
  async createUser(email: string, password: string, name: string) {
    const hashedPassword = await bcrypt.hash(password, 10);
    return prisma.users.create({
      data: {
        email,
        password: hashedPassword,
        name,
      },
    });
  }

  async validateUser(email: string, password: string) {
    const user = await prisma.users.findUnique({ where: { email } });
    if (!user) return false;
    const isMatch = await bcrypt.compare(password, user.password);
    return isMatch ? user : false;
  }
}

export default new UserService();
