import { useEffect, useState } from "react";
import { Alert, Button, PageHeader, Spin, Steps } from "antd";
import { StandardLayout } from "../../layout/StandardLayout";
import { Event, Article, Assignment, Friend } from "../../components/Survey";
import service from "../../service/survey";
import { toast } from "react-toastify";

interface SurveyData {
  event: Record<string, any>
  article: Record<string, any>
  assignment: Record<string, any>
  friend: Record<string, any>
}

export const Survey = () => {
  const [current, setCurrent] = useState(0);
  const [loading, setLoading] = useState(false);
  const [event, setEvent] = useState<Record<string, any>>({})
  const [article, setArticle] = useState<Record<string, any>>({})
  const [assignment, setAssignment] = useState<Record<string, any>>({})
  const [friend, setFriend] = useState<Record<string, any>>({})

  const steps = [
    {
      title: 'Acara',
      content: <Event data={event} setData={setEvent} />,
    },
    {
      title: 'Artikel',
      content: <Article data={article} setData={setArticle} />,
    },
    {
      title: 'Tugas',
      content: <Assignment data={assignment} setData={setAssignment} />,
    },
    {
      title: 'Temen Kelompok',
      content: <Friend data={friend} setData={setFriend} />,
    },
  ];

  let SurveyForm = steps[current].content

  const nextPage = () => {
    setCurrent(current + 1);
  };
  
  const prevPage = () => {
    setCurrent(current - 1);
  };

  const handleSubmit = async () => {
    setLoading(true)
    const surveyData : SurveyData = {event, article, assignment, friend}

    await service.postSurvey(surveyData, () => {
      setLoading(false)
      toast.success("Berhasil melakukan submit!");
    }, (err) => {
      setLoading(false)
      toast.error("Gagal melakukan submit! " + err.toString())
    })
  }

  useEffect(() => {
    console.log(friend)
  }, [friend])

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

      {loading ? 
        <div className="flex justify-center items-center">
          <Spin tip="Submitting..." spinning={loading}></Spin>
        </div>
        :
        <div className="mt-10">
          <Steps current={current}>
            {steps.map(item => (
              <Steps.Step key={item.title} title={item.title} />
              ))}
          </Steps>
          {SurveyForm}
          <div>
            {current > 0 && (
              <Button style={{ margin: '0 8px' }} onClick={prevPage}>
                  Previous
              </Button>
            )}
            {current < steps.length - 1 && (
              <Button type="primary" onClick={nextPage}>
                  Next
              </Button>
            )}
            {current === steps.length - 1 && (
              <Button type="primary" onClick={handleSubmit}>
                  Submit
              </Button>
            )}
          </div>
        </div>
      }
    </StandardLayout>
  )
}