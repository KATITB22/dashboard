import { useState } from "react";
import { Radio, RadioChangeEvent, Space } from "antd";

export const Assignment = () => {
  const [value, setValue] = useState(1);

  const onChange = (e: RadioChangeEvent) => {
    setValue(e.target.value);
  };

  return (
    <div className="py-10">
      <h1>Menurutmu, tugas day berapa yang paling menarik?</h1>
      <Radio.Group className="my-5" onChange={onChange} value={value}>
        <Space direction="vertical">
          <Radio value={1}>Option A</Radio>
          <Radio value={2}>Option B</Radio>
          <Radio value={3}>Option C</Radio>
        </Space>
      </Radio.Group>

      <h1>Menurutmu, tugas day berapa yang paling susah?</h1>
      <Radio.Group className="my-5" onChange={onChange} value={value}>
        <Space direction="vertical">
          <Radio value={1}>Option A</Radio>
          <Radio value={2}>Option B</Radio>
          <Radio value={3}>Option C</Radio>
        </Space>
      </Radio.Group>

      <h1>Menurutmu, tugas day berapa yang paling mudah?</h1>
      <Radio.Group className="my-5" onChange={onChange} value={value}>
        <Space direction="vertical">
          <Radio value={1}>Option A</Radio>
          <Radio value={2}>Option B</Radio>
          <Radio value={3}>Option C</Radio>
        </Space>
      </Radio.Group>
    </div>
  )
}