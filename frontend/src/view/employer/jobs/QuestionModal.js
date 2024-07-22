import { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import jobQuestionApi from "../../../api/jobQuestion";
import dayjs from "dayjs";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { toast } from "react-toastify";

export default function QuestionModal({ show, setShow, jobId }) {
  const [questions, setQuestions] = useState([]);
  const [curQues, setCurQues] = useState({});
  const [curAnswer, setCurAnswer] = useState(null);
  const [isEdit, setIsEdit] = useState(false);

  const getQuestions = async () => {
    const res = await jobQuestionApi.getByJobId(jobId);
    console.log({ res });
    setQuestions(res);
  };

  const handleSendAnswer = async (item) => {
    setIsEdit(false);
    let data = {
      id: item.id,
      answer: curAnswer,
    };
    await jobQuestionApi.update(data);
    toast.success("Cập nhật thành công!");
    await getQuestions();
  };

  const handleEdit = async (item) => {
    setCurQues(item);
    setIsEdit(true);
  };

  useEffect(() => {
    getQuestions();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Modal
      size="lg"
      fullscreen="xl-down"
      scrollable
      show={show}
      onHide={() => setShow(false)}
      style={{ fontFamily: "sans-serif" }}
    >
      <Modal.Header closeButton className="py-2">
        <Modal.Title className="w-100 text-center fw-600">
          Danh sách câu hỏi
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="mb-4">
        {questions?.map((item, index) => (
          <div key={item.id}>
            <div className="ts-sm">
              {item.author} -{" "}
              {dayjs(item.created_at).format("DD/MM/YYYY HH:mm")}
            </div>
            <strong>Câu hỏi {index + 1}:</strong>&nbsp;
            {item.question}
            {!item.answer || (isEdit && curQues.id === item.id) ? (
              <div className="d-flex gap-2">
                <Form.Control
                  size="sm"
                  type="text"
                  className=""
                  onChange={(e) => setCurAnswer(e.target.value)}
                />
                <Button
                  size="sm"
                  className="bg-main border-0 px-3"
                  onClick={() => handleSendAnswer(item)}
                >
                  Gửi
                </Button>
              </div>
            ) : (
              <div>
                {"->"} {item.answer}
                <Button
                  size="sm"
                  className="bg-main border-0 px-3 ms-4"
                  onClick={() => handleEdit(item)}
                >
                  Sửa
                </Button>
              </div>
            )}
            <hr className="text-main" />
          </div>
        ))}
      </Modal.Body>
    </Modal>
  );
}
