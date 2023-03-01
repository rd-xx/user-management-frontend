const routes = {
  home: () => '/',
  users: {
    create: () => '/users/create',
    read: {
      collection: () => '/users',
      single: (userId: string) => `/users/${userId}`,
    },
  },
  sign: {
    in: () => '/sign/in',
    up: () => '/sign/up',
  },
};

export default routes;
