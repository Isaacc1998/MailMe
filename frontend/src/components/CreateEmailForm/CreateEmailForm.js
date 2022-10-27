import { FormLabel, Input, Button, Select, Textarea } from "@chakra-ui/react";
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
    let addresses = currentList.emails;
    await jwtFetch("/api/mail/sendmail", {
      method: "POST",
      body: JSON.stringify({ body, addresses, title }),
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
        <FormLabel>Create Email</FormLabel>
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
        <FormLabel>
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
        <Button type="submit" onClick={onClose}>
          Create Mail
        </Button>
      </form>
    </>
  );
}

export default CreateEmailForm;
