import { Radio, RadioChangeEvent, Space } from "antd";

interface Props {
  data: Record<string, any>
  setData: (args: Record<string, any>) =>  void
}

const assignments = [
  'Daily Quest #1',
  'Daily Quest #2',
  'Daily Quest #3',
  'Daily Quest #4',
]


export const Assignment = ({data, setData}: Props) => {

  const onChange = (e: RadioChangeEvent, key: string) => {
    setData({...data, [key]: e.target.value})
  }

  return (
    <div className="py-10">
      <h1>Menurutmu, tugas day berapa yang paling menarik?</h1>
      <Radio.Group className="my-5" onChange={(e) => onChange(e, "menarik")} value={data["menarik"]}>
        <Space direction="vertical">
          {assignments.map((event, index) => (
            <Radio value={event} key={index}>{event}</Radio>
          ))}
        </Space>
      </Radio.Group>
    </div>
  )
}