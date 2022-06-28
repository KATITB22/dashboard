import { Button, Form, Input, DatePicker, Select, Upload } from 'antd';
import { InboxOutlined } from '@ant-design/icons';

interface Props {
    isCreating?: boolean;
}

export const TopicForm = ({ isCreating = true }: Props) => {
    
    return (
        <Form layout="vertical" labelCol={{ span: 2 }} wrapperCol={{ span: 8 }}>
            <Form.Item
                label="Title"
                name="title"
                rules={[{ required: true, message: 'Judul topik belum diisi' }]}
            >
                <Input placeholder="Ex: Topik 1" />
            </Form.Item>
            <Form.Item
                label="Deadline"
                name="deadline"
                rules={[
                    {
                        required: true,
                        message: 'Waktu pengerjaan topik belum diisi',
                    },
                ]}
            >
                <DatePicker.RangePicker showTime />
            </Form.Item>
            {isCreating ? (
                <Form.Item
                    label="Upload File Soal"
                    name="file-upload"
                    rules={[
                        { required: true, message: 'File soal belum di-upload!' },
                    ]}
                >
                    <Upload.Dragger name="file" multiple={false}>
                        <p className="ant-upload-drag-icon">
                            <InboxOutlined />
                        </p>
                        <p className="ant-upload-text">Upload File Soal</p>
                    </Upload.Dragger>
                </Form.Item>
            ) : (
                <Form.Item
                    label="Dropdown (TBD)"
                    name="dropdown"
                    rules={[{ required: true, message: 'Dropdown' }]}
                >
                    <Select>
                        <Select.Option value="jack">Jack</Select.Option>
                    </Select>
                </Form.Item>
            )}
            <Form.Item>
                <Button size="large" type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
    );
}
