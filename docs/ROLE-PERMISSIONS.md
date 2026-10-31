# EduMindz CRM role matrix
| Capability | Super Admin | Admin | Manager | Counsellor |
|---|---|---|---|---|
| View enquiries | All | All | Own team | Assigned only |
| Update enquiries | All | All | Own team | Assigned only |
| Assign counsellors | All | All | Own team counsellors | No |
| Manage counsellor accounts | Yes | Yes | No | No |
| Manage admins/managers | Yes | No | No | No |
| Manage roles/security | Yes | No | No | No |
| Reports | All | Operational | Own team | Own workload |
| Audit logs | All | Limited | No | No |

Manager scope is derived from `users.manager_id`. Counsellor scope is the assigned lead ID.
Enforce permissions on every endpoint. UI hiding is not security.
