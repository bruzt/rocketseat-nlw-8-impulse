export interface FeedbackCreateData {
  type: string;
  comment: string;
  screenshot?: string;
}

export interface FeedbacksRepositories<FeedbackResponse> {
  create: (data: FeedbackCreateData) => Promise<FeedbackResponse>;
}
