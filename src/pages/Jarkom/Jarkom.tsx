import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { List, Button, PageHeader, Avatar, Popover } from 'antd';
import { StandardLayout } from "../../layout/StandardLayout";
import ReactMarkdown from 'react-markdown';

interface JarkomProps {
    creator: string,
    title: string,
    text: string,
} 

export const Jarkom = () => {
    const [data, setData] = useState<JarkomProps[]>([
        {
            creator: "PIE KABARE",
            title: 'PIE',
            text: "***ITALICBOLD***",
        },
        {
            creator: "PIE KABARE",
            title: 'NICE',
            text: "# Title"
        }
    ]);
    const navigate = useNavigate();
    return (
        <StandardLayout allowedRole={"Committee"} title={"Jarkom"} >
            <PageHeader title="KAT ITB 2022 Jarkom" />
            <div className='mb-3'>
                <Button type="primary"
                    onClick={() => navigate("/jarkom")}
                >
                    + Jarkom
                </Button>
            </div>
            <List
                itemLayout="horizontal"
                size="large"
                dataSource={data}
                renderItem={item => (
                    <List.Item>
                        <List.Item.Meta
                            avatar={
                                <Popover content={item.creator}>
                                    <Avatar>{item.creator[0]}</Avatar>
                                </Popover>
                            }
                            title={item.title}
                            description={<ReactMarkdown>{item.text}</ReactMarkdown>}
                        />
                    </List.Item>
                )}
            >
            </List>
        </StandardLayout>
    )
}