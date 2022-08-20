import { Radio, Collapse, Input } from "antd";

interface Props {
  friendList: any[]
  data: Record<string, any>
  setData: (args: Record<string, any>) =>  void
}

export const Friend = ({data, setData, friendList}: Props) => {

  const onChange = (e: any, username: string, key: string) => {
    if (!data[username]) {
      data[username] = {}
    }

    setData({
      ...data, 
      [username]: {
        ...data[username], 
        [key]: e.target.value
      }
    });
  };

  return (
    <div
      className="py-10"
    >
      <Collapse defaultActiveKey={['0']}>
        {friendList.map((friend) => (
          <Collapse.Panel header={friend.name} key={friend.username}>
            <h1>Bacot - Kalem</h1>
            <Radio.Group 
              className="my-5" 
              onChange={(e) => onChange(e, friend.username, "bacot_kalem")} 
              value={data[friend.username] ? data[friend.username]["bacot_kalem"]: ""} 
            >
              <Radio value={"Bacot"}>Bacot</Radio>
              <Radio value={"Kalem"}>Kalem</Radio>
            </Radio.Group>

            <h1>Serius - Bercanda</h1>
            <Radio.Group 
              className="my-5" 
              onChange={(e) => onChange(e, friend.username, "serius_bercanda")} 
              value={data[friend.username] ? data[friend.username]["serius_bercanda"]: ""} 
            >
              <Radio value={"Serius"}>Serius</Radio>
              <Radio value={"Bercanda"}>Bercanda</Radio>
            </Radio.Group>
            
            <h1>Strict - Ngalir</h1>
            <Radio.Group 
              className="my-5" 
              onChange={(e) => onChange(e, friend.username, "strict_ngalir")} 
              value={data[friend.username] ? data[friend.username]["strict_ngalir"]: ""} 
            >
              <Radio value={"Strict"}>Strict</Radio>
              <Radio value={"Ngalir"}>Ngalir</Radio>
            </Radio.Group>
            
            <h1>Ambis - Santuy</h1>
            <Radio.Group 
              className="my-5" 
              onChange={(e) => onChange(e, friend.username, "ambis_santuy")} 
              value={data[friend.username] ? data[friend.username]["ambis_santuy"]: ""} 
            >
              <Radio value={"Ambis"}>Ambis</Radio>
              <Radio value={"Santuy"}>Santuy</Radio>
            </Radio.Group>
            
            <h1>Logis - Feeling</h1>
            <Radio.Group 
              className="my-5" 
              onChange={(e) => onChange(e, friend.username, "logis_feeling")} 
              value={data[friend.username] ? data[friend.username]["logis_feeling"]: ""} 
            >
              <Radio value={"Logis"}>Logis</Radio>
              <Radio value={"Feeling"}>Feeling</Radio>
            </Radio.Group>

            <h1>Komentar</h1>
            <Input.TextArea 
              className="my-5 p-3" 
              onChange={(e) => onChange(e, friend.username, "komentar")} 
              value={data[friend.username] ? data[friend.username]["komentar"]: ""} 
              maxLength={2000} 
              showCount
            />
            
          </Collapse.Panel>
        ))}
      </Collapse> 
    </div>  
  )
}