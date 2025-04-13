import { IsNotEmpty, IsIn } from 'class-validator';

export class CreateIssueDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;

  @IsIn(['Open', 'InProgress', 'Done'])
  status: string;

  @IsIn(['Low', 'Medium', 'High'])
  priority: string;
}