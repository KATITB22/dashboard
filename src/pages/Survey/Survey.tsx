import { useEffect, useState } from "react";
import { Alert, Button, PageHeader, Spin, Steps } from "antd";
import { StandardLayout } from "../../layout/StandardLayout";
import { Event, Article, Assignment, Friend } from "../../components/Survey";
import SurveyService from "../../service/survey";
import GroupService from '../../service/group';
import { toast } from "react-toastify";

interface SurveyData {
  event: Record<string, any>
  // article: Record<string, any>
  assignment: Record<string, any>
  friend: Record<string, any>
}

export const Survey = () => {
  const [completed, setCompleted] = useState<boolean>(false);
  const [current, setCurrent] = useState(0);
  const [loading, setLoading] = useState(false);
  const [event, setEvent] = useState<Record<string, any>>({})
  const [article, setArticle] = useState<Record<string, any>>({})
  const [assignment, setAssignment] = useState<Record<string, any>>({})
  const [friend, setFriend] = useState<Record<string, any>>({})
  const [friendList, setFriendList] = useState<any[]>([])

  const steps = [
    {
      title: 'Acara',
      content: <Event data={event} setData={setEvent} />,
    },
    // {
    //   title: 'Artikel',
    //   content: <Article data={article} setData={setArticle} />,
    // },
    {
      title: 'Tugas',
      content: <Assignment data={assignment} setData={setAssignment} />,
    },
    {
      title: 'Teman Kelompok',
      content: <Friend data={friend} setData={setFriend} friendList={friendList} />,
    },
  ];

  let SurveyForm = steps[current].content

  const validateEvent = () => {
    if (event['menarik']) {
      setCurrent(current + 1)
      return
    }

    toast.error("Tolong isi semua pertanyaan dahulu untuk bagian ini")
  }

  // const validateArticle = () => {
  //   if (article['menarik']) {
  //     setCurrent(current + 1)
  //     return
  //   }

  //   toast.error("Tolong isi semua pertanyaan dahulu untuk bagian ini")
  // }

  const validateAssignment = () => {
    if (assignment['menarik']) {
      setCurrent(current + 1)
      return
    }

    toast.error("Tolong isi semua pertanyaan dahulu untuk bagian ini")
  }

  const validateFriend = (nim: number) => {
    if (!friend[nim]["bacot_kalem"]) {
      return false
    }

    if (!friend[nim]["serius_bercanda"]) {
      return false
    }

    if (!friend[nim]["strict_ngalir"]) {
      return false
    }

    if (!friend[nim]["ambis_santuy"]) {
      return false
    }

    if (!friend[nim]["logis_feeling"]) {
      return false
    }
    
    if (!friend[nim]["komentar"]) {
      return false
    }

    return true
  }

  const nextPage = () => {
    switch(current) {
      case 0:
        validateEvent();
        break;
      case 1:
        validateAssignment();
        break;
    }
  };
  
  const prevPage = () => {
    setCurrent(current - 1);
  };

  const handleSubmit = async () => {
    setLoading(true)

    for (let i = 0; i < friendList.length; i++) {
      if (!validateFriend(friendList[i].username)) {
        toast.error("Survey belum dijawab untuk " + friendList[i].name)
        setLoading(false)
        return
      }
    }

    const surveyData : SurveyData = {event, assignment, friend}

    await SurveyService.postSurvey(surveyData, () => {
      setLoading(false)
      toast.success("Berhasil melakukan submit!");
    }, (err) => {
      setLoading(false)
      toast.error("Gagal melakukan submit! " + err.toString())
    })
  }

  useEffect(() => {
    setLoading(true)
    
    SurveyService.getSurvey((response) => {
      if (response.answer) {
        setCompleted(true)
      }
    }, (err) => {
      toast.error("Error mengambil survey: " + err.toString())
    })

    GroupService.getMyGroup((res) => {
      const data: any[] = [];
      const friendRecord : Record<string, any> = {}

      res.members.forEach((each: any) => {
        each.role = "Member";
        friendRecord[each.username] = {}
        data.push(each);
      });

      setFriend(friendRecord)
      setFriendList(data);
    }, (err) => {
      toast.error("Gagal mengambil daftar kelompok! " + err.toString())
    });

    setLoading(false)
  }, [])

  return (
    <StandardLayout allowedRole={["Mentor", "Participant"]}>
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
      {completed ? 
        <div className="h-96 flex justify-center items-center">
          <h1>Anda sudah mengisi survei ini.</h1> 
        </div>
        : 
        <></> 
      }
      {loading ? 
        <div className="flex justify-center items-center">
          <Spin tip="Submitting..." spinning={loading}></Spin>
        </div>
        :
        <></>
      }
      {!completed && !loading ? 
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
        :
        <></>
      }
    </StandardLayout>
  )
}