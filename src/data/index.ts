import projectsJson from './projects.json';
import itemsJson from './items.json';
import usersJson from './users.json';

import { jsonSchema } from '../types/schema';

export const PROJECTS_LIST = [
  {
    label: 'Projects',
    id: '1',
    data: jsonSchema.parse(projectsJson),
  },
  {
    label: 'Items',
    id: '2',
    data: jsonSchema.parse(itemsJson),
  },
  {
    label: 'Users',
    id: '3',
    data: jsonSchema.parse(usersJson),
  },
];
