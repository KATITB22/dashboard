export interface AssignmentComponentProps {
    id: string;
    question: string;
    question_no: number;
    max_score: number;
    metadata: Record<string, any>;
    correct_answer?: string;
    score: Record<string, any>;

    editScore: boolean;
    editAnswer: boolean;
}