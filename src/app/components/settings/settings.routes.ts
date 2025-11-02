import { Routes } from '@angular/router';

export const settingsRoutes: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./root/root.component').then(m => m.RootComponent),
        children: [
            {
                path: 'rewards',
                loadComponent: () => import('./rewards/rewards.component').then(m => m.RewardsComponent)
            },
            {
                path: 'notification',
                loadComponent: () => import('./notification/notification.component').then(m => m.NotificationComponent)
            },
            {
                path: 'account-privacy',
                loadComponent: () => import('./account-privacy/account-privacy.component').then(m => m.AccountPrivacyComponent)
            },
            {
                path: 'wishlist',
                loadComponent: () => import('./wishlist/wishlist.component').then(m => m.WishlistComponent)
            },
            {
                path: 'apply-store',
                loadComponent: () => import('./apply-store/apply-store.component').then(m => m.ApplyStoreComponent)
            },
            {
                path: 'my-store',
                loadComponent: () => import('./my-store/my-store.component').then(m => m.MyStoreComponent)
            },
            {
                path: 'manage-products',
                loadComponent: () => import('./my-store/manage-products/manage-products.component').then(m => m.ManageProductsComponent)
            },
            {
                path: 'add-product',
                loadComponent: () => import('./my-store/add-product/add-product.component').then(m => m.AddProductComponent)
            },
            {
                path: 'view-product',
                loadComponent: () => import('./my-store/view-product/view-product.component').then(m => m.ViewProductComponent)
            },

            {
                path: 'my-entries',
                loadComponent: () => import('./my-entries/my-entries.component').then(m => m.MyEntriesComponent)
            },

            {
                path: 'hosted-contests',
                loadComponent: () => import('./hosted-contests/hosted-contests.component').then(m => m.HostedContestsComponent)
            },
             {
                path: 'view-contest',
                loadComponent: () => import('./hosted-contests/view-contest/view-contest.component').then(m => m.ViewContestComponent)
            },
             {
                path: 'contest-entry-details',
                loadComponent: () => import('./hosted-contests/contest-entry-detail/contest-entry-detail.component').then(m => m.ContestEntryDetailComponent)
            },

            {
                path: 'blocked-accounts',
                loadComponent: () => import('./blocked-accounts/blocked-accounts.component').then(m => m.BlockedAccountsComponent)
            },
            {
                path: 'contact-support',
                loadComponent: () => import('./contact-support/contact-support.component').then(m => m.ContactSupportComponent)
            },
            {
                path: 'privacyPolicies',
                loadComponent: () => import('./privacy-policies/privacy-policies.component').then(m => m.PrivacyPoliciesComponent)
            },
            {
                path: 'termsConditions',
                loadComponent: () => import('./terms-conditions/terms-conditions.component').then(m => m.TermsConditionsComponent)
            },

        ]
    },

];
