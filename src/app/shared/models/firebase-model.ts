export default class FirebaseModel {
  Content: any;
  DeadLine: number = 0;
  EndDate?: Date | null;
  MainTaskId?: string;
  Name?: string;
  StartDate?: Date | null;
  Status?: string;
  Tags?: Array<string>;
  Wage: number = 0;
  SubTitle?: string;
  Summary?: string;
  MarkdownContent?: string;
  Templet?: string;
  KeyVision?: string;
  ArticleDirectory?: any;
  Author?: string;
  DisplaySummary?: string;
}
