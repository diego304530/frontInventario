import { NbMenuItem } from "@nebular/theme";

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: "Dashboard",
    icon: "home-outline",
    link: "/pages/dashboard",
  },
  {
    title: "FEATURES",
    group: true,
  },
  {
    title: "Layout",
    icon: "layout-outline",
    children: [
      {
        title: "Productos",
        icon: "book-outline", // Asumiendo que estás utilizando FontAwesome
        link: "/pages/productos/listar",
      },
      {
        title: "Empleados",
        icon: "person", // Icono de usuario con signo de más, asumiendo FontAwesome
        link: "/pages/empleados/listar",
      },
      {
        title: "Clientes",
        icon: "person", // Icono de usuario con signo de más, asumiendo FontAwesome
        link: "/pages/clientes/listar",
      },
      {
        title: "Inventarios",
        icon: "archive", // Icono de usuario con signo de más, asumiendo FontAwesome
        link: "/pages/inventarios/listar",
      },

      // {
      //   title: 'Roles',
      //   icon: 'archive', // Icono de usuario con signo de más, asumiendo FontAwesome
      //   link: '/pages/roles/listar',
      // }
    ],
  },
  // {
  //   title: 'Auth',
  //   icon: 'lock-outline',
  //   children: [
  //     {
  //       title: 'Login',
  //       link: '/auth/login',
  //     },
  //     {
  //       title: 'Register',
  //       link: '/auth/register',
  //     },
  //     {
  //       title: 'Request Password',
  //       link: '/auth/request-password',
  //     },
  //     {
  //       title: 'Reset Password',
  //       link: '/auth/reset-password',
  //     },
  //   ],
  // },
];
