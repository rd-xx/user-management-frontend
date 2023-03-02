const routes = {
  home: () => '/',
  users: {
    create: () => '/users/create',
    read: {
      collection: () => '/users',
      single: (userId: number) => `/users/${userId}`,
    },
  },
  sign: {
    in: () => '/sign-in',
    up: () => '/sign-up',
  },
};

export default routes;
