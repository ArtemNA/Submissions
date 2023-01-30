import { StatusBageType } from '../pipes/status-badge.pipe';

export interface SubmissionInterface {
  task: string;
  status: StatusBageType;
  from: string;
  to: string;
  address: string;
  date: string;
  checked?: boolean;
}
