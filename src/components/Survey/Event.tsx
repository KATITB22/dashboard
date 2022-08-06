import { useState } from "react";
import { Radio, RadioChangeEvent, Space } from "antd"

export const Event = () => {
  const [value, setValue] = useState(1);

  const onChange = (e: RadioChangeEvent) => {
    setValue(e.target.value);
  };

  return (
    <div className="py-10">
      <h1>Menurutmu, acara OSKM apa yang paling menarik?</h1>
      <Radio.Group className="my-5" onChange={onChange} value={value}>
        <Space direction="vertical">
          <Radio value={1}>Option A</Radio>
          <Radio value={2}>Option B</Radio>
          <Radio value={3}>Option C</Radio>
        </Space>
      </Radio.Group>

      <h1>Menurutmu, acara OSKM apa yang paling membosankan?</h1>
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