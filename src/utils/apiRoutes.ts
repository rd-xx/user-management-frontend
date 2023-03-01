const apiRoutes = {
  // User
  user: {
    read: {
      single: (userId: string) => `http://localhost:4000/users/${userId}`,
      collection: () => `http://localhost:4000/users`,
    },
    sign: {
      up: () => `http://localhost:4000/users/create`,
      in: () => `http://localhost:4000/users/login`,
    },
  },
};

export default apiRoutes;
