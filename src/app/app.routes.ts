import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
      {
            path: '',
            loadComponent: () => import('./components/log-in/log-in.component').then(m => m.LogInComponent)
      },
      {
            path: 'verify-otp',
            loadComponent: () => import('./components/verify-otp/verify-otp.component').then(m => m.VerifyOtpComponent)
      },
      {
            path: 'verify-instructions',
            loadComponent: () => import('./components/verify-instruction/verify-instruction.component').then(m => m.VerifyInstructionComponent)
      },
      {
            path: 'about-yourself',
            loadComponent: () => import('./components/about-yourself/about-yourself.component').then(m => m.AboutYourselfComponent)
      },
      {
            path: 'choose-intrest',
            loadComponent: () => import('./components/choose-intrest/choose-intrest.component').then(m => m.ChooseIntrestComponent)
      },

      {
            path: 'main',
            loadComponent: () => import('./components/main/main.component').then(m => m.MainComponent),
            // canActivate: [authGuard],
            children: [
                  {
                        path: 'home',
                        loadComponent: () => import('./components/home/home.component').then(m => m.HomeComponent)
                  },
                  {
                        path: 'story-list',
                        loadComponent: () => import('./components/story-list/story-list.component').then(m => m.StoryListComponent)
                  },
                  {
                        path: 'chats',
                        loadComponent: () => import('./components/chats/chats.component').then(m => m.ChatsComponent)
                  },
                  {
                        path: 'my-profile',
                        loadComponent: () => import('./components/my-profile/my-profile.component').then(m => m.MyProfileComponent)
                  },
                  {
                        path: 'edit-profile',
                        loadComponent: () => import('./components/edit-profile/edit-profile.component').then(m => m.EditProfileComponent)
                  },
                  {
                        path: 'notifications',
                        loadComponent: () => import('./components/notifications/notifications.component').then(m => m.NotificationsComponent)
                  },
                  {
                        path: 'kitty-groups',
                        loadComponent: () => import('./components/kitty-group/group-list/group-list.component').then(m => m.GroupListComponent)
                  },
                  {
                        path: 'create-group',
                        loadComponent: () => import('./components/kitty-group/create-group/create-group.component').then(m => m.CreateGroupComponent)
                  },
                  {
                        path: 'view-group',
                        loadComponent: () => import('./components/kitty-group/view-group/view-group.component').then(m => m.ViewGroupComponent)
                  },
                  {
                        path: 'joined-kitty-group',
                        loadComponent: () => import('./components/kitty-group/joined-kitty-group/joined-kitty-group.component').then(m => m.JoinedKittyGroupComponent)
                  },

                  {
                        path: 'marketplace',
                        loadComponent: () => import('./components/marketplace/marketplace.component').then(m => m.MarketplaceComponent)
                  },
                  {
                        path: 'products-list',
                        loadComponent: () => import('./components/marketplace/products-list/products-list.component').then(m => m.ProductsListComponent)
                  },
                  {
                        path: 'product-detail',
                        loadComponent: () => import('./components/marketplace/products-list/product-detail/product-detail.component').then(m => m.ProductDetailComponent)
                  },
                  {
                        path: 'stores-list',
                        loadComponent: () => import('./components/marketplace/stores-list/stores-list.component').then(m => m.StoresListComponent)
                  },
                  {
                        path: 'store-detail',
                        loadComponent: () => import('./components/marketplace/stores-list/store-detail/store-detail.component').then(m => m.StoreDetailComponent)
                  },

                  {
                        path: 'contests',
                        loadComponent: () => import('./components/contests/contests.component').then(m => m.ContestsComponent)
                  },
                  {
                        path: 'create-contest',
                        loadComponent: () => import('./components/contests/create-contest/create-contest.component').then(m => m.CreateContestComponent)
                  },
                  {
                        path: 'view-contest',
                        loadComponent: () => import('./components/contests/view-contest/view-contest.component').then(m => m.ViewContestComponent)
                  },
                  {
                        path: 'enter-contest',
                        loadComponent: () => import('./components/contests/enter-contest/enter-contest.component').then(m => m.EnterContestComponent)
                  },
                  {
                        path: 'vote-contest',
                        loadComponent: () => import('./components/contests/vote-contest/vote-contest.component').then(m => m.VoteContestComponent)
                  },

                  {
                        path: 'wellness',
                        loadComponent: () => import('./components/wellness/wellness.component').then(m => m.WellnessComponent)
                  },
                  {
                        path: 'sessions',
                        loadComponent: () => import('./components/wellness/all-sessions/all-sessions.component').then(m => m.AllSessionsComponent)
                  },
                  {
                        path: 'articles',
                        loadComponent: () => import('./components/wellness/all-articles/all-articles.component').then(m => m.AllArticlesComponent)
                  },
                  {
                        path: 'view-article',
                        loadComponent: () => import('./components/wellness/all-articles/article-details/article-details.component').then(m => m.ArticleDetailsComponent)
                  },

                  {
                        path: 'settings',
                        loadChildren: () => import('./components/settings/settings.routes').then(m => m.settingsRoutes)
                  },
            ]
      }
];
