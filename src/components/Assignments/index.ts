export interface AssignmentComponentProps {
    id: string;
    question: string;
    question_no: number;
    max_score: number;
    metadata: Record<string, any>;
    score: Record<string, any>;

    editScore: boolean;
    editAnswer: boolean;
}