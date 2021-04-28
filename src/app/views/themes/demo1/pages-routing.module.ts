// Angular
// Angular
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// Components
import { BaseComponent } from './base/base.component';
import { ErrorPageComponent } from './content/error-page/error-page.component';
// Auth
import { AuthGuard } from '../../../core/auth';

const routes: Routes = [
	{
		path: '',
		component: BaseComponent,
		canActivate: [AuthGuard],
		children: [
			{
				path: 'dashboard',
				loadChildren: () => import('app/views/pages/dashboard/dashboard.module').then(m => m.DashboardModule)
			},
			{
				path: 'users',
				loadChildren: () => import('app/views/pages/users/users.module').then(m => m.UsersModule)
			},{
				path: 'goals',
				loadChildren: () => import('app/views/pages/goals/goals.module').then(m => m.GoalsModule)
			},
			{
				path: 'projects',
				loadChildren: () => import('app/views/pages/projects/projects.module').then(m => m.ProjectsModule)
			},
			{
				path: 'activities',
				loadChildren: () => import('app/views/pages/activities/activities.module').then(m => m.ActivitiesModule)
			},
			{
				path: 'donations',
				loadChildren: () => import('app/views/pages/donations/donations.module').then(m => m.DonationsModule)
			},
			{
				path: 'settings',
				loadChildren: () => import('app/views/pages/settings/settings.module').then(m => m.SettingsModule)
			},
			{
				path: 'profile',
				loadChildren: () => import('app/views/pages/profile/profile.module').then(m => m.ProfileModule)
			},		
			{
				path: 'pages',
				loadChildren: () => import('app/views/pages/pages/pages.module').then(m => m.PagesModule)
			},
			{
				path: 'notifications',
				loadChildren: () => import('app/views/pages/notifications/notifications.module').then(m => m.NotificationsModule)
			},	
			{
				path: 'goals',
				loadChildren: () => import('app/views/pages/goals/goals.module').then(m => m.GoalsModule)
			},	{
				path: 'subscription',
				loadChildren: () => import('app/views/pages/subscription/subscription.module').then(m => m.SubscriptionModule)
			},{
				path: 'fflmonthlysponsors',
				loadChildren: () => import('app/views/pages/fflmonthlysponsors/fflmonthlysponsors.module').then(m => m.FflmonthlysponsorsModule)
			},{
				path: 'requests',
				loadChildren: () => import('app/views/pages/requests/requests.module').then(m => m.RequestsModule)
			},		
           {
				path: 'beneficiaries',
				loadChildren: () => import('app/views/pages/beneficiaries/beneficiaries.module').then(m => m.BeneficiariesModule)
			},				
			{
				path: 'builder',
				loadChildren: () => import('app/views/themes/demo1/content/builder/builder.module').then(m => m.BuilderModule)
			},
			{
				path: 'error/403',
				component: ErrorPageComponent,
				data: {
					'type': 'error-v6',
					'code': 403,
					'title': '403... Access forbidden',
					'desc': 'Looks like you don\'t have permission to access for requested page.<br> Please, contact administrator'
				}
			},
			{path: 'error/:type', component: ErrorPageComponent},
			{path: '', redirectTo: 'dashboard', pathMatch: 'full'},
			{path: '**', redirectTo: 'dashboard', pathMatch: 'full'}
		]
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class PagesRoutingModule {
}
