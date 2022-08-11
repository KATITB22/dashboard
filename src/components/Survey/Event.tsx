import { useState, useContext } from "react";
import { Radio, RadioChangeEvent, Space } from "antd"
import { SurveyContext } from "../../context";

export const Event = () => {
  const { data, setData }: any = useContext(SurveyContext)

  const [value, setValue] = useState<Record<string, any>>(data.event);


  const changeMenarik = (e: RadioChangeEvent) => {
    setValue({...value, acara_menarik: e.target.value})
    setData({...data, event: value})
  }

  const changeBosan = (e: RadioChangeEvent) => {
    setValue({...value, acara_bosan: e.target.value})
    setData({...data, event: value})
  }

  return (
    <div className="py-10">
      <h1>Menurutmu, acara OSKM apa yang paling menarik?</h1>
      <Radio.Group className="my-5" onChange={changeMenarik} value={value["acara_menarik"]}>
        <Space direction="vertical">
          <Radio value={"A"}>Option A</Radio>
          <Radio value={"B"}>Option B</Radio>
          <Radio value={"C"}>Option C</Radio>
        </Space>
      </Radio.Group>

      <h1>Menurutmu, acara OSKM apa yang paling membosankan?</h1>
      <Radio.Group className="my-5" onChange={changeBosan} value={value["acara_bosan"]}>
        <Space direction="vertical">
          <Radio value={"A"}>Option A</Radio>
          <Radio value={"B"}>Option B</Radio>
          <Radio value={"C"}>Option C</Radio>
        </Space>
      </Radio.Group>
    </div>
  )
}