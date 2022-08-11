import { Radio, RadioChangeEvent, Space } from "antd";

interface Props {
  data: Record<string, any>
  setData: (args: Record<string, any>) =>  void
}

export const Assignment = ({data, setData}: Props) => {

  const onChange = (e: RadioChangeEvent, key: string) => {
    setData({...data, [key]: e.target.value})
  }

  return (
    <div className="py-10">
      <h1>Menurutmu, tugas day berapa yang paling menarik?</h1>
      <Radio.Group className="my-5" onChange={(e) => onChange(e, "menarik")} value={data["menarik"]}>
        <Space direction="vertical">
          <Radio value={1}>Option A</Radio>
          <Radio value={2}>Option B</Radio>
          <Radio value={3}>Option C</Radio>
        </Space>
      </Radio.Group>

      <h1>Menurutmu, tugas day berapa yang paling mudah?</h1>
      <Radio.Group className="my-5" onChange={(e) => onChange(e, "mudah")} value={data["mudah"]}>
        <Space direction="vertical">
          <Radio value={1}>Option A</Radio>
          <Radio value={2}>Option B</Radio>
          <Radio value={3}>Option C</Radio>
        </Space>
      </Radio.Group>

      <h1>Menurutmu, tugas day berapa yang paling susah?</h1>
      <Radio.Group className="my-5" onChange={(e) => onChange(e, "susah")} value={data["susah"]}>
        <Space direction="vertical">
          <Radio value={1}>Option A</Radio>
          <Radio value={2}>Option B</Radio>
          <Radio value={3}>Option C</Radio>
        </Space>
      </Radio.Group>
    </div>
  )
}