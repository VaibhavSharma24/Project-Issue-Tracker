import { IsIn, IsOptional } from 'class-validator';

export class UpdateIssueDto {
  @IsOptional()
  @IsIn(['Open', 'InProgress', 'Done'])
  status?: string;

  @IsOptional()
  @IsIn(['Low', 'Medium', 'High'])
  priority?: string;
}