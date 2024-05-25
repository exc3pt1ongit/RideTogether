// utils/session/auth.ts

export const loginUser = async (
  email: string,
  password: string
): Promise<string | null> => {
  try {
    const response = await fetch(`${process.env.SERVER_URI}/Login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      return response.text();
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error logging in: ", error);
    return null;
  }
};
