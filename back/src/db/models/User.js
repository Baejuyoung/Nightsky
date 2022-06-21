// import { BasicModel } from "../index.js";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
class User {
  static async createUser({ social, pw, email, name }) {
    const isUser = await prisma.users.findFirst({
      where: {
        name: name,
        email: email,
        social: social,
      },
    });
    if (isUser) {
      return null;
    }
    const createdUser = await prisma.users.create({
      data: {
        social: social,
        email: email,
        pw: pw,
        name: name,
      },
    });
    return createdUser;
  }

  static async checkUser({ email }) {
    const foundUser = await prisma.users.findFirst({
      where: {
        AND: {
          social: "local",
          email: email,
        },
      },
    });
    return foundUser;
  }
  static async findUserByEmail({ id }) {
    const foundUsers = await prisma.users.findMany({
      where: {
        id: {
          in: id,
        },
      },
    });
    return foundUsers;
  }
  static async findUser({ email, social, pw }) {
    if (pw) {
      const foundUser = await prisma.users.findFirst({
        where: {
          email: email,
          social: social,
          pw: pw,
        },
      });
      return foundUser;
    } else {
      const foundUser = await prisma.users.findFirst({
        where: {
          email: email,
          social: social,
        },
      });
      return foundUser;
    }
  }

  /**
   * - 유저가 일기를 작성하면 금일 일기 작성을 체크해주는 update 함수
   * @param {number} userId - 유저의 고유 ID
   * @returns
   */
  static async dailyUpdate(userId) {
    const daily = await prisma.users.update({
      where: {
        id: +userId,
      },
      data: {
        daily_check: true,
      },
      select: {
        daily_check: true,
      },
    });
    return daily;
  }

  /**
   * - 유저가 일기를 금일 작성했는지 체크하는 find 함수
   * @param {number} userId - 유저 고유 ID
   * @returns
   */
  static async dailyCheck(userId) {
    const daily = await prisma.users.findFirst({
      where: {
        id: +userId,
      },
      select: {
        daily_check: true,
      },
    });
    return daily;
  }

  /**
   * 매일 오전 6시 일기 작성을 초기화 시켜주는 함수
   */
  static async dailyInit() {
    const daily = await prisma.users.updateMany({
      where: {
        daily_check: true,
      },
      data: {
        daily_check: false,
      },
    });
  }


}

export { User };
