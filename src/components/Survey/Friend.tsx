import { Radio, Collapse, Form, Input, Button } from "antd";

const friendList = [
  "Tito Prakasa",
  "Shafira Naya",
  "Aulia Adila",
  "Widya Anugrah"
]

interface Props {
  data: Record<string, any>
  setData: (args: Record<string, any>) =>  void
}

export const Friend = ({data, setData}: Props) => {

  const onChange = (e: any, friend: string, key: string) => {
    if (!data[friend]) {
      data[friend] = {}
    }

    setData({
      ...data, 
      [friend]: {
        ...data[friend], 
        [key]: e.target.value
      }
    });
  };

  return (
    <div
      className="py-10"
    >
      <Collapse defaultActiveKey={['0']}>
        {friendList.map((friend, index) => (
          <Collapse.Panel header={friend} key={index}>
            <h1>Bacot - Kalem</h1>
            <Radio.Group className="my-5" onChange={(e) => onChange(e, friend, "bacot_kalem")} value={data[friend] ? data[friend]["bacot_kalem"]: ""} >
              <Radio value={"Bacot"}>Bacot</Radio>
              <Radio value={"Kalem"}>Kalem</Radio>
            </Radio.Group>

            <h1>Serius - Bercanda</h1>
            <Radio.Group className="my-5" onChange={(e) => onChange(e, friend, "serius_bercanda")} value={data[friend] ? data[friend]["serius_bercanda"]: ""} >
              <Radio value={"Serius"}>Serius</Radio>
              <Radio value={"Bercanda"}>Bercanda</Radio>
            </Radio.Group>
            
            <h1>Strict - Ngalir</h1>
            <Radio.Group className="my-5" onChange={(e) => onChange(e, friend, "strict_ngalir")} value={data[friend] ? data[friend]["strict_ngalir"]: ""} >
              <Radio value={"Strict"}>Strict</Radio>
              <Radio value={"Ngalir"}>Ngalir</Radio>
            </Radio.Group>
            
            <h1>Ambis - Santuy</h1>
            <Radio.Group className="my-5" onChange={(e) => onChange(e, friend, "ambis_santuy")} value={data[friend] ? data[friend]["ambis_santuy"]: ""} >
              <Radio value={"Ambis"}>Ambis</Radio>
              <Radio value={"Santuy"}>Santuy</Radio>
            </Radio.Group>
            
            <h1>Logis - Feeling</h1>
            <Radio.Group className="my-5" onChange={(e) => onChange(e, friend, "logis_feeling")} value={data[friend] ? data[friend]["logis_feeling"]: ""} >
              <Radio value={"Logis"}>Logis</Radio>
              <Radio value={"Feeling"}>Feeling</Radio>
            </Radio.Group>

            <h1>Komentar</h1>
            <Input.TextArea className="my-5 p-3" onChange={(e) => onChange(e, friend, "komentar")} value={data[friend] ? data[friend]["komentar"]: ""} />
            
          </Collapse.Panel>
        ))}
      </Collapse> 
    </div>  
  )
}