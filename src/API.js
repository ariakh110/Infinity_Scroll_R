export const getUsers = async (page) => {
  const response = await fetch(
    `https://randomuser.me/api/?page=${page}&results=50`
  );
  const data = await response.json();
  return data.results;
};
