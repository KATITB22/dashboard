import { useState, useEffect } from "react";
import { Alert, Button, message, PageHeader, Steps } from "antd";
import { StandardLayout } from "../../layout/StandardLayout";
import { Event, Article, Assignment, Friend } from "../../components/Survey";
import { SurveyContext } from "../../context";

interface SurveyData {
  event: Record<string, any>
  article: Record<string, any>
  assignment: Record<string, any>
  friend: Record<string, any>[]
}

export const Survey = () => {
  const [current, setCurrent] = useState(0);
  const [data, setData] = useState<SurveyData>({
    event: {},
    article: {},
    assignment: {},
    friend: []
  });

  const steps = [
    {
      title: 'Acara',
      content: <Event />,
    },
    {
      title: 'Artikel',
      content: <Article />,
    },
    {
      title: 'Tugas',
      content: <Assignment />,
    },
    {
      title: 'Temen Kelompok',
      content: <Friend />,
    },
  ];

  let SurveyForm = steps[current].content

  const nextPage = () => {
    setCurrent(current + 1);
  };
  
  const prevPage = () => {
    setCurrent(current - 1);
  };

  useEffect(() => {
    console.log(data)
  }, [data])

  return (
    <StandardLayout allowedRole={["Committee", "Mentor", "Participant"]}>
      <SurveyContext.Provider value={{data, setData}}>
        <PageHeader title="Survey" />
        <div className='mt-3 flex flex-col'>
          <Alert
            className='my-3'
            message="Announcement"
            description={
                <p>Mohon isi form survei berikut sebagai bentuk feedback agar acara OSKM dapat menjadi lebih baik</p>
            }
            type="info"
          />
        </div>

        <div className="mt-10">
          <Steps current={current}>
            {steps.map(item => (
                <Steps.Step key={item.title} title={item.title} />
            ))}
          </Steps>
          {SurveyForm}
          <div>
            {current > 0 && (
              <Button style={{ margin: '0 8px' }} onClick={() => prevPage()}>
                  Previous
              </Button>
            )}
            {current < steps.length - 1 && (
              <Button type="primary" onClick={() => nextPage()}>
                  Next
              </Button>
            )}
            {current === steps.length - 1 && (
              <Button type="primary" onClick={() => message.success('Processing complete!')}>
                  Submit
              </Button>
            )}
          </div>
        </div>
      </SurveyContext.Provider>
    </StandardLayout>
  )
}