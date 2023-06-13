import { ObjectType } from '@nestjs/graphql';
import { BaseModel } from 'src/common/models/base.model';
import { IssueReport } from '../../issueReport/models/issueReport';
import { TrackerMember } from '../../trackerMember/models/trackerMember.model';

@ObjectType()
export class Comment extends BaseModel {
  content: string;
  report: IssueReport;
  author: TrackerMember;
}
