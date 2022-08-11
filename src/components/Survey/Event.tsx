import { Radio, RadioChangeEvent, Space } from "antd"

interface Props {
  data: Record<string, any>
  setData: (args: Record<string, any>) =>  void
}

export const Event = ({data, setData}: Props) => {
  const onChange = (e: RadioChangeEvent, key: string) => {
    setData({...data, [key]: e.target.value})
  }

  return (
    <div className="py-10">
      <h1>Menurutmu, acara OSKM apa yang paling menarik?</h1>
      <Radio.Group className="my-5" onChange={(e) => onChange(e, "menarik")} value={data["menarik"]}>
        <Space direction="vertical">
          <Radio value={"A"}>Option A</Radio>
          <Radio value={"B"}>Option B</Radio>
          <Radio value={"C"}>Option C</Radio>
        </Space>
      </Radio.Group>

      <h1>Menurutmu, acara OSKM apa yang paling membosankan?</h1>
      <Radio.Group className="my-5" onChange={(e) => onChange(e, "bosan")} value={data["bosan"]}>
        <Space direction="vertical">
          <Radio value={"A"}>Option A</Radio>
          <Radio value={"B"}>Option B</Radio>
          <Radio value={"C"}>Option C</Radio>
        </Space>
      </Radio.Group>
    </div>
  )
}