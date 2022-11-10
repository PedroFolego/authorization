type RequestType = {
  email: string;
  password: string;
};

const delay = (amount = 750) => new Promise((res) => setTimeout(res, amount));

export async function singInRequestData({ email, password }: RequestType) {
  // await delay()

  if (email == "admin@admin.com" && password == "1234") {
    return {
      user: {
        email: "admin@admin.com",
        id: "admin",
        role: "admin",
      },
    };
  }
  return null;
}
