import { Form, Upload, Button } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import readXlsxFile from 'read-excel-file';

export const GroupUploadForm = () => {
    const handleChange = async (file: any) => {
        const data = await readXlsxFile(file.originFileObj);
        console.log(data.splice(1, data.length));
    };

    return (
        <Form layout="vertical">
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
                <Upload.Dragger
                    name="files"
                    multiple={false}
                    onChange={(e) => handleChange(e.fileList[0])}
                    showUploadList={{ showRemoveIcon: true }}
                    accept=".xlsx,.xls,.csv"
                >
                    <p className="ant-upload-drag-icon">
                        <InboxOutlined />
                    </p>
                    <p className="ant-upload-text">Upload File Kelompok</p>
                </Upload.Dragger>
            </Form.Item>

            <div className="flex gap-2 flex-wrap">
                <Form.Item>
                    <Button
                        type="primary"
                        onClick={() => console.log('Submit')}
                    >
                        Submit
                    </Button>
                </Form.Item>
                <Form.Item>
                    <Button
                        type="primary"
                        danger
                        onClick={() => console.log('Delete All')}
                    >
                        Delete All
                    </Button>
                </Form.Item>
            </div>
        </Form>
    );
};
