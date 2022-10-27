import { FormLabel, Input, Button, Select } from "@chakra-ui/react";
import { useState } from "react";
import { useDispatch } from "react-redux";
function CreateEmailForm({ onClose }) {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const dispatch = useDispatch();

  const createEmailFormSubmit = (e) => {
    e.preventDefault();
    console.log("email created");
    // add onClose later
    // let params = {
    //     mailingListId: // this would be the id ,
    //     title,
    //     content: body
    // }
    // dispatch(createPost(params))
  };
  // ** SHAWNS
  // const [clickedList, setClickedList] = useState("")
  // const mailingLists = useSelector((state) => state.mailingLists.lists);

  //   const handleSend = async () => {
  //     let title = emailTitle
  //     let addresses = clickedList
  //     let text = body

  //     try {
  //       await jwtFetch("/api/mail/sendmail", {
  //         method: "POST",
  //         body: JSON.stringify({text, addresses, title})
  //       })
  //     } catch (errors) {
  //       console.log(errors)
  //     }
  //   }

  //  <Select  onChange={(e) => setClickedList(e.target.value)} placeholder="Choose mail list">
  // {mailingLists && mailingLists.map((list) => {
  //   return <option value={list.emails}>{list.name}</option>
  // })}
  //** */ SHAWNS
  return (
    <>
      <form className="create-email-form" onSubmit={createEmailFormSubmit}>
        <FormLabel>Create Email</FormLabel>
        <FormLabel>
          <Select placeholder="Choose mail list">
            <option>Single Mail List</option>
            <option>Single Mail List</option>
          </Select>
        </FormLabel>
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
          <Input
            type="textarea"
            value={body}
            onChange={(e) => setBody(e.currentTarget.value)}
            placeholder="Body"
            h="300px"
            _placeholder={{
              textAlign: "center",
            }}
          />
        </FormLabel>
        <Button type="submit">Create Mail</Button>
      </form>
    </>
  );
}

export default CreateEmailForm;
