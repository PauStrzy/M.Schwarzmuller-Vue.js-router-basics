import { createRouter, createWebHistory } from 'vue-router';

import TeamsList from './pages/TeamsList.vue';
import UsersList from './pages/UsersList.vue';
import TeamMembers from './components/teams/TeamMembers.vue';
import NotFound from './pages/NotFound.vue';
import TeamsFooter from './pages/TeamsFooter.vue';
import UsersFooter from './pages/UsersFooter.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/teams' },
    {
      name: 'teams',
      path: '/teams',
      components: { default: TeamsList, footer: TeamsFooter },
      children: [
        {
          name: 'team-members',
          path: '/teams/:teamId',
          meta: { needsAuth: true },
          component: TeamMembers,
          props: true,
        },
      ],
    },
    //alias: '/' },
    {
      path: '/users',
      components: { default: UsersList, footer: UsersFooter },
      beforeEnter(to, from, next) {
        console.log('User beforeEnter');
        console.log(to, from);
        next();
      },
    },

    { path: '/:notFound(.*)', component: NotFound },
  ],
  linkActiveClass: 'active',
  scrollBehavior(_, _2, savedPosition) {
    // console.log(to, from, savedPosition);
    if (savedPosition) {
      return savedPosition;
    }
    return { left: 0, top: 0 };
  },
});
router.beforeEach(function (to, from, next) {
  console.log('Global beforeEach');
  console.log(to, from);
  // if (to.meta.needsAuth) {
  //   console.log('Needs auth!');
  //   next();
  // }
  next();
  //next(false);
  // if (to.name === 'team-members') {
  //   next();
  // } else {
  //   next({ name: 'team-members', params: { teamId: 't2' } });
  // }
});

router.afterEach(function (to, from) {
  //sending analitycs data

  console.log('Global afterEach');
  console.log(to, from);
});

export default router;
