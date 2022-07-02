import { Checkbox, Divider, List, PageHeader, Tag } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import { StandardLayout } from '../../layout/StandardLayout';
import { TopicForm } from '../../components/TopicForm';
import { useState } from 'react';
import { Question } from '../../service/questions';

export const QuestionItemList = (item: Question) => {
    const colorMappers: { [key: string]: string } = {
        "ISIAN": "yellow",
        "ESSAY": "blue",
        "PILIHAN GANDA": "magenta"
    }
    const Essay = () => {
        return <Checkbox disabled checked>Manual Check</Checkbox>
    }
    const PilihanGanda = () => {
        if (!item.hidden_metadata || !item.hidden_metadata['correct_answer']) {
            return <Essay />
        }
        return <>
            <Checkbox disabled>Manual Check</Checkbox>
            {Object.keys(item.hidden_metadata).map((each) => {
                if (!each.includes("pilihan_")) return;
                const opsi = each.replace("pilihan_", "");
                return <span className='text-gray-400'>{`${opsi}. ${item.hidden_metadata[each]}`}</span>
            })}
            <span className='text-gray-400'>Correct Answer: {item.hidden_metadata['correct_answer'].toLocaleUpperCase()}</span>
        </>
    }
    const Isian = () => {
        if (!item.hidden_metadata || !item.hidden_metadata['correct_answer']) {
            return <Essay />
        }
        return <>
            <Checkbox disabled>Manual Check</Checkbox>
            <span className='text-gray-400'>Correct Answer: {item.hidden_metadata['correct_answer'].toLocaleLowerCase()}</span>
        </>
    }

    const SubComponentMappers: any = {
        "ESSAY": <Essay />,
        "PILIHAN GANDA": <PilihanGanda />,
        "ISIAN": <Isian />
    }

    return (
        <>
            <div className="flex flex-col">
                <span>{item.question_no}. {item.question}
                    <Tag className='ml-5' color="lime">Score: {item.score}</Tag>
                    <Tag className='ml-1' color={colorMappers[item.metadata.type]}>{item.metadata.type}</Tag>
                </span>
                {SubComponentMappers[item.metadata.type]}
            </div>
        </>
    )
}

export const EditTopic = () => {
    const navigate = useNavigate();
    const [questions, setQuestions] = useState<Question[]>([]);
    const { id } = useParams();

    questions.sort((a, b) => a.question_no - b.question_no);

    return (
        <StandardLayout>
            <PageHeader onBack={() => navigate(-1)} title="Edit Topic" />
            <TopicForm id={id} setQuestions={setQuestions} />
            <Divider orientation="left">Pertanyaan</Divider>
            <List
                size="large"
                bordered
                dataSource={questions}
                renderItem={(item: Question) => <List.Item key={item.id}><QuestionItemList {...item} /></List.Item>}
            />
        </StandardLayout>
    );
};
