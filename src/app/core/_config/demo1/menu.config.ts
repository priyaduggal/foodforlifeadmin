export class MenuConfig {
	public defaults: any = {
		header: {
			self: {},
			items: []
		},
		aside: {
			self: {},
			items: [
				{
					title: 'Dashboard',
					root: true,
					icon: 'flaticon2-architecture-and-city',
					page: 'dashboard',
					translate: 'MENU.DASHBOARD',
					bullet: 'dot',
				},	
				{
					title: 'Users', 
					bullet: 'dot',
					page: 'users',
					icon: 'flaticon2-user-1',
				},/*{
					title: 'Goals',   
					bullet: 'dot',
					page: 'goals',
					icon: 'fa fa-donate', 
				},*/
					{
					title: 'Tribes',
					bullet: 'dot',
					page: 'pages',
					icon: 'flaticon-file-1',
					 submenu: [
						{
							title: 'Projects',
							page: 'projects'
						},
                        {
							title: 'Beneficiaries',
							page: 'beneficiaries'
						},
                        {
							title: 'Activities',
							page: 'activities'
						}
					]
				},
				{
					title: 'Donations', 
					bullet: 'dot',
					page: 'donations',
					icon: 'flaticon-coins',
				},{
					title: 'Subscription', 
					bullet: 'dot',
					page: 'subscription',
					icon: 'fa fa-money-bill',
				},{
					title: 'Requests', 
					bullet: 'dot',
					page: 'requests',
					icon: 'fa fa-user-plus',
				},
				{
					title: 'Settings',
					bullet: 'dot',
					page: 'settings',
					icon: 'flaticon2-settings',
				},
				{
					title: 'Profile',
					bullet: 'dot',
					page: 'profile',
					icon: 'flaticon2-user-1',
				},
				{
					title: 'Pages',
					bullet: 'dot',
					page: 'pages',
					icon: 'flaticon-file-2',
					 submenu: [
						{
							title: 'All Pages',
							page: 'pages'
						},
                        {
							title: 'FAQ',
							page: 'pages/faq'
						}
					]
				},
			]
		},
	};

	public get configs(): any {
		return this.defaults;
	}
}
