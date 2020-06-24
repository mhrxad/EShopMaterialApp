import {environment} from '../../environments/environment';

export const DomainName = environment.production ? 'https://SiteUrl.com' : 'https://localhost:5001';
