import * as _ from 'lodash';

export enum QuestionType {
    ISIAN = 'ISIAN',
    PILIHAN_GANDA = 'PILIHAN_GANDA',
    ESSAY = 'ESSAY',
}

export interface QuestionMetadata {
    type: QuestionType;
}

export interface QuestionHiddenMetadata {
    [key: string]: string | null;
}

export interface Question {
    id?: string;
    question_no: number;
    question: string;
    score: number;
    metadata: QuestionMetadata;
    hidden_metadata: QuestionHiddenMetadata;
}

class QuestionService {
    private validateHeaders(header: any[]): boolean {
        const correctHeaders = [
            'question_no',
            'question',
            'type',
            'score',
            'correct_answer',
            'pilihan_A',
            'pilihan_B',
            'pilihan_C',
            'pilihan_D',
            'pilihan_E',
        ];
        if (header.length !== correctHeaders.length) return false;
        if (
            _.intersection(header, correctHeaders).length !==
            correctHeaders.length
        )
            return false;
        return true;
    }

    public mapRawData(rows: any[]): Question[] {
        const ok = this.validateHeaders(rows[0]);
        if (!ok) return [];

        const headers: string[] = rows[0];
        const rowsSliced = rows.slice(1, rows.length);
        const result: Question[] = [];
        rowsSliced.forEach((each) => {
            const obj: any = {};
            obj.metadata = {};
            obj.hidden_metadata = {};
            for (var i = 0; i < headers.length; i++) {
                if (headers[i] == 'type') {
                    obj.metadata[headers[i]] = each[i];
                }
                else if (headers[i] == 'correct_answer' || headers[i].includes("pilihan")) {
                    obj.hidden_metadata[headers[i]] = each[i];
                } else {
                    obj[headers[i]] = each[i];
                }
            }
            result.push(obj);
        });
        return result;
    }
}

const service = new QuestionService();
export default service;
