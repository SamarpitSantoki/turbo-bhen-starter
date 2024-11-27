export const checkAndThrow = async (res: Response) => {
  if (!res.ok) {
    const error = await res.json();
    console.log(error);

    throw new Error(error);
  }
};
