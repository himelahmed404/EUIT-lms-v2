export const permissionAreas = [
  'dashboard', 'courses', 'publishing', 'batches', 'pricing', 'students',
  'payments', 'teaching', 'recordings', 'leaderboard', 'leads', 'mentors', 'settings',
] as const;
export const selfPermissions = ['profile.read', 'profile.write', 'preferences.read', 'preferences.write'];
export const permissionCatalog = [...selfPermissions,
  ...permissionAreas.flatMap(area => [`${area}.read`, `${area}.write`]), 'roles.read', 'access.write'];
const view = (...areas: string[]) => areas.map(area => `${area}.read`);
const edit = (...areas: string[]) => areas.flatMap(area => [`${area}.read`, `${area}.write`]);
export const initialRoles = [
  { key: 'OWNER', name: 'Owner', defaultBatchScope: 'ALL', permissions: permissionCatalog },
  { key: 'ADMIN', name: 'Admin', defaultBatchScope: 'ALL', permissions: [
    ...selfPermissions, ...edit(...permissionAreas.filter(area => !['payments', 'settings'].includes(area))),
    ...view('payments', 'settings'), 'roles.read',
  ] },
  { key: 'ACCOUNTS', name: 'Accounts', defaultBatchScope: 'ALL', permissions: [
    ...selfPermissions, ...view('dashboard', 'pricing', 'students', 'batches'), ...edit('payments'),
  ] },
  { key: 'ADMISSIONS', name: 'Admissions', defaultBatchScope: 'ALL', permissions: [
    ...selfPermissions, ...view('dashboard', 'courses', 'batches', 'pricing', 'payments'), ...edit('students', 'leads'),
  ] },
  { key: 'MENTOR', name: 'Mentor', defaultBatchScope: 'ASSIGNED', permissions: [
    ...selfPermissions, ...view('dashboard', 'batches', 'students'), ...edit('courses', 'teaching', 'recordings'),
  ] },
  { key: 'STUDENT', name: 'Student', defaultBatchScope: 'ASSIGNED', permissions: selfPermissions },
] as const;
