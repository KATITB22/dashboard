import { Radio, RadioChangeEvent, Space } from "antd"

interface Props {
  data: Record<string, any>
  setData: (args: Record<string, any>) =>  void
}

const events = [
  'Opening Ceremony',
  'Talkshow "Tantangan Masa Kini"',
  'Treasure Hunt',
  'Talkshow "KM ITB"',
  'Mentoring',
  'Forum Lapangan',
  'Webinar "Kontribusi Membangun Indonesia"',
  'Closing Ceremony'
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