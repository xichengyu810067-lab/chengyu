import type { Activity, Question, Stage, SubjectId } from "../content/types";

export interface ActivityContext {
  subject: SubjectId;
  stage: Stage;
  color: string;
  lessonId?: string;
  /** 同一 track 的題庫（quiz 活動使用） */
  questions?: Question[];
}

export interface WidgetProps<A extends Activity = Activity> {
  activity: A;
  done: boolean;
  /** score：0–1（有計分的活動才傳） */
  onComplete: (score?: number) => void;
  ctx: ActivityContext;
}
