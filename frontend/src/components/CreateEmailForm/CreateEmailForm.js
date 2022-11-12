import {
  FormLabel,
  Input,
  Button,
  Select,
  Textarea,
  Heading,
} from "@chakra-ui/react";
import jwtFetch from "../../store/jwt";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createPost } from "../../store/posts";
import ViewHistoryModel from "./ViewHistoryModal";

function CreateEmailForm({ onClose }) {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [email, setEmail] = useState("");
  const [seconds, setSeconds] = useState("*")
  const [minutes, setMinutes] = useState("*")
  const [hour, setHour] = useState("*")
  const [dayOfMonth, setDayOfMonth] = useState("*")
  const [month, setMonth] = useState("*")
  const dispatch = useDispatch();
  const currentList = useSelector(
    (state) => state.mailingLists.currentMailingList
  );
  // const createEmailFormSubmit = (e) => {
  //   e.preventDefault();
  //   console.log("email created");
  //   // add onClose later
  //   // let params = {
  //   //     mailingListId: // this would be the id ,
  //   //     title,
  //   //     content: body
  //   // }
  //   // dispatch(createPost(params))
  // };

  // ** SHAWNS
  // const mailingLists = useSelector((state) => state.mailingLists.lists);

  const handleSend = async (e) => {
    e.preventDefault();
    let time = `${seconds} ${minutes} ${hour} ${dayOfMonth} ${month} *`
    let addresses = currentList.emails;
    await jwtFetch("/api/mail/sendmail", {
      method: "POST",
      body: JSON.stringify({ body, addresses, title, time }),
    });
    return dispatch(
      createPost({
        mailinglistId: currentList._id,
        title: title,
        content: body,
      })
    );
  };

  return (
    <>
      <form className="create-email-form" onSubmit={handleSend}>
        <Heading mt={3} mb={3} fontSize="2xl">
          Create Email
        </Heading>
        <ViewHistoryModel setTitle={setTitle} setBody={setBody} />
        {/* <FormLabel>
          <Select
            onChange={(e) =>
              setClickedList(e.options[e.selectectedIndex].value)
            }
            placeholder="Choose mail list"
          >
            {mailingLists &&
              mailingLists.map((list) => {
                return <option value={list}>{list.name}</option>;
              })}
          </Select>
        </FormLabel> */}

        {/* <FormLabel>
          <Input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.currentTarget.value)}
            placeholder="Enter Emails"
          />
        </FormLabel> */}
        <FormLabel mt={3}>
          <Input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.currentTarget.value)}
            placeholder="Title"
          />
        </FormLabel>
        <FormLabel>
          <Textarea
            value={body}
            onChange={(e) => setBody(e.currentTarget.value)}
            placeholder="Body"
            h="300px"
            _placeholder={{
              textAlign: "center",
            }}
          />
        </FormLabel>
        <Button mt={3} colorScheme="green" type="submit" onClick={onClose}>
          Create Mail
        </Button>
      </form>
    </>
  );
}

export default CreateEmailForm;
