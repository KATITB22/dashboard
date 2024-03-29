import { Radio, RadioChangeEvent, Space } from "antd"

interface Props {
  data: Record<string, any>
  setData: (args: Record<string, any>) =>  void
}

const events = [
  'Talkshow "Tantangan Masa Kini"',
  'Treasure Hunt',
  'Talkshow "KM ITB"',
  'Mentoring',
  'Forum Lapangan',
  'Interaksi Fakultas',
  'Webinar "Kontribusi Membangun Indonesia"',
  'Main Samitra'
]

export const Event = ({data, setData}: Props) => {
  const onChange = (e: RadioChangeEvent, key: string) => {
    setData({...data, [key]: e.target.value})
  }

  return (
    <div className="py-10">
      <h1>Menurutmu, acara OSKM apa yang paling menarik?</h1>
      <Radio.Group className="my-5" onChange={(e) => onChange(e, "menarik")} value={data["menarik"]}>
        <Space direction="vertical">
          {events.map((event, index) => (
            <Radio value={event} key={index}>{event}</Radio>
          ))}
        </Space>
      </Radio.Group>
    </div>
  )
}