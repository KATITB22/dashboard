import { useState } from "react";
import { Alert, Button, message, PageHeader, Steps } from "antd"
import { StandardLayout } from "../../layout/StandardLayout"
import { Event } from "../../components/Survey/Event";
import { Article } from "../../components/Survey/Article";
import { Assignment } from "../../components/Survey/Assignment";
import { Friend } from "../../components/Survey/Friend";

const steps = [
  {
    title: 'Acara',
    content: Event,
  },
  {
    title: 'Artikel',
    content: Article,
  },
  {
    title: 'Tugas',
    content: Assignment,
  },
  {
    title: 'Temen Kelompok',
    content: Friend,
  },
];

export const Survey = () => {
  const [current, setCurrent] = useState(0);
  let SurveyForm = steps[current].content

  const next = () => {
    setCurrent(current + 1);
  };
  
  const prev = () => {
    setCurrent(current - 1);
  };

  return (
    <StandardLayout allowedRole={["Committee", "Mentor", "Participant"]}>
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
        <SurveyForm />
        <div className="">
        {current > 0 && (
          <Button style={{ margin: '0 8px' }} onClick={() => prev()}>
              Previous
          </Button>
        )}
        {current < steps.length - 1 && (
          <Button type="primary" onClick={() => next()}>
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
    </StandardLayout>
  )
}