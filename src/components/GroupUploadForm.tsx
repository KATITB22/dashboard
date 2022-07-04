import { useState } from 'react';
import { Form, Upload, Button, Popconfirm, Table, Spin } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import readXlsxFile from 'read-excel-file';
import { toast } from 'react-toastify';
import Service from '../service/group';


export const GroupUploadForm = () => {
    const [file, setFile] = useState<any>();
    const [loading, setLoading] = useState<boolean>(false);
    const [errData, setErrData] = useState<any>([]);
    const columns = [
        {
            'title': 'Kelompok',
            'dataIndex': 'name',
        },
        {
            'title': 'Error',
            'dataIndex': 'error',
        },
        {
            'title': 'Data',
            'dataIndex': 'data',
        }
    ]
    const handleSubmit = async (file: any) => {
        if (file === undefined) {
            toast.error('Please select a file');
            return;
        }
        let data: any = []
        try {
            await (await readXlsxFile(file.originFileObj)).map((row: any, idx) => {
                if (idx > 0) {
                    data[row[1]] === undefined ? (
                        data[row[1]] = {},
                        data[row[1]].name = "Kelompok " + row[1],
                        data[row[1]].leaders = [],
                        data[row[1]].members = [],
                        row[2] === "Member" ? (
                            data[row[1]].members.push(row[0])
                        ) : (
                            data[row[1]].leaders.push(row[0])
                        )
                    ) : (
                        row[2] === "Member" ? (
                            data[row[1]].members.push(row[0])
                        ) : (
                            data[row[1]].leaders.push(row[0])
                        )
                    )
                }
            });
        } catch (err: any) {
            toast.error(err);
        }

        const res = data.slice(1, data.length);
        const arr: number[] = [];
        const succ: number[] = [];
        res.map((d: any, idx: number) => {
            Service.uploadGroup(d,
                (resp) => {
                    succ.push(idx + 1);
                    { idx === res.length - 1 && succ.length === res.length ? toast.success("Successfully uploaded " + file.name) && setLoading(false) : null }
                },
                (err) => {
                    setErrData((old: any) => [...old, {
                        key: errData.length,
                        name: d.name,
                        error: err.toString(),
                        data: err.toString().includes('members') ? d.members.map((t: any) => t + ' ') : d.leaders.map((t: any) => t + ' ')
                    }])
                    arr.push(idx)
                    {
                        idx === res.length - 1 && arr.length > 0 ? (
                            toast.error("Failed to upload " + file.name) && setLoading(false)
                        ) : null
                    }
                });
        })
        setFile(undefined);
    };

    const handleDelete = () => {
        Service.deleteAll(
            (res) => toast.success("Successfully deleted all data") && setLoading(false),
            (err) => toast.error("Failed deleting data") && setLoading(false)
        );
    }

    return (
        <Spin tip="Loading..." spinning={loading}>
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
                        maxCount={1}
                        customRequest={() => true}
                        onChange={(e) => {
                            e.file.status = 'done';
                            setFile(e.fileList[0])
                            return;
                        }}
                        showUploadList={{ showRemoveIcon: true }}
                        accept=".xlsx"
                    >
                        <p className="ant-upload-drag-icon">
                            <InboxOutlined />
                        </p>
                        <p className="ant-upload-text">Upload or Drag File to this<br />(.xlsx)</p>
                        <p className="ant-upload-text"></p>
                    </Upload.Dragger>
                </Form.Item>

                <div className="flex flex-col gap-2 flex-wrap">
                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="reset"
                            onClick={() => {
                                setLoading(true)
                                setErrData([])
                                handleSubmit(file)
                            }}
                        >
                            Submit
                        </Button>
                    </Form.Item>
                    <Form.Item
                        label="Hapus Data Kelompok"
                    >
                        <Button
                            type="primary"
                            danger
                        >
                            <Popconfirm
                                title="Are you sure want to delete all?"
                                onConfirm={() => {
                                    setLoading(true)
                                    setErrData([])
                                    handleDelete()
                                }}
                                okText="Yes"
                                cancelText="No"
                            >
                                Delete All
                            </Popconfirm>
                        </Button>
                    </Form.Item>
                </div>
            </Form>
            {errData.length > 0 ? <Table dataSource={errData} columns={columns} /> : null}
        </Spin>
    );
};
