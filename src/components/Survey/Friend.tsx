import { useState } from "react";
import { Collapse, Rate } from "antd";

const friendList = [
  "Tito Prakasa",
  "Shafira Naya",
  "Aulia Adila",
  "Widya Anugrah"
]

const bacotDesc = ['Bacot banget', 'Agak bacot', 'Netral', 'Kalem dikit', 'Terlalu kalem'];

export const Friend = () => {
  const [value, setValue] = useState(3);

  const onChange = (key: string | string[]) => {
    console.log(key);
  };

  const text = "Nama temen"
  
  return (
    <div className="py-10">
      <Collapse defaultActiveKey={['1']} onChange={onChange}>
        {friendList.map((friend, index) => (
          <Collapse.Panel header={friend} key={index}>
            <h1>Bacot - Kalem</h1>
            <Rate className="my-3" tooltips={bacotDesc} onChange={setValue} value={value} character={({index}) => index! + 1} />
            {value ? <span className="ant-rate-text">{bacotDesc[value - 1]}</span> : ''}

            <h1>Serius - Becanda</h1>
            <Rate className="my-3" tooltips={bacotDesc} onChange={setValue} value={value} character={({index}) => index! + 1} />
            {value ? <span className="ant-rate-text">{bacotDesc[value - 1]}</span> : ''}
            
            <h1>Strict - Ngalir</h1>
            <Rate className="my-3" tooltips={bacotDesc} onChange={setValue} value={value} character={({index}) => index! + 1} />
            {value ? <span className="ant-rate-text">{bacotDesc[value - 1]}</span> : ''}
            
            <h1>Ambis - Santuy</h1>
            <Rate className="my-3" tooltips={bacotDesc} onChange={setValue} value={value} character={({index}) => index! + 1} />
            {value ? <span className="ant-rate-text">{bacotDesc[value - 1]}</span> : ''}
            
            <h1>Logis - Feeling</h1>
            <Rate className="my-3" tooltips={bacotDesc} onChange={setValue} value={value} character={({index}) => index! + 1} />
            {value ? <span className="ant-rate-text">{bacotDesc[value - 1]}</span> : ''}
          </Collapse.Panel>
        ))}
      </Collapse> 
    </div>  
  )
}