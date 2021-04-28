export class PageConfig {
	public defaults: any = {
		dashboard: {
		     page: {title: 'Dashboard', desc: ''},
			},		
			users: {
		     page: {title: 'Users', desc: ''},
			'adduser': {page: {title: 'Add User', desc: ''}},
			'edituser': {page: {title: 'Edit User', desc: ''}},
			
			},projects: {
		     page: {title: 'Projects', desc: ''},
			'addproject': {page: {title: 'Add Project', desc: ''}},
			'editproject': {page: {title: 'Edit Project', desc: ''}},
			},
			activities: {
		     page: {title: 'Activities', desc: ''},
			'addactivity': {page: {title: 'Add Activity', desc: ''}},
			'editactivity': {page: {title: 'Edit Activity', desc: ''}},
			},  
			donations: {
		     page: {title: 'Donations', desc: ''}
			},
			beneficiaries: {
		     page: {title: 'Beneficiaries', desc: ''},
			},  
			goals: {
		     page: {title: 'Goals', desc: ''},
			'addgoals': {page: {title: 'Add Goal', desc: ''}},
			'editgoal': {page: {title: 'Edit Goal', desc: ''}},
			}, fflmonthlysponsors: {
		     page: {title: 'FFL Monthly Sponsors', desc: ''},
			'addfflsponsor': {page: {title: 'Add FFL Monthly Sponsors', desc: ''}},
			'editfflsponsor': {page: {title: 'Edit FFL Monthly Sponsors', desc: ''}},
			}, subscription: {
		     page: {title: 'Subscription', desc: ''},
			}, requests: {
		     page: {title: 'Requests', desc: ''},
			}, 
	    pages: {
		 page: {title: 'Pages', desc: ''},
		'faq': {page: {title: 'FAQ', desc: ''}},
			
		},	
			settings: {
			page: {title: 'Settings', desc: ''}
		},	
			profile: {
			page: {title: 'Profile', desc: ''}
		},
		
		builder: {
			page: {title: 'Layout Builder', desc: ''}
		},
	};

	public get configs(): any {
		return this.defaults;
	}
}
