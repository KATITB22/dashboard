import { Form, Upload, Button, Input } from 'antd';
import { InboxOutlined } from '@ant-design/icons';

export const GroupUploadForm = () => (
    <Form layout="vertical">
        <Form.Item
            label="Nama Kelompok"
            name="nama-kelompok"
            rules={[
                {
                    required: true,
                    message: 'Nama kelompok belum diisi',
                },
            ]}
        >
            <Input placeholder="Ex: Kelompok 1" />
        </Form.Item>
        <Form.Item
            label="Upload File Kelompok"
            name="file-kelompok-upload"
            rules={[
                {
                    required: true,
                    message: 'File kelompok belum di-upload',
                },
            ]}
        >
            <Upload.Dragger name="files" multiple={false}>
                <p className="ant-upload-drag-icon">
                    <InboxOutlined />
                </p>
                <p className="ant-upload-text">Upload File Kelompok</p>
            </Upload.Dragger>
        </Form.Item>

        <div className="flex gap-3">
            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="reset">
                    Reset
                </Button>
            </Form.Item>
        </div>
    </Form>
);
